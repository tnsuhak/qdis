// GET /api/meals — QDIS 공식 급식 메뉴를 가져와 JSON으로 제공합니다.
// Netlify CDN(durable cache)에 6시간 캐시되므로 방문자마다 공식 사이트를 호출하지 않고,
// 급식이 바뀌어도 사이트를 다시 배포할 필요가 없습니다. 실패하면 404 → 페이지는 빌드 시점 스냅샷을 그대로 보여 줍니다.
import {fetchText, parseMeals, MEALS_URL} from '../../lib/monitoring/qdis-parse.mjs';

export default async (req: Request) => {
  const week = new URL(req.url).searchParams.get('wftime');
  try {
    const html = await fetchText(week && /^\d{9,11}$/.test(week) ? `${MEALS_URL}&wftime=${week}` : MEALS_URL, {timeoutMs: 8000});
    const data = parseMeals(html);
    if (!data) return new Response(JSON.stringify({error: 'parse_failed'}), {status: 404, headers: {'content-type': 'application/json', 'cache-control': 'no-store'}});
    return new Response(JSON.stringify(data), {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=600',
        'netlify-cdn-cache-control': 'public, durable, s-maxage=21600, stale-while-revalidate=86400',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({error: 'upstream_unavailable'}), {status: 404, headers: {'content-type': 'application/json', 'cache-control': 'public, max-age=300'}});
  }
};

export const config = {path: '/api/meals'};
