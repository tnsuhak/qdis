# QDIS Korea — 청도대원학교 한국어 입학·진학 안내

청도대원학교(QDIS) 공식 자료를 바탕으로 한국 학부모·학생에게 **대학 합격 결과 · 실제 일과 · 급식 · 교육과정 · 기숙 · 비용**을 쉽게 보여 주는 사이트입니다. 운영: TNS Worldwide.

- 스택: React 19 + Vite, 빌드 후 모든 경로를 정적 HTML로 프리렌더(`scripts/prerender.mjs`) → Netlify
- 배포 흐름: PR → Netlify Deploy Preview(검토) → main 머지 → Production. 현재는 **검토 단계(전 배포 noindex)**

## 명령

```bash
npm install
npm run dev          # 로컬 개발
npm run build        # committed data/assets로 client + ssr 빌드, 16개 경로 프리렌더
npm run typecheck
npm run sync:meals   # 공식 급식 → data/meals/latest.json (주 1회 자동화와 동일 로직)
npm run monitor:boards  # 공식 게시판 새 글 감지 → data/news/drafts
npm run sync:facilities # 필요할 때만 공식 시설사진 스냅샷 갱신 (일반 배포 빌드에서는 실행하지 않음)
```

## 구조

```text
src/            index.html, App(라우팅), pages/ (Home, School, College, Life, Admission), styles.css
components/     layout · common · results · life · tuition · news
lib/qdis/       routes(SEO 메타) · fees(학비 계산) · results(집계) · photos(사진 레지스트리) · format
lib/monitoring/ qdis-parse.mjs — 공식 사이트 급식·게시판 파서 (함수·스크립트 공용)
data/           university-results/{annual,latest-offers,alumni}.json · admissions/fees-2026-27.json
                life/schedule.json · meals/latest.json · faq/faq.json · news/news.json · site.json(환율·연락처)
.github/workflows/qdis-meals.yml     매주 월요일 09:10 KST 공식 급식 확인 → 변경 시에만 갱신
.github/workflows/qdis-monitor.yml   매일 공식 게시판 감시 → 검토용 draft PR
```

자세한 데이터·자동화 설계는 `docs/DATA_ARCHITECTURE.md`, 필요한 사진은 `PHOTO_ASSETS_NEEDED.md`.

## 운영 규칙

- 대학 결과: `annual`(연도별 공식 합계)·`individual_offer`(개별 게시물)·`alumni`(대학원)를 **절대 합산하지 않음**. 숫자는 학생 수가 아니라 합격 건수.
- 환율은 `data/site.json`의 `fx.cny_krw` 한 곳에서 관리.
- 학비·장학금은 `data/admissions/fees-2026-27.json`(2026–27 모집요강) 기준. 새 모집요강이 나오면 이 파일만 교체.
- 상담폼: Netlify Forms `qdis-consultation` 사용. 정적 감지 fallback은 `public/netlify-form.html`.
- Production 공개 시: `data/site.json`의 `preview`를 `false`로, `netlify.toml`의 전역 `X-Robots-Tag` 헤더 제거, `domain` 확정.

- 시설사진은 `data/facilities.json` + `public/images/qdis/facilities/`에 스냅샷으로 저장합니다. 일반 Netlify 빌드는 외부 QDIS 서버를 다시 호출하지 않아 배포 안정성을 높입니다.
