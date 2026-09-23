/**
 * 사진 레지스트리 — 모든 사진은 청도대원학교 실제 사진만 사용합니다(AI 생성·스톡 사진 사용 금지).
 * 우선순위: 1) QDIS 공식 사진 갤러리(학교소식) 게시물 원본  2) QDIS 공식 '학교 시설' 페이지 스냅샷(data/facilities.json)
 * 원본은 웹용으로 리사이즈해 public/images/qdis/ 아래에 저장하고, 외부 hotlink는 쓰지 않습니다.
 * 교체·추가 후보는 PHOTO_ASSETS_NEEDED.md 참고.
 */
export type Photo = {
  id: string;
  src: string;
  alt: string;
  credit: string; // 출처 표기
  sourceUrl?: string;
  postTitle?: string; // 원본 게시물 제목
  postDate?: string; // 원본 게시물 날짜 (YYYY-MM-DD)
  width?: number;
  height?: number;
  position?: string; // object-position
  label?: string;
  sub?: string;
  fallback?: string; // 원격 이미지 실패 시 로컬 대체 이미지
  /** 저해상도 임시 사진 — 고해상도 원본 확보 시 교체 (빌드 로그에 사용 위치가 출력됨) */
  temporary?: boolean;
};

export const PHOTOS: Record<string, Photo> = {
  cafeteria: {id: 'cafeteria', src: '/images/qdis/facilities/facility-03.jpg', alt: '청도대원학교 학교 직영 구내식당 내부', credit: 'QDIS 공식 학교 시설 갤러리', sourceUrl: 'https://qdis.org/gallery/index.html?no=7', width: 733, height: 508},
  studyHall: {id: 'studyHall', src: '/images/qdis/facilities/facility-10.jpg', alt: '개인 칸막이 좌석이 놓인 청도대원학교 기숙생 자습실', credit: 'QDIS 공식 학교 시설 갤러리', sourceUrl: 'https://qdis.org/gallery/index.html?no=7', width: 690, height: 460},
  dormRoom: {id: 'dormRoom', src: '/images/qdis/facilities/facility-20.jpg', alt: '2층 침대와 개인 수납장이 있는 청도대원학교 기숙사 4인실', credit: 'QDIS 공식 학교 시설 갤러리', sourceUrl: 'https://qdis.org/gallery/index.html?no=7', width: 690, height: 460, label: '기숙사 4인실', sub: 'Dormitory'},
  classroom: {id: 'classroom', src: '/images/qdis/facilities/facility-07.jpg', alt: '전자칠판과 학생 책상이 있는 청도대원학교 교실', credit: 'QDIS 공식 학교 시설 갤러리', sourceUrl: 'https://qdis.org/gallery/index.html?no=7', width: 690, height: 460, label: '교실', sub: 'Classroom'},
  seminar: {id: 'seminar', src: '/images/qdis/gallery/skku-admissions-briefing-2026-04-14.jpg', alt: '성균관대학교 입학사정관이 교실에서 재외국민 입시설명회를 진행하고 학생들이 듣고 있다', credit: 'QDIS 공식 사진 갤러리 「성균관대학교 입학설명회」', sourceUrl: 'https://qdis.org/board/index.html?id=news&no=294', postTitle: '성균관대학교 입학설명회', postDate: '2026-04-14', width: 1920, height: 1079, label: '성균관대학교 입학 설명회', sub: 'SKKU Admissions Briefing'},
  piDay2026: {id: 'piDay2026', src: '/images/qdis/gallery/pi-day-2026.jpg', alt: '청도대원학교 학생들이 교내 Pi Day 수학 활동 설명을 듣고 있다', credit: 'QDIS 공식 사진 갤러리 「Pi Day 2026」', sourceUrl: 'https://qdis.org/board/index.html?id=news&no=291', postTitle: 'Pi Day 2026', postDate: '2026-03-30', width: 1600, height: 1200, label: 'Pi Day 2026', sub: 'Math Activity'},
  sportsDayGroup2026: {id: 'sportsDayGroup2026', src: '/images/qdis/gallery/sports-day-2026-group.jpg', alt: '제9회 청도대원 체육대회에 참여한 학생들이 단체사진을 찍고 있다', credit: 'QDIS 공식 사진 갤러리 「제9회 청도대원 체육대회」', sourceUrl: 'https://qdis.org/board/index.html?id=news&no=297', postTitle: '제9회 청도대원 체육대회', postDate: '2026-06-03', width: 1600, height: 555, label: '체육대회', sub: 'Sports Day 2026'},
  sportsDayBasketball2026: {id: 'sportsDayBasketball2026', src: '/images/qdis/gallery/sports-day-2026-basketball.jpg', alt: '제9회 청도대원 체육대회에서 학생들이 농구 경기를 하고 있다', credit: 'QDIS 공식 사진 갤러리 「제9회 청도대원 체육대회」', sourceUrl: 'https://qdis.org/board/index.html?id=news&no=297', postTitle: '제9회 청도대원 체육대회', postDate: '2026-06-03', width: 1600, height: 1067, label: '농구 경기', sub: 'Sports Day 2026'},
  wscAward2026: {id: 'wscAward2026', src: '/images/qdis/gallery/wsc-award-2026.jpg', alt: 'World Scholar’s Cup 2026 수상 트로피를 든 청도대원학교 학생들', credit: 'QDIS 공식 사진 갤러리 「WSC Award 2026」', sourceUrl: 'https://qdis.org/board/index.html?id=news&no=295', postTitle: 'WSC Award 2026', postDate: '2026-05-25', width: 1600, height: 900, label: 'WSC Award 2026', sub: 'World Scholar’s Cup'},
  englishPlay2026: {id: 'englishPlay2026', src: '/images/qdis/gallery/english-play-2026.jpg', alt: 'The 3rd QDIS English Play 무대에서 공연 후 포즈를 취한 청도대원학교 학생들', credit: 'QDIS 공식 사진 갤러리 「The 3rd QDIS English Play」', sourceUrl: 'https://qdis.org/board/index.html?id=news&no=298', postTitle: 'The 3rd QDIS English Play', postDate: '2026-06-04', width: 1200, height: 800, label: 'English Play', sub: 'Student Stage'},
  studentMeeting2026: {id: 'studentMeeting2026', src: '/images/qdis/gallery/student-meeting-2026.jpg', alt: '회의실 테이블에 둘러앉은 청도대원학교 학생들과 교사들이 학생 간담회에서 이야기를 나누고 있다', credit: 'QDIS 공식 사진 갤러리 「25-26-2 학생 간담회」', sourceUrl: 'https://qdis.org/board/index.html?id=news&no=292', postTitle: '25-26-2 학생 간담회', postDate: '2026-03-30', width: 1400, height: 1050, label: '학생 간담회', sub: 'Student Meeting'},
};

/** 역할별 배정 (공식 갤러리 사진 확보 시 여기만 바꾸면 전체 반영) */
export const SLOTS: Record<string, string> = {
  hero: 'piDay2026',
  lifeMain: 'sportsDayBasketball2026',
  lifeA: 'seminar',
  lifeB: 'englishPlay2026',
  lifeC: 'wscAward2026',
  boardingHead: 'studyHall',
  resultsHead: 'wscAward2026',
};

export function photo(id: keyof typeof PHOTOS | string): Photo {
  const key = SLOTS[id] ?? id;
  return PHOTOS[key] ?? PHOTOS.piDay2026;
}
