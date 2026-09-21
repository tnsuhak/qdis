import site from '@/data/site.json';

export const FX = site.fx;
const nf = new Intl.NumberFormat('ko-KR');
export const fmt = (n: number) => nf.format(Math.round(n));
export const cny = (n: number) => `${fmt(n)} 위안`;

/** 원화 환산: 만원 단위 반올림 */
export function krw(n: number, rate: number = FX.cny_krw) {
  const won = n * rate;
  if (won >= 100_000_000) {
    const eok = Math.floor(won / 100_000_000);
    const man = Math.round((won % 100_000_000) / 10_000);
    return `약 ${eok}억${man ? ` ${fmt(man)}만` : ''}원`;
  }
  return `약 ${fmt(Math.round(won / 10_000))}만원`;
}

export function koDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${y}.${String(m).padStart(2, '0')}.${String(d).padStart(2, '0')}`;
}

export function academicYearLabel(y: string) {
  return y.replace('-', '–');
}
