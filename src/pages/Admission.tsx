import {useMemo, useState} from 'react';
import {PageHead, SecHead, Source, TLink, Toc, CtaBand} from '@/components/common/ui';
import {FeeCalculator, TuitionTable} from '@/components/tuition/Tuition';
import {NewsList} from '@/components/news/News';
import {ConsultForm, Channels} from '@/components/common/Consult';
import {FEES} from '@/lib/qdis/fees';
import {FX} from '@/lib/qdis/format';
import faq from '@/data/faq/faq.json';

export function TuitionPage() {
  return (
    <>
      <PageHead crumb="학비 계산기" eyebrow="Tuition Calculator" title={<>1년에 얼마인지,<br />총액부터 계산합니다</>}
        lede="2026–27 모집요강 기준입니다. 과정·학년·기숙 여부·입학 구분을 고르고, 해당하는 장학금만 직접 체크하세요. 수업료·생활관비는 학기마다, 교재비는 1년에 한 번 냅니다." />
      <section className="section white">
        <div className="wrap"><FeeCalculator /></div>
      </section>
      <section className="section" id="table">
        <div className="wrap">
          <SecHead eyebrow="Official Fee Table" title="2026–27 교육비 원표" lede="모집요강의 학기 기준 금액 그대로입니다. G9–G12 GLP 수업료는 학기당 69,000위안, 연 138,000위안입니다." />
          <TuitionTable />
          <ul className="note-list">
            {FEES.notes.map(n => <li key={n}>{n}</li>)}
            <li>입학등록비는 최초 입학 때 한 번만 내며, 본교 초등·중등을 마치고 진급할 때는 다시 내지 않습니다. 두 자녀 이상 동시 입학 시 50%입니다.</li>
          </ul>
          <Source href={FEES.source.pdf}>{FEES.source.title} (단위: 위안)</Source>
        </div>
      </section>
      <section className="section white">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow">Other Costs</span>
              <h2 className="h2">계산기에 넣지 않은<br />별도 비용</h2>
              <p className="lede" style={{marginTop: 18}}>학기 초 개인별 ‘제반경비’ 고지서로 청구되는 항목입니다. 선택하는 강좌와 상황에 따라 달라서 총액에 넣지 않았습니다.</p>
            </div>
            <div className="table-wrap">
              <table className="data-table">
                <thead><tr><th>항목</th><th className="n">금액 (위안)</th><th>기준</th></tr></thead>
                <tbody>
                  {FEES.extras_reference.map((x: any) => (
                    <tr key={x.label}><th scope="row">{x.label}</th><td className="n">{x.amount ? x.amount.toLocaleString('ko-KR') : `${x.amount_range[0].toLocaleString('ko-KR')}–${x.amount_range[1].toLocaleString('ko-KR')}`}</td><td>{x.unit}<span className="sub">{x.source}</span></td></tr>
                  ))}
                  <tr><th scope="row">항공권 · 용돈 · 교복(한국 지정업체)</th><td className="n">개인별</td><td>–</td></tr>
                </tbody>
              </table>
              <p className="source">{FX.note}</p>
            </div>
          </div>
        </div>
      </section>
      <CtaBand title="장학금 해당 여부가 헷갈린다면" text="형제 재학, 진급, TOEFL 점수와 특례 구분을 알려 주시면 적용 가능한 장학금을 확인해 드립니다." secondary={{href: '/scholarships', label: '장학금 기준'}} />
    </>
  );
}

