// Temporary preview-only diagnostic: list QDIS official university-results posts.
// Remove after current admissions-results refresh is complete.
import {fetchText, parseBoardList, QDIS} from '../../lib/monitoring/qdis-parse.mjs';

export default async () => {
  try {
    const html = await fetchText(`${QDIS}/board/index.html?id=board3`, {timeoutMs: 20000});
    const posts = parseBoardList(html, 'board3').slice(0, 80);
    return new Response(JSON.stringify({checked_at:new Date().toISOString(), posts}, null, 2), {
      headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}
    });
  } catch (e) {
    return new Response(JSON.stringify({error:String(e?.message || e)}), {
      status:500, headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}
    });
  }
};

export const config = {path:'/api/debug-board3'};
