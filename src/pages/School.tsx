import {PageHead, SecHead, Source, TLink, Toc, CtaBand, Img} from '@/components/common/ui';
import site from '@/data/site.json';
import facilityData from '@/data/facilities.json';

type FacilityPhoto = {id: string; src: string; width: number; height: number; alt: string; source_url: string};
const FACILITY_PHOTOS = (facilityData.photos ?? []) as FacilityPhoto[];

/* ---------------- About ---------------- */
export function About() {
  return (
    <>
      <PageHead crumb="학교소개" eyebrow="About QDIS" title={<>칭다오의 12년제 국제학교,<br />청도대원학교</>}
        lede="중국 산동성 교육국 인가 학교인 청도대원학교(靑島大元學校)의 국제부입니다. G1부터 G12까지 영어·중국어·한국어 3개 언어로 가르치고, 학생 대부분은 한국 학생입니다." />
      <Toc items={[['overview', '학교 개요'], ['recognition', '인가·학제'], ['heritage', '대원 교육의 뿌리'], ['students', '학생 구성'], ['campus', '캠퍼스와 위치'], ...(FACILITY_PHOTOS.length ? [['facilities', '학교 시설'] as [string, string]] : [])]} />

      <section className="section" id="overview">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow">Overview</span>
              <h2 className="h2">한국 학생을 위한<br />영어 중심 국제교육</h2>
            </div>
            <div>
              <p className="lede" style={{marginTop: 0}}>청도대원학교 국제부는 5-3-4 학제의 12년제 학교입니다. G1–G5는 초등(ESC), G6–G8은 중등(MSC), G9–G12는 고등(HSC) 과정이며, 9월에 새 학년이 시작됩니다.</p>
              <dl className="kv" style={{marginTop: 36}}>
                <dt>정식 명칭</dt><dd>靑島大元學校 국제부 · Qingdao Daewon International School (QDIS)</dd>
                <dt>인가</dt><dd>중국 산동성 교육국 정식 인가 학교 · 학생비자(X1) 발급 서류 지원</dd>
                <dt>학제</dt><dd>12년제 (초등 5 · 중등 3 · 고등 4), 9월 학기제 · 1년 2학기</dd>
                <dt>수업 일수</dt><dd>초등 주 5일, 중·고등 주 6일(토요일 오전 프로젝트·동아리)</dd>
                <dt>언어</dt><dd>영어·수학·사회·과학은 영어로, 중국어는 수준별 6단계, 한국어·한국사는 한국어로</dd>
                <dt>기숙</dt><dd>G6–G8 선택기숙 · G9–G12 의무기숙 · 4인 1실, 남녀 층 분리</dd>
                <dt>과정</dt><dd>GLP 국제반(G1–G12) · CLP 중국유학반(2026–27 G6–G10 모집)</dd>
                <dt>시험센터</dt><dd>College Board SAT(2018~)·AP(2019~), AMC, Math Kangaroo, ETS TOEFL Junior·모의 TOEFL</dd>
                <dt>학교 코드</dt><dd>CEEB(High School Code) {site.school.ceeb}</dd>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="section white" id="recognition">
        <div className="wrap">
          <SecHead eyebrow="Recognition & School System" title={<>정식 인가 학교인가요?<br />학제와 특례는 어떻게 보나요</>}
            lede="처음 알아보는 학부모가 가장 먼저 확인하는 세 가지를 분리해서 정리했습니다." />
          <div className="cols-3">
            <div>
              <span className="kicker">School Status</span>
              <h3 className="h3" style={{marginTop: 12}}>산동성 교육국 정식 인가</h3>
              <p className="small" style={{marginTop: 10}}>청도대원학교의 공식 명칭은 靑島大元學校이며, 학교 공식 FAQ는 중국 산동성 교육국의 정식 인가 학교라고 안내합니다. 국제부(QDIS)는 이 학교 안에서 국제교육과정을 운영합니다.</p>
            </div>
            <div>
              <span className="kicker">G1–G12</span>
              <h3 className="h3" style={{marginTop: 12}}>5·3·4의 12년제 학제</h3>
              <p className="small" style={{marginTop: 10}}>G1–G5 초등, G6–G8 중등, G9–G12 고등의 12년제이며 9월에 새 학년이 시작됩니다. 학생비자(X1)가 필요한 경우 학교가 관련 발급 서류를 지원합니다.</p>
            </div>
            <div>
              <span className="kicker">College Admissions</span>
              <h3 className="h3" style={{marginTop: 12}}>특례 자격은 별도로 확인</h3>
              <p className="small" style={{marginTop: 10}}>QDIS 입학 자체가 한국 대학 특례 자격을 만들어 주는 것은 아닙니다. 3년 특례·12년 특례·해외고 전형은 학생의 실제 해외 이수 이력과 각 전형 요건을 따로 확인해야 합니다.</p>
              <div style={{marginTop: 16}}><TLink href="/college-counseling">진학지도·특례 보기</TLink></div>
            </div>
          </div>
          <Source>청도대원학교 공식 FAQ · 2025–26 학교생활안내</Source>
        </div>
      </section>

      <section className="section dark" id="heritage">
        <div className="wrap">
          <div className="heritage">
            <div>
              <span className="eyebrow">Daewon Heritage</span>
              <h2 className="h2">대원에서 출발한 학교,<br />독립 이후에도 이어지는 교육의 뿌리</h2>
              <blockquote style={{marginTop: 30}}>“스승을 부모처럼, 제자를 자식처럼, 동문을 형제처럼.”</blockquote>
              <p className="small" style={{marginTop: 18}}>QDIS 교육지표 · “세계로 뻗는 품격 높은 큰 사람이 된다”</p>
            </div>
            <div>
              <p className="lede" style={{marginTop: 0}}>청도대원학교 국제부는 <strong>대원외고와 대원국제중을 설립한 한국 대원에서 출발</strong>했습니다. 현재는 한국 대원학원과 별도로 독립 운영되지만, 학생을 학업만이 아니라 생활과 진학까지 함께 보는 교육 철학을 QDIS의 현재 시스템에 맞게 발전시켜 왔습니다.</p>

              <div className="daewon-schoolline dark-line" aria-label="한국 대원학원 학교" style={{marginTop: 28}}>
                <span>한국 대원학원</span>
                <b>대원외고</b><i aria-hidden="true">·</i>
                <b>대원고</b><i aria-hidden="true">·</i>
                <b>대원여고</b><i aria-hidden="true">·</i>
                <b>대원국제중</b>
              </div>

              <div className="heritage-proof" style={{marginTop: 34}}>
                <div><b>학생관리</b><p>기숙사 사감, 야간 Study Hall, 휴대전화·외출 관리로 생활과 학습을 함께 봅니다.</p></div>
                <div><b>학업관리</b><p>영어·중국어·수학 수준별 수업과 방과후 심화학습, Thinkwave 학업관리로 학생별 진도를 관리합니다.</p></div>
                <div><b>진학관리</b><p>한국대·해외대 진학지도와 SAT·AP 준비, 교내 Test Center를 한 학교 안에서 연결합니다.</p></div>
              </div>

              <p className="heritage-note dark-note">현재 QDIS는 한국 대원학원과 별도로 독립 운영됩니다. 대원학원 학교명은 QDIS의 설립 배경과 교육적 뿌리를 설명하기 위해 표시합니다.</p>

              <ol className="history" style={{marginTop: 36}}>
                <li><b>2000</b><p>칭다오 이창구에서 모(母)학교 설립</p></li>
                <li><b>2012</b><p>청양구 신축 교사로 이전</p></li>
                <li><b>2014–15</b><p>중학부·고등부와 국제부(중·고) 신설</p></li>
                <li><b>2017</b><p>‘청도대원학교’로 교명 변경</p></li>
                <li><b>2018</b><p>국제부 첫 졸업생 배출, SAT 시험센터 승인</p></li>
                <li><b>2018–21</b><p>국제부 초등과정 신설, 12년 일관 교육체계 완성</p></li>
                <li><b>2025</b><p>개교 25주년, 국제부 중국유학반(CLP) 신설</p></li>
              </ol>
              <Source>2026 청도대원학교 브로셔 · 2025–26 학교생활안내</Source>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="students">
        <div className="wrap">
          <SecHead eyebrow="Students" title={<>누가 청도대원에<br />다니고 있을까요</>} />
          <div className="cols-3">
            <div>
              <h3 className="h3">한국에서 온 유학생</h3>
              <p className="small" style={{marginTop: 10}}>G6부터 기숙사에 들어갈 수 있어 학생 혼자 유학 오는 경우가 많습니다. 영미권 국제학교보다 가깝고 비용 부담이 적으면서, 영어로 공부하고 중국어까지 배울 수 있다는 점을 보고 선택합니다.</p>
            </div>
            <div>
              <h3 className="h3">중국 각지의 주재원 자녀</h3>
              <p className="small" style={{marginTop: 10}}>칭다오뿐 아니라 쑤저우·옌타이·웨이하이, 최근에는 상하이·베이징 지역에서도 옵니다. 부모가 먼저 귀임하고 학생이 남아 과정을 마무리하는 경우도 있습니다.</p>
            </div>
            <div>
              <h3 className="h3">해외에서 귀국을 앞둔 학생</h3>
              <p className="small" style={{marginTop: 10}}>미국·캐나다·동남아·중동 등에서 오래 공부하다 귀국을 앞둔 학생이 남은 해외 이수 기간을 한국과 가까운 칭다오에서 채우는 경우가 늘고 있습니다.</p>
            </div>
          </div>
          <p className="source">2025년 1월 학교 관계자 미팅 내용 기준. 학생 구성은 학년·학기에 따라 달라집니다.</p>
        </div>
      </section>

      <section className="section white" id="campus">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow">Campus &amp; Location</span>
              <h2 className="h2">칭다오 청양구,<br />한국에서 비행기로 한 시간</h2>
              <p className="lede" style={{marginTop: 18}}>학교는 칭다오 청양구(城阳区)에 있습니다. 한국에서 칭다오까지는 비행기로 한 시간 남짓이고, 방학 입·퇴사일에는 학교와 공항 사이 셔틀버스가 운행됩니다.</p>
              <dl className="kv" style={{marginTop: 28}}>
                <dt>주소</dt><dd>{site.school.address_cn}<br /><span className="small">{site.school.address_en}</span></dd>
                <dt>시설</dt><dd>교실동·기숙사(대원학사)·직영 구내식당·기숙생 자습실·도서관·보건실·운동장</dd>
                <dt>학교 방문</dt><dd>입학 전 학부모·학생 학교 투어를 할 수 있습니다. 상담 시 일정을 조율해 드립니다.</dd>
              </dl>
            </div>
            <div className="campus-gallery" style={{alignSelf: 'start'}}>
              <div className="campus-gallery-feature"><Img id="seminar" ratio="16x9" priority /><p className="cap">성균관대학교 입학 설명회</p></div>
              <div className="campus-gallery-grid">
                <div><Img id="studyHall" ratio="4x3" /><p className="cap">기숙생 자습실</p></div>
                <div><Img id="cafeteria" ratio="4x3" /><p className="cap">학교 직영 식당</p></div>
                <div><Img id="piDay2026" ratio="4x3" /><p className="cap">Pi Day 2026 · 수학 활동</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {FACILITY_PHOTOS.length > 0 && (
        <section className="section" id="facilities">
          <div className="wrap">
            <SecHead eyebrow="School Facilities" title={<>학교에서 생활하게 될 공간을<br />사진으로 확인하세요</>}
              lede="청도대원학교 공식 ‘학교 시설’ 페이지의 실제 사진입니다. 교실·공용공간·생활시설 등 캠퍼스 모습을 한곳에서 볼 수 있게 정리했습니다." />
            <div className="facility-gallery" aria-label="청도대원학교 학교 시설 사진">
              {FACILITY_PHOTOS.map((p, i) => (
                <figure className="facility-photo" key={p.id}>
                  <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading={i < 3 ? 'eager' : 'lazy'} />
                </figure>
              ))}
            </div>
            <Source href={facilityData.source_page}>청도대원학교 공식 학교 시설 페이지</Source>
          </div>
        </section>
      )}
      <CtaBand title="학교를 직접 보고 결정하고 싶다면" text="학교 방문 투어와 입학 상담을 함께 안내해 드립니다." />
    </>
  );
}

