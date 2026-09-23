// QDIS 공식 급식 페이지 → data/meals/latest.json
// 자동화 원칙:
// - 공식 급식표가 실제로 달라졌을 때만 파일을 갱신합니다.
// - fetched_at만 달라졌다고 커밋/배포하지 않습니다.
// - 공식 페이지가 일시적으로 과거 주를 돌려주면 최신 스냅샷을 덮어쓰지 않습니다.
import {readFileSync, writeFileSync} from 'node:fs';
import {fetchText, parseMeals, MEALS_URL} from '../../lib/monitoring/qdis-parse.mjs';

const TARGET = new URL('../../data/meals/latest.json', import.meta.url);

function readCurrent() {
  try { return JSON.parse(readFileSync(TARGET, 'utf8')); }
  catch { return null; }
}

function comparable(data) {
  if (!data) return null;
  return {
    schema: data.schema,
    source: data.source,
    week: data.week,
    days: data.days,
  };
}

const current = readCurrent();
const html = await fetchText(MEALS_URL, {timeoutMs: 20000});
const next = parseMeals(html);

if (!next) {
  console.error('급식 표를 해석하지 못했습니다. 공식 페이지 구조를 확인하세요.');
  process.exit(1);
}

if (current?.week?.start && next?.week?.start && next.week.start < current.week.start) {
  console.log(`meals unchanged: official page returned older week ${next.week.start} < saved ${current.week.start}`);
  process.exit(0);
}

if (JSON.stringify(comparable(current)) === JSON.stringify(comparable(next))) {
  console.log(`meals unchanged: ${next.week.start}~${next.week.end}`);
  process.exit(0);
}

writeFileSync(TARGET, JSON.stringify(next, null, 1) + '\n');
console.log(`meals updated: ${next.week.start}~${next.week.end} · ${next.days.length} days`);
