import {PageHead, SecHead, Source, TLink, Toc, CtaBand, Img} from '@/components/common/ui';
import {DayTimeline, MealsWeek, Weekend, KeyBoarding, OTHER_CARE} from '@/components/life/Life';
import schedule from '@/data/life/schedule.json';
import {photo} from '@/lib/qdis/photos';

export function BoardingPage() {
  return (
    <>
      <PageHead crumb="기숙사·학생관리" eyebrow="Boarding & Student Management"
        title={<>혼자 보내는 부모의 질문에,<br />규정으로 답합니다</>}
        lede="청도대원 기숙사(대원학사)는 G6–G8 선택기숙, G9–G12 의무기숙입니다. 4인 1실, 남·여 층 분리, 남녀 사감이 생활을 관리하고 공부는 기숙사와 분리된 자습실에서 합니다." />
      <Toc items={[['who', '핵심 5가지'], ['management', '학생관리 시스템'], ['care', '생활 규정'], ['phone', '휴대전화'], ['weekend', '외출·외박'], ['health', '건강·응급'], ['prepare', '입사 준비']]} />

      <section className="section white" id="who">
        <div className="wrap">
          <SecHead eyebrow="Key Facts" title="먼저 확인할 다섯 가지" />
          <KeyBoarding />
          <div className="cols-2 boarding-photo-pair" style={{marginTop: 'clamp(38px,4vw,58px)'}}>
            <div><Img id="dormRoom" ratio="3x2" /><p className="cap">기숙사 4인실 · 개인 수납장과 2층 침대</p></div>
            <div><Img id="studyHall" ratio="3x2" /><p className="cap">기숙생 전용 Study Hall</p></div>
          </div>
          <div className="split" style={{marginTop: 'clamp(56px,6vw,96px)'}}>
            <div>
              <span className="eyebrow">Why Boarding</span>
              <h2 className="h2">생활관 옆에,<br />공부하는 자습실</h2>
            </div>
            <div className="prose">
              <p className="lede" style={{marginTop: 0}}>기숙제는 원거리 학생의 편의뿐 아니라, 방과후 학습·토론·동아리처럼 학교 안에서 배우는 시간을 늘리기 위한 제도입니다.</p>
              <p>야간 자율학습은 기숙사가 아닌 기숙생 전용 자습실에서 하고, 감독 교사가 학생별 학습 상황을 확인합니다. 일과 중에는 기숙사에 들어갈 수 없고, 기숙사 안에서는 학업 목적 허가 없이 노트북을 쓸 수 없습니다.</p>
              <p>남녀 사감이 각각 남학생·여학생을 지도하고, 교사들이 사감 업무를 돕습니다. 신입생에게는 사감이 생활 규칙을 설명하고 건강과 심리 상태를 살피며 필요하면 면담합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section sand" id="management">
        <div className="wrap">
          <SecHead eyebrow="Student Management" title="담임·사감·교사가 나눠 보는 게 아니라, 한 학생의 하루를 연결해서 봅니다" lede="QDIS의 학생관리는 기숙사 통제만을 뜻하지 않습니다. 학업·생활·건강·학부모 소통을 서로 연결해 학생이 학교 안에서 어떻게 지내는지 확인하는 구조입니다." />
          <div className="mgmt-layout">
            <figure className="mgmt-photo">
              <Img id="studentMeeting2026" />
              <p className="cap">2025–26학년도 2학기 학생 간담회 · 학생들과 교사가 학교생활을 두고 이야기를 나누는 자리</p>
            </figure>
            <div className="pillars stack">
              <div className="pillar"><span className="kicker">Homeroom</span><h3>담임</h3><p>학교생활과 학업 상황을 확인하고 학부모와 소통합니다. 필요한 경우 사감·교과 교사와 학생 상황을 공유합니다.</p></div>
              <div className="pillar"><span className="kicker">Dormitory</span><h3>남녀 사감</h3><p>기숙사 생활규칙과 귀소, 야간 건강상태를 관리하고 응급상황에는 병원 동행과 보호자 연락을 맡습니다.</p></div>
              <div className="pillar"><span className="kicker">Study Hall</span><h3>감독 교사</h3><p>야간 자율학습을 별도 자습실에서 운영하며 학생별 학습 상황과 참여를 확인합니다.</p></div>
              <div className="pillar"><span className="kicker">Parent View</span><h3>Thinkwave · WeChat</h3><p>학부모는 Thinkwave에서 과제·출결·성적을 확인하고, 담임과 기숙사 WeChat을 통해 생활 상황을 공유받습니다.</p></div>
            </div>
          </div>
          <Source>2025–26 학교생활안내 ‘기숙사 생활 안내’·‘생활 지도’·학부모 소통 안내</Source>
        </div>
      </section>

      <section className="section" id="care">
        <div className="wrap">
          <SecHead eyebrow="Daily Rules" title="생활관리 세부 규정" lede="하루 일과와 급식은 각각 전용 페이지로 분리하고, 여기에는 기숙생활 관리에 필요한 규정만 남겼습니다." />
          <div className="other-care">
            {OTHER_CARE.map(([k, d]) => <div key={k}><b>{k}</b><p>{d}</p></div>)}
          </div>
          <Source href="https://qdis.org/faq/list.html?pid=26&cate1=">2025–26 학교생활안내 ‘기숙사 생활 안내’·‘생활 지도’, 청도대원학교 공식 FAQ</Source>
        </div>
      </section>

      <section className="section dark" id="phone">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow">Phones &amp; Devices</span>
              <h2 className="h2">휴대전화는<br />정해진 시간에만</h2>
              <p className="lede" style={{marginTop: 18}}>평일 휴대전화는 저녁 식사 시간 한 시간 남짓만 손에 쥡니다. 노트북·태블릿의 게임·영상도 같은 시간대, 교실동에서만 허용됩니다.</p>
            </div>
            <div>
              <ul className="ruled">
                {schedule.phone_policy.map(p => <li key={p.when}><b>{p.when}</b><p>{p.rule}</p></li>)}
                <li><b>위반 시</b><p>1회 1주, 2회 4주, 3회 1학기 압수. 압수 기간 급한 연락은 담임 허락 후 사용</p></li>
                <li><b>기숙사 안</b><p>학업 목적 허가 외 노트북 사용 불가 · 모니터가 복도에서 보이는 자리에서 사용</p></li>
              </ul>
              <Source>2025–26 학교생활안내 ‘휴대전화 사용 규정 요약’</Source>
            </div>
          </div>
        </div>
      </section>

      <section className="section white" id="weekend">
        <div className="wrap">
          <SecHead eyebrow="Leave Rules" title="외출·외박은 보호자 동의와 귀소 시간까지 관리합니다" lede="주말 시간표 자체는 하루 일과 페이지에서, 여기서는 기숙생 외출·외박 규정과 귀소 기준만 정리합니다." />
          <div style={{marginBottom: 34}}><TLink href="/daily-life#weekend">토·일 실제 일과 보기</TLink></div>
          <ul className="ruled">
            <li><b>신청</b><p>보호자(또는 법정대리인)가 서명한 외출·외박 동의서를 매주 금요일 17:00까지(공휴일은 2일 전) 기숙사 학부모 WeChat 방에 제출</p></li>
            <li><b>귀소</b><p>외출은 당일 17:00, 외박은 지정된 방문처에서 머문 뒤 귀소일 17:00까지. 공휴일도 같습니다.</p></li>
            <li><b>방학</b><p>여름·겨울방학과 노동절·국경절 단기방학 입·퇴사일에 학교–공항 셔틀버스 운행. 학기 중 입·출국은 학교장 사전 허가 필요</p></li>
            <li><b>입사</b><p>방학 후에는 개학 하루 전 13:00–17:00 입사를 권장합니다.</p></li>
          </ul>
        </div>
      </section>

      <section className="section" id="health">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow">Health &amp; Emergency</span>
              <h2 className="h2">아플 때,<br />누가 옆에 있나요</h2>
            </div>
            <ol className="ruled">
              <li><b>수업 중</b><p>교과 교사 확인 후 보건실로 인계, 기본 1시간 휴식. 보건교사 판단에 따라 연장하거나 병원으로 이송합니다.</p></li>
              <li><b>방과후·야간</b><p>기숙사 사감이 응급조치 후 인근 병원 담당의에게 데려가 진료합니다. 다음 날 보건실에서 상태를 다시 확인합니다.</p></li>
              <li><b>병원 진료</b><p>담임과 학부모 확인 후 사감 또는 행정 직원이 동행합니다.</p></li>
              <li><b>응급 이송</b><p>사감이 즉시 동행해 병원으로 옮기고, 동시에 담임과 학부모에게 연락합니다.</p></li>
              <li><b>입원·귀국 치료</b><p>상태가 악화되거나 입원이 필요하면 보호자 동의에 따라 입원 또는 일시 귀국 치료를 합니다.</p></li>
              <li><b>보험</b><p>G1–G12 전원 학생상해보험(단체) 의무 가입, 연 300위안. 중국 내 사고·질병 입원·치료비 보장.</p></li>
              <li><b>상시 복용약</b><p>지병으로 먹는 약은 보호자가 종류와 용법을 학교에 미리 알립니다.</p></li>
            </ol>
          </div>
        </div>
      </section>

      <section className="section white" id="prepare">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow">Move-in Checklist</span>
              <h2 className="h2">입사할 때<br />챙길 것</h2>
              <p className="lede" style={{marginTop: 18}}>이불·베개·침대 시트·패드는 학교가 1인 1개씩 지급합니다. 개인 물품에는 영문 이름을 써 주세요.</p>
            </div>
            <div className="cols-2">
              <div className="prose"><h3>생활</h3><ul><li>간편복·잠옷, 주말 외출복, 교복·생활복</li><li>운동화·실내화·욕실화</li><li>양말·속옷 1주일 분량, 수건 5장, 옷걸이 10개</li><li>세면도구, 개인 상비약(기본 상비약은 학교에 있음)</li><li>(선택) 영문 이름을 쓴 세탁망</li></ul></div>
              <div className="prose"><h3>학습</h3><ul><li>학기당 6권 이상 읽을 도서(진로 관련 포함, 전자책 가능)</li><li>개인 참고서</li><li>노트북·태블릿 (규정에 따라 사용 제한)</li><li>악기 (오케스트라·레슨 해당자)</li></ul><h3>가져오지 않을 것</h3><ul><li>전기히터·전기장판·고데기 등 전열기구</li><li>고가 귀중품, 많은 현금</li></ul></div>
            </div>
          </div>
        </div>
      </section>
      <CtaBand title="기숙사 배정과 입사 일정이 궁금하다면" text="학년별 기숙사 수용 인원에 따라 남녀 모집 가능 인원이 달라질 수 있습니다. 지원 전에 확인해 드립니다." />
    </>
  );
}

