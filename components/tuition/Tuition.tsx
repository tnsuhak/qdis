import {useMemo, useState} from 'react';
import {calcFees, eligibleScholarships, livingOptions, FEES, bandLabel, CLP_NEW_GRADES, type Program} from '@/lib/qdis/fees';
import {fmt, krw, fxLabel} from '@/lib/qdis/format';

const GRADES = Array.from({length: 12}, (_, i) => i + 1);

export function FeeCalculator() {
  const [program, setProgram] = useState<Program>('GLP');
  const [grade, setGrade] = useState(9);
  const [living, setLiving] = useState<'board' | 'day'>('board');
  const [newStudent, setNewStudent] = useState(true);
  const [bus, setBus] = useState(false);
  const [siblings, setSiblings] = useState(false);
  const [sch, setSch] = useState<string[]>([]);

  const opts = livingOptions(grade);
  const effLiving = opts.includes(living) ? living : opts[0];
  const eligible = useMemo(() => new Set(eligibleScholarships(grade, newStudent).map((s: any) => s.id)), [grade, newStudent]);
  const res = calcFees({program, grade, boarding: effLiving === 'board', newStudent, bus, siblingsEnrollTogether: siblings, scholarshipIds: sch});

  const toggle = (id: string) => setSch(cur => {
    if (cur.includes(id)) return cur.filter(x => x !== id);
    const group = id.startsWith('promo') ? 'promo' : id.startsWith('english') ? 'english' : null;
    return [...cur.filter(x => !group || !x.startsWith(group)), id];
  });

  const pickGrade = (g: number) => {
    setGrade(g);
    if (program === 'CLP' && g < 6) setProgram('GLP');
  };

  return (
    <div className="calc">
      <div>
        <div className="calc-step">
          <div className="lab">1. 과정</div>
          <div className="seg" role="group" aria-label="과정">
            <button type="button" aria-pressed={program === 'GLP'} onClick={() => setProgram('GLP')}>GLP 국제반</button>
            <button type="button" aria-pressed={program === 'CLP'} disabled={grade < 6} onClick={() => setProgram('CLP')}>CLP 중국유학반</button>
          </div>
        </div>
        <div className="calc-step">
          <div className="lab">2. 학년 (2026–27 기준) <small>{bandLabel[res.ok ? res.band : 'g1-3']} 요금 구간</small></div>
          <div className="seg grades" role="group" aria-label="학년">
            {GRADES.map(g => (
              <button key={g} type="button" aria-pressed={grade === g} onClick={() => pickGrade(g)} aria-label={`Grade ${g}`}>G{g}</button>
            ))}
          </div>
          {program === 'CLP' && <p className="small" style={{marginTop: 10}}>CLP 신규 모집: G{CLP_NEW_GRADES[0]}–G{CLP_NEW_GRADES[CLP_NEW_GRADES.length - 1]}</p>}
        </div>
        <div className="calc-step">
          <div className="lab">3. 생활 형태 <small>{grade <= 5 ? '초등은 통학 과정' : grade >= 9 ? 'G9–G12 의무기숙' : 'G6–G8 선택기숙'}</small></div>
          <div className="seg" role="group" aria-label="생활 형태">
            <button type="button" aria-pressed={effLiving === 'board'} disabled={!opts.includes('board')} onClick={() => setLiving('board')}>기숙</button>
            <button type="button" aria-pressed={effLiving === 'day'} disabled={!opts.includes('day')} onClick={() => setLiving('day')}>통학</button>
          </div>
          {effLiving === 'day' && (
            <label className="check" style={{marginTop: 8}}>
              <input type="checkbox" checked={bus} onChange={e => setBus(e.target.checked)} />
              <span><b>통학버스 이용</b><small>성양구 거주 통학생 대상 노선. 그 외 지역은 별도 확인</small></span>
            </label>
          )}
        </div>
        <div className="calc-step">
          <div className="lab">4. 입학 구분</div>
          <div className="seg" role="group" aria-label="입학 구분">
            <button type="button" aria-pressed={newStudent} onClick={() => setNewStudent(true)}>신입생 (입학등록비 포함)</button>
            <button type="button" aria-pressed={!newStudent} onClick={() => setNewStudent(false)}>재학생 진급</button>
          </div>
          {newStudent && (
            <label className="check" style={{marginTop: 8}}>
              <input type="checkbox" checked={siblings} onChange={e => setSiblings(e.target.checked)} />
              <span><b>형제자매 2명 이상 동시 입학</b><small>입학등록비 50%</small></span>
            </label>
          )}
        </div>
        <div className="calc-step">
          <div className="lab">5. 장학금 <small>해당하는 항목만 직접 선택 · 합계 최대 50%</small></div>
          {FEES.scholarships.items.filter((s: any) => eligible.has(s.id)).map((s: any) => (
            <label key={s.id} className="check">
              <input type="checkbox" checked={sch.includes(s.id)} onChange={() => toggle(s.id)} />
              <span><b>{s.name} · 수업료 {s.percent}%</b><small>{s.criteria}</small></span>
            </label>
          ))}
          {newStudent && <p className="small" style={{marginTop: 4}}>진급 장학금은 ‘재학생 진급’을 선택하면 해당 학년에서 고를 수 있습니다.</p>}
          <p className="small" style={{marginTop: 8}}>영어우수 기준표는 <a href="/scholarships#english">장학금 페이지</a>에서 확인하세요. 장학금은 학교 심사로 최종 결정됩니다.</p>
        </div>
        {res.ok && <a className="calc-sticky" href="#receipt"><span>{bandLabel[res.band]} {program} {effLiving === 'board' ? '기숙' : '통학'} {newStudent ? '신입생' : '재학생'}<br />예상 연간 기본 비용</span><b>{fmt(res.total)} CNY</b></a>}
      </div>

      <aside className="receipt" id="receipt" aria-live="polite" aria-label="예상 비용">
        {!res.ok ? (
          <>
            <span className="kicker">확인 필요</span>
            <h3 style={{color: '#fff', fontSize: 22, marginTop: 12}}>{res.reason}</h3>
          </>
        ) : (
          <>
            <span className="kicker">2026–27 예상 기본 연간 비용</span>
            <h3 className="scenario">{bandLabel[res.band]} {program} {effLiving === 'board' ? '기숙' : '통학'} {newStudent ? '신입생' : '재학생'}</h3>
            <p className="small" style={{color: '#8d97a6', marginTop: 4}}>G{grade} 기준{newStudent ? ' · 입학 첫해' : ''}</p>
            <div className="total">{fmt(res.total)}<small>CNY</small></div>
            <div className="krw2">{krw(res.total)}</div>
            <p className="fxbox">원화 환산은 참고용입니다 · 적용 환율 {fxLabel().rate} · 기준일 {fxLabel().date}</p>
            <dl>
              {res.lines.map(l => (
                <div key={l.key}>
                  <dt>{l.label}{l.note && <small>{l.note}</small>}</dt>
                  <dd className={l.amount < 0 ? 'neg' : ''}>{l.amount < 0 ? '−' : ''}{fmt(Math.abs(l.amount))}</dd>
                </div>
              ))}
            </dl>
            <div className="sems">
              <div><span>1학기(9월) 납부</span><b>{fmt(res.semester1)}</b></div>
              <div><span>2학기(3월) 납부</span><b>{fmt(res.semester2)}</b></div>
            </div>
            {res.warnings.map(w => <div className="warn" key={w}>{w}</div>)}
            <p className="excluded">
              <b style={{color: '#fff'}}>포함되지 않은 비용</b><br />
              방과후·Spoarts 수강료, 단체상해보험(연 300위안), 생활예치금(500위안), 생활복·교복, 비자·거류증, 시험 응시료, 항공권, 용돈
            </p>
            <a className="btn light arrow" href={`/consultation?grade=${grade}&program=${program}`}>이 조건으로 상담하기</a>
          </>
        )}
      </aside>
    </div>
  );
}

