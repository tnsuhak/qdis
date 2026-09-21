// 빌드 후 각 경로를 정적 HTML로 미리 렌더링합니다 (SEO·카카오 OG·빠른 첫 화면).
import {readFileSync, writeFileSync, mkdirSync, rmSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist-netlify');
const site = JSON.parse(readFileSync(resolve(root, 'data/site.json'), 'utf8'));
const ssr = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);

// Netlify: CONTEXT=production|deploy-preview|branch-deploy, URL=주 사이트 주소
const context = process.env.CONTEXT ?? 'local';
const base = (process.env.SITE_URL ?? process.env.URL ?? site.domain).replace(/\/$/, '');
const indexable = context === 'production' && site.preview === false;
const template = readFileSync(resolve(dist, 'index.html'), 'utf8');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function head(r) {
  const url = base + (r.path === '/' ? '/' : r.path);
  const og = base + (r.ogImage ?? '/og/qdis-og.jpg');
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
  return [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    `<meta name="robots" content="${indexable ? 'index, follow, max-image-preview:large' : 'noindex, nofollow'}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="청도대원학교 QDIS 한국어 안내" />`,
    `<meta property="og:locale" content="ko_KR" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(og)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="청도대원학교 QDIS — 대학 합격 결과·교육과정·기숙생활·학비 안내" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
    `<meta name="twitter:image" content="${esc(og)}" />`,
    `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ');
}

const pages = [...ssr.ROUTES, ssr.NOT_FOUND];
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
  for (const p of tempPhotos) if (html.includes(`src="${p.src}"`)) tempUse.set(p.id, [...(tempUse.get(p.id) ?? []), r.path]);
}

const today = new Date().toISOString().slice(0, 10);
writeFileSync(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${ssr.ROUTES.map(r => `  <url><loc>${base}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(resolve(dist, 'robots.txt'), indexable ? `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n` : `# Preview build (${context}) — not for indexing\nUser-agent: *\nDisallow: /\n`);
rmSync(resolve(root, 'dist-ssr'), {recursive: true, force: true});
if (tempUse.size) console.log('\n[temporary low-res photos in use — see PHOTO_ASSETS_NEEDED.md]\n' + [...tempUse].map(([id, ps]) => `  ${id}: ${ps.join(', ')}`).join('\n'));
console.log(`context=${context} base=${base} indexable=${indexable}`);
