import {useMemo, useState} from 'react';
import {ANNUAL, LATEST, ALUMNI, LATEST_COVERS, COUNTRY_KO, COUNTRY_ORDER, countryTotals, topUniversities, canonical, splitName, type ResultEntry} from '@/lib/qdis/results';
import {koDate, academicYearLabel} from '@/lib/qdis/format';

const LATEST_OFFER_LABELS: Record<string, string> = {
  '서강대학교': '서강대학교 합격',
  '중앙대학교': '중앙대학교 합격',
  'Liverpool John Moores University': '영국 LJMU 약대 합격',
  'National University of Singapore (NUS)': '싱가포르 국립대학교(NUS) 합격',
  '성균관대학교': '성균관대학교 합격',
  '연세대학교': '연세대학교 합격',
  '건국대학교': '건국대학교 합격',
  '한양대학교': '한양대학교 합격',
  '경희대학교': '경희대학교 합격',
  '고려대학교': '고려대학교 합격',
};

/** 홈·결과 페이지 공용: 최근 개별 합격 소식 */
export function LatestOffers({limit = 12, dark = true}: {limit?: number; dark?: boolean}) {
  const rows = LATEST.slice(0, limit);
  return (
    <div className="offer-board" style={dark ? undefined : {borderColor: 'var(--line)'}}>
      {rows.map((e, i) => (
        <div className="offer-row" key={i} style={dark ? undefined : {borderColor: 'var(--line)'}}>
          <time dateTime={e.source_date}>{koDate(e.source_date)}</time>
          <div>
            <b>{LATEST_OFFER_LABELS[e.university] ?? e.university}</b>
            {e.program && <small>{e.program}</small>}
          </div>
          <span className="ctry">{e.country_ko}</span>
        </div>
      ))}
    </div>
  );
}

export function OfferDefinition() {
  return (
    <div className="notice">
      <b>숫자는 합격 건수(Offers)입니다.</b>
      한 학생의 복수 합격이 포함되며, 학생 수·최종 진학 인원과 다릅니다.
    </div>
  );
}

/** 연도 선택 + 국가별 막대 + 주요 대학 */
export function YearExplorer({compact = false}: {compact?: boolean}) {
  const years = ANNUAL;
  const [key, setKey] = useState(years[0].academic_year);
  const y = years.find(v => v.academic_year === key)!;
  const byCountry = countryTotals(y.entries);
  const max = byCountry[0]?.[1] ?? 1;
  const top = [...y.entries].sort((a, b) => b.offer_count - a.offer_count).slice(0, compact ? 14 : 20);
  return (
    <div>
      <div className="year-tabs" role="tablist" aria-label="학년도 선택">
        {years.map(v => (
          <button key={v.academic_year} role="tab" aria-selected={v.academic_year === key} onClick={() => setKey(v.academic_year)} type="button">
            {academicYearLabel(v.academic_year)}{v.cohort ? ` · ${v.cohort}` : ''}
          </button>
        ))}
      </div>
      {y.detail === 'table' ? (
        <div className="year-panel" role="tabpanel">
          <div>
            <p className="kicker" style={{marginBottom: 10}}>{academicYearLabel(y.academic_year)} 대입결과</p>
            <div className="big-count">{y.total_offers}<small>건</small></div>
            <p className="count-note">{y.cohort ? `${y.cohort} 공식 종합표 · ${koDate(y.as_of!)} 기준` : `공식 종합표 · ${koDate(y.source_date)} 게시`}</p>
            <p className="source">자료 출처 · <a href={y.source_url} target="_blank" rel="noopener noreferrer">학교 공지 원문</a></p>
          </div>
          <div>
            <ul className="bars" aria-label="국가·지역별 합격 건수">
              {byCountry.map(([c, n]) => (
                <li key={c}>
                  <b>{COUNTRY_KO[c] ?? c}</b>
                  <span className="track"><span className="fill" style={{width: `${(n / max) * 100}%`}} /></span>
                  <span className="n">{n}</span>
                </li>
              ))}
            </ul>
            <div className="uni-cloud" aria-label="대학별 합격 건수">
              {top.map((e, i) => <span key={i}>{canonical(e)}{e.offer_count > 1 && <b>{e.offer_count}</b>}</span>)}
              {y.entries.length > top.length && <span className="small">외 {y.entries.length - top.length}개 대학</span>}
            </div>
          </div>
        </div>
      ) : (
        <div className="image-only" role="tabpanel">
          <div>
            <p className="lede" style={{marginTop: 0}}>{academicYearLabel(y.academic_year)} 결과는 학교가 표 이미지로 게시했습니다. 이미지에 없는 정보를 임의로 옮겨 적지 않고 원본을 그대로 보여 드립니다.</p>
            <p className="source">자료 출처 · <a href={y.source_url} target="_blank" rel="noopener noreferrer">학교 게시판 원문</a></p>
          </div>
          <img src={y.source_image} alt={`${academicYearLabel(y.academic_year)} 청도대원학교 대학진학 현황 원본 이미지`} loading="lazy" />
        </div>
      )}
    </div>
  );
}

type Dataset = 'annual' | 'latest' | 'alumni';