export function DailyLifePage() {
  const acts: Array<[string, string, string]> = [
    ['lifeMain', '체육대회', '제9회 청도대원 체육대회 (2026년 6월)'],
    ['lifeA', '대학 입학설명회', '국내외 대학 관계자가 학교를 찾아와 여는 설명회'],
    ['lifeB', 'English Play', '교내 영어 공연과 학생 무대 활동'],
    ['lifeC', 'WSC Award 2026', 'World Scholar’s Cup에서 이어지는 국제 학술 활동과 수상'],
  ];
  return (
    <>
      <PageHead crumb="하루 일과·학교생활" eyebrow="A Day at QDIS" photoId="sportsDayBasketball2026" title={<>시간표로 보는<br />청도대원의 하루</>}
        lede="기상 07:00, 수업 08:20, 질문교실 12:15, 방과후 18:00, Study Hall 20:30. 과정별 실제 일과를 확인하고, 주말과 학생 활동까지 살펴보세요." />
      <Toc items={[['day', '평일 일과'], ['weekend', '주말'], ['programs', '특색 프로그램'], ['clubs', '동아리'], ['activities', '학생 활동']]} />
      <section className="section dark" id="day">
        <div className="wrap">
          <div className="split">
            <div className="sticky-col">
              <span className="eyebrow">Weekdays</span>
              <h2 className="h2">과정별 평일 일과</h2>
              <p className="lede" style={{marginTop: 18}}>고등은 저녁 방과후 뒤 Study Hall을 두 번, 중등 기숙생은 한 번 하고 21:40에 기숙사로 돌아갑니다. 초등은 16:05에 하교합니다.</p>
              <p className="source">2025–26 학교생활안내 기준 · 학기별로 일부 시간이 조정될 수 있습니다.</p>
            </div>
            <DayTimeline />
          </div>
        </div>
      </section>
      <section className="section white" id="weekend">
        <div className="wrap">
          <SecHead eyebrow="Weekends" title="토요일은 프로젝트와 동아리, 일요일은 쉼과 자습" />
          <Weekend />
        </div>
      </section>
      <section className="section" id="programs">
        <div className="wrap">
          <SecHead eyebrow="Signature Programs" title="청도대원에만 있는 시간" />
          <div className="pillars">
            <div className="pillar"><span className="kicker">Wednesday PM</span><h3>Spoarts</h3><p>Sports + Arts. 매주 수요일 5–8교시, 교외 시설에서 전문 강사와 농구·축구·유도·요가·필라테스·골프·야구·배드민턴·볼링·수영 등 (학기당 12–13회, 수강료 별도).</p></div>
            <div className="pillar"><span className="kicker">Saturday AM</span><h3>Project Creativity</h3><p>한 학기 동안 개인·그룹 연구 목표를 세우고 매주 토요일 오전에 진행하는 프로젝트. 대학 지원서의 개인연구 활동이 됩니다.</p></div>
            <div className="pillar"><span className="kicker">G11–G12</span><h3>Daewon Honor Society</h3><p>학업·외국어·AP·독서·봉사·아침운동·리더십 기준을 채운 학생에게 주는 청도대원 품성 인증.</p></div>
            <div className="pillar"><span className="kicker">Every Day</span><h3>아침운동과 독서</h3><p>07:00 기상 후 아침 운동, 학기당 6권 이상 독서 포트폴리오(10권 이상 다독상), 중등 1인 1악기.</p></div>
          </div>
        </div>
      </section>
      <section className="section white" id="clubs">
        <div className="wrap">
          <SecHead eyebrow="Clubs" title="금요일 5교시와 토요일 오전, 동아리 시간" lede="상설 동아리 2개는 필수, 자율 동아리는 선택입니다. 2025–26 운영 동아리 예시입니다." />
          <div className="cols-3">
            <div><h3 className="kicker" style={{color: 'var(--brass)', marginBottom: 12}}>토론 · 사회</h3><ul className="tag-list"><li>MUN</li><li>Justice(모의재판·정책)</li><li>POV(사회 이슈)</li><li>Niche(경제·경영)</li><li>Friends(토론)</li><li>Psychofish(심리학)</li></ul></div>
            <div><h3 className="kicker" style={{color: 'var(--brass)', marginBottom: 12}}>과학 · 공학 · 코딩</h3><ul className="tag-list"><li>MED(의학)</li><li>Nature(과학 실험)</li><li>Entropy(물리)</li><li>SgCN(공학)</li><li>Mechanics(Arduino)</li><li>Codify · CFJ · DP(게임 개발)</li><li>MAT(수학)</li></ul></div>
            <div><h3 className="kicker" style={{color: 'var(--brass)', marginBottom: 12}}>문화 · 예술 · 봉사</h3><ul className="tag-list"><li>DBS(방송부)</li><li>Yearbook</li><li>Cineaste(영상)</li><li>Band</li><li>Bookworms(문학)</li><li>Oilsa(세계 언어)</li><li>ECHO(환경 봉사)</li><li>DIY · Spoki(스포츠)</li></ul></div>
          </div>
          <Source>2025–26 학교생활안내 ‘동아리활동 안내’</Source>
        </div>
      </section>
      <section className="section" id="activities">
        <div className="wrap">
          <SecHead eyebrow="Student Activities" title="대회와 무대, 학교 밖 경험" lede="World Scholar’s Cup 칭다오 대회, TIANMUN·MUNTAI 등 외부 모의유엔, 영어 스피치·에세이 대회, 동아리 발표대회, 체육대회와 졸업여행까지." action={<TLink href="/news">최근 소식</TLink>} />
          <div style={{marginBottom: 'clamp(32px,4vw,52px)'}}>
            <Img id="sportsDayGroup2026" />
            <p className="cap">제9회 청도대원 체육대회 · QDIS 공식 사진 갤러리</p>
          </div>
          <div className="cols-4">
            {acts.map(([id, t, d]) => (
              <div key={id}>
                <Img id={id} ratio="4x3" />
                <h3 className="h3" style={{fontSize: 19, marginTop: 14}}>{t}</h3>
                <p className="small" style={{marginTop: 4}}>{d}</p>
              </div>
            ))}
          </div>
          <p className="source">사진: {photo('lifeMain').credit} 외. 학생 활동 사진은 청도대원학교 공식 갤러리 게시물을 기준으로 교체·보강합니다.</p>
        </div>
      </section>
      <CtaBand title="이번 주 아이들이 먹는 식단도 확인해 보세요" primary={{href: '/meals', label: '이번 주 급식'}} />
    </>
  );
}