export function ScholarshipsPage() {
  const s = FEES.scholarships;
  const e = s.english_thresholds;
  return (
    <>
      <PageHead crumb="장학금" eyebrow="Scholarships 2026–27" title={<>수업료의 최대 50%,<br />다섯 가지 장학금</>}
        lede="동문·두자녀·다자녀·진급·영어우수 장학금이 있습니다. 여러 개를 함께 받을 수 있지만 합계는 원수업료의 50%를 넘을 수 없고, 수업료에만 적용됩니다." />
      <section className="section white">
        <div className="wrap">
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>장학금</th><th>대상</th><th className="n">수업료 감면</th><th>기준</th></tr></thead>
              <tbody>
                {s.items.map((i: any) => <tr key={i.id}><th scope="row">{i.name}</th><td>{i.target}</td><td className="n">{i.percent}%</td><td>{i.criteria}</td></tr>)}
              </tbody>
            </table>
          </div>
          <ul className="note-list">{s.rules.map(r => <li key={r}>{r}</li>)}</ul>
        </div>
      </section>
      <section className="section" id="english">
        <div className="wrap">
          <SecHead eyebrow="English Excellence" title="영어우수 장학금 TOEFL 기준" lede="특례 구분(12년 특례 / 그 외)과 학년에 따라 기준 점수가 다릅니다. TOEIC·IELTS·TEPS는 아래 환산표를 적용합니다." />
          <div className="cols-2">
            <div className="table-wrap">
              <table className="data-table">
                <caption className="sr-only">TOEFL iBT 기준</caption>
                <thead><tr><th>구분</th><th>감면</th>{e.columns.map(c => <th key={c} className="n">{c}</th>)}</tr></thead>
                <tbody>{e.rows.map((r, i) => <tr key={i}><th scope="row">{r.group}</th><td>{r.level}</td>{r.scores.map((v, j) => <td key={j} className="n">{v}+</td>)}</tr>)}</tbody>
              </table>
            </div>
            <div className="table-wrap">
              <table className="data-table">
                <caption className="sr-only">공인영어 환산표</caption>
                <thead><tr><th className="n">TOEFL iBT</th><th className="n">TOEIC</th><th className="n">IELTS</th><th className="n">NEW TEPS</th></tr></thead>
                <tbody>{e.conversion.map(c => <tr key={c.toefl}><td className="n">{c.toefl}</td><td className="n">{c.toeic}</td><td className="n">{c.ielts}</td><td className="n">{c.teps}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
          <p className="lede" style={{marginTop: 36}}>예: 3년 특례 대상인 G10 학생이 TOEFL 110점이면 수업료 25%(연 34,500위안) 감면 대상입니다. 115점 이상이면 50%(연 69,000위안)입니다.</p>
          <Source href={FEES.source.pdf}>2026–27학년도 모집요강 Ⅷ. 장학금</Source>
        </div>
      </section>
      <section className="section white">
        <div className="wrap wrap-narrow prose">
          <span className="eyebrow">How to Apply</span>
          <h2 className="h2" style={{marginBottom: 20}}>신청 방법</h2>
          <ul>
            <li>장학금 신청서와 장학생 추천서에 증빙서류(TOEFL 성적표 등)를 첨부해 제출합니다.</li>
            <li>두 가지 이상 받는 경우 정해진 순서로 적용하며, 합계는 원수업료 50%가 상한입니다.</li>
            <li>진급 장학금은 청도대원에서 해당 과정을 이수하고 상급 과정으로 올라가는 재학생에게 적용됩니다.</li>
          </ul>
          <div style={{marginTop: 24}}><TLink href="/tuition">장학금 적용 학비 계산</TLink></div>
        </div>
      </section>
      <CtaBand title="우리 아이가 받을 수 있는 장학금은?" text="성적표와 형제 재학 여부만 알려 주시면 적용 가능성을 확인해 드립니다." />
    </>
  );
}

export function AdmissionsPage() {
  const plan = [['GLP', [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2]], ['CLP', [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0]]] as const;
  return (
    <>
      <PageHead crumb="입학 절차" eyebrow="Admissions 2026–27" title={<>수시 모집, 학년별 선착순.<br />지원부터 입학까지</>}
        lede="원서는 연중 수시로 받고, 학년별 정원이 차면 마감합니다. 학생비자가 필요하면 발급에 2–3개월이 걸리므로 입학 희망 학기보다 넉넉히 먼저 지원하세요." />
      <Toc items={[['plan', '모집 학급'], ['steps', '입학 절차'], ['eligibility', '지원 자격'], ['documents', '제출 서류'], ['visa', '비자·거류증'], ['timing', '지원 시기']]} />
      <section className="section white" id="plan">
        <div className="wrap">
          <SecHead eyebrow="Openings" title="2026–27 모집 학급" lede="GLP는 G1–G12 모두, CLP는 G6–G10을 모집합니다. 초등은 주 5일, 중·고등은 주 6일제입니다." />
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>과정</th>{Array.from({length: 12}, (_, i) => <th key={i} className="n">G{i + 1}</th>)}</tr></thead>
              <tbody>{plan.map(([p, arr]) => <tr key={p}><th scope="row">{p === 'GLP' ? 'GLP 국제반' : 'CLP 중국유학반'}</th>{arr.map((n, i) => <td key={i} className="n">{n ? `${n}학급` : '–'}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <Source href="/documents/qdis-admissions-2026-27.pdf">2026–27학년도 모집요강 Ⅰ. 모집 계획</Source>
          <div style={{marginTop: 20}}><a className="btn ghost arrow" href="/documents/qdis-admissions-2026-27.pdf" target="_blank" rel="noopener">모집요강 PDF 받기</a></div>
        </div>
      </section>
      <section className="section" id="steps">
        <div className="wrap">
          <SecHead eyebrow="Process" title="입학까지 8단계" lede="초등과 중·고등의 차이는 영어 평가 하나입니다." />
          <ol className="steps">
            <li><h4>문의 · 학년 확인</h4><p>한국 학제와 9월 학기제 차이를 고려해 지원 학년을 정합니다. 필요하면 한 학기 낮춰 입학하는 것을 권합니다.</p></li>
            <li><h4>지원서 제출</h4><p>입학지원서(초등)·입학지원서와 자기소개서(중·고등). 이메일 또는 방문 접수.</p></li>
            <li><h4>서류심사</h4><p>G1부터 이수한 전체 학기의 생활기록부·성적표로 학력을 확인합니다.</p></li>
            <li><h4>영어시험 · 인터뷰</h4><p>지필 40분(읽기·쓰기) + 인터뷰 20분(말하기·듣기). 한국에서는 화상 응시 가능. 전형료 별도.</p><span className="tag">중·고등만</span></li>
            <li><h4>합격</h4><p>전형일로부터 3일 이내 입학허가와 등록 안내를 개별 통지합니다.</p></li>
            <li><h4>등록</h4><p>안내일로부터 7일 이내 등록. 기간 내 등록하지 않으면 입학허가가 취소됩니다.</p></li>
            <li><h4>비자 · 기숙사 준비</h4><p>X1 학생비자 서류 발급, 건강검진, 기숙사 입사 준비물.</p></li>
            <li><h4>입학</h4><p>입학서류 제출, 거류증 전환(입국 후 30일 이내), 휴대전화·은행 개설 지원.</p></li>
          </ol>
          <p className="lede" style={{marginTop: 36}}>학교는 “영어를 잘하는 학생을 뽑는 곳이 아니라 영어를 잘하게 만드는 곳”이라고 설명합니다. 다만 주요 과목을 영어로 배우므로 수업을 따라갈 기초 실력과 의지를 봅니다. 중학교는 학업 의지를, 고등학교는 영어 성적과 인성 면접을 함께 평가합니다.</p>
        </div>
      </section>
      <section className="section white" id="eligibility">
        <div className="wrap">
          <div className="split">
            <div><span className="eyebrow">Eligibility</span><h2 className="h2">지원 자격</h2><p className="lede" style={{marginTop: 18}}>특례 자격·국적·거주지와 관계없이 지원할 수 있습니다. 한국·중국 전역·제3국 어디서든 가능합니다.</p></div>
            <div className="prose">
              <ul>
                <li>지원 학년·학기의 직전 학기를 이수했거나 입학 전까지 이수할 예정인 학생</li>
                <li>학제가 다른 학교에서 옮기는 경우, 이수 학기 수가 필요한 학기보다 1개 학기 부족한 것까지 인정</li>
                <li>학제 차이로 생긴 누락·중복 학기는 학력 인정 심사를 거쳐 인정 (결손은 1개 학기, 6개월까지)</li>
                <li>학력심의위원회에서 해당 학년 이상의 학력이 있다고 인정한 학생</li>
                <li>홈스쿨링처럼 정규 학력으로 인정되지 않는 이력만으로는 편입이 어렵습니다.</li>
              </ul>
              <p className="small">예: 한국에서 초6 1학기를 마치고 9월에 G7로 입학할 수 있습니다. 해외대 진학에는 문제가 없지만, 재학 중 한국 학교로 돌아가면 학년 배정이 달라질 수 있습니다.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section" id="documents">
        <div className="wrap">
          <SecHead eyebrow="Documents" title="제출 서류" />
          <div className="cols-2">
            <div className="prose"><h3>공통 서류</h3><ul><li>학교생활기록부 또는 성적표 사본 (G1부터 이수 학기 전체)</li><li>재학증명서 (최종 학교)</li><li>학생 여권 사본 (여권면·비자면 각 2부)</li><li>부·모 여권 사본 (각 2부)</li><li>학생 여권용 사진 6장</li><li>건강검진표 (최근 3년 이내 발급, 개학일 제출)</li></ul></div>
            <div className="prose"><h3>해당자 추가 서류</h3><ul><li>가족관계증명서 — 중국어 번역 공증·인증 (학생비자 신청자)</li><li>공인 성적표 — TOEFL·TOEIC·IELTS·TEPS·HSK 등</li></ul><h3>지원 단계 서류</h3><ul><li>입학지원서 (초등)</li><li>입학지원서 + 자기소개서 (중·고등, G9 이상 영어 작성 권장)</li></ul></div>
          </div>
          <Source>2025–26 학교생활안내 ‘입학 서류’, 2026–27 모집요강 Ⅲ. 제출 서류</Source>
        </div>
      </section>
      <section className="section white" id="visa">
        <div className="wrap">
          <SecHead eyebrow="Student Visa · Residence Permit" title="학생비자(X1)와 거류증" lede="혼자 유학하는 학생은 학생비자(X1)로 입국해 30일 안에 거류증으로 바꿉니다. 거류증이 있으면 유효기간 동안 한국과 자유롭게 오갈 수 있습니다." />
          <ol className="steps">
            <li><h4>구비서류 신청</h4><p>입학 약 2개월 전. 학생 여권(유효 2년 이상), 최근 성적·재학증명서 영문, 부모 여권, 주소를 학교에 제출.</p></li>
            <li><h4>JW202 · 입학허가서</h4><p>산동성 교육청 JW202와 학교 입학허가서를 입학 약 1개월 전 국제택배로 받습니다.</p></li>
            <li><h4>비자 신청</h4><p>중국비자센터 또는 대행사에 신청. 미성년자는 가족관계증명서·부모 기본증명서 추가.</p></li>
            <li><h4>입국 후 거류증</h4><p>입국 30일 이내 출입국관리소에서 전환. 발급비 1,500위안, 만 18세 이상은 지정 병원 건강검진 추가.</p></li>
          </ol>
          <p className="source">구비서류 신청부터 비자 발급까지 약 2–3개월. 비자 정책은 수시로 바뀌므로 신청 전 주한중국대사관·비자센터 안내를 확인하세요.</p>
        </div>
      </section>
      <section className="section" id="timing">
        <div className="wrap">
          <div className="split">
            <div><span className="eyebrow">When to Apply</span><h2 className="h2">언제 지원하면 좋을까요</h2></div>
            <ul className="ruled">
              <li><b>9월 입학 (1학기)</b><p>4–5월 지원 권장. 비자 준비 기간을 고려하면 봄 학기 중 결정하는 것이 안전합니다.</p></li>
              <li><b>3월 입학 (2학기)</b><p>10–11월 지원 권장.</p></li>
              <li><b>학기 중 입학</b><p>가능하지만 드문 경우입니다. 해당 학기 성적 처리에 대해 미리 상담이 필요합니다.</p></li>
              <li><b>학교 방문</b><p>지원 전 학부모·학생 학교 투어를 할 수 있습니다. 칭다오는 무비자 입국 여부 등 최신 입국 요건을 확인한 뒤 일정을 잡습니다.</p></li>
            </ul>
          </div>
        </div>
      </section>
      <CtaBand title="지원 가능한 학년부터 확인하세요" text="현재 학교·학년과 이수 학기를 알려 주시면 지원 학년과 일정을 정리해 드립니다." secondary={{href: '/faq', label: '자주 묻는 질문'}} />
    </>
  );
}

export function FaqPage() {
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const items = useMemo(() => faq.items.filter(i => (cat === 'all' || i.cat === cat) && (!q || (i.q + i.a.join(' ')).toLowerCase().includes(q.trim().toLowerCase()))), [cat, q]);
  const catLabel = Object.fromEntries(faq.categories.map(c => [c.id, c.label]));
  return (
    <>
      <PageHead crumb="자주 묻는 질문" eyebrow="FAQ" title={<>학부모가 가장 많이 묻는<br />{faq.items.length}가지 질문</>}
        lede="학교 공식 FAQ를 주제별로 나누고, 학비·장학금·모집 학년·기숙사 운영은 2026–27 모집요강과 최신 학교생활안내 기준으로 고쳤습니다." />
      <section className="section white">
        <div className="wrap">
          <div className="faq-tools">
            <div className="chip-row" role="group" aria-label="주제">
              <button type="button" className="chip" aria-pressed={cat === 'all'} onClick={() => setCat('all')}>전체 {faq.items.length}</button>
              {faq.categories.map(c => <button key={c.id} type="button" className="chip" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>{c.label} {faq.items.filter(i => i.cat === c.id).length}</button>)}
            </div>
            <div className="field"><label htmlFor="faq-q">질문 검색</label><input id="faq-q" type="search" placeholder="예: 기숙사, 장학금, 특례" value={q} onChange={e => setQ(e.target.value)} /></div>
          </div>
          <div className="faq-list">
            {items.map(i => (
              <details className="faq-item" key={i.id} id={i.id}>
                <summary><span className="cat">{catLabel[i.cat]}</span><span className="q">{i.q}</span><span className="pm" aria-hidden="true">+</span></summary>
                <div className="a">{i.a.map((p, k) => <p key={k}>{p}</p>)}</div>
              </details>
            ))}
            {items.length === 0 && <div className="empty"><p>검색 결과가 없습니다. 다른 단어로 찾아보거나 상담으로 문의해 주세요.</p></div>}
          </div>
          <Source href={faq.source.url}>{faq.source.title} · 검토일 2026.09.21</Source>
        </div>
      </section>
      <CtaBand title="여기에 없는 질문이 있다면" text="카카오톡 채널이나 상담 신청으로 편하게 물어보세요." />
    </>
  );
}

export function NewsPage() {
  return (
    <>
      <PageHead crumb="소식" eyebrow="Latest from QDIS" title={<>학교 소식 가운데,<br />학부모에게 필요한 것만</>}
        lede="청도대원학교 공지사항·가정통신문·진학정보·갤러리에서 입학, 학사, 대학 합격, 학교생활 소식을 골라 쉽게 정리합니다. 각 소식은 학교 원문으로 연결됩니다." />
      <section className="section white">
        <div className="wrap"><NewsList filterable /></div>
      </section>
      <CtaBand title="새 모집 소식을 가장 먼저 받고 싶다면" text="상담을 신청하시면 설명회와 모집 일정을 안내해 드립니다." />
    </>
  );
}

export function ConsultationPage() {
  return (
    <>
      <PageHead crumb="입학상담" eyebrow="Consultation" title={<>청도대원 입학,<br />한국에서 상담하세요</>}
        lede="청도대원학교 한국 입학상담은 TNS Worldwide가 지원합니다. 지원 학년·과정, 영어 준비, 특례 가능성, 비용과 비자, 학교 방문 투어까지 한국어로 안내합니다." />
      <section className="section white">
        <div className="wrap consult">
          <div>
            <span className="eyebrow">What We Check</span>
            <h2 className="h2">상담에서 확인하는 것</h2>
            <ul className="ruled" style={{marginTop: 26}}>
              <li><b>학년</b><p>한국·해외 이수 학기와 9월 학기제를 맞춰 지원 학년 결정</p></li>
              <li><b>과정</b><p>GLP·CLP 중 목표 대학에 맞는 과정</p></li>
              <li><b>영어</b><p>입학 평가 대비와 입학 전 준비 방법</p></li>
              <li><b>특례·전형</b><p>12특·3특·해외고 전형 가능성</p></li>
              <li><b>비용</b><p>장학금을 반영한 연간 예상 비용</p></li>
              <li><b>입학 준비</b><p>원서·영어 인터뷰·비자·기숙사 입사</p></li>
            </ul>
            <Channels />
          </div>
          <ConsultForm />
        </div>
      </section>
    </>
  );
}

export function NotFound() {
  return (
    <section className="section not-found">
      <div className="wrap wrap-narrow">
        <span className="eyebrow plain">404</span>
        <h1 className="h2">찾으시는 페이지가 없습니다</h1>
        <p className="lede" style={{margin: '18px auto 28px'}}>주소가 바뀌었거나 없는 페이지입니다. 아래 메뉴에서 다시 찾아보세요.</p>
        <div style={{display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap'}}>
          <a className="btn arrow" href="/">홈으로</a>
          <a className="btn ghost" href="/university-results">대학 합격 결과</a>
          <a className="btn ghost" href="/tuition">학비 계산기</a>
        </div>
      </div>
    </section>
  );
}