/* ---------------- Academics ---------------- */
const ELEM = [
  ['Mathematics', 'Elementary Math (싱가포르 Dimensions Math)', '주 4시간'],
  ['English', 'Integrated English, Phonics/Literature(수준별), Conversation/Debate · G4–5 Critical Reading, Grammar', '주 12–16시간'],
  ['Chinese', 'Chinese (수준별)', '주 7–9시간'],
  ['Korean', 'Korean Language and Literature', '주 3시간'],
  ['Social Studies · Science', 'G4–G5 영어로 수업', '각 주 2시간'],
  ['Arts · PE', 'Music, Art, Calligraphy, Dance(G1–3), Taekwondo(G4–5), P.E.', ''],
  ['Extracurricular', 'I.T.(G2–5), Coding(G4–5)', ''],
];
const MIDDLE = [
  ['Mathematics', 'Algebra 1-1 → Geometry 1 → Algebra 1-2 → Geometry 2 → Algebra 1-3 → Geometry 3', '학기당 4학점'],
  ['English', 'English Conversation, Critical Reading 1–3, Language Acquisition 1–3', '학기당 11학점'],
  ['Chinese', 'Chinese 6–8 (무학년 수준별)', '학기당 7학점'],
  ['Korean', 'Korean Language and Literature', '학기당 3학점'],
  ['Social Studies', 'World Geography → Integrated Social Studies → World History', '학기당 3학점'],
  ['Science', 'Integrated Science 1–3', '학기당 3학점'],
  ['Arts · PE · Spoarts', 'Music, Art, P.E., Spo-Arts Activity', ''],
  ['Extracurricular', '자율·동아리·봉사·진로 활동', '학기당 5학점'],
];
const HIGH = [
  ['Mathematics', 'Algebra 2 / Precalculus (G9–10) → Precalculus / Calculus, Probability & Statistics (G11) → Multivariable Calculus / Linear Algebra, Computer Science (G12)'],
  ['English', 'English Conversation, Academic Reading 1–4, Language and Composition 1–4'],
  ['Korean', 'Korean Language (G9–10), Creative Writing / Korean Literature·Composition 선택 (G11–12)'],
  ['Chinese', 'Chinese 9–12 (수준별)'],
  ['Social · Science', 'Psychology, Economics, Chemistry, Biology / Physics 선택'],
  ['G11–G12 선택 3과목', 'Advanced Chinese, Modern World History, Comparative Government & Politics, Human Geography, Korean History, Biology, Physics, Advanced Biology/Physics/Chemistry, Environmental Science'],
];

