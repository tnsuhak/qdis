import {mkdir, rm, writeFile, readFile} from 'node:fs/promises';
import {resolve, extname} from 'node:path';

const ROOT = resolve(import.meta.dirname, '../..');
const SOURCE = 'https://qdis.org/gallery/index.html?no=7';
const OUT_DIR = resolve(ROOT, 'public/images/qdis/facilities');
const MANIFEST = resolve(ROOT, 'data/facilities.json');
const PREVIOUS_FACILITY_SNAPSHOT = 'https://6ab1e95783f5fb0008bb00de--qdis-korea.netlify.app/about';

const UA = 'Mozilla/5.0 (compatible; TNS-QDIS-FacilitySync/1.0; +https://qdis-korea.netlify.app)';

function jpegSize(buf) {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    i += 2;
    if (marker === 0xd8 || marker === 0xd9) continue;
    if (i + 2 > buf.length) break;
    const len = buf.readUInt16BE(i);
    if (len < 2 || i + len > buf.length) break;
    if ([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)) {
      return {height: buf.readUInt16BE(i + 3), width: buf.readUInt16BE(i + 5)};
    }
    i += len;
  }
  return null;
}

function imageSize(buf) {
  if (buf.length >= 24 && buf.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) {
    return {width: buf.readUInt32BE(16), height: buf.readUInt32BE(20)};
  }
  return jpegSize(buf);
}

function extFor(type, url) {
  const t = (type || '').toLowerCase();
  if (t.includes('png')) return '.png';
  if (t.includes('webp')) return '.webp';
  if (t.includes('jpeg') || t.includes('jpg')) return '.jpg';
  const e = extname(new URL(url).pathname).toLowerCase();
  return ['.jpg','.jpeg','.png','.webp'].includes(e) ? (e === '.jpeg' ? '.jpg' : e) : '.jpg';
}

async function currentManifest() {
  try { return JSON.parse(await readFile(MANIFEST, 'utf8')); }
  catch { return {schema:'qdis.facilities/v1', source_page:SOURCE, synced_at:null, photos:[]}; }
}

async function main() {
  const fallback = await currentManifest();
  try {
    const pageSources = [
      SOURCE,
      'https://r.jina.ai/http://qdis.org/gallery/index.html?no=7',
      'https://r.jina.ai/https://qdis.org/gallery/index.html?no=7',
      PREVIOUS_FACILITY_SNAPSHOT
    ];
    let html = '';
    let pageSourceUsed = '';
    for (const pageUrl of pageSources) {
      try {
        const res = await fetch(pageUrl, {headers:{'user-agent':UA, 'accept':'text/html,text/plain,*/*'}});
        if (!res.ok) continue;
        const bytes = Buffer.from(await res.arrayBuffer());
        html = bytes.toString('latin1');
        if (html.length > 500) { pageSourceUsed = pageUrl; break; }
      } catch {}
    }
    if (!html) throw new Error('facility page fetch failed (direct + text proxy)');

    const raw = new Set();
    for (const m of html.matchAll(/(?:src|data-src|href)\s*=\s*["']([^"']+?\.(?:jpe?g|png|webp)(?:\?[^"']*)?)["']/ig)) raw.add(m[1]);
    for (const m of html.matchAll(/url\(\s*["']?([^"'\)]+?\.(?:jpe?g|png|webp)(?:\?[^"'\)]*)?)["']?\s*\)/ig)) raw.add(m[1]);
    for (const m of html.matchAll(/["']([^"']+?\.(?:jpe?g|png|webp)(?:\?[^"']*)?)["']/ig)) raw.add(m[1]);

    const resolutionBase = pageSourceUsed.includes('netlify.app') ? pageSourceUsed : SOURCE;
    const urls = [...raw].map(v => {
      try { return new URL(v.replace(/&amp;/g,'&'), resolutionBase).href; } catch { return null; }
    }).filter(Boolean).filter(u => {
      const parsed = new URL(u);
      const host = parsed.hostname.replace(/^www\./,'');
      if (host === 'qdis.org') return true;
      return host.endsWith('netlify.app') && parsed.pathname.includes('/images/qdis/facilities/');
    });

    const candidates = [];
    for (const url of [...new Set(urls)]) {
      try {
        let r = await fetch(url, {headers:{'user-agent':UA, 'referer':SOURCE}});
        if (!r.ok || !(r.headers.get('content-type') || '').startsWith('image/')) {
          const proxied = 'https://wsrv.nl/?url=' + encodeURIComponent(url) + '&output=jpg&q=90';
          r = await fetch(proxied, {headers:{'user-agent':UA}});
        }
        if (!r.ok) continue;
        const type = r.headers.get('content-type') || '';
        if (!type.startsWith('image/')) continue;
        const buf = Buffer.from(await r.arrayBuffer());
        const size = imageSize(buf);
        if (!size) continue;
        const {width,height} = size;
        // Excludes menu icons, logos and decorative UI while retaining landscape/portrait facility photographs.
        if (buf.length < 40_000 || Math.min(width,height) < 280 || Math.max(width,height) < 500) continue;
        candidates.push({url, buf, width, height, type});
      } catch {}
    }

    if (!candidates.length) throw new Error(`no facility photographs found (scanned ${urls.length} image URLs)`);

    await rm(OUT_DIR, {recursive:true, force:true});
    await mkdir(OUT_DIR, {recursive:true});

    const photos = [];
    let n = 0;
    for (const c of candidates) {
      n += 1;
      const ext = extFor(c.type, c.url);
      const name = `facility-${String(n).padStart(2,'0')}${ext}`;
      await writeFile(resolve(OUT_DIR, name), c.buf);
      photos.push({
        id:`facility-${String(n).padStart(2,'0')}`,
        src:`/images/qdis/facilities/${name}`,
        width:c.width,
        height:c.height,
        alt:`청도대원학교 학교 시설 사진 ${n}`,
        source_url:c.url
      });
    }

    const manifest = {
      schema:'qdis.facilities/v1',
      source_page:SOURCE,
      synced_at:new Date().toISOString(),
      photos
    };
    await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
    console.log(`[facilities] synced ${photos.length} photos from ${SOURCE} via ${pageSourceUsed}`);
  } catch (err) {
    console.warn('[facilities] sync skipped:', err?.message || err);
    console.warn(`[facilities] using committed fallback manifest with ${fallback.photos?.length || 0} photos`);
    // Never fail the build over this — qdis.org and its r.jina.ai/wsrv.nl
    // fallback proxies are unauthenticated third-party fetches and have
    // proven intermittently unreliable from Netlify's build network.
  }
}

await main();
