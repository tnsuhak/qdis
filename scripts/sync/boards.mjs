// QDIS 공식 게시판 감시: 새 글 감지 → 중복 확인 → 학부모 관련성 분류 → 초안(draft) 생성.
// 결과는 파일로만 남깁니다. 사이트 반영(Production)은 사람이 검토한 PR 머지로만 이뤄집니다.
import {readFileSync, writeFileSync, existsSync, mkdirSync} from 'node:fs';
import {fetchText, parseBoardList, classify, extractOffer, BOARDS, QDIS} from '../../lib/monitoring/qdis-parse.mjs';

const root = new URL('../../', import.meta.url);
const statePath = new URL('data/monitor/state.json', root);
const state = existsSync(statePath) ? JSON.parse(readFileSync(statePath, 'utf8')) : {boards: {}};
const news = JSON.parse(readFileSync(new URL('data/news/news.json', root), 'utf8'));
const known = new Set(news.items.map(i => i.source_url));
mkdirSync(new URL('data/news/drafts/', root), {recursive: true});

const summary = [];
const offers = [];
for (const b of Object.values(BOARDS)) {
  let list;
  try {
    list = parseBoardList(await fetchText(`${QDIS}/board/index.html?id=${b.id}`), b.id);
  } catch (e) {
    summary.push(`- ${b.label}: 가져오기 실패 (${e.message})`);
    continue;
  }
  const last = state.boards[b.id]?.last_no ?? null;
  // 첫 실행이면 기준선만 저장하고 초안을 만들지 않습니다.
  const fresh = last == null ? [] : list.filter(p => p.no > last && !known.has(p.url));
  for (const p of fresh) {
    const c = classify(p);
    const draft = {id: `${b.id}-${p.no}`, status: c.relevant ? 'draft' : 'skipped', relevance_score: c.score, category: c.category, date: p.date, original_title: p.title, title: p.title, summary: '', source_board: b.label, source_url: p.url, source_post_id: p.no, detected_at: new Date().toISOString()};
    writeFileSync(new URL(`data/news/drafts/${draft.id}.json`, root), JSON.stringify(draft, null, 1) + '\n');
    summary.push(`- ${c.relevant ? '✅ 초안' : '⏭️ 제외'} [${b.label}] ${p.date ?? ''} ${p.title} (score ${c.score}) ${p.url}`);
    if (b.id === 'board3') offers.push(extractOffer(p));
  }
  if (list.length) state.boards[b.id] = {last_no: Math.max(last ?? 0, list[0].no), checked_at: new Date().toISOString()};
}

if (offers.length) {
  const candPath = new URL('data/university-results/candidates.json', root);
  const cand = existsSync(candPath) ? JSON.parse(readFileSync(candPath, 'utf8')) : {schema: 'qdis.university-results.candidates/v1', description: '진학정보 게시판에서 자동 감지한 합격 후보. 검토 후 latest-offers.json 또는 alumni.json으로 옮깁니다. 연도별 합계(annual.json)에는 절대 자동 추가하지 않습니다.', entries: []};
  const seen = new Set(cand.entries.map(e => e.source_post_id));
  cand.entries.unshift(...offers.filter(o => !seen.has(o.source_post_id)));
  writeFileSync(candPath, JSON.stringify(cand, null, 1) + '\n');
}
writeFileSync(statePath, JSON.stringify(state, null, 1) + '\n');
const report = summary.length ? summary.join('\n') : '- 새 글 없음';
writeFileSync(new URL('data/monitor/last-report.md', root), `# QDIS 게시판 감시 결과\n\n${new Date().toISOString()}\n\n${report}\n`);
console.log(report);
