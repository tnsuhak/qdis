export type RouteMeta = {
  path: string;
  key: string;
  title: string; // <title>
  description: string;
  h1?: string;
  section?: string; // nav group
  crumb?: string;
  ogImage?: string;
};

export const ROUTES: RouteMeta[] = [
  {path: '/', key: 'home', title: '청도대원학교 QDIS | 칭다오 국제학교 대학진학·기숙·학비 안내', description: '칭다오 청도대원학교(QDIS) 한국어 안내. 연도별 대학 합격 결과, SAT·AP 교육과정, 기숙생활과 일과, 이번 주 급식, 2026–27 학비와 장학금, 입학 절차를 한곳에서 확인하세요.'},
  {path: '/about', key: 'about', section: 'about', crumb: '학교소개', title: '학교소개 | 청도대원학교 QDIS', description: '중국 칭다오 청양구의 12년제 국제학교 청도대원학교(QDIS). 영·중·한 3개 언어 교육, 학교 연혁과 대원 교육의 뿌리, 학생 구성과 위치를 소개합니다.'},
  {path: '/academics', key: 'academics', section: 'academics', crumb: '교육과정', title: '교육과정 GLP·CLP | 청도대원학교 초등·중등·고등', description: '청도대원학교 GLP(국제반)와 CLP(중국유학반) 비교, 초등 G1–G5·중등 G6–G8·고등 G9–G12 교과 편성과 수준별 수업, 영어 몰입 수업 방식을 정리했습니다.'},
  {path: '/sat-ap', key: 'satap', section: 'academics', crumb: 'SAT·AP·시험센터', title: 'SAT·AP 국제학교 | 청도대원학교 시험센터와 AP 과정', description: '청도대원학교는 College Board 공식 SAT·AP 시험센터입니다. 정규 수업과 방과후 AP 강좌로 준비하고, 익숙한 교실에서 SAT·AP·AMC·TOEFL Junior를 응시합니다.'},
  {path: '/university-results', key: 'results', section: 'college', crumb: '대학 합격 결과', title: '대학 합격 결과 | 청도대원학교 연도별 University Offers', description: '청도대원학교 공식 진학정보 게시판 기준 연도별 대학 합격 건수와 최신 개별 합격 소식. 국가·연도·대학명으로 검색하고, 졸업생 대학원 결과는 따로 확인하세요.'},
  {path: '/college-counseling', key: 'counseling', section: 'college', crumb: '진학지도', title: '진학지도 | 해외고 한국대학·3년 특례·12년 특례·홍콩대 준비', description: '청도대원학교의 한국대(재외국민 특별전형·해외고 전형)와 미국·홍콩·싱가포르·중국 대학 진학지도, G9–G12 입시 로드맵을 한국 학부모 관점으로 정리했습니다.'},
  {path: '/boarding', key: 'boarding', section: 'life', crumb: '기숙사', title: '기숙사 | 청도대원학교 중국 보딩스쿨 생활 관리', description: 'G6–G8 선택기숙, G9–G12 의무기숙. 4인 1실, 남녀 층 분리, 사감 관리, 야간 자율학습, 휴대전화·외출외박·세탁·건강 관리 규정을 구체적으로 안내합니다.'},
  {path: '/daily-life', key: 'daily', section: 'life', crumb: '하루 일과·학교생활', title: '하루 일과와 학교생활 | 청도대원학교 A Day at QDIS', description: '기상부터 수업, Q&A 세션, 방과후, 간식, Study Hall까지 청도대원학교의 실제 하루. 주말 Project Creativity와 동아리, Spoarts, WSC·MUN 등 학생 활동도 소개합니다.'},
  {path: '/meals', key: 'meals', section: 'life', crumb: '이번 주 급식', title: '이번 주 급식 메뉴 | 청도대원학교 학교 직영 식당', description: '청도대원학교 공식 급식 메뉴를 기준으로 이번 주 조식·중식·석식·간식을 요일별로 보여 드립니다. 한식 중심, 주말과 공휴일에도 세 끼를 제공합니다.'},
  {path: '/tuition', key: 'tuition', section: 'tuition', crumb: '학비 계산기', title: '학비 계산기 | 청도대원학교 2026–27 연간 비용', description: '학년·과정·기숙 여부·신입생 여부·장학금을 선택하면 2026–27 모집요강 기준 연간 기본 비용과 학기별 납부액, 원화 환산액을 바로 계산합니다.'},
  {path: '/scholarships', key: 'scholarships', section: 'tuition', crumb: '장학금', title: '장학금 | 청도대원학교 동문·형제·진급·영어우수 장학', description: '2026–27 청도대원학교 장학금: 동문 20%, 두자녀 20%, 다자녀 50%, 진급 10–30%, 영어우수 25–50%. TOEFL 기준표와 50% 상한 규정을 정리했습니다.'},
  {path: '/admissions', key: 'admissions', section: 'admissions', crumb: '입학 절차', title: '입학안내 | 청도대원학교 2026–27 모집·전형·비자', description: '2026–27 청도대원학교 모집학급, 지원 자격, 영어 지필·인터뷰 전형, 제출서류, 학생비자(X1)와 거류증, 기숙사 입사 준비까지 입학 절차를 단계별로 안내합니다.'},
  {path: '/faq', key: 'faq', section: 'admissions', crumb: '자주 묻는 질문', title: '자주 묻는 질문 | 청도대원학교 입학·기숙·진학 FAQ', description: '청도대원학교 공식 FAQ 30문항을 입학·교육과정·기숙사·대학진학·비용·학교생활·편입특례로 나누고 최신 모집요강 기준으로 정리했습니다.'},
  {path: '/news', key: 'news', section: 'news', crumb: '학교소식', title: 'QDIS 학교소식 | 청도대원학교 최신 공지·합격·학교생활', description: '청도대원학교 공식 게시판의 최신 소식 가운데 한국 학부모에게 필요한 입학·학사·대학 합격·학교생활 소식을 골라 쉽게 정리합니다.'},
  {path: '/consultation', key: 'consultation', section: 'consult', crumb: '입학상담', title: '입학상담 | 청도대원학교 한국 상담 TNS Worldwide', description: '청도대원학교 입학 가능 학년, 전형, 학비, 기숙사, 특례·진학 경로를 TNS Worldwide 상담팀이 한국어로 안내합니다. 학교 방문 투어도 연결해 드립니다.'},
];

