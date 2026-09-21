# HANDOFF — QDIS Korea 사이트 (Claude Code 인계용)

작성: 2026-09-21 · 작성 환경: Claude 채팅 세션 (GitHub push 권한 없음 → 로컬 커밋만 존재)

## 1. 저장소·브랜치
- Repo: `tnsuhak/qdis`
- Branch: `preview/qdis-initial-site` · PR: **#1** (새 PR 만들지 말 것)
- 원격 최신(이 작업 이전): `59a3353`
- 로컬 커밋 (원격에 아직 없음)
  - `d484e0b` 1차 전면 재구축 (다중 페이지 프리렌더, 데이터 분리, 계산기, 급식, 감시 워크플로)
  - `59ecf9e` 기숙사 문구 수정
  - `b113161` **2차 완성도 개선** (통계 문구 축약, 홈 압축, 히어로, 미검증 소식 숨김, 학비·환율 표기, 기숙 핵심 5개, 모바일 dock)
  - HEAD = 이 HANDOFF.md를 추가한 커밋 (`git log -1`로 확인)
- 인계 파일: `qdis-preview.bundle`(59a3353..HEAD), `qdis-dist-preview.zip`(빌드 결과)
  ```bash
  git fetch /path/qdis-preview.bundle preview/qdis-initial-site:tmp && git checkout preview/qdis-initial-site && git merge --ff-only tmp
  git push origin preview/qdis-initial-site
  ```
- **main merge 금지 · Production 배포 금지** (검토 단계)

## 2. 2차 수정에서 바뀐 파일 (59ecf9e → b113161)
| 파일 | 변경 |
|---|---|
| `src/pages/Home.tsx` | 홈 재구성·약 25% 축소: Hero(타이포 중심) → 대입결과 3숫자 + Latest Offers 6개 → Why QDIS → GLP/CLP 표 → 일과 타임라인(요약) → 기숙 핵심 5 + 이번 주 급식 + 활동 사진 → 학비 4예시 → 입학 요약 → 소식 3 → 상담 |
| `src/pages/College.tsx` | 결과 페이지 대표 숫자 `352 / 133 / 219`, 짧은 보조문구, 자세한 기준은 `#method`로 이동, 페이지 상단 저해상도 배경 제거 |
| `components/results/Results.tsx` | 연도 패널 `2025–26 대입결과 54건 · 제8기 공식 종합표 · 2025.09.18 기준`, Offers 안내문 축약 |
| `src/pages/Life.tsx`, `components/life/Life.tsx` | `KeyBoarding`(핵심 5) + `OTHER_CARE`(기타 규정) 분리, 활동 사진 라벨 정정, 개발용 문구 제거 |
| `components/tuition/Tuition.tsx` | 결과 제목 `G9–G12 GLP 기숙 신입생`, 원화 `약 ₩37,596,000` 보조 표기, 환율 문구, 해당 장학금만 표시 |
| `lib/qdis/format.ts` | `krw()` 형식 변경, `fxLabel()` 추가 |
| `data/site.json` | `fx.status: "placeholder"` |
| `data/news/news.json` | `verification` 필드, board2-260·261을 `pending_verification`으로 숨김, board1 글번호(no=78) 제거 |
| `src/pages/School.tsx` | 미검증 2027 AP 공지 언급 제거 |
| `lib/qdis/photos.ts`, `scripts/prerender.mjs`, `src/entry-server.tsx` | `temporary` 플래그, 빌드 시 임시 사진 사용 위치 출력, 잘못 라벨링된 옛 이미지 3개 삭제 |
| `components/layout/Layout.tsx` | 모바일 dock: 입학안내 · 학비 · 상담 |
| `src/styles.css` | hero2, big-trio, key5, 모바일 축소 규칙 |
| `PHOTO_ASSETS_NEEDED.md`, `docs/DATA_ARCHITECTURE.md` | 우선순위·검증 상태 갱신 |

## 3. 대학결과 데이터 기준 (`data/university-results/`)
- `annual.json`: 공식 ‘대학진학 현황’ 8개 학년도. 대학별 표가 있는 5개 학년도(2020–21, 21–22, 22–23, 23–24, 25–26 제8기) = **352건**(한국 133 · 해외 219). 2017–20은 원본 이미지만.
- **2024–25 종합자료는 게시판에서 확인되지 않음 → 포함하지 않음, 0·추정치 금지.**
- `latest-offers.json`: 개별 합격 게시물 20건(2025.09.05–2026.07.06) — 연도별 합계와 **합산 금지**. `source_post_id` 미기입(null).
- `alumni.json`: 졸업생 대학원 3건(Columbia·UPenn·JHU 석사) — 학부와 분리.
- 출처: 첨부 `QDIS_대학진학결과_학교게시판기준_2026-09-21.pdf` + 공식 진학정보 게시판. 표기는 항상 “합격 ○건 / Offers”, “○명 합격” 금지.

