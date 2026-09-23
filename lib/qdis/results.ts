import annual from '@/data/university-results/annual.json';
import latest from '@/data/university-results/latest-offers.json';
import alumni from '@/data/university-results/alumni.json';

export type ResultEntry = {
  academic_year: string; country: string; country_ko: string; university: string; program: string | null;
  level: 'undergraduate' | 'graduate'; result_type: string; offer_count: number;
  source_url: string; source_post_id: number | null; source_date: string; verified: boolean; note?: string | null;
};
export type AnnualYear = {
  academic_year: string; label: string; cohort: string | null; as_of: string | null; total_offers: number | null;
  detail: 'table' | 'image_only'; source_url: string; source_post_id: number; source_date: string; source_image: string;
  entries: ResultEntry[];
};

export const ANNUAL = annual.years as AnnualYear[];
export const LATEST = latest.entries as ResultEntry[];
export const ALUMNI = alumni.entries as ResultEntry[];
export const LATEST_COVERS = latest.covers;
export const RESULTS_VERIFIED_ON = annual.verified_on;

export const COUNTRY_ORDER = ['KR', 'US', 'HK', 'SG', 'CN', 'JP', 'CA', 'UK', 'AU', 'TW', 'AE', 'QA', 'NL', 'VN'];
export const COUNTRY_KO: Record<string, string> = {
  KR: '한국', US: '미국', HK: '홍콩', SG: '싱가포르', CN: '중국', JP: '일본', CA: '캐나다', UK: '영국', AU: '호주', TW: '대만', AE: 'UAE', QA: '카타르', NL: '네덜란드', VN: '베트남',
};

export function yearByKey(y: string) { return ANNUAL.find(a => a.academic_year === y)!; }

export function countryTotals(entries: ResultEntry[]) {
  const m = new Map<string, number>();
  for (const e of entries) m.set(e.country, (m.get(e.country) ?? 0) + e.offer_count);
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
}

/** 상세표가 있는 연도들의 누적 합격 건수 */
export function cumulative() {
  const years = ANNUAL.filter(y => y.detail === 'table');
  const entries = years.flatMap(y => y.entries);
  const total = entries.reduce((a, e) => a + e.offer_count, 0);
  return { years, total, byCountry: countryTotals(entries) };
}

const ALIAS: Array<[RegExp, string, string]> = [
  [/^(university of california,? |uc )berkeley/i, 'UC Berkeley', 'US'],
  [/^(university of california,? |uc )los angeles|ucla/i, 'UCLA', 'US'],
  [/^(university of california,? |uc )davis/i, 'UC Davis', 'US'],
  [/^(university of california,? |uc )irvine/i, 'UC Irvine', 'US'],
  [/^(university of california,? |uc )san diego/i, 'UC San Diego', 'US'],
  [/^(university of california,? |uc )santa barbara/i, 'UC Santa Barbara', 'US'],
  [/^(university of california,? |uc )santa cruz/i, 'UC Santa Cruz', 'US'],
  [/^(university of california,? |uc )riverside/i, 'UC Riverside', 'US'],
  [/hong kong university of science|hkust/i, '홍콩과기대 HKUST', 'HK'],
  [/chinese university of hong kong|cuhk/i, '홍콩중문대 CUHK', 'HK'],
  [/city university of hong kong|cityu/i, '홍콩시티대 CityU', 'HK'],
  [/university of hong kong|^hku/i, '홍콩대 HKU', 'HK'],
  [/national university of singapore|^nus/i, '싱가포르국립대 NUS', 'SG'],
  [/new york university abu dhabi|nyu abu dhabi/i, 'NYU Abu Dhabi', 'AE'],
  [/new york university|^nyu/i, 'New York University', 'US'],
  [/penn(sylvania)? state/i, 'Penn State', 'US'],
  [/duke kunshan/i, 'Duke Kunshan University', 'CN'],
  [/waseda/i, '와세다대 Waseda', 'JP'],
  [/keio/i, '게이오대 Keio', 'JP'],
  [/university of toronto/i, 'University of Toronto', 'CA'],
  [/illinois (at |)urbana/i, 'UIUC', 'US'],
  [/purdue/i, 'Purdue University', 'US'],
  [/michigan state/i, 'Michigan State University', 'US'],
  [/emory/i, 'Emory University', 'US'],
];

/** 표시용 이름: 한국어 대학은 한글, 해외 대학은 영문 약칭 */
export function canonical(e: { university: string; country: string }) {
  const n = e.university.trim();
  const ko = n.match(/\(([가-힣][^)]*)\)/)?.[1];
  if (e.country === 'KR') {
    if (/^[가-힣]/.test(n)) return n.replace(/\s*\(의과대학\)/, ' 의대').trim();
    return (ko ?? n).trim();
  }
  for (const [re, name] of ALIAS) if (re.test(n)) return name;
  return n.replace(/\s*\(.*?\)\s*/g, ' ').replace(/^The /, '').trim();
}

export function splitName(n: string) {
  const m = n.match(/^(.*?)\s*\((.*)\)\s*$/);
  if (!m) return { primary: n, secondary: '' };
  const [, a, b] = m;
  return /[가-힣]/.test(b) ? { primary: b, secondary: a } : { primary: a, secondary: b };
}

/** 연도별 종합표 누적 기준 상위 대학 */
export function topUniversities(filter?: (e: ResultEntry) => boolean, limit = 12) {
  const m = new Map<string, { name: string; count: number; country: string; years: Set<string> }>();
  for (const y of ANNUAL) for (const e of y.entries) {
    if (filter && !filter(e)) continue;
    const k = canonical(e);
    const cur = m.get(k) ?? { name: k, count: 0, country: e.country, years: new Set<string>() };
    cur.count += e.offer_count; cur.years.add(e.academic_year); m.set(k, cur);
  }
  return [...m.values()].sort((a, b) => b.count - a.count || b.years.size - a.years.size).slice(0, limit);
}