export const NOT_FOUND: RouteMeta = {path: '/404', key: '404', title: '페이지를 찾을 수 없습니다 | 청도대원학교 QDIS', description: '요청하신 페이지를 찾을 수 없습니다.'};

export const NAV: Array<{label: string; href: string; section: string; children?: Array<{label: string; href: string; desc?: string}>}> = [
  {label: '학교소개', href: '/about', section: 'about'},
  {label: '교육과정', href: '/academics', section: 'academics', children: [
    {label: 'GLP·CLP 교육과정', href: '/academics'},
    {label: 'SAT·AP 시험센터', href: '/sat-ap'},
  ]},
  {label: '대학진학', href: '/university-results', section: 'college', children: [
    {label: '대학 합격 결과', href: '/university-results'},
    {label: '진학지도·특례', href: '/college-counseling'},
  ]},
  {label: '학교생활', href: '/boarding', section: 'life', children: [
    {label: '기숙사·학생관리', href: '/boarding'},
    {label: '하루 일과·학생활동', href: '/daily-life'},
    {label: '이번 주 급식', href: '/meals'},
  ]},
  {label: '학비·장학금', href: '/tuition', section: 'tuition', children: [
    {label: '학비 계산기', href: '/tuition'},
    {label: '장학금', href: '/scholarships'},
  ]},
  {label: '입학안내', href: '/admissions', section: 'admissions', children: [
    {label: '입학조건·절차', href: '/admissions'},
    {label: '자주 묻는 질문', href: '/faq'},
  ]},
  {label: '학교소식', href: '/news', section: 'news'},
];

export function routeFor(path: string): RouteMeta {
  const clean = path.replace(/\/+$/, '') || '/';
  return ROUTES.find(r => r.path === clean) ?? NOT_FOUND;
}
