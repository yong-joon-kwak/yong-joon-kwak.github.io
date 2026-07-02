# SEO 강화 계획

> 상위 문서: [AGENTS.md](../AGENTS.md)
> 작성일: 2026-07-02 · 상태: **Phase 1·2 완료 (+3-3, 3-4) · Phase 3 잔여(3-1, 3-2) 검토 대기**
> 목적: 검색 유입(organic traffic) 증대를 위한 SEO 개선 항목을 우선순위별로 정리한 실행 계획서.

이 문서는 **계획서**이며, 아직 어떤 코드도 변경하지 않았다.
각 항목의 `진행 여부`는 검토 후 확정한다.

---

## 1. 배경 및 목표

- **목표**: 검색엔진 색인 정상화 → 키워드 랜딩 페이지 확보 → 리치 스니펫으로 클릭률(CTR) 향상.
- **현재 스택**: Astro 5 · Vue 3 · Tailwind, GitHub Pages 정적 배포.
- **측정 기준**: Google Search Console(GSC) 색인 수, 노출수(impressions), 평균 CTR, 클릭수.

### 현황 요약

| 구분 | 항목 |
|------|------|
| ✅ 이미 갖춰진 것 | canonical, Open Graph/Twitter 카드, RSS 피드, GTM·서치콘솔 연동, `lang="ko"`, 반응형 뷰포트, Astro 이미지 최적화 |
| ⚠️ 문제 있음 | 사이트맵 미생성, RSS 링크 404, 태그 랜딩 페이지 부재, 구조화 데이터 없음, `og:type` 고정, 홈 h1 부재, 얇은 description, 빈 alt, robots.txt 부재 |

---

## 2. 우선순위 로드맵

세 단계로 나눈다. **Phase 1은 "검색엔진이 글을 못 찾는" 상태를 해소**하는 긴급 버그,
Phase 2는 **유입 경로 확대**, Phase 3은 **품질·마감**이다.

| Phase | 성격 | 항목 수 | 승인 필요 파일 |
|-------|------|---------|----------------|
| Phase 1 | 🔴 긴급 버그 수정 | 2 | `astro.config.mjs` (항목 1-1) |
| Phase 2 | 🟠 유입 경로 확대 | 4 | 없음 |
| Phase 3 | 🟡 품질·마감 | 4 | 없음 |

---

## 3. Phase 1 — 색인 정상화 (긴급)

> 이 단계가 끝나야 이후 개선이 검색 결과에 반영된다. 최우선.

### 1-1. 사이트맵이 실제로 생성되지 않음 — ✅ 완료 (2026-07-02)
- **문제**: `/sitemap-index.xml` 링크는 있으나 파일이 404 → 크롤러가 전체 페이지 목록을 얻지 못함.
- **원인**: [`src/components/BaseHead.astro`](../src/components/BaseHead.astro) 24행이 사이트맵을 링크하고 `@astrojs/sitemap`도 설치돼 있으나, [`astro.config.mjs`](../astro.config.mjs) `integrations`에 `sitemap()`이 등록되지 않음.
- **개선안**: `astro.config.mjs`의 `integrations`에 `@astrojs/sitemap` 추가 후 `npm run build`로 `dist/sitemap-index.xml` 생성 확인. 이후 GSC에 사이트맵 재제출.
- **예상 영향**: ⭐⭐⭐ (색인 정상화의 전제)
- **⚠️ 승인 필요**: `astro.config.mjs`는 AGENTS.md상 배포 설정 파일 → **사전 승인 후 진행**.

### 1-2. RSS 피드의 글 링크가 전부 404 — ✅ 완료 (2026-07-02)
- **문제**: RSS 구독자·크롤러가 글을 클릭하면 깨진 링크로 이동.
- **원인**: [`src/pages/rss.xml.js`](../src/pages/rss.xml.js) 13행이 `/blog/${post.id}/`로 링크 생성. 실제 글 URL은 [`src/pages/[...slug].astro`](../src/pages/[...slug].astro) 기준 `/${post.id}/` (루트, `blog/` 접두사 없음).
- **개선안**: 링크를 `/${post.id}/`로 수정. 필요 시 `description`·`pubDate` 필드도 명시적으로 매핑.
- **예상 영향**: ⭐⭐ (RSS 유입·크롤링 신뢰도)
- **승인 필요 없음**.