export function MealsPage() {
  return (
    <>
      <PageHead crumb="이번 주 급식" eyebrow="This Week's Meals" title={<>아이가 실제로 먹는<br />이번 주 식단</>}
        lede="학교 직영 구내식당에서 한식을 중심으로 양식·중식·일식을 곁들입니다. 월~금 저녁 간식이 있고, 방학을 뺀 주말과 공휴일에도 세 끼를 제공합니다." />
      <section className="section white">
        <div className="wrap">
          <MealsWeek showWeekTable />
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow">Dining</span>
              <h2 className="h2">학교가 직접 운영하는 식당</h2>
            </div>
            <div className="cols-2">
              <div><Img id="cafeteria" ratio="4x3" /><p className="cap">청도대원 구내식당</p></div>
              <div className="prose">
                <ul>
                  <li>영양 배합, 식단, 조리 과정, 식자재를 학교가 직접 관리합니다.</li>
                  <li>메뉴와 양은 학생 의견을 반영해 조정합니다.</li>
                  <li>통학생은 급식비를 따로 내고(초등 학기당 2,700위안, 중등 5,950위안), 기숙생 식사는 생활관비에 포함됩니다.</li>
                  <li>식품 안전을 위해 외부 음식 배달·반입은 제한됩니다.</li>
                </ul>
              </div>
            </div>
          </div>
          <p className="source">이 페이지의 식단은 학교 공식 급식 메뉴를 주 단위로 가져와 보여 줍니다. 가져오기에 실패하면 가장 최근 저장된 주간 식단을 표시합니다.</p>
        </div>
      </section>
      <CtaBand title="하루 일과와 기숙사 생활도 함께 보세요" primary={{href: '/daily-life', label: '하루 일과'}} />
    </>
  );
}