/** 대표 조건 4가지의 연간 총액 */
export const FEE_EXAMPLES: Array<{label: string; kicker: string; program: Program; grade: number; boarding: boolean}> = [
  {kicker: 'HIGH SCHOOL', label: 'G9–G12 · GLP · 기숙', program: 'GLP', grade: 10, boarding: true},
  {kicker: 'MIDDLE SCHOOL', label: 'G6–G8 · GLP · 기숙', program: 'GLP', grade: 7, boarding: true},
  {kicker: 'CHINA TRACK', label: 'G9–G10 · CLP · 기숙', program: 'CLP', grade: 9, boarding: true},
  {kicker: 'ELEMENTARY', label: 'G4–G5 · GLP · 통학', program: 'GLP', grade: 4, boarding: false},
];

export function FeeExamples() {
  return (
    <div className="fee-cards">
      {FEE_EXAMPLES.map(ex => {
        const r = calcFees({program: ex.program, grade: ex.grade, boarding: ex.boarding, newStudent: true, bus: false, siblingsEnrollTogether: false, scholarshipIds: []});
        if (!r.ok) return null;
        return (
          <a key={ex.label} className="fee-card" href="/tuition">
            <span className="kicker">{ex.kicker}</span>
            <h3>{ex.label}</h3>
            <div className="amt num">{fmt(r.total)}<small>위안</small></div>
            <div className="krw">신입생 첫해 · {krw(r.total)}</div>
            <dl>
              {r.lines.map(l => <div key={l.key}><dt>{l.label.replace(/\s*\(.*\)/, '')}</dt><dd>{fmt(l.amount)}</dd></div>)}
            </dl>
          </a>
        );
      })}
    </div>
  );
}

