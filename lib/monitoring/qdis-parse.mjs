// QDIS 공식 홈페이지(qdis.org) HTML 파서 — Netlify Function과 동기화 스크립트가 함께 사용합니다.
// 공식 사이트 마크업이 바뀌어도 최대한 버티도록 태그 구조보다 텍스트 패턴에 의존합니다.

export const QDIS = 'https://qdis.org';
export const MEALS_URL = `${QDIS}/meals/index.html?pid=108`;
export const BOARDS = {
  notice: {id: 'notice', label: '공지사항'},
  board2: {id: 'board2', label: '가정통신문'},
  board3: {id: 'board3', label: '진학정보'},
  board1: {id: 'board1', label: '입학안내'},
  news: {id: 'news', label: '사진 갤러리'},
};

/** 응답 바이트를 올바른 문자셋으로 디코딩 (EUC-KR 대비) */
export async function fetchText(url, {timeoutMs = 15000} = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {signal: ctrl.signal, headers: {'user-agent': 'Mozilla/5.0 (compatible; QDIS-Korea-Sync/1.0; +https://www.tnsuhak.com)', 'accept-language': 'ko-KR,ko;q=0.9'}});
    if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
    const buf = new Uint8Array(await res.arrayBuffer());
    const head = new TextDecoder('latin1').decode(buf.slice(0, 4000));
    const cs = (res.headers.get('content-type')?.match(/charset=([\w-]+)/i)?.[1] || head.match(/charset=["']?([\w-]+)/i)?.[1] || 'utf-8').toLowerCase();
    return new TextDecoder(cs === 'ks_c_5601-1987' ? 'euc-kr' : cs).decode(buf);
  } finally {
    clearTimeout(t);
  }
}

const ENT = {'&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&middot;': '·'};
export function text(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z#0-9]+;/gi, m => ENT[m] ?? ' ')
    .replace(/[ \t\r]+/g, ' ')
    .replace(/\n\s*/g, '\n')
    .trim();
}

function rows(html) {
  return [...html.matchAll(/<tr[\s\S]*?<\/tr>/gi)].map(m => [...m[0].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(c => c[1]));
}

const MEAL_KEYS = [['조식', 'breakfast'], ['중식', 'lunch'], ['석식', 'dinner'], ['간식', 'snack'], ['야식', 'snack']];
const WD = {Mon: '월', Tue: '화', Wed: '수', Thu: '목', Fri: '금', Sat: '토', Sun: '일', 월: '월', 화: '화', 수: '수', 목: '목', 금: '금', 토: '토', 일: '일'};

function splitItems(cellHtml) {
  return text(cellHtml)
    .split(/\n|,|、/)
    .map(s => s.replace(/\s+/g, ' ').trim())
    .filter(s => s && s !== '-' && !/^없음$/.test(s));
}

/**
 * 급식 페이지 → {week:{start,end}, days:[{date, weekday, meals:{breakfast:[],...}}]}
 * 1) 표에서 날짜 머리행(“09월 21일(Mon)”)과 식사 구분 행(조식·중식·석식·간식)을 찾습니다.
 * 2) 날짜 연도는 페이지의 기간 표기(2026.09.21~2026.09.27)에서 가져옵니다.
 */
export function parseMeals(html) {
  const range = html.match(/(20\d{2})[.\-/](\d{2})[.\-/](\d{2})\s*~\s*(20\d{2})[.\-/](\d{2})[.\-/](\d{2})/);
  const year = range ? range[1] : String(new Date().getFullYear());
  let header = null;
  const days = [];
  for (const cells of rows(html)) {
    const plain = cells.map(c => text(c));
    const dated = plain.map(p => p.match(/(\d{1,2})\s*월\s*(\d{1,2})\s*일\s*\(?\s*([A-Za-z]{3}|[월화수목금토일])?/));
    if (dated.filter(Boolean).length >= 5) {
      header = dated.map(d => (d ? {date: `${year}-${d[1].padStart(2, '0')}-${d[2].padStart(2, '0')}`, weekday: WD[d[3]] ?? ''} : null));
      header.forEach(h => { if (h) days.push({...h, meals: {}}); });
      continue;
    }
    if (!header) continue;
    const label = plain[0] ?? '';
    const key = MEAL_KEYS.find(([k]) => label.includes(k))?.[1];
    if (!key) continue;
    // 첫 칸이 구분명, 나머지가 요일 순서
    const dataCells = cells.slice(1);
    const dayHeads = header.filter(Boolean);
    const offset = header.findIndex(Boolean) - 1; // 머리행에 빈 칸이 있는 경우 보정
    dayHeads.forEach((h, i) => {
      const c = dataCells[i + Math.max(0, offset)];
      const items = c ? splitItems(c) : [];
      const day = days.find(d => d.date === h.date);
      if (day && items.length) day.meals[key] = items;
    });
  }
  if (!days.length) return null;
  const weekdayFromDate = iso => '일월화수목금토'[new Date(iso + 'T12:00:00Z').getUTCDay()];
  days.forEach(d => { if (!d.weekday) d.weekday = weekdayFromDate(d.date); });
  const valid = days.filter(d => Object.keys(d.meals).length);
  if (valid.length < 3) return null;
  return {
    schema: 'qdis.meals/v1',
    source: {title: '청도대원학교 학교생활 > 급식 메뉴', url: MEALS_URL, note: '식단은 식자재 수급 등 사정에 따라 변경될 수 있습니다.'},
    week: {start: days[0].date, end: days[days.length - 1].date},
    fetched_at: new Date().toISOString(),
    days,
  };
}

/** 게시판 목록 → [{board, no, title, date, url}] */
export function parseBoardList(html, boardId) {
  const out = new Map();
  const re = new RegExp(`<a[^>]+href=["']([^"']*id=${boardId}[^"']*?no=(\\d+)[^"']*)["'][^>]*>([\\s\\S]*?)<\\/a>`, 'gi');
  for (const m of html.matchAll(re)) {
    const no = Number(m[2]);
    const title = text(m[3]).replace(/\s+/g, ' ').trim();
    if (!title || title.length < 2) continue;
    // 링크 뒤 300자 안에서 날짜 찾기
    const tail = html.slice(m.index, m.index + m[0].length + 600);
    const d = tail.match(/(20\d{2})[.\-/](\d{2})[.\-/](\d{2})/);
    const prev = out.get(no);
    if (!prev || title.length > prev.title.length) {
      out.set(no, {board: boardId, no, title, date: d ? `${d[1]}-${d[2]}-${d[3]}` : prev?.date ?? null, url: `${QDIS}/board/index.html?id=${boardId}&no=${no}`});
    }
  }
  return [...out.values()].sort((a, b) => b.no - a.no);
}

// 한국 학부모 관점 중요도 분류
const HIGH = [/AP|SAT|TOEFL|AMC|시험센터|test center/i, /입학|모집|원서|편입|설명회|입시/, /장학/, /학비|교육비|수업료/, /학사|일정|달력|방학|개학/, /교육과정|커리큘럼|과정 개편|신설/, /합격|진학|대학/, /학교생활안내|일과|기숙사|생활관/, /수상|award|MUN|WSC/i];
const LOW = [/납부|고지서|제반경비|영수증/, /준비물|교복|동복|하복|생활복|체육복/, /채용|구인/, /설문|만족도/, /급식|식단/, /재공지|정정/];

export function classify(post) {
  const t = post.title;
  const hi = HIGH.filter(r => r.test(t)).length;
  const lo = LOW.filter(r => r.test(t)).length;
  const score = hi * 2 - lo * 2 + (post.board === 'board3' ? 2 : 0) + (post.board === 'board1' ? 2 : 0);
  const category = post.board === 'board3' || /합격|진학/.test(t) ? 'university'
    : /입학|모집|원서|편입|설명회|장학|학비|교육비/.test(t) ? 'admissions'
    : /AP|SAT|TOEFL|교육과정|시험|학사|일정/.test(t) ? 'academic' : 'life';
  return {score, relevant: score >= 2, category};
}

/** 진학정보 제목에서 대학·국가·과정을 추정 (검토용 후보) */
const UNI_COUNTRY = [[/서울대|연세|고려|성균관|한양|서강|중앙|경희|이화|KAIST|카이스트|포스텍|POSTECH|한국외|건국|동국|홍익/, 'KR'], [/홍콩|HKU|HKUST|CUHK|City ?U/i, 'HK'], [/싱가포르|NUS|NTU/i, 'SG'], [/Waseda|Keio|와세다|게이오|도쿄|Tokyo/i, 'JP'], [/Monash|Melbourne|Sydney|UNSW|호주/i, 'AU'], [/Toronto|UBC|McGill|토론토|캐나다/i, 'CA'], [/London|UCL|Imperial|King's|Manchester|Liverpool|Sunderland|영국/i, 'UK'], [/칭화|북경|베이징|Peking|Tsinghua|Fudan|Zhejiang|Duke Kunshan/i, 'CN'], [/UC |Berkeley|UCLA|NYU|Columbia|Penn|Harvard|Stanford|MIT|Cornell|Purdue|Illinois|Michigan|Johns Hopkins|USC|미국/i, 'US']];
export function extractOffer(post) {
  const t = post.title.replace(/^\[.*?\]\s*/, '');
  const country = UNI_COUNTRY.find(([r]) => r.test(t))?.[1] ?? null;
  const level = /석사|박사|대학원|master|ph\.?d/i.test(t) ? 'graduate' : 'undergraduate';
  const program = t.match(/(\d{4}학년도\s*(전기|후기|수시|정시)?|의과대학|[가-힣]+학과|[가-힣]+학부)/)?.[0] ?? null;
  const university = t.replace(/합격.*$/, '').replace(program ?? '', '').replace(/[-–·(\s]+$/, '').trim();
  return {academic_year: null, country, university, program, level, result_type: level === 'graduate' ? 'alumni_graduate_offer' : 'individual_offer', offer_count: 1, source_url: post.url, source_post_id: post.no, source_date: post.date, verified: false};
}