/** 결과 페이지: 검색·필터 테이블 */
export function ResultsTable() {
  const [dataset, setDataset] = useState<Dataset>('annual');
  const [year, setYear] = useState('all');
  const [country, setCountry] = useState('all');
  const [q, setQ] = useState('');
  const [limit, setLimit] = useState(30);

  const base: ResultEntry[] = useMemo(() => {
    if (dataset === 'latest') return LATEST;
    if (dataset === 'alumni') return ALUMNI;
    return ANNUAL.flatMap(y => y.entries);
  }, [dataset]);

  const countries = useMemo(() => {
    const set = new Set(base.map(e => e.country));
    return COUNTRY_ORDER.filter(c => set.has(c));
  }, [base]);

  const rows = base.filter(e =>
    (dataset !== 'annual' || year === 'all' || e.academic_year === year) &&
    (country === 'all' || e.country === country) &&
    (!q || `${e.university} ${canonical(e)} ${e.program ?? ''}`.toLowerCase().includes(q.trim().toLowerCase()))
  );
  const offers = rows.reduce((a, e) => a + e.offer_count, 0);
  const reset = () => { setYear('all'); setCountry('all'); setQ(''); setLimit(30); };

  return (
    <div>
      <div className="chip-row" role="group" aria-label="자료 구분" style={{marginBottom: 22}}>
        {([['annual', '연도별 종합표 (학부)'], ['latest', `최신 개별 합격 게시물 (${LATEST.length})`], ['alumni', `졸업생 대학원 (${ALUMNI.length})`]] as Array<[Dataset, string]>).map(([k, l]) => (
          <button key={k} type="button" className="chip" aria-pressed={dataset === k} onClick={() => { setDataset(k); reset(); }}>{l}</button>
        ))}
      </div>
      <div className="filters">
        {dataset === 'annual' && (
          <div className="field">
            <label htmlFor="f-year">학년도</label>
            <select id="f-year" value={year} onChange={e => setYear(e.target.value)}>
              <option value="all">전체 학년도</option>
              {ANNUAL.filter(y => y.detail === 'table').map(y => <option key={y.academic_year} value={y.academic_year}>{academicYearLabel(y.academic_year)}{y.cohort ? ` (${y.cohort})` : ''}</option>)}
            </select>
          </div>
        )}
        <div className="field">
          <label htmlFor="f-country">국가·지역</label>
          <select id="f-country" value={country} onChange={e => setCountry(e.target.value)}>
            <option value="all">전체 국가</option>
            {countries.map(c => <option key={c} value={c}>{COUNTRY_KO[c]}</option>)}
          </select>
        </div>
        <div className="field" style={{gridColumn: dataset === 'annual' ? 'span 2' : 'span 3'}}>
          <label htmlFor="f-q">대학 검색</label>
          <input id="f-q" type="search" placeholder="예: 연세, HKU, UC, 의과대학" value={q} onChange={e => setQ(e.target.value)} />
        </div>
      </div>
      <div className="result-meta">
        <b>
          {dataset === 'annual' && <>{rows.length}개 항목 · 합격 {offers}건</>}
          {dataset === 'latest' && <>개별 합격 게시물 {rows.length}건</>}
          {dataset === 'alumni' && <>졸업생 대학원 합격 {rows.length}건</>}
        </b>
        <span className="small">
          {dataset === 'annual' && '학교 공식 연도별 공지 기준 · 2017–2020 결과는 이미지 원본으로 제공'}
          {dataset === 'latest' && `${koDate(LATEST_COVERS.from)}–${koDate(LATEST_COVERS.to)} 학교 진학정보 게시판 · 연도별 합계와 합산하지 않음`}
          {dataset === 'alumni' && '졸업생의 대학원(석사) 합격 · 학부 결과와 별도'}
        </span>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">{dataset === 'annual' ? '학년도' : '게시일'}</th>
              <th scope="col">국가</th>
              <th scope="col">대학 · 과정</th>
              <th scope="col" className="n">{dataset === 'annual' ? '합격 건수' : '구분'}</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, limit).map((e, i) => {
              const n = splitName(e.university);
              return (
                <tr key={i}>
                  <td className="num">{dataset === 'annual' ? academicYearLabel(e.academic_year) : koDate(e.source_date)}</td>
                  <td>{e.country_ko}</td>
                  <td><b>{n.primary}</b>{n.secondary && <span className="sub">{n.secondary}</span>}{e.program && <span className="sub">{e.program}{e.note ? ` · ${e.note}` : ''}</span>}</td>
                  <td className="n">{dataset === 'annual' ? `${e.offer_count}건` : dataset === 'alumni' ? '대학원' : '학부'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length > limit && (
          <div className="more-row"><button type="button" className="btn ghost" onClick={() => setLimit(l => l + 60)}>{rows.length - limit}개 더 보기</button></div>
        )}
        {rows.length === 0 && (
          <div className="empty">
            <p>조건에 맞는 결과가 없습니다.</p>
            <button className="btn ghost" type="button" onClick={reset}>필터 초기화</button>
          </div>
        )}
      </div>
      <p className="source">출처: 청도대원학교 공식 진학정보 게시판</p>
    </div>
  );
}

export function TopUniversityList({country, limit = 10}: {country: string; limit?: number}) {
  const list = topUniversities(e => e.country === country, limit);
  return (
    <ol className="ruled" style={{counterReset: 'u'}}>
      {list.map(u => (
        <li key={u.name} style={{gridTemplateColumns: 'minmax(0,1fr) auto', padding: '14px 0'}}>
          <b>{u.name}</b>
          <span className="num small">{u.count}건 · {u.years.size}개 학년도</span>
        </li>
      ))}
    </ol>
  );
}
