import fees from '@/data/admissions/fees-2026-27.json';

export type Program = 'GLP' | 'CLP';
export type BandId = 'g1-3' | 'g4-5' | 'g6-8' | 'g9-12';

export const FEES = fees;

export function bandOf(grade: number): BandId {
  if (grade <= 3) return 'g1-3';
  if (grade <= 5) return 'g4-5';
  if (grade <= 8) return 'g6-8';
  return 'g9-12';
}

export const bandLabel: Record<BandId, string> = {
  'g1-3': 'G1–G3', 'g4-5': 'G4–G5', 'g6-8': 'G6–G8', 'g9-12': 'G9–G12',
};

export type FeeInput = {
  program: Program;
  grade: number;
  boarding: boolean;
  newStudent: boolean;
  bus: boolean;
  siblingsEnrollTogether: boolean;
  scholarshipIds: string[];
};

export type FeeLine = { key: string; label: string; amount: number; note?: string };

export type FeeResult =
  | { ok: false; reason: string }
  | {
      ok: true;
      band: BandId;
      total: number;
      semester1: number;
      semester2: number;
      lines: FeeLine[];
      tuitionYear: number;
      scholarshipPercent: number;
      scholarshipCapped: boolean;
      warnings: string[];
    };

/** CLP 신규 모집 학년: 2026–27 모집요강 기준 G6~G10 */
export const CLP_NEW_GRADES = [6, 7, 8, 9, 10];

export function livingOptions(grade: number): Array<'board' | 'day'> {
  if (grade <= 5) return ['day'];
  if (grade >= 9) return ['board'];
  return ['board', 'day'];
}

export function eligibleScholarships(grade: number, newStudent: boolean) {
  return fees.scholarships.items.filter((s: any) => {
    if (s.continuing_only && newStudent) return false;
    if (s.grades && !s.grades.includes(grade)) return false;
    return true;
  });
}

export function calcFees(input: FeeInput): FeeResult {
  const band = bandOf(input.grade);
  const sem = (fees.tuition_per_semester as any)[input.program][band] as number | null;
  if (sem == null) {
    return { ok: false, reason: 'CLP(중국유학반)는 G6부터 운영합니다. 초등은 GLP 과정만 있습니다.' };
  }
  const warnings: string[] = [];
  if (input.program === 'CLP' && input.newStudent && !CLP_NEW_GRADES.includes(input.grade)) {
    warnings.push('2026–27 모집요강에서 CLP 신규 모집은 G6~G10입니다. G11~G12 금액은 재학생 진급 기준입니다.');
  }
  const o = fees.other_fees as any;
  const boarding = input.grade >= 9 ? true : input.grade <= 5 ? false : input.boarding;
  const tuitionYear = sem * 2;

  const eligible = new Set(eligibleScholarships(input.grade, input.newStudent).map((s: any) => s.id));
  const chosen = fees.scholarships.items.filter((s: any) => input.scholarshipIds.includes(s.id) && eligible.has(s.id));
  // 같은 계열(진급, 영어우수)은 가장 높은 1개만 인정
  const byGroup = new Map<string, number>();
  for (const s of chosen as any[]) {
    const g = s.id.startsWith('promo') ? 'promo' : s.id.startsWith('english') ? 'english' : s.id;
    byGroup.set(g, Math.max(byGroup.get(g) ?? 0, s.percent));
  }
  const rawPct = [...byGroup.values()].reduce((a, b) => a + b, 0);
  const cap = fees.scholarships.cap_percent_of_tuition;
  const pct = Math.min(rawPct, cap);
  const discountYear = Math.round((tuitionYear * pct) / 100);

  const books = o.books.amounts[band] as number;
  const residenceSem = boarding ? (o.residence.amounts[band] as number) : 0;
  const mealsSem = !boarding ? (o.meals_day.amounts[band] as number) : 0;
  const busSem = !boarding && input.bus ? (o.bus.amounts[band] as number) : 0;
  const regBase = o.registration.amounts[band] as number;
  const registration = input.newStudent ? (input.siblingsEnrollTogether ? regBase / 2 : regBase) : 0;

  const lines: FeeLine[] = [
    { key: 'tuition', label: `수업료 (${sem.toLocaleString('ko-KR')} × 2학기)`, amount: tuitionYear },
  ];
  if (discountYear) lines.push({ key: 'scholarship', label: `장학금 (수업료의 ${pct}%)`, amount: -discountYear });
  if (boarding) lines.push({ key: 'residence', label: `생활관비 (${residenceSem.toLocaleString('ko-KR')} × 2학기)`, amount: residenceSem * 2, note: '기숙사 식사 포함' });
  if (!boarding) lines.push({ key: 'meals', label: `급식비 (${mealsSem.toLocaleString('ko-KR')} × 2학기)`, amount: mealsSem * 2 });
  if (busSem) lines.push({ key: 'bus', label: `통학차량비 (${busSem.toLocaleString('ko-KR')} × 2학기)`, amount: busSem * 2 });
  lines.push({ key: 'books', label: '교재비 (연 1회)', amount: books });
  if (registration) lines.push({ key: 'registration', label: `입학등록비 (최초 1회${input.siblingsEnrollTogether ? ', 형제 동시입학 50%' : ''})`, amount: registration });

  const total = lines.reduce((a, l) => a + l.amount, 0);
  const semesterRecurring = sem - discountYear / 2 + residenceSem + mealsSem + busSem;
  const semester1 = semesterRecurring + books + registration;
  const semester2 = semesterRecurring;
  if (rawPct > cap) warnings.push(`선택한 장학금 합계 ${rawPct}%는 상한 50%로 조정했습니다.`);
  return { ok: true, band, total, semester1, semester2, lines, tuitionYear, scholarshipPercent: pct, scholarshipCapped: rawPct > cap, warnings };
}
