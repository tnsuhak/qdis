// 공식 급식 페이지 → data/meals/latest.json (빌드 시점 스냅샷 갱신용, 수동 또는 다른 변경과 함께 실행)
import {writeFileSync} from 'node:fs';
import {fetchText, parseMeals, MEALS_URL} from '../../lib/monitoring/qdis-parse.mjs';

const html = await fetchText(MEALS_URL);
const data = parseMeals(html);
if (!data) { console.error('급식 표를 해석하지 못했습니다. 공식 페이지 구조를 확인하세요.'); process.exit(1); }
writeFileSync(new URL('../../data/meals/latest.json', import.meta.url), JSON.stringify(data, null, 1) + '\n');
console.log(`meals ${data.week.start}~${data.week.end}: ${data.days.length} days`);
