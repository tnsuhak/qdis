import {Img, SecHead, TLink} from '@/components/common/ui';
import {LatestOffers} from '@/components/results/Results';
import {DayTimeline, MealsWeek, KeyBoarding} from '@/components/life/Life';
import {FeeExamples} from '@/components/tuition/Tuition';
import {NewsList} from '@/components/news/News';
import {ConsultForm, Channels} from '@/components/common/Consult';
import {photo} from '@/lib/qdis/photos';
import {cumulative, ANNUAL} from '@/lib/qdis/results';

const HEADLINE = ['서울대', '연세대 의대', '고려대', 'HKU', 'HKUST', 'NUS', 'UC Berkeley', 'USC'];

export default function Home() {
  const hero = photo('hero');
  const cum = cumulative();
  const kr = cum.byCountry.find(c => c[0] === 'KR')?.[1] ?? 0;
  const latestYear = ANNUAL[0];
  return (
    <>
      {/* 01 HERO — 고해상도 사진 확보 전까지 타이포 중심, 사진은 원본 크기에 가깝게 */}
      <section className="hero2" aria-labelledby="hero-title">
        <div className="wrap hero2-grid">
          <div>
            <span className="eyebrow">Qingdao Daewon International School · G1–G12</span>
            <h1 className="display" id="hero-title">칭다오에서 준비하는<br />한국·세계 대학 진학</h1>
            <p className="hero-sub">SAT·AP 수업과 교내 시험센터, 기숙사와 야간 자율학습, 한국대·해외대 진학지도까지 한 학교 안에서 이어집니다.</p>
            <div className="hero-actions">
              <a className="btn light arrow" href="/university-results">대학 합격 결과</a>
              <a className="tlink light" href="/tuition">연간 학비 계산</a>
            </div>
          </div>
          <figure className="hero2-photo">
            <span className="frame"><img src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} fetchPriority="high" /></span>
            <figcaption>Pi Day 2026 · 청도대원 학생 활동</figcaption>
          </figure>
        </div>
        <div className="wrap">
          <div className="hero-facts">
            <div><b className="num">{latestYear.total_offers}건</b><span>2025–26 대입결과<br />제8기 · 2025.09.18 기준</span></div>
            <div><b>SAT · AP</b><span>College Board<br />교내 시험센터</span></div>
            <div><b>G9–G12</b><span>의무기숙<br />매일 밤 Study Hall</span></div>
            <div><b className="num">69,000위안</b><span>고등 GLP 학기당 수업료<br />2026–27</span></div>
          </div>
        </div>
      </section>

      {/* 02 UNIVERSITY RESULTS */}
      <section className="section dark" aria-labelledby="results-title">
        <div className="wrap">
          <SecHead no="01" eyebrow="University Results" id="results-title"
            title={<>한국 대학부터<br />미국·홍콩·싱가포르까지</>}
            action={<TLink href="/university-results" light>대학별 결과 검색</TLink>} />
          <div className="big-trio">
            <div><b className="num">{cum.total}</b><span>2020–2026 대입결과</span></div>
            <div><b className="num">{kr}</b><span>한국 대학</span></div>
            <div><b className="num">{cum.total - kr}</b><span>해외 대학</span></div>
          </div>
          <p className="source trio-note">공식 연도별 종합자료 공개 학년도 합계 · 중복 합격 포함 · <a href="/university-results#method">자료 기준</a></p>

          <div className="latest-block">
            <span className="eyebrow">Selected Outcomes</span>
            <ul className="headline-offers" aria-label="주요 대학 합격 실적">
              {HEADLINE.map(h => <li key={h}>{h}<span aria-hidden="true">/</span></li>)}
            </ul>
            <div style={{marginTop: 34}}><span className="eyebrow">Latest Offers</span><LatestOffers limit={8} /></div>
            <p className="source">학교 진학정보 게시판 개별 합격 소식 · 연도별 합계와 별도</p>
          </div>
        </div>
      </section>

      {/* 03 DAEWON HERITAGE · WHY QDIS */}
      <section className="section heritage-home-section" aria-labelledby="heritage-home-title">
        <div className="wrap">
          <SecHead no="02" eyebrow="Daewon Heritage · Why QDIS" id="heritage-home-title"
            title={<>대원에서 시작된 교육 DNA,<br />학생관리와 진학 시스템으로 이어집니다</>}
            action={<TLink href="/about#heritage">설립 배경 자세히</TLink>} />

          <div className="heritage-bridge">
            <div>
              <p className="heritage-lead">청도대원학교는 <strong>대원외고와 대원국제중을 설립한 한국 대원</strong>에서 출발했습니다. 현재는 한국 대원학원과 별도로 독립 운영되지만, 학생의 학업·생활·진학을 학교 안에서 연결해 관리하는 방식은 QDIS의 현재 시스템으로 발전해 왔습니다.</p>
              <div className="daewon-schoolline" aria-label="한국 대원학원 학교">
                <span>한국 대원학원</span>
                <b>대원외고</b><i aria-hidden="true">·</i>
                <b>대원고</b><i aria-hidden="true">·</i>
                <b>대원여고</b><i aria-hidden="true">·</i>
                <b>대원국제중</b>
              </div>
            </div>
            <blockquote>“스승을 부모처럼,<br />제자를 자식처럼,<br />동문을 형제처럼.”</blockquote>
          </div>

          <div className="pillars" style={{marginTop: 'clamp(46px,5vw,76px)'}}>
            <div className="pillar">
              <span className="kicker">Student Care</span>
              <h3>생활까지 보는 학생관리</h3>
              <p>G6–G8 선택기숙, G9–G12 의무기숙. 사감·야간 Study Hall·휴대전화·외출 관리까지 학교생활을 하나의 흐름으로 운영합니다.</p>
              <TLink href="/boarding">기숙사·학생관리</TLink>
            </div>
            <div className="pillar">
              <span className="kicker">Academics</span>
              <h3>SAT·AP가 정규 수업 안에</h3>
              <p>주요 과목을 영어로 배우고, 수준별 수업과 방과후 심화학습으로 보강하며 교내 시험센터에서 SAT·AP를 응시합니다.</p>
              <TLink href="/sat-ap">SAT·AP 시험센터</TLink>
            </div>
            <div className="pillar">
              <span className="kicker">University Outcomes</span>
              <h3>결과로 확인되는 진학</h3>
              <p>한국 대학과 미국·홍콩·싱가포르 등 해외 대학까지, 학교가 공개한 연도별 합격 결과와 최신 개별 합격 소식을 확인할 수 있습니다.</p>
              <TLink href="/university-results">대학 합격 결과</TLink>
            </div>
            <div className="pillar">
              <span className="kicker">College Counseling</span>
              <h3>한국대와 해외대를 함께</h3>
              <p>한국대·해외대 진학지도를 구분해 운영하고, SAT·AP·TOEFL과 대학별 지원전략을 학년별로 연결합니다.</p>
              <TLink href="/college-counseling">진학지도·특례</TLink>
            </div>
          </div>

          <p className="heritage-note">현재 QDIS는 한국 대원학원과 별도로 독립 운영됩니다. 위 내용은 학교의 설립 배경과 교육적 뿌리, 현재 QDIS의 운영 시스템을 설명합니다.</p>
        </div>
      </section>

      {/* 04 ACADEMICS */}
      <section className="section white" aria-labelledby="acad-title">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="sec-no">03</span>
              <span className="eyebrow">Academics</span>
              <h2 className="h2" id="acad-title">준비도 학교에서,<br />시험도 학교에서</h2>
              <p className="lede" style={{marginTop: 18}}>SAT·AP 준비가 정규 수업과 방과후 수업 안에 들어 있습니다. 2018년부터 SAT, 2019년부터 AP 공식 시험센터입니다.</p>
              <div style={{marginTop: 28, display: 'flex', gap: 22, flexWrap: 'wrap'}}>
                <TLink href="/academics">학년별 교육과정</TLink>
                <TLink href="/sat-ap">SAT·AP·시험센터</TLink>
              </div>
            </div>
            <div className="table-wrap">
              <table className="data-table compare">
                <caption className="sr-only">GLP와 CLP 비교</caption>
                <thead>
                  <tr><th scope="col"><span className="sr-only">구분</span></th><th scope="col">GLP<small>국제반</small></th><th scope="col">CLP<small>중국유학반</small></th></tr>
                </thead>
                <tbody>
                  <tr><th scope="row">목표 대학</th><td>한국·미국·홍콩·싱가포르 등</td><td>중국 대학</td></tr>
                  <tr><th scope="row">주요 시험</th><td>SAT · AP · TOEFL</td><td>HSK · TOEFL</td></tr>
                  <tr><th scope="row">수업 언어</th><td>영어 중심</td><td>중국어 중심</td></tr>
                  <tr><th scope="row">2026–27 모집</th><td>G1–G12</td><td>G6–G10</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 05 A DAY AT QDIS */}
      <section className="section dark" aria-labelledby="day-title">
        <div className="wrap">
          <div className="split">
            <div className="sticky-col">
              <span className="sec-no">04</span>
              <span className="eyebrow">A Day at QDIS</span>
              <h2 className="h2" id="day-title">수업 → 방과후 → 저녁<br />→ 자율학습 → 기숙사</h2>
              <p className="lede" style={{marginTop: 18}}>아침 7시 기상부터 밤 11시 Study Hall까지, 고등학생의 평일입니다.</p>
              <div style={{marginTop: 28}}><TLink href="/daily-life" light>주말·학생 활동까지</TLink></div>
            </div>
            <div>
              <DayTimeline compact />
              <p className="source">2025–26 학교생활안내 일과표 기준</p>
            </div>
          </div>
        </div>
      </section>

      {/* 06 BOARDING & LIFE */}
      <section className="section" aria-labelledby="board-title">
        <div className="wrap">
          <SecHead no="05" eyebrow="Boarding &amp; Student Life" id="board-title"
            title={<>아이 혼자 보내도 괜찮을까</>}
            lede="G6–G8 선택기숙 · G9–G12 의무기숙. 가장 많이 묻는 다섯 가지입니다."
            action={<TLink href="/boarding">기숙사 규정 전체</TLink>} />
          <KeyBoarding />
          <div className="split rev" style={{marginTop: 'clamp(64px, 7vw, 104px)'}}>
            <div>
              <span className="eyebrow">This Week's Meals</span>
              <h3 className="h2" style={{fontSize: 'clamp(26px, 2.6vw, 38px)', marginBottom: 26}}>이번 주, 아이가 먹는 밥</h3>
              <MealsWeek />
              <div style={{marginTop: 22}}><TLink href="/meals">주간 식단표</TLink></div>
            </div>
            <div className="photo-pair">
              <div><Img id="cafeteria" ratio="4x3" /><p className="cap">학교 직영 구내식당</p></div>
              <div><Img id="studyHall" ratio="4x3" /><p className="cap">기숙생 Study Hall</p></div>
            </div>
          </div>
          <div className="life-tiles" aria-label="학생 활동">
            {(['lifeMain', 'lifeA', 'lifeB', 'lifeC'] as const).map(slot => {
              const p = photo(slot);
              return (
                <a key={slot} className="life-tile" href="/daily-life#activities">
                  <span className="photo r-4x3"><img src={p.src} data-fallback={p.fallback} alt={p.alt} loading="lazy" /></span>
                  <b>{p.label}</b>{p.sub && <small>{p.sub}</small>}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 07 TUITION */}
      <section className="section white" aria-labelledby="fee-title">
        <div className="wrap">
          <SecHead no="06" eyebrow="Tuition &amp; Scholarships" id="fee-title"
            title={<>1년 비용, 총액부터</>}
            lede="2026–27 모집요강 기준 신입생 첫해 기본 비용. 장학금은 수업료의 최대 50%."
            action={<TLink href="/tuition">우리 아이 학비 계산</TLink>} />
          <FeeExamples />
          <p className="source">방과후·보험·예치금·비자·항공권 별도 · 원화는 참고용 환산(적용 환율은 학비 계산기에 표시)</p>
        </div>
      </section>

      {/* 08 ADMISSIONS */}
      <section className="section" aria-labelledby="adm-title">
        <div className="wrap">
          <SecHead no="07" eyebrow="Admissions" id="adm-title" title="입학은 수시 모집, 학년별 선착순" action={<TLink href="/admissions">입학 절차</TLink>} />
          <div className="stat-row">
            <div><b>수시 모집</b><span>학년별 정원이 차면 마감</span></div>
            <div><b>서류심사</b><span>초등 G1–G5 전형</span></div>
            <div><b>영어 60분</b><span>중·고등: 지필 40분 + 인터뷰 20분<br />한국에서 화상 응시 가능</span></div>
            <div><b>2–3개월</b><span>학생비자(X1) 준비 기간</span></div>
          </div>
        </div>
      </section>

      {/* 09 LATEST FROM QDIS */}
      <section className="section white" aria-labelledby="news-title">
        <div className="wrap">
          <SecHead no="08" eyebrow="Latest from QDIS" id="news-title" title="학교 소식" action={<TLink href="/news">소식 전체</TLink>} />
          <NewsList limit={3} />
        </div>
      </section>

      {/* 10 CONSULTATION */}
      <section className="section navy" aria-labelledby="consult-title" id="consult">
        <div className="wrap consult">
          <div>
            <span className="eyebrow">Consultation · TNS Worldwide</span>
            <h2 className="h2" id="consult-title">우리 아이에게<br />맞는 학교인지</h2>
            <p className="lede" style={{color: '#c7cfdb', marginTop: 18}}>지원 학년과 과정, 특례·전형, 기숙생활, 실제 비용을 한국어로 안내합니다. 학교 방문 투어도 연결해 드립니다.</p>
            <Channels />
          </div>
          <ConsultForm />
        </div>
      </section>
    </>
  );
}