## 4. News 미검증 항목
| id | 내용 | 상태 |
|---|---|---|
| `board2-260` | 2026–27 1학기 학교생활안내(일과 시간 조정) | pending — 원문 미확인, 비공개 |
| `board2-261` | 2027 AP 시험센터 운영 안내 | pending — 원문 미확인, 비공개 |
| `board1-78` | 2026–27 모집요강 | 내용은 첨부 PDF로 확인, 게시판 글번호·게시일 미확인(목록 URL로 연결) |
- 공개 중인 합격 소식 6건은 첨부 PDF 목록으로 확인됨.
- **일과표(`data/life/schedule.json`)는 2025–26 학교생활안내 기준.** 2026–27 변경 공지(board2 no.260) 원문 확인 후 갱신 필요.

## 5. 급식
- UI·요일/날짜 표시·오늘 표시·출처 메타데이터·스냅샷(`data/meals/latest.json`, 2026.09.21–27) 정상 동작 확인.
- `/api/meals` Netlify Function(`netlify/functions/meals.mts`) + 파서(`lib/monitoring/qdis-parse.mjs`)는 **합성 HTML로만 테스트, 실제 qdis.org HTML 미검증.** (이 작업 환경에서 qdis.org 직접 접근 불가) → “실시간 연동 완료”로 간주하지 말 것.

## 6. 환율
- `data/site.json` → `fx.cny_krw: 195`, `as_of: 2026-09-21`, `status: placeholder`. **공개 전 실제 환율·기준일로 교체.** 화면 문구는 자동으로 “원화 환산은 참고용입니다 · 적용 환율 1 CNY = xxx KRW · 기준일”.

## 7. 교체가 필요한 사진
`PHOTO_ASSETS_NEEDED.md` 참고. 현재 모든 로컬 사진은 브로셔 크롭(≤323px, `temporary: true`).
- Priority A: Hero용 고해상도 학생/캠퍼스, 교실 수업, 기숙사 실제 방, 학생 생활
- Priority B: Sports Day(no.297), WSC(no.295), English Play(no.298), 동아리(no.299), 식당/배식

## 8. QA (로컬, Chromium)
- 15개 경로 × 데스크톱 1440 / 모바일 390: 콘솔 오류 없음(외부 폰트·qdis.org·/api/meals 로컬 차단 제외), 가로 넘침 없음, 페이지마다 h1 1개.
- 직접 검토: 홈 1440·390, 결과 데스크톱, 학비 모바일, 하루일과 모바일, 기숙사 데스크톱.
- 미확인: Netlify 실배포, Netlify Forms 실접수, 카카오톡 OG 미리보기, `/api/meals` 실서버 응답.

## 9. Claude Code 다음 작업 (순서대로)
1. 번들 적용 후 `preview/qdis-initial-site`에 push → PR #1의 **새 커밋 기준** Netlify Deploy Preview 빌드 성공 확인 (이전 Preview로 판단 금지).
2. `tnsuhak/tns-site-manager`의 `OPERATING_SYSTEM.md`, `sites.yaml`, `policies.yaml`, `WEBSITE_BUILD_STANDARD.md`, `SEARCH_DISCOVERY_SYSTEM.md`, `NEWS_EDITORIAL_STANDARD.md` 확인 후 규칙 충돌 수정 (이번 작업에서는 읽지 못함). 운영 도메인을 `data/site.json`의 `domain`에 반영.
3. Preview에서 `/api/meals` 응답 확인 → 파서를 실제 HTML에 맞게 수정.
4. qdis.org에서 확인: board2 no.260·261 원문(일과표 갱신, 소식 공개 여부), 진학정보 게시판 글번호(`source_post_id`), 2026.07.06 이후 새 합격 글, 교육과정(pid=111–113)·학사달력·교직원 페이지.
5. 환율값 교체, TNS 상담 연락처(02-3288-1733, 카카오 채널) 확인.
6. 고해상도 사진 반영 시 `SLOTS.hero`를 교체하고 Hero를 전면 사진 방식으로 되돌릴지 결정.
7. `.github/workflows/qdis-monitor.yml`은 main에 머지돼야 스케줄 실행됨 → Production 공개 결정 후 활성화.
8. Production 공개 시: `site.json` `preview:false`, `netlify.toml` 전역 `X-Robots-Tag` 제거.
