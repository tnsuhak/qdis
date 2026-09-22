/**
 * 사진 레지스트리.
 * 우선순위: 1) 사용자 제공 자료(브로셔)에서 잘라낸 실제 사진  2) 저장소 내 사용허가 사진  3) QDIS 공식 갤러리 게시물 사진(원본 링크)
 * AI 생성 사진·스톡 사진은 사용하지 않습니다. 추가로 필요한 사진은 PHOTO_ASSETS_NEEDED.md 참고.
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
  studentsStudy: {id: 'studentsStudy', src: '/images/brochure/students-study.jpg', alt: '교복을 입은 청도대원학교 학생들이 교실에서 함께 문제를 풀고 있다', credit: '청도대원학교 2026 브로셔', width: 323, height: 367, label: '수업 시간', sub: 'In Class', temporary: true},
  cafeteria: {id: 'cafeteria', src: '/images/brochure/cafeteria.jpg', alt: '청도대원학교 학교 직영 구내식당 내부', credit: '청도대원학교 2026 브로셔', width: 285, height: 181, temporary: true},
  studyHall: {id: 'studyHall', src: '/images/brochure/study-hall.jpg', alt: '개인 칸막이 책상이 놓인 청도대원학교 자습실', credit: '청도대원학교 2026 브로셔', width: 285, height: 182, temporary: true},
  seminar: {id: 'seminar', src: '/images/qdis/gallery/skku-admissions-briefing-2026-04-14.jpg', alt: '성균관대학교 입학사정관이 교실에서 재외국민 입시설명회를 진행하고 학생들이 듣고 있다', credit: 'QDIS 공식 사진 갤러리', sourceUrl: 'https://qdis.org/board/index.html?id=news', postTitle: '2026 성균관대 재외국민 입시설명회', postDate: '2026-04-14', width: 1920, height: 1079, label: '성균관대학교 입학 설명회', sub: 'SKKU Admissions Briefing'},
  graduates: {id: 'graduates', src: '/images/brochure/graduates.jpg', alt: '졸업 가운을 입은 청도대원학교 졸업생들', credit: '청도대원학교 2026 브로셔', width: 209, height: 143, label: '졸업', sub: 'Graduation', temporary: true},
  soccer: {id: 'soccer', src: '/images/brochure/soccer.jpg', alt: '운동장에서 축구를 하는 학생들', credit: '청도대원학교 2026 브로셔', width: 181, height: 118, label: 'Spoarts · 스포츠', sub: '수요일 오후', temporary: true},
  sportsDay2026: {id: 'sportsDay2026', src: 'https://qdis.org/rankup_module/rankup_board/attach/news/17804486990121.jpg', alt: '제9회 청도대원 체육대회(2026.6)에 참여한 학생들', credit: 'QDIS 공식 갤러리 「제9회 청도대원 체육대회」', sourceUrl: 'https://qdis.org/board/index.html?id=news&no=297', fallback: '/images/brochure/soccer.jpg', label: '체육대회 · 스포츠', sub: 'Sports Day'},
};

/** 역할별 배정 (공식 갤러리 사진 확보 시 여기만 바꾸면 전체 반영) */
export const SLOTS: Record<string, string> = {
  hero: 'studentsStudy',
  lifeMain: 'sportsDay2026',
  lifeA: 'seminar',
  lifeB: 'soccer',
  lifeC: 'graduates',
  boardingHead: 'studyHall',
  resultsHead: 'graduates',
};

export function photo(id: keyof typeof PHOTOS | string): Photo {
  const key = SLOTS[id] ?? id;
  return PHOTOS[key] ?? PHOTOS.studentsStudy;
}