export function Academics() {
  return (
    <>
      <PageHead crumb="교육과정" eyebrow="Academics" title={<>영어로 배우고,<br />수준에 맞게 올라갑니다</>}
        lede="영어·수학·사회·과학은 영어로, 영어·중국어·수학은 수준별로 가르칩니다. 초등에서 기초를, 중등에서 학업 습관을, 고등에서 대학 지원에 필요한 성적을 만듭니다." />
      <Toc items={[['glp-clp', 'GLP · CLP'], ['how', '수업 방식'], ['elementary', '초등 G1–G5'], ['middle', '중등 G6–G8'], ['high', '고등 G9–G12'], ['grading', '성적 평가']]} />

      <section className="section white" id="glp-clp">
        <div className="wrap">
          <SecHead eyebrow="GLP vs CLP" title="두 과정의 차이, 한 번에" lede="대부분의 한국 학생은 GLP로 입학합니다. CLP는 중국 대학 진학을 목표로 2025년 신설된 과정입니다." />
          <div className="table-wrap">
            <table className="data-table compare">
              <thead><tr><th scope="col"><span className="sr-only">구분</span></th><th scope="col">GLP<small>GLOBAL LANGUAGE PROGRAM · 국제반</small></th><th scope="col">CLP<small>CHINESE LANGUAGE PROGRAM · 중국유학반</small></th></tr></thead>
              <tbody>
                <tr><th scope="row">목표</th><td>한국 대학(재외국민·해외고 전형)과 미국·홍콩·싱가포르·일본 등 해외 대학</td><td>중국 대학 (외국인 전형)</td></tr>
                <tr><th scope="row">주요 시험</th><td>SAT · AP · TOEFL (필요 시 HSK)</td><td>HSK · TOEFL</td></tr>
                <tr><th scope="row">언어 비중</th><td>제1외국어 영어, 제2외국어 중국어</td><td>제1외국어 중국어, 제2외국어 영어</td></tr>
                <tr><th scope="row">2026–27 모집 학급</th><td>G1–G8 각 1학급, G9–G12 각 2학급</td><td>G6–G10 각 1학급 (G11–G12 신규 모집 없음)</td></tr>
                <tr><th scope="row">학기당 수업료</th><td className="num">21,000 (G1–3) · 31,000 (G4–5) · 56,000 (G6–8) · 69,000 (G9–12)</td><td className="num">33,600 (G6–8) · 41,400 (G9–12)</td></tr>
              </tbody>
            </table>
          </div>
          <Source href="/documents/qdis-admissions-2026-27.pdf">2026–27학년도 모집요강 (단위: 위안)</Source>
        </div>
      </section>

      <section className="section" id="how">
        <div className="wrap">
          <SecHead eyebrow="How Classes Work" title="수업은 이렇게 진행됩니다" />
          <div className="pillars">
            <div className="pillar"><span className="kicker">English Immersion</span><h3>주요 과목은 영어로</h3><p>수학·사회·과학은 영어 몰입 수업입니다. 고등 SAT·AP 수업은 원서 교재로 진행하되, 이해가 부족하면 한국어로 보충 설명합니다.</p></div>
            <div className="pillar"><span className="kicker">Levelled Classes</span><h3>학년이 아니라 수준으로</h3><p>중·고등 영어는 무학년 수준별, 중국어는 기초반부터 HSK 고급반까지 6단계. 학기 초 레벨테스트로 반을 정합니다.</p></div>
            <div className="pillar"><span className="kicker">Textbooks</span><h3>한·미·중 교과서</h3><p>영어·사회·과학은 미국 원서, 초·중등 수학은 싱가포르 Dimensions Math, 고등 수학은 SAT·AP 교재, 한국어는 한국 교과서.</p></div>
            <div className="pillar"><span className="kicker">Beyond Class</span><h3>Spoarts와 프로젝트</h3><p>수요일 오후 Spoarts(스포츠·예술), 토요일 오전 Project Creativity와 동아리, 학기 6권 이상 독서 포트폴리오.</p></div>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="wrap">
          <div className="division" id="elementary">
            <div className="division-head"><span className="g">G1–G5</span><h2 className="h3">초등 과정 · 기초를 쌓는 5년</h2></div>
            <div className="split even">
              <div>
                <p className="lede" style={{marginTop: 0}}>주 5일 통학 과정입니다. 하루 40분 수업 8교시로, 영어 비중이 가장 크고 중국어를 매일 배웁니다. 음악·미술·서예와 태권도, 코딩, 1인 1악기(바이올린·플루트·첼로)가 정규 수업에 들어 있습니다.</p>
                <dl className="kv" style={{marginTop: 28}}>
                  <dt>전형</dt><dd>서류심사</dd>
                  <dt>생활</dt><dd>통학 (성양구 통학버스 · 학교 급식)</dd>
                  <dt>일과</dt><dd>08:00 Homeroom – 16:05 하교</dd>
                  <dt>방과후</dt><dd>바둑, Junior TOEFL, Arts &amp; Crafts, 인라인, 수학 심화·보충, 과학탐구 등 (학기별)</dd>
                  <dt>시험</dt><dd>TOEFL Primary(희망자), Math Kangaroo(G3 이상 필수)</dd>
                </dl>
              </div>
              <div className="table-wrap"><table className="data-table"><thead><tr><th>교과</th><th>과목</th><th>시수</th></tr></thead><tbody>{ELEM.map(r => <tr key={r[0]}><th scope="row">{r[0]}</th><td>{r[1]}</td><td className="num">{r[2]}</td></tr>)}</tbody></table></div>
            </div>
          </div>

          <div className="division" id="middle">
            <div className="division-head"><span className="g">G6–G8</span><h2 className="h3">중등 과정 · SAT·AP 이전의 학업 기초</h2></div>
            <div className="split even">
              <div>
                <p className="lede" style={{marginTop: 0}}>주 6일, 기숙·통학 선택. 영어·중국어·수학을 수준별로 배우고, 수학은 Algebra와 Geometry를 학기마다 번갈아 쌓아 고등 SAT·AP 수학으로 이어집니다.</p>
                <dl className="kv" style={{marginTop: 28}}>
                  <dt>전형</dt><dd>서류 · 영어 지필 40분 · 영어 인터뷰 20분</dd>
                  <dt>생활</dt><dd>선택기숙 · 기숙생은 Study Hall 1부 후 21:40 입실, 통학생 20:00 하교</dd>
                  <dt>방과후</dt><dd>Reading &amp; Grammar, TOEFL Junior, Literature Club, ESL Conversation, 1인 1악기, 요일별 독서</dd>
                  <dt>특색</dt><dd>수요일 Spoarts, 토요일 Project Creativity·동아리</dd>
                  <dt>시험</dt><dd>TOEFL Junior(정식 성적표) · Math Kangaroo · AMC 8</dd>
                </dl>
              </div>
              <div className="table-wrap"><table className="data-table"><thead><tr><th>교과</th><th>과목</th><th>학점</th></tr></thead><tbody>{MIDDLE.map(r => <tr key={r[0]}><th scope="row">{r[0]}</th><td>{r[1]}</td><td className="num">{r[2]}</td></tr>)}</tbody></table></div>
            </div>
          </div>

          <div className="division" id="high">
            <div className="division-head"><span className="g">G9–G12</span><h2 className="h3">고등 과정 · 대학 지원서에 들어갈 성적을 만드는 4년</h2></div>
            <div className="split even">
              <div>
                <p className="lede" style={{marginTop: 0}}>의무기숙. G9–G10은 공통 과목으로 기초를 다지고, G11–G12는 진로에 따라 사회·과학·중국어 선택 과목 3개를 고르는 선택교육과정입니다. 학교 GPA, SAT, AP, TOEFL을 함께 관리합니다.</p>
                <ul className="ruled" style={{marginTop: 28}}>
                  <li><b>School GPA</b><p>4.0 척도 절대평가. 상위 과정 가산점은 없습니다. 미국 상위권 대학은 GPA 3.5–4.0을 봅니다.</p></li>
                  <li><b>SAT</b><p>정규 수학·영어 수업 + 방과후 SAT 강좌, 교내 시험센터에서 연중 응시(2025–26 기준 8회).</p></li>
                  <li><b>AP</b><p>G11–12 선택과목과 방과후 AP 강좌로 준비, 5월 교내 AP 시험 응시. 학교 개설 과목 21개.</p></li>
                  <li><b>TOEFL</b><p>수준별 TOEFL 방과후 강좌, 교내 모의 TOEFL(실제 점수와 ±5점 내외).</p></li>
                </ul>
                <div style={{marginTop: 24, display: 'flex', gap: 22, flexWrap: 'wrap'}}><TLink href="/sat-ap">SAT·AP 시스템</TLink><TLink href="/college-counseling">대학별 준비 전략</TLink></div>
              </div>
              <div className="table-wrap"><table className="data-table"><thead><tr><th>교과</th><th>과목</th></tr></thead><tbody>{HIGH.map(r => <tr key={r[0]}><th scope="row">{r[0]}</th><td>{r[1]}</td></tr>)}</tbody></table></div>
            </div>
            <Source href="https://qdis.org/main/page.html?pid=113">2025–26 학교생활안내 Curriculum (Elementary · Middle · High School)</Source>
          </div>
        </div>
      </section>

      <section className="section" id="grading">
        <div className="wrap wrap-narrow">
          <span className="eyebrow">Grading</span>
          <h2 className="h2" style={{marginBottom: 24}}>성적은 4.0 척도, 절대평가</h2>
          <div className="table-wrap"><table className="data-table"><thead><tr><th>Letter</th><th>A</th><th>B</th><th>C</th><th>D</th><th>F</th></tr></thead><tbody>
            <tr><th scope="row">Percent</th><td>90–100</td><td>80–89</td><td>70–79</td><td>60–69</td><td>60 미만</td></tr>
            <tr><th scope="row">Point</th><td>4</td><td>3</td><td>2</td><td>1</td><td>0</td></tr>
          </tbody></table></div>
          <ul className="note-list"><li>체육·미술·음악·컴퓨터·Individual Research는 Pass/No Pass로 평가합니다.</li><li>학부모는 Thinkwave에서 과제·출결·성적을 수시로 확인할 수 있습니다.</li></ul>
        </div>
      </section>
      <CtaBand title="우리 아이는 몇 학년으로, 어떤 과정에?" text="이수 학기와 영어 수준을 보고 지원 학년과 과정을 함께 정해 드립니다." />
    </>
  );
}