---

## 4. Phase 2 — 유입 경로 확대

> 색인이 정상화된 뒤, 검색 키워드가 도달할 "랜딩 페이지"와 리치 스니펫을 만든다.

### 2-1. 태그별 색인 가능한 아카이브 페이지 신설 — ✅ 완료 (2026-07-02)
> `src/pages/tags/[tag].astro` 신설(태그 11개 정적 생성, 사이트맵 자동 포함). 포스트 상세에 태그 링크 추가로 내부링크 확보.
- **문제**: 태그가 [`src/pages/index.astro`](../src/pages/index.astro)의 클라이언트 JS 필터로만 동작 → `/tags/php` 같은 독립 URL이 없어 롱테일 키워드 랜딩 페이지가 통째로 부재.
- **개선안**: `src/pages/tags/[tag].astro` 동적 라우트 신설(`getStaticPaths`로 태그별 정적 생성). 각 페이지에 해당 태그 글 목록 + 고유 title/description. 사이트맵에 자동 포함됨.
- **예상 영향**: ⭐⭐⭐ (개발 블로그 롱테일 유입의 핵심)
- **승인 필요 없음**. (신규 파일)

### 2-2. 구조화 데이터(JSON-LD) 추가 — ✅ 완료 (2026-07-02)
> `BlogPost.astro`에 `BlogPosting` JSON-LD 삽입(headline, datePublished, dateModified, image, author, publisher, mainEntityOfPage).
- **문제**: `BlogPosting`/`BreadcrumbList` 스키마 부재 → 리치 스니펫(작성일·저자) 미노출, CTR 손해.
- **개선안**: [`src/layouts/BlogPost.astro`](../src/layouts/BlogPost.astro)에 `BlogPosting` JSON-LD 삽입(headline, datePublished, dateModified, author, image, mainEntityOfPage). 홈/글 경로에 `BreadcrumbList` 고려.
- **예상 영향**: ⭐⭐ (CTR·검색결과 시각적 강조)
- **승인 필요 없음**.

### 2-3. `og:type` 및 article 메타 정확화 — ✅ 완료 (2026-07-02)
> `BaseHead`에 `type`/`publishedDate`/`updatedDate` props 추가. 글은 `og:type=article` + `article:published_time`/`modified_time` 출력. `og:site_name`도 추가.
- **문제**: [`src/components/BaseHead.astro`](../src/components/BaseHead.astro) 46행에서 `og:type`이 `website`로 고정 → 블로그 글도 `website`로 나감. `updatedDate`가 메타에 반영 안 됨.
- **개선안**: `BaseHead`에 선택적 `article` 관련 props(예: `type`, `publishedTime`, `modifiedTime`) 추가. 글 페이지에서는 `og:type=article` + `article:published_time`/`article:modified_time` 출력.
- **예상 영향**: ⭐⭐ (소셜 공유·글 인식)
- **승인 필요 없음**.

### 2-4. 홈페이지 h1 및 제목 계층 정리 — ✅ 완료 (2026-07-02)
> 홈에 스크린리더용(`visually-hidden`) h1 추가(디자인 유지). 카드 제목 `h4`→`h2`로 계층 정리.
- **문제**: [`src/pages/index.astro`](../src/pages/index.astro)에 페이지 최상위 `<h1>`이 없고, 글 카드 제목을 `<h4>`로 렌더링(계층 도약).
- **개선안**: 홈에 사이트 주제를 담은 `<h1>` 추가(디자인상 시각적으로 숨겨야 하면 스크린리더용 처리). 카드 제목은 `<h2>`/`<h3>`로 계층 정리 — DESIGN.md와 상충 없는 선에서.
- **예상 영향**: ⭐⭐ (홈페이지 주제 신호)
- **승인 필요 없음**. (단, 시각 변화 시 DESIGN.md 확인)

