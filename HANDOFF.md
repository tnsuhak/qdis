# HANDOFF — QDIS Korea

최종 QA 갱신: 2026-09-23

## 현재 작업 상태
- Repo: `tnsuhak/qdis`
- Branch: `preview/qdis-initial-site`
- PR: #1 — https://github.com/tnsuhak/qdis/pull/1
- Deploy Preview: https://deploy-preview-1--qdis-korea.netlify.app/
- **사용자 최종 승인 전 main merge / Production 공개 금지**
- 운영 상태와 장기 결정의 기준은 `tnsuhak/tns-site-manager/sites/qdis-korea.yaml` 및 최신 GitHub 소스입니다.

## 현재 사이트
- 공개 경로 15개 + 404를 정적 프리렌더합니다.
- 빌드에서 페이지별 H1 1개, 중복 ID, 내부 경로·앵커 오류를 검사합니다.
- 사진은 QDIS 실제 공식 갤러리/시설 사진의 로컬 최적화 자산만 사용합니다. AI·스톡·저해상도 브로셔 크롭은 활성 자산에 사용하지 않습니다.
- OG 이미지는 `/public/og/qdis-og.jpg` 1200×630입니다.
- 모바일 헤더·메뉴·하단 dock 및 주요 표의 가로 스크롤 대응이 적용되어 있습니다.

## 대학 결과 데이터 기준
- 연도별 공식 종합자료와 개별 합격 게시물, 졸업생 대학원 결과를 서로 합산하지 않습니다.
- 표기는 학생 수가 아니라 **합격 건수(Offers)** 입니다.
- 현재 구조화 합계: 2020–2026 공개 학년도 352건(한국 133 · 해외 219).
- 2025–26 공식 종합표: 54건.
- 최신 개별 합격 게시물은 2026-09-22의 진학정보 no.245까지 검토했습니다.

## 뉴스
- 기본 모드는 review-first입니다.
- 2026-08-31 가정통신문의 실제 게시물 번호는 AP 안내 no.252, 2026–27 1학기 학교생활안내 no.251입니다.
- 두 항목은 목록의 제목·번호·게시일만 확인된 상태이므로 `pending_verification`으로 비공개 유지합니다. 본문/첨부 확인 후에만 요약·일과 데이터를 갱신합니다.
- 뉴스 원문 링크는 예외적으로 유지합니다.

## 급식·자동화
- 주간 급식은 `data/meals/latest.json` 스냅샷을 사용합니다.
- 예약 실행은 월요일 09:10 KST이며 변경이 있을 때만 커밋합니다.
- 수동 실행 시 선택한 branch에만 커밋하도록 branch-safe 처리되어 Preview 작업이 main으로 올라가지 않습니다.
- 공식 게시판 모니터는 새 항목을 draft/PR로 만들 뿐 자동 Production 게시하지 않습니다.

## 상담
- Netlify Form: `qdis-consultation`
- 카카오톡 채널 / 전화 / 관련 오픈채팅 / 네이버 카페 4개 채널 허브가 홈에 있습니다.
- Preview에서 폼 감지 및 테스트 제출 수신이 확인된 상태입니다.

## Production 승인 직전 체크
1. 사용자에게 최신 Deploy Preview 최종 확인 받기.
2. 환율과 기준일 재확인.
3. 최신 대학 합격 게시물과 급식 스냅샷 재확인.
4. `data/site.json`의 `preview`를 `false`로 전환하고 production domain 확인.
5. build/typecheck 및 Netlify Production deploy 상태 확인.
6. 실제 Production의 robots.txt, sitemap.xml, canonical, OG, 상담 폼을 재확인.
