import {Img, SecHead, TLink, Source} from '@/components/common/ui';
import {LatestOffers, OfferDefinition, YearExplorer} from '@/components/results/Results';
import {DayTimeline, MealsWeek, CareGrid, CARE_ITEMS} from '@/components/life/Life';
import {FeeExamples} from '@/components/tuition/Tuition';
import {NewsList} from '@/components/news/News';
import {ConsultForm, Channels} from '@/components/common/Consult';
import {photo} from '@/lib/qdis/photos';
import {cumulative, ANNUAL, LATEST} from '@/lib/qdis/results';

const HEADLINE = ['서울대', '연세대 의대', '고려대', 'HKU', 'HKUST', 'NUS', 'UC Berkeley', 'USC'];

export default function Home() {
  const hero = photo('hero');
  const cum = cumulative();
  const latestYear = ANNUAL[0];
  return (
    <>
      {/* 01 HERO */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-media" aria-hidden="true"><img src={hero.src} alt="" fetchPriority="high" style={hero.position ? {objectPosition: hero.position} : undefined} /></div>
        <div className="wrap hero-inner">
          <span className="eyebrow">Qingdao Daewon International School · G1–G12</span>
          <h1 className="display" id="hero-title">칭다오에서 준비하는<br />한국·세계 대학 진학</h1>
          <p className="hero-sub">SAT·AP 수업과 교내 시험센터, 기숙사와 야간 자율학습, 한국대·해외대 진학지도까지. 인천에서 비행기로 한 시간 남짓한 칭다오에서, 하나의 학교 안에서 이어지는 대학진학형 국제교육입니다.</p>
          <div className="hero-actions">
            <a className="btn light arrow" href="/university-results">대학 합격 결과 보기</a>
            <a className="btn ghost-light" href="/tuition">연간 학비 계산하기</a>
          </div>
          <div className="hero-facts">
            <div><b className="num">{latestYear.total_offers}건</b><span>2025–26 제8기 대학 합격<br />(2025.9.18 현재)</span></div>
            <div><b>SAT · AP</b><span>College Board 공식<br />교내 시험센터</span></div>
            <div><b>G9–G12</b><span>의무기숙 · 매일 밤<br />Study Hall 두 차례</span></div>
            <div><b className="num">69,000위안</b><span>2026–27 고등 GLP<br />학기당 수업료</span></div>
          </div>
        </div>
      </section>

      {/* 02 LATEST RESULTS */}
      <section className="section dark" aria-labelledby="latest-title">
        <div className="wrap">
          <SecHead no="01" eyebrow="Latest University Results" id="latest-title"
            title={<>이번 입시에도,<br />합격 소식이 이어지고 있습니다</>}
            lede={`학교 진학정보 게시판에 올라온 최근 합격 소식입니다. ${LATEST.length}건의 개별 게시물로, 연도별 종합 집계와는 따로 봅니다.`}
            action={<TLink href="/university-results" light>전체 결과 검색</TLink>} />
          <ul className="headline-offers" aria-label="최근 합격 대학">
            {HEADLINE.map(h => <li key={h}>{h}<span aria-hidden="true">/</span></li>)}
          </ul>
          <LatestOffers limit={10} />
          <p className="source">출처: 청도대원학교 공식 진학정보 게시판 개별 합격 게시물(2025.09–2026.07). 졸업생 대학원 합격은 따로 집계합니다.</p>
        </div>
      </section>

      {/* 03 RESULTS BY YEAR */}
      <section className="section white" aria-labelledby="year-title">
        <div className="wrap">
          <SecHead no="02" eyebrow="University Results by Year" id="year-title"
            title={<>한국 대학과 미국·홍콩·싱가포르,<br />선택지가 넓습니다</>}
            lede={`상세표가 공개된 5개 학년도(2020–21 ~ 2025–26)에서만 대학 합격 ${cum.total}건. 한국 ${cum.byCountry.find(c => c[0] === 'KR')?.[1]}건, 미국 ${cum.byCountry.find(c => c[0] === 'US')?.[1]}건, 홍콩 ${cum.byCountry.find(c => c[0] === 'HK')?.[1]}건이 가장 많습니다.`}
            action={<TLink href="/university-results">연도별 상세표</TLink>} />
          <OfferDefinition />
          <YearExplorer compact />
        </div>
      </section>

      {/* 04 WHY QDIS */}
      <section className="section" aria-labelledby="why-title">
        <div className="wrap">
          <SecHead no="03" eyebrow="Why QDIS" id="why-title" title={<>대학진학을 중심에 두고<br />학교 전체가 움직입니다</>} />
          <div className="pillars">
            <div className="pillar">
              <span className="kicker">University Outcomes</span>
              <h3>결과로 확인되는 진학</h3>
              <p>2018년 첫 졸업생 이후 서울대·연세대·고려대와 의과대학, HKU·HKUST·NUS, UC 계열과 NYU까지. 학교가 매년 공개하는 합격 기록을 그대로 보여 드립니다.</p>
              <TLink href="/university-results">합격 결과</TLink>
            </div>
            <div className="pillar">
              <span className="kicker">Academics</span>
              <h3>SAT·AP가 정규 수업 안에</h3>
              <p>영어·수학·사회·과학을 영어로 배우고, 고등 수학은 SAT·AP 교재로 수업합니다. 방과후 AP 강좌로 보강하고, 교내 College Board 시험센터에서 응시합니다.</p>
              <TLink href="/sat-ap">SAT·AP 시스템</TLink>
            </div>
            <div className="pillar">
              <span className="kicker">Boarding &amp; Care</span>
              <h3>생활과 공부가 한 동선에</h3>
              <p>4인 1실 기숙사, 남녀 사감, 휴대전화 시간 관리, 매일 밤 감독교사가 있는 Study Hall. 아이 혼자 보내도 하루가 흐트러지지 않는 구조입니다.</p>
              <TLink href="/boarding">기숙사 생활</TLink>
            </div>
            <div className="pillar">
              <span className="kicker">College Counseling</span>
              <h3>한국대와 해외대를 함께</h3>
              <p>G12 담임을 한국대·해외대 진학 담당으로 나누어 1:1로 지도합니다. SAT·AP·TOEFL 성적은 재외국민 특례와 해외고 전형에도 그대로 쓰입니다.</p>
              <TLink href="/college-counseling">진학지도</TLink>
            </div>
          </div>
        </div>
      </section>

      {/* 05 ACADEMICS */}
      <section className="section white border" aria-labelledby="acad-title">
        <div className="wrap">
          <div className="split">
            <div className="sticky-col">
              <span className="sec-no">04</span>
              <span className="eyebrow">Academics · GLP / CLP / SAT / AP</span>
              <h2 className="h2" id="acad-title">준비도 학교에서,<br />시험도 학교에서</h2>
              <p className="lede" style={{marginTop: 18}}>대치동 학원을 따로 찾지 않아도 되도록, SAT·AP 준비가 정규 교육과정과 방과후 수업 안에 들어 있습니다. 청도대원은 2018년부터 SAT, 2019년부터 AP의 College Board 공식 시험센터입니다.</p>
              <div style={{marginTop: 28, display: 'flex', gap: 22, flexWrap: 'wrap'}}>
                <TLink href="/academics">학년별 교육과정</TLink>
                <TLink href="/sat-ap">SAT·AP·시험센터</TLink>
              </div>
            </div>
            <div>
              <div className="table-wrap">
                <table className="data-table compare">
                  <caption className="sr-only">GLP와 CLP 비교</caption>
                  <thead>
                    <tr><th scope="col"><span className="sr-only">구분</span></th><th scope="col">GLP<small>국제반</small></th><th scope="col">CLP<small>중국유학반</small></th></tr>
                  </thead>
                  <tbody>
                    <tr><th scope="row">목표 대학</th><td>한국·미국·홍콩·싱가포르 등</td><td>중국 대학</td></tr>
                    <tr><th scope="row">주요 시험</th><td>SAT · AP · TOEFL</td><td>HSK · TOEFL</td></tr>
                    <tr><th scope="row">수업 언어</th><td>영어 중심, 제2외국어 중국어</td><td>중국어 중심, 제2외국어 영어</td></tr>
                    <tr><th scope="row">2026–27 모집</th><td>G1–G12</td><td>G6–G10</td></tr>
                    <tr><th scope="row">고등 수업료</th><td className="num">학기당 69,000위안</td><td className="num">학기당 41,400위안</td></tr>
                  </tbody>
                </table>
              </div>
              <ol className="ruled" style={{marginTop: 48}}>
                <li><span className="k">G9–G10</span><p>Algebra 2·Precalculus, Chemistry·Biology·Physics, Psychology·Economics와 영어 Academic Reading·Composition으로 SAT와 AP의 기초를 만듭니다.</p></li>
                <li><span className="k">G11–G12</span><p>Calculus·Statistics·Multivariable Calculus를 배우고, 사회·과학·중국어 심화 선택과목 3개를 진로에 맞춰 고릅니다.</p></li>
                <li><span className="k">방과후 AP</span><p>AP Calculus BC, Statistics, Chemistry, Biology, Physics, Psychology, Economics, World History 등 학기별 개설 (18:00–19:50).</p></li>
                <li><span className="k">교내 시험</span><p>SAT · AP · AMC · Math Kangaroo · TOEFL Junior · 모의 TOEFL을 익숙한 학교에서 응시합니다.</p></li>
              </ol>
              <Source href="https://qdis.org/main/page.html?pid=113">2025–26 학교생활안내 고등 교육과정, 2026–27 모집요강</Source>
            </div>
          </div>
        </div>
      </section>

      {/* 06 A DAY AT QDIS */}
      <section className="section dark" aria-labelledby="day-title">
        <div className="wrap">
          <div className="split">
            <div className="sticky-col">
              <span className="sec-no">05</span>
              <span className="eyebrow">A Day at QDIS</span>
              <h2 className="h2" id="day-title">아침 7시 기상부터<br />밤 11시 자습까지</h2>
              <p className="lede" style={{marginTop: 18}}>수업 뒤 질문 교실, 저녁 방과후, 간식, 두 번의 Study Hall. 고등학생의 평일은 학교가 설계한 리듬으로 흘러갑니다.</p>
              <div style={{marginTop: 28}}><TLink href="/daily-life" light>주말과 학생 활동까지 보기</TLink></div>
            </div>
            <div>
              <DayTimeline compact={false} />
              <p className="source">2025–26 학교생활안내 일과표 기준 · 학기별로 일부 시간이 조정될 수 있습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 07 BOARDING & STUDENT LIFE */}
      <section className="section" aria-labelledby="board-title">
        <div className="wrap">
          <SecHead no="06" eyebrow="Boarding &amp; Student Life" id="board-title"
            title={<>아이 혼자 보내도 괜찮을까,<br />관리 항목을 직접 확인하세요</>}
            lede="G6–G8은 기숙·통학 선택, G9–G12는 의무기숙입니다. 학교생활안내에 적힌 규정을 항목별로 옮겼습니다."
            action={<TLink href="/boarding">기숙사 자세히</TLink>} />
          <CareGrid items={CARE_ITEMS.slice(0, 9)} />
          <div className="split rev" style={{marginTop: 'clamp(64px, 7vw, 110px)'}}>
            <div>
              <span className="eyebrow">This Week's Meals</span>
              <h3 className="h2" style={{fontSize: 'clamp(26px, 2.6vw, 38px)', marginBottom: 26}}>이번 주, 아이가 먹는 밥</h3>
              <MealsWeek />
              <div style={{marginTop: 22}}><TLink href="/meals">주간 식단표 전체</TLink></div>
            </div>
            <div>
              <Img id="cafeteria" ratio="4x3" />
              <p className="cap">학교 직영 구내식당. 한식 중심으로 하루 세 끼와 평일 저녁 간식을 제공합니다.</p>
              <Img id="studyHall" ratio="4x3" className="" />
              <p className="cap">기숙생 Study Hall 자습실. 감독 교사가 학생별 학습을 확인합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight sand" aria-labelledby="life-title">
        <div className="wrap">
          <SecHead eyebrow="Beyond the Classroom" id="life-title" title={<>교실 밖에서도,<br />학교생활은 바쁩니다</>}
            lede="World Scholar's Cup, 모의유엔(MUN), English Play, 체육대회, 20여 개 동아리와 수요일 오후 Spoarts."
            action={<TLink href="/daily-life#activities">학생 활동</TLink>} />
          <div className="mosaic">
            {(['lifeMain', 'lifeA', 'lifeB', 'lifeC'] as const).map((slot, i) => {
              const p = photo(slot);
              return (
                <div key={slot} className={`photo m${i + 1}`}>
                  <img src={p.src} data-fallback={p.fallback} alt={p.alt} loading="lazy" />
                  <span className="label">{p.label}{p.sub && <small>{p.sub}</small>}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 08 TUITION */}
      <section className="section white" aria-labelledby="fee-title">
        <div className="wrap">
          <SecHead no="07" eyebrow="Tuition &amp; Scholarships" id="fee-title"
            title={<>그래서 1년에 얼마인지,<br />총액부터 보여 드립니다</>}
            lede="2026–27 모집요강 기준 신입생 첫해 기본 비용입니다(수업료·생활관비·교재비·입학등록비). 장학금은 수업료의 최대 50%까지 받을 수 있습니다."
            action={<a className="btn arrow" href="/tuition">우리 아이 학비 계산</a>} />
          <FeeExamples />
          <ul className="note-list">
            <li>방과후·Spoarts 수강료, 보험(연 300위안), 생활예치금, 생활복, 비자, 항공권은 포함하지 않았습니다.</li>
            <li>원화는 1 CNY ≈ 195원 기준 참고 환산입니다.</li>
          </ul>
        </div>
      </section>

      {/* 09 ADMISSIONS */}
      <section className="section" aria-labelledby="adm-title">
        <div className="wrap">
          <SecHead no="08" eyebrow="Admissions" id="adm-title" title={<>수시 모집, 학년별 선착순.<br />입학까지 8단계입니다</>}
            lede="초등은 서류심사만, 중·고등은 영어 지필(40분)과 영어 인터뷰(20분)를 봅니다. 한국에서는 화상으로 응시할 수 있습니다."
            action={<TLink href="/admissions">입학 절차 자세히</TLink>} />
          <ol className="steps">
            <li><h4>상담 · 학년 확인</h4><p>이수 학기와 영어 수준으로 지원 학년을 정합니다.</p></li>
            <li><h4>지원서 제출</h4><p>입학지원서, 중·고등은 자기소개서(G9+ 영어 권장).</p></li>
            <li><h4>서류심사</h4><p>성적표·재학증명서로 학력을 확인합니다.</p></li>
            <li><h4>영어시험 · 인터뷰</h4><p>지필 40분 + 인터뷰 20분.</p><span className="tag">중·고등만</span></li>
            <li><h4>합격 통보</h4><p>전형일로부터 3일 이내 개별 통지.</p></li>
            <li><h4>등록</h4><p>통지일로부터 7일 이내 등록금 납부.</p></li>
            <li><h4>비자 · 기숙사 준비</h4><p>X1 학생비자 약 2–3개월, 건강검진표 준비.</p></li>
            <li><h4>입학</h4><p>개학 하루 전 오후 기숙사 입사 권장.</p></li>
          </ol>
        </div>
      </section>

      {/* 10 LATEST FROM QDIS */}
      <section className="section white border" aria-labelledby="news-title">
        <div className="wrap">
          <SecHead no="09" eyebrow="Latest from QDIS" id="news-title" title="학교 소식, 필요한 것만 골라서" action={<TLink href="/news">소식 전체</TLink>} />
          <NewsList limit={5} />
        </div>
      </section>

      {/* 11 CONSULTATION */}
      <section className="section navy" aria-labelledby="consult-title" id="consult">
        <div className="wrap consult">
          <div>
            <span className="eyebrow">Consultation · TNS Worldwide</span>
            <h2 className="h2" id="consult-title">우리 아이에게<br />맞는 학교인지,<br />상담으로 확인하세요</h2>
            <p className="lede" style={{color: '#c7cfdb', marginTop: 18}}>지원 가능한 학년과 과정, 특례·전형 가능성, 기숙생활 적응, 실제 비용까지. 청도대원학교 한국 입학상담을 지원하는 TNS Worldwide가 안내합니다. 학교 방문 투어도 연결해 드립니다.</p>
            <Channels />
          </div>
          <ConsultForm />
        </div>
      </section>
    </>
  );
}
