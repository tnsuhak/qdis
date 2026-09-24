import {PageHead, SecHead, Source, TLink, Toc, CtaBand} from '@/components/common/ui';
import {LatestOffers, OfferDefinition, ResultsTable, YearExplorer, TopUniversityList} from '@/components/results/Results';
import {ANNUAL, ALUMNI, cumulative, LATEST} from '@/lib/qdis/results';
import {koDate, academicYearLabel} from '@/lib/qdis/format';

export function ResultsPage() {
  const cum = cumulative();
  const kr = cum.byCountry.find(c => c[0] === 'KR')?.[1] ?? 0;
  const overseas = cum.total - kr;
  return (
    <>
      <PageHead crumb="대학 합격 결과" eyebrow="University Outcomes" photoId="seminar"
        title={<>서울대·의대에서 HKU·NUS·UC까지,<br />학교가 공개한 합격 기록</>}
        lede="학교 공식 진학정보 게시판 기준. 숫자는 학생 수가 아니라 합격 건수(Offers)입니다." />
      <Toc items={[['summary', '한눈에 보기'], ['by-year', '연도별 결과'], ['latest', '최신 합격 소식'], ['search', '대학 검색'], ['alumni', '졸업생 대학원'], ['method', '집계 기준']]} />

      <section className="section white" id="summary">
        <div className="wrap">
          <div className="big-trio light">
            <div><b className="num">{cum.total}</b><span>2020–2026 대입결과</span></div>
            <div><b className="num">{kr}</b><span>한국 대학</span></div>
            <div><b className="num">{overseas}</b><span>해외 대학 · {cum.byCountry.length - 1}개 국가·지역</span></div>
          </div>
          <p className="source trio-note">공식 연도별 종합자료 공개 학년도 합계 · 중복 합격 포함 · <a href="#method">자료 기준</a></p>
          <div className="cols-3" style={{marginTop: 'clamp(48px,6vw,80px)'}}>
            <div><h3 className="kicker" style={{color: 'var(--brass)', marginBottom: 10}}>한국 대학 누적</h3><TopUniversityList country="KR" limit={8} /></div>
            <div><h3 className="kicker" style={{color: 'var(--brass)', marginBottom: 10}}>미국 대학 누적</h3><TopUniversityList country="US" limit={8} /></div>
            <div><h3 className="kicker" style={{color: 'var(--brass)', marginBottom: 10}}>홍콩 대학 누적</h3><TopUniversityList country="HK" limit={8} /></div>
          </div>
        </div>
      </section>

      <section className="section" id="by-year">
        <div className="wrap">
          <SecHead eyebrow="Results by Year" title="연도별 대학 합격 현황" lede="2017–18 첫 졸업생부터 2025–26 제8기까지. 2017–20은 학교 게시 원본 이미지로 보여 드립니다." />
          <OfferDefinition />
          <YearExplorer />
          <div className="table-wrap" style={{marginTop: 64}}>
            <table className="data-table">
              <caption className="sr-only">학년도별 공식 공지 목록</caption>
              <thead><tr><th>학년도</th><th>게시일</th><th className="n">합격 건수</th><th>자료 형태</th></tr></thead>
              <tbody>
                {ANNUAL.map(y => (
                  <tr key={y.academic_year}>
                    <td className="num"><b>{academicYearLabel(y.academic_year)}</b>{y.cohort && <span className="sub">{y.cohort} · {koDate(y.as_of!)} 현재</span>}</td>
                    <td className="num">{koDate(y.source_date)}</td>
                    <td className="n">{y.total_offers ? `${y.total_offers}건` : '원본 이미지'}</td>
                    <td>{y.detail === 'table' ? '대학별 상세표' : '학교 게시 이미지'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section dark" id="latest">
        <div className="wrap">
          <SecHead eyebrow="Latest Offers" title="최신 합격 소식" lede="진학정보 게시판의 개별 합격 게시물 · 연도별 합계와 별도" />
          <LatestOffers limit={LATEST.length} />
        </div>
      </section>

      <section className="section white" id="search">
        <div className="wrap">
          <SecHead eyebrow="Search" title="대학 이름으로 찾아보기" lede="자료 구분을 먼저 고른 뒤 학년도·국가·대학명으로 좁혀 보세요." />
          <ResultsTable />
        </div>
      </section>

      <section className="section" id="alumni">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow">Alumni Outcomes</span>
              <h2 className="h2">졸업 후,<br />대학원까지</h2>
              <p className="lede" style={{marginTop: 18}}>청도대원 졸업생의 미국 대학원 합격 소식입니다. 고등학생 학부 합격 결과와 섞지 않고 따로 보여 드립니다.</p>
            </div>
            <ul className="ruled">
              {ALUMNI.map(a => (
                <li key={a.university}><span className="num">{koDate(a.source_date)}</span><div><b>{a.university}</b><p>{a.program}{a.note ? ` · ${a.note}` : ''}</p></div></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section white" id="method">
        <div className="wrap wrap-narrow prose">
          <span className="eyebrow">Methodology</span>
          <h2 className="h2" style={{marginBottom: 24}}>이 페이지의 집계 기준</h2>
          <ul>
            <li><b>2020–2026 대입결과 {cum.total}건</b>: 대학별 합격 건수가 공개된 2020–21 · 2021–22 · 2022–23 · 2023–24 · 2025–26(제8기, 2025.09.18 기준) 공식 종합자료의 합계입니다. 2024–25 연도별 종합자료는 학교 게시판에서 확인되지 않아 포함하지 않았고, 추정치로 채우지 않았습니다.</li>
            <li><b>연도별 종합(annual)</b>: 학교가 학년도마다 게시한 ‘대학진학 현황’ 공지의 대학별 합격 건수입니다. 표에 없는 정보는 추가하지 않았습니다.</li>
            <li><b>개별 합격(individual_offer)</b>: 진학정보 게시판의 개별 합격 게시물 1건을 1건으로 기록합니다. 같은 학생이 연도별 표에 이미 포함되었을 수 있어 합산하지 않습니다.</li>
            <li><b>졸업생 대학원(alumni)</b>: 대학원 진학 결과는 학부 결과와 분리합니다.</li>
            <li>한 학생이 여러 대학에 합격하면 합격 건수는 여러 건이 되며, 최종 등록 대학과는 다릅니다.</li>
            <li>새 합격 게시물은 자동 감지 후 검토를 거쳐 이 페이지에 추가됩니다.</li>
          </ul>
          <Source href="https://qdis.org/board/index.html?id=board3">청도대원학교 학교소식 &gt; 진학정보, 확인일 2026.09.21</Source>
        </div>
      </section>
      <CtaBand title="우리 아이 성적으로 어느 대학까지 가능할까요?" text="현재 학년·성적·특례 자격을 기준으로 목표 대학과 준비 순서를 상담해 드립니다." />
    </>
  );
}

export function CounselingPage() {
  return (
    <>
      <PageHead crumb="진학지도" eyebrow="College Counseling" title={<>같은 SAT·AP 성적으로<br />한국대와 해외대를 함께 준비합니다</>}
        lede="국내대·해외대·중국대 진학 담당 교사가 1:1로 지도합니다. 해외 고등학교 학생은 공인시험 성적과 교외 활동을 한국 대학에도 제출할 수 있어, 준비는 하나로 선택지는 넓게 가져갈 수 있습니다." />
      <Toc items={[['paths', '진학 경로'], ['korea', '한국 대학'], ['overseas', '미국·홍콩·싱가포르'], ['china', '중국 대학'], ['roadmap', 'G9–G12 로드맵']]} />

      <section className="section white" id="paths">
        <div className="wrap">
          <SecHead eyebrow="Pathways" title="아이의 이력에 따라 길이 달라집니다" lede="특례 자격은 학교가 주는 것이 아니라 학생·부모의 해외 이수·체류 이력으로 정해집니다. 상담에서 가장 먼저 확인하는 부분입니다." />
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>경로</th><th>누구에게</th><th>핵심 요건</th><th>청도대원에서의 준비</th></tr></thead>
              <tbody>
                <tr><th scope="row">12년 특례<span className="sub">재외국민 · 전교육과정 해외이수자</span></th><td>초·중·고 전 과정을 해외에서 이수</td><td>부모 동반 요건 없음. 한국 학교 재학 이력이 없어야 함</td><td>해외에서 오래 공부하다 귀국을 앞둔 학생이 남은 학년을 청도대원에서 마무리</td></tr>
                <tr><th scope="row">3년 특례<span className="sub">재외국민 · 중고교과정 해외이수자</span></th><td>중·고 3년 이상(고교 1년 포함) 해외 이수</td><td>학생 체류 3/4 이상, 부모(해외 근무·사업) 체류 2/3 이상</td><td>주재원 자녀 또는 3특 요건을 채운 뒤 부모가 먼저 귀국한 학생</td></tr>
                <tr><th scope="row">해외고 전형·수시</th><td>특례 자격이 없는 해외고 졸업(예정)자</td><td>해외 고교 과정 이수, 대학별 모집요강</td><td>SAT·AP·TOEFL 성적과 활동 기록으로 서류 준비</td></tr>
                <tr><th scope="row">해외 대학</th><td>미국·홍콩·싱가포르·일본·캐나다 등</td><td>GPA, SAT/AP, TOEFL, 에세이, 추천서</td><td>GLP 정규 수업 + 방과후 AP·SAT·에세이 + 교내 시험센터</td></tr>
                <tr><th scope="row">중국 대학</th><td>CLP 학생 또는 중국 대학 희망 학생</td><td>외국인 전형: SAT·AP, TOEFL·HSK, GPA, 면접</td><td>CLP 과정, HSK 방과후 강좌</td></tr>
              </tbody>
            </table>
          </div>
          <Source>2025–26 학교생활안내 ‘진학’·부록 ‘재외국민과 외국인 공통 지원자격’. 전형별 세부 조건은 대학별 모집요강을 따릅니다.</Source>
        </div>
      </section>

      <section className="section" id="korea">
        <div className="wrap">
          <div className="split">
            <div className="sticky-col">
              <span className="eyebrow">Korean Universities</span>
              <h2 className="h2">한국 대학,<br />재외국민 특별전형</h2>
              <p className="lede" style={{marginTop: 18}}>3년 특례는 대학·계열마다 서류, 필답, 면접 등 평가 방식이 다릅니다. QDIS에서는 학교 성적과 보유한 SAT·AP·TOEFL 등 공인 성적, 활동 기록을 지원 대학의 실제 모집요강에 맞춰 정리합니다. 청도대원 졸업생은 서울대·연세대·고려대·KAIST와 의과대학 합격 기록을 공개해 왔습니다.</p>
              <div style={{marginTop: 22}}><TLink href="/university-results">한국 대학 합격 결과</TLink></div>
            </div>
            <div className="prose">
              <h3>12특 · 전교육과정 해외이수자 (후기·전기)</h3>
              <p>서류 또는 서류+면접. 졸업·성적·재학증명서, 학업계획서, 출신 고교 소개자료, 표준학력시험·언어능력 증빙, 활동 자료를 냅니다.</p>
              <h3>3특 · 중고교과정 해외이수자 (전기)</h3>
              <p>서류+면접, 서류+필답, 필답+면접 등 대학·계열마다 평가 방식이 다릅니다. 자기소개서·학업계획서·활동목록 등 제출서류도 대학과 지원 연도에 따라 달라질 수 있으므로 해당 연도의 공식 모집요강을 기준으로 준비합니다.</p>
              <h3>해외고 졸업자 수시</h3>
              <p>서류 또는 서류+면접. 학생부 기재 금지 항목(공인어학성적, 교외 수상 등)은 대학별로 확인이 필요합니다. 해외 고교 서류는 영사관 인증이 필요합니다.</p>
              <h3>한국 대학 준비 로드맵</h3>
              <ul>
                <li><b>G11</b> 활동·개인연구 프로젝트, SAT·AP·HSK·TOEFL 응시, 여름 활동</li>
                <li><b>G12-1학기</b> 추천서 요청, SAT·TOEFL·HSK·TOPIK 응시, 필기시험·모의면접, 후기 자기소개서</li>
                <li><b>G12-2학기</b> 마지막 AP·SAT, 후기 원서 접수, 6개 지원 대학 확정, 모의면접</li>
                <li><b>졸업 후</b> 재외국민 전형 원서 접수, 필기고사·면접</li>
              </ul>
              <Source>2025–26 학교생활안내 ‘한국대학 입시’, 2025년 1월 학교 관계자 미팅</Source>
            </div>
          </div>
        </div>
      </section>

      <section className="section white" id="overseas">
        <div className="wrap">
          <SecHead eyebrow="US · Hong Kong · Singapore" title="영미권·홍콩·싱가포르 대학" lede="성적과 비교과를 다각도로 보는 입시입니다. 학교는 Naviance 계정으로 지원 대학 리스트와 활동 기록을 관리하고, G12 여름부터 에세이 컨퍼런스로 첨삭합니다." />
          <div className="stat-row">
            <div><b>SAT</b><span>EBRW 650–800 · Math 700–800<br />상위권 대학 기준</span></div>
            <div><b>AP 3–5과목</b><span>4·5점이면 대학 학점 인정 가능</span></div>
            <div><b>TOEFL 100+</b><span>iBT 100–120 · IELTS 7–9</span></div>
            <div><b>GPA 3.5–4.0</b><span>학년별 상승 곡선도 중요</span></div>
          </div>
          <div className="cols-2" style={{marginTop: 56}}>
            <div className="prose">
              <h3>G12 해외대학 지원 타임라인</h3>
              <ul>
                <li><b>8월</b> 전공별 대학 조사, Naviance 작성, 에세이 초안, 10월 SAT 등록, Early 지원 리스트</li>
                <li><b>9월</b> G9–G11 누적 GPA 점검, 교사 추천서 요청, 에세이 컨퍼런스</li>
                <li><b>10월</b> 에세이·추천서 완성, 중순까지 모든 서류 완료</li>
                <li><b>11월</b> Early 지원(ED·EA), Regular 에세이 · UC는 11월 한 달 접수</li>
                <li><b>12월</b> Early 결과, Regular 지원</li>
                <li><b>1–2월</b> Regular 마감, G12-1학기 성적 발송</li>
              </ul>
            </div>
            <div className="prose">
              <h3>홍콩·싱가포르</h3>
              <p>HKU·HKUST·CUHK·CityU와 NUS는 청도대원 학생들이 꾸준히 합격하는 대학입니다. SAT·AP·TOEFL과 학교 성적, 활동을 함께 보는 방식이라 미국 대학 준비와 겹치는 부분이 많습니다.</p>
              <h3>한국·해외 동시 지원</h3>
              <p>한 해에 한국 대학 재외국민 전형과 해외 대학을 함께 지원하는 학생이 많습니다. 원서 시기가 겹치지 않도록 G11 2학기에 지원 전략을 확정합니다.</p>
            </div>
          </div>
          <Source>2025–26 학교생활안내 ‘미국대학 입시’, ‘입시 로드맵’</Source>
        </div>
      </section>

      <section className="section" id="china">
        <div className="wrap">
          <div className="split">
            <div><span className="eyebrow">Chinese Universities</span><h2 className="h2">중국 대학</h2></div>
            <div className="prose">
              <p>중국 대학은 외국인 전형으로, 미국 대학과 비슷하게 SAT·AP, TOEFL·HSK, G9–G12 누계 GPA, 자기소개서, 추천서를 보고 면접을 봅니다. 2025년 신설된 CLP(중국유학반)가 이 경로를 목표로 합니다.</p>
              <ul>
                <li><b>G11</b> 지원 대학 결정, SAT·HSK 준비·응시, 교내외 대회</li>
                <li><b>G12-1학기</b> 마지막 SAT·HSK, 자기소개서·추천서, 모의면접, 필기시험 준비</li>
                <li><b>G12-2학기</b> 원서 접수, 필기시험, 면접</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark" id="roadmap">
        <div className="wrap">
          <SecHead eyebrow="G9–G12 Roadmap" title="고등 4년, 이렇게 준비합니다" />
          <ul className="ruled">
            <li><b>G9</b><p>과목 계획, 비교과 활동 시작, GPA 관리, 영어 실력 다지기, 봉사·리더십 경험 · 여름 TOEFL 준비</p></li>
            <li><b>G10</b><p>TOEFL·AP·SAT 준비, 진로 탐색과 관심 대학 조사 · 5월 AP, SAT 첫 응시</p></li>
            <li><b>G11</b><p>SAT·TOEFL 응시, AP 준비, 개인연구 프로젝트 · 5월 AP · 여름 활동과 에세이 초안</p></li>
            <li><b>G12</b><p>추천서·에세이 완성, Early·Regular 지원, 한국 대학 재외국민 전형 준비 · 최종 성적표 발송, 비자·출국 준비</p></li>
          </ul>
          <Source>2025–26 학교생활안내 ‘입시 로드맵’</Source>
        </div>
      </section>
      <CtaBand title="특례 자격부터 확인해 보세요" text="자녀와 부모의 해외 체류 이력만 알려 주시면 지원 가능한 전형을 정리해 드립니다." />
    </>
  );
}
