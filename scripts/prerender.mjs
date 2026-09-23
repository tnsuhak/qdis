// 빌드 후 각 경로를 정적 HTML로 미리 렌더링합니다 (SEO·카카오 OG·빠른 첫 화면).
import {readFileSync, writeFileSync, mkdirSync, rmSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist-netlify');
const site = JSON.parse(readFileSync(resolve(root, 'data/site.json'), 'utf8'));
const faq = JSON.parse(readFileSync(resolve(root, 'data/faq/faq.json'), 'utf8'));
const ssr = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);

// Netlify: CONTEXT=production|deploy-preview|branch-deploy.
// Preview 공유 시 og:image/og:url이 Preview 자체를 가리키도록 DEPLOY_PRIME_URL을 우선합니다.
const context = process.env.CONTEXT ?? 'local';
const deployBase = context === 'production'
  ? (process.env.URL ?? process.env.SITE_URL ?? site.domain)
  : (process.env.DEPLOY_PRIME_URL ?? process.env.URL ?? process.env.SITE_URL ?? site.domain);
const base = deployBase.replace(/\/$/, '');
const indexable = context === 'production' && site.preview === false;
const template = readFileSync(resolve(dist, 'index.html'), 'utf8');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function head(r) {
  const url = base + (r.path === '/' ? '/' : r.path);
  const og = base + (r.ogImage ?? '/og/qdis-og.jpg');
  const shareTitle = r.path === '/'
    ? '청도대원학교 QDIS | 칭다오에서 준비하는 한국·세계 대학 진학'
    : r.title;
  const shareDescription = r.path === '/'
    ? '대입결과부터 SAT·AP, 기숙생활, 2026–27 학비·장학금, 입학안내까지 한눈에.'
    : r.description;
  const ld = [
    {'@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: base + '/', inLanguage: 'ko-KR', publisher: {'@id': base + '/#tns'}},
    {'@context': 'https://schema.org', '@type': 'WebPage', name: r.title, description: r.description, url, inLanguage: 'ko-KR', isPartOf: {'@type': 'WebSite', url: base + '/'}, about: {'@id': base + '/#qdis'}, publisher: {'@id': base + '/#tns'}},
    {'@context': 'https://schema.org', '@type': 'Organization', '@id': base + '/#tns', name: site.tns.name, legalName: site.tns.legal, url: site.tns.website, telephone: site.tns.phone, description: site.tns.role},
    {'@context': 'https://schema.org', '@type': ['School', 'EducationalOrganization'], '@id': base + '/#qdis', name: site.school.name_en, alternateName: [site.school.name_ko, site.school.name_cn, 'QDIS'], url: site.school.official_site, address: {'@type': 'PostalAddress', streetAddress: 'No.300, Cifu Rd.', addressLocality: 'Chengyang District, Qingdao', addressRegion: 'Shandong', addressCountry: 'CN'}},
  ];
  if (r.path !== '/') {
    ld.push({'@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      {'@type': 'ListItem', position: 1, name: '홈', item: base + '/'},
      {'@type': 'ListItem', position: 2, name: r.crumb ?? r.title, item: url},
    ]});
  }
  if (r.path === '/faq') {
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.items.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a.join(' '),
        },
      })),
    });
  }
  return [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    `<meta name="robots" content="${indexable ? 'index, follow, max-image-preview:large' : 'noindex, nofollow'}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="청도대원학교 QDIS" />`,
    `<meta property="og:locale" content="ko_KR" />`,
    `<meta property="og:title" content="${esc(shareTitle)}" />`,
    `<meta property="og:description" content="${esc(shareDescription)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(og)}" />`,
    `<meta property="og:image:secure_url" content="${esc(og)}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="청도대원학교 QDIS — 칭다오에서 준비하는 한국·세계 대학 진학" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(shareTitle)}" />`,
    `<meta name="twitter:description" content="${esc(shareDescription)}" />`,
    `<meta name="twitter:image" content="${esc(og)}" />`,
    `<meta name="twitter:image:alt" content="청도대원학교 QDIS — 칭다오에서 준비하는 한국·세계 대학 진학" />`,
    `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ');
}

const pages = [...ssr.ROUTES, ssr.NOT_FOUND];
const renderedPages = new Map();
const pageIds = new Map();
const tempPhotos = Object.values(ssr.PHOTOS).filter(p => p.temporary);
const tempUse = new Map();
for (const r of pages) {
  const html = template
    .replace('<!--head-->', head(r))
    .replace('<!--app-->', ssr.render(r.path))
    .replace('<script type="module"', `<script>window.__QDIS_PATH__=${JSON.stringify(r.key === '404' ? '/404' : r.path)}</script>\n    <script type="module"`);
  const out = r.key === '404' ? resolve(dist, '404.html') : r.path === '/' ? resolve(dist, 'index.html') : resolve(dist, r.path.slice(1), 'index.html');
  mkdirSync(dirname(out), {recursive: true});
  writeFileSync(out, html);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  console.log(`prerendered ${r.path.padEnd(22)} h1=${h1} ${Math.round(html.length / 1024)}KB`);
  if (h1 !== 1) throw new Error(`${r.path}: expected exactly one <h1>, found ${h1}`);

  const effectivePath = r.key === '404' ? '/404' : r.path;
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  const duplicateIds = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (duplicateIds.length) throw new Error(`${effectivePath}: duplicate id(s): ${[...new Set(duplicateIds)].join(', ')}`);
  renderedPages.set(effectivePath, html);
  pageIds.set(effectivePath, new Set(ids));

  for (const p of tempPhotos) if (html.includes(`src="${p.src}"`)) tempUse.set(p.id, [...(tempUse.get(p.id) ?? []), r.path]);
}

// Build-time internal-link QA. Fail Preview before a broken menu/CTA ships.
const knownRoutes = new Set([...ssr.ROUTES.map(r => r.path), '/404']);
const assetPrefixes = ['/documents/', '/images/', '/og/', '/assets/'];
for (const [fromPath, html] of renderedPages) {
  const hrefs = [...html.matchAll(/href="(\/[^"]*)"/g)].map(m => m[1].replace(/&amp;/g, '&'));
  for (const href of hrefs) {
    if (href.startsWith('//')) continue;
    const u = new URL(href, 'https://qdis.local');
    const targetPath = u.pathname.replace(/\/+$/, '') || '/';
    if (assetPrefixes.some(prefix => targetPath.startsWith(prefix)) || /\.[a-z0-9]{2,5}$/i.test(targetPath)) continue;
    if (!knownRoutes.has(targetPath)) throw new Error(`${fromPath}: broken internal route ${href}`);
    if (u.hash) {
      const id = decodeURIComponent(u.hash.slice(1));
      const ids = pageIds.get(targetPath);
      if (ids && !ids.has(id)) throw new Error(`${fromPath}: broken internal anchor ${href}`);
    }
  }
}

const today = new Date().toISOString().slice(0, 10);
writeFileSync(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${ssr.ROUTES.map(r => `  <url><loc>${base}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(resolve(dist, 'robots.txt'), indexable ? `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n` : `# Preview build (${context}) — not for indexing\nUser-agent: *\nDisallow: /\n`);
rmSync(resolve(root, 'dist-ssr'), {recursive: true, force: true});
if (tempUse.size) console.log('\n[temporary low-res photos in use — see PHOTO_ASSETS_NEEDED.md]\n' + [...tempUse].map(([id, ps]) => `  ${id}: ${ps.join(', ')}`).join('\n'));
console.log(`context=${context} base=${base} indexable=${indexable}`);