/* ---------------- SAT · AP ---------------- */
export function SatAp() {
  return (
    <>
      <PageHead crumb="SAT·AP·시험센터" eyebrow="SAT · AP · Test Center" title={<>SAT·AP를 준비하는 교실이,<br />시험을 보는 교실입니다</>}
        lede="청도대원은 College Board 공식 SAT(2018~)·AP(2019~) 시험센터입니다. 정규 수업과 방과후 강좌로 준비하고, 해외 시험장을 찾아다니지 않고 학교에서 응시합니다." />
      <Toc items={[['system', '준비 구조'], ['ap', 'AP 과목'], ['centers', '시험센터'], ['calendar', '응시 일정·비용']]} />
      <section className="section white" id="system">
        <div className="wrap">
          <SecHead eyebrow="How It Works" title={<>수업 → 방과후 → 교내 응시,<br />세 단계가 한 학교 안에</>} />
          <ol className="steps" style={{gridTemplateColumns: 'repeat(3, minmax(0,1fr))'}}>
            <li><h4>정규 수업</h4><p>고등 수학은 SAT·AP 교재, 영어·사회·과학은 미국 원서로 수업합니다. G11–G12는 진로에 맞춰 심화 선택과목 3개를 고릅니다.</p></li>
            <li><h4>방과후 강좌 (18:00–19:50)</h4><p>AP Calculus BC·Statistics·Chemistry·Biology·Physics·Psychology·Economics·World History·Human Geography, SAT, TOEFL, 에세이. 학기당 2,600–3,920위안.</p></li>
            <li><h4>교내 시험센터 응시</h4><p>SAT는 2025–26 기준 연 8회, AP는 매년 5월 교내 응시. 익숙한 교실에서 시험을 봅니다.</p></li>
          </ol>
          <p className="lede" style={{marginTop: 40}}>한국 고등학교는 공인시험 성적이나 교외 수상 실적을 대학에 제출할 수 없지만, 해외 고등학교 학생은 SAT·AP·TOEFL 성적을 한국 대학 재외국민 특별전형과 해외고 전형에 제출할 수 있습니다. 그래서 같은 준비가 해외 대학과 한국 대학 지원에 모두 쓰입니다.</p>
        </div>
      </section>
      <section className="section" id="ap">
        <div className="wrap">
          <SecHead eyebrow="AP Courses" title="학교 개설 AP 과목 21개" lede="시험센터에서 응시 가능한 과목과 학교가 정규·방과후로 가르치는 과목은 다를 수 있습니다." />
          <div className="cols-4">
            {[['Math · CS', ['Calculus AB', 'Calculus BC', 'Precalculus', 'Statistics', 'Computer Science A']], ['Sciences', ['Chemistry', 'Biology', 'Physics 1', 'Physics 2', 'Physics C: Mechanics', 'Physics C: E&M', 'Environmental Science']], ['History · Social', ['Comparative Gov. & Politics', 'Macroeconomics', 'Microeconomics', 'Psychology', 'Human Geography', 'World History: Modern']], ['Languages · English', ['Chinese', 'English Language & Composition', 'English Literature & Composition']]].map(([h, list]) => (
              <div key={h as string}><h3 className="kicker" style={{color: 'var(--brass)', marginBottom: 12}}>{h as string}</h3><ul className="ruled">{(list as string[]).map(c => <li key={c} style={{gridTemplateColumns: '1fr', padding: '10px 0'}}>{c}</li>)}</ul></div>
            ))}
          </div>
          <Source>2025–26 학교생활안내 ‘SAT, AP 시험 과목’</Source>
        </div>
      </section>
      <section className="section white" id="centers">
        <div className="wrap">
          <SecHead eyebrow="On-campus Test Centers" title="학교에서 볼 수 있는 시험" />
          <ul className="ruled">
            <li><b>SAT</b><p>2018년 8월 College Board 승인. 디지털 SAT(Reading and Writing 64분 + Math 70분), 미국과 같은 일정·규정으로 운영합니다. 등록은 College Board에서 개별 신청.</p></li>
            <li><b>AP</b><p>2019년 1월 승인. 1차(9–11월)·2차(11–3월) 신청, 5월 Regular·Late 시험. 학교 코드(CEEB) 694045.</p></li>
            <li><b>AMC 8 · 10 · 12</b><p>미국수학협회 경시대회. 상위권은 AIME 응시 자격. 교내 대면 응시(10명 미만이면 온라인 전환).</p></li>
            <li><b>Math Kangaroo</b><p>2021년 유치. G3–G8 필수 응시, G1–2·G9–12 선택. 응시료 180위안.</p></li>
            <li><b>TOEFL Primary · Junior · 모의 TOEFL</b><p>2024년 ETS 협약. 매년 2학기 영어능력평가로 G4–G11 전원 응시(G1–3·G12 희망). TOEFL Junior는 공식 성적표 발급, 응시료 290위안.</p></li>
          </ul>
          <Source>2025–26 학교생활안내 Test Center 운영 안내. 시험별 현재 운영 여부와 일정은 학기별 공지로 확인합니다.</Source>
        </div>
      </section>
      <section className="section" id="calendar">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow">Dates &amp; Fees</span>
              <h2 className="h2">응시 일정과 비용</h2>
              <p className="lede" style={{marginTop: 18}}>2025–26 학교생활안내 기준입니다. 매년 일정과 응시료는 학교 공지로 새로 안내됩니다.</p>
            </div>
            <div>
              <div className="table-wrap"><table className="data-table">
                <thead><tr><th>구분</th><th>내용 (2025–26 기준)</th></tr></thead>
                <tbody>
                  <tr><th scope="row">SAT 2025–26</th><td>2025. 8.23 · 9.13 · 10.4 · 11.8 · 12.6 / 2026. 3.14 · 5.2 · 6.6</td></tr>
                  <tr><th scope="row">AP 신청 1차</th><td>9월 초 – 11월 초 · 과목당 1,470위안 (또는 28만 원)</td></tr>
                  <tr><th scope="row">AP 신청 2차</th><td>11월 중순 – 3월 초 · 과목당 1,740위안 (또는 33만 원)</td></tr>
                  <tr><th scope="row">AP 시험</th><td>5월 첫째·둘째 주 Regular, 셋째 주 Late</td></tr>
                </tbody>
              </table></div>
              <Source>2025–26 학교생활안내 ‘Test Center 운영 안내’</Source>
            </div>
          </div>
        </div>
      </section>
      <CtaBand title="AP·SAT 목표 점수에 맞춘 학년별 계획이 궁금하다면" text="현재 성적과 목표 대학을 기준으로 준비 로드맵을 함께 짜 드립니다." />
    </>
  );
}