---

## 5. Phase 3 — 품질·마감

### 3-1. description 강화 (사이트·글)
- **문제**: 사이트 설명이 `'곽용준의 개발블로그'`([`src/consts.ts`](../src/consts.ts) 5행), 글 description도 한 줄로 너무 짧음(권장 70~150자 미달).
- **개선안**: `SITE_DESCRIPTION`을 키워드 포함 문장으로 확장. 기존 글들의 frontmatter `description`을 검색 의도에 맞게 보강(별도 콘텐츠 작업).
- **예상 영향**: ⭐⭐ (스니펫 품질·CTR)
- **승인 필요 없음**. (콘텐츠 편집은 글 작성자 판단 필요)

### 3-2. 이미지 alt 채우기
- **문제**: hero 이미지 alt가 전부 빈 문자열 — [`src/layouts/BlogPost.astro`](../src/layouts/BlogPost.astro) 117행, [`src/pages/index.astro`](../src/pages/index.astro) 263행.
- **개선안**: frontmatter에 `heroImageAlt`(선택) 필드 추가 또는 `title` 기반 대체 텍스트 사용. 본문 이미지도 의미 있는 alt 권장(콘텐츠 가이드에 반영).
- **예상 영향**: ⭐ (이미지 검색·접근성)
- **승인 필요 없음**. (스키마 변경 시 [content.config.ts](../src/content.config.ts) + content-guide.md 동기화)

### 3-3. robots.txt 추가
- **문제**: `public/`에 robots.txt 부재.
- **개선안**: `public/robots.txt` 생성 — 전체 허용 + `Sitemap:` 절대경로 명시. (사이트맵 항목 1-1 이후 진행)
- **예상 영향**: ⭐ (크롤링 효율)
- **승인 필요 없음**. (신규 파일)

### 3-4. og:locale 등 부가 메타
- **문제**: `og:locale`(ko_KR) 미지정, `twitter:site`/`creator` 부재.
- **개선안**: [`src/components/BaseHead.astro`](../src/components/BaseHead.astro)에 `og:locale` 및 필요 시 Twitter 계정 메타 추가.
- **예상 영향**: ⭐ (소셜 공유 정확도)
- **승인 필요 없음**.

---

## 6. 성과 측정 방법

1. Phase 1 완료 직후: GSC에서 사이트맵 제출 상태 = "성공", 색인된 페이지 수 확인.
2. 2~4주 관찰: 노출수·색인 페이지 수 증가 추이.
3. Phase 2 완료 후: 태그 페이지 색인 여부, `BlogPosting` 리치 결과 노출(GSC "개선 사항" 탭).
4. 지속: CTR·평균 게재순위 변화 모니터링.

---

## 7. 검토가 필요한 결정 사항

계획 승인 전, 아래를 정해주면 실행이 명확해진다.

1. **진행 범위**: Phase 1만 먼저? 아니면 Phase 2까지 이어서?
2. **`astro.config.mjs` 수정 승인**(항목 1-1) — 배포 설정 파일이라 명시적 승인 필요.
3. **홈페이지 h1/제목 계층 변경**(2-4)이 DESIGN.md 방향과 충돌하는지 — 시각적 변화 허용 범위.
4. **frontmatter 스키마 확장**(3-2 `heroImageAlt`) 도입 여부 — 도입 시 기존 글 일괄 보강 필요.
5. **글 description·본문 보강**(3-1)은 코드가 아닌 콘텐츠 작업 — 직접 할지, 초안을 받을지.

---

## 8. 착수 순서 제안 (승인 시)

```
Phase 1  →  1-2 (RSS, 승인 불필요) → 1-1 (사이트맵, 승인 후) → 3-3 (robots.txt)
Phase 2  →  2-1 (태그 페이지) → 2-2 (JSON-LD) → 2-3 (og:type) → 2-4 (h1)
Phase 3  →  3-4 → 3-1 → 3-2
```

각 항목 완료 기준은 공통으로 **`npm run build` 성공**(AGENTS.md 핵심 규칙 2)이다.
