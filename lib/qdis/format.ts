import site from '@/data/site.json';

export const FX = site.fx;
const nf = new Intl.NumberFormat('ko-KR');
export const fmt = (n: number) => nf.format(Math.round(n));
export const cny = (n: number) => `${fmt(n)} 위안`;

/** 원화 환산 (참고용): 약 ₩37,596,000 — 천 원 단위 반올림 */
export function krw(n: number, rate: number = FX.cny_krw) {
  return `약 ₩${fmt(Math.round((n * rate) / 1000) * 1000)}`;
}

/** 환율 안내 문구 — 값은 data/site.json 한 곳에서 관리 */
export function fxLabel() {
  return {rate: `1 CNY = ${FX.cny_krw} KRW`, date: FX.as_of.replaceAll('-', '.')};
}

export function koDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${y}.${String(m).padStart(2, '0')}.${String(d).padStart(2, '0')}`;
}

export function academicYearLabel(y: string) {
  return y.replace('-', '–');
}
