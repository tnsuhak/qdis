# 데이터·자동화 설계

## 1. 원칙
- 공식 사이트(qdis.org)는 **살아있는 원천 데이터**. 사이트는 구조화된 로컬 데이터(`data/`)를 렌더링한다.
- 방문자 브라우저가 공식 사이트를 직접 호출하지 않는다 (CORS·속도·장애 격리).
- 자동화는 **초안까지만**. 사이트 반영은 사람이 검토한 PR 머지로만 (Draft → Preview → Review → Production).
- 불필요한 Production 배포를 만들지 않는다.

## 2. 대학 합격 결과 `data/university-results/`
| 파일 | 의미 | 합산 |
|---|---|---|
| `annual.json` | 학년도별 공식 ‘대학진학 현황’ 공지 (8개 학년도, 2020–21~2025–26은 대학별 상세 189항목·352건) | 연도 내 합계만 |
| `latest-offers.json` | 진학정보 게시판 개별 합격 게시물 (2025.09.05–2026.07.06, 20건) | 합산 금지 |
| `alumni.json` | 졸업생 대학원 합격 (3건) | 학부와 분리 |
| `candidates.json` | 감시 스크립트가 자동 감지한 후보 (`verified:false`) | 검토 후 이동 |

모든 항목 필드: `academic_year, country, university, program, level, result_type, offer_count, source_url, source_post_id, source_date, verified`.
- `latest-offers.json`의 `source_post_id`는 게시판 번호 확인 후 채울 것(현재 null).

## 3. 급식 `/api/meals` — 구현됨
```
qdis.org 급식 페이지 ──(요청 시, 6시간 CDN durable cache)──▶ Netlify Function /api/meals ──▶ 페이지(클라이언트)
                                                             │ 실패 시 404
data/meals/latest.json (빌드 시점 스냅샷) ─────────────────────┴▶ SSR 기본 표시
```
- 급식이 바뀌어도 **배포 불필요**. 공식 사이트 장애 시 스냅샷 표시.
- 스냅샷은 `npm run sync:meals`로 갱신(다른 변경과 함께 커밋).
- ⚠️ 파서(`lib/monitoring/qdis-parse.mjs#parseMeals`)는 공식 페이지 텍스트 구조 기준으로 작성·합성 HTML로 테스트했으나, 작업 환경에서 qdis.org 원본 HTML 직접 접근이 막혀 **실서버 HTML 검증 전**. Deploy Preview에서 `/api/meals` 응답 확인 필요.

## 4. 게시판 감시 — 구현됨 (워크플로 활성화 필요)
`.github/workflows/qdis-monitor.yml` (매일 09:30 KST, 수동 실행 가능)
1. 공지사항·가정통신문·진학정보·입학안내·사진갤러리 목록 수집
2. 마지막 확인 글 번호(Actions 캐시에 보관 → 새 글 없으면 커밋·배포 없음) 이후 새 글만 선별, 이미 게시한 원문 URL 중복 제외
3. 학부모 관련성 점수(AP·SAT·입학·장학·학비·학사일정·교육과정·설명회·합격 ↑ / 납부·준비물·교복·채용 ↓)
4. `data/news/drafts/*.json` 초안, 진학정보는 `candidates.json` 후보 생성 → **draft PR** 생성 → Netlify Preview → 검토 후 `news.json`·`latest-offers.json`으로 옮겨 머지
- 첫 실행은 기준선만 저장.
- 기본 base 브랜치는 `main`(저장소 변수 `QDIS_MONITOR_BASE`로 변경 가능).

## 5. 기타 살아있는 데이터
- 학사달력·일과표: `data/life/schedule.json` (현재 2025–26 학교생활안내 기준) — 2026–27 1학기 변경 공지(가정통신문 no.260) 반영 필요
- 학비·장학금: `data/admissions/fees-2026-27.json`
- FAQ: `data/faq/faq.json`
- 소식: `data/news/news.json`