export function TuitionTable() {
  const t = FEES.tuition_per_semester as any;
  const o = FEES.other_fees as any;
  const bands = ['g1-3', 'g4-5', 'g6-8', 'g9-12'];
  const cell = (v: number | null) => (v == null ? '–' : fmt(v));
  return (
    <div className="table-wrap">
      <table className="data-table">
        <caption className="sr-only">2026–27 학기당 교육비 (단위: 위안)</caption>
        <thead>
          <tr><th scope="col">항목 (학기 기준, 위안)</th>{bands.map(b => <th scope="col" className="n" key={b}>{bandLabel[b as keyof typeof bandLabel]}</th>)}<th scope="col">납부</th></tr>
        </thead>
        <tbody>
          <tr><th scope="row">수업료 · GLP 국제반</th>{bands.map(b => <td className="n" key={b}>{cell(t.GLP[b])}</td>)}<td>학기납</td></tr>
          <tr><th scope="row">수업료 · CLP 중국유학반</th>{bands.map(b => <td className="n" key={b}>{cell(t.CLP[b])}</td>)}<td>학기납</td></tr>
          <tr><th scope="row">생활관비 (기숙)</th>{bands.map(b => <td className="n" key={b}>{cell(o.residence.amounts[b])}</td>)}<td>학기납</td></tr>
          <tr><th scope="row">급식비 (통학)</th>{bands.map(b => <td className="n" key={b}>{cell(o.meals_day.amounts[b])}</td>)}<td>학기납</td></tr>
          <tr><th scope="row">통학차량비 (통학)</th>{bands.map(b => <td className="n" key={b}>{cell(o.bus.amounts[b])}</td>)}<td>학기납</td></tr>
          <tr><th scope="row">교재비</th>{bands.map(b => <td className="n" key={b}>{cell(o.books.amounts[b])}</td>)}<td>연 1회</td></tr>
          <tr><th scope="row">입학등록비</th>{bands.map(b => <td className="n" key={b}>{cell(o.registration.amounts[b])}</td>)}<td>최초 입학 1회</td></tr>
        </tbody>
      </table>
    </div>
  );
}
