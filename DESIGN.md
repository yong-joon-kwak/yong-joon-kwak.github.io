---
name: Yong Joon Kwak Dev Blog
description: 개인 개발 블로그를 위한 디자인 시스템. 간결하되 비어 보이지 않는 미니멀 다크/라이트 듀얼 모드 UI.
version: "0.1.0"

colors:
  # --- Light Mode ---
  bg: "#ffffff"
  bg-secondary: "#f4f4f8"
  surface: "#ffffff"
  surface-container: "#f0f2f7"
  surface-container-high: "#e5e9f0"
  on-surface: "#0f1219"
  on-surface-variant: "#60739f"
  outline: "#c8cfe0"
  outline-variant: "#e5e9f0"
  primary: "#2337ff"
  on-primary: "#ffffff"
  primary-container: "#e8eaff"
  on-primary-container: "#000d8a"
  # --- Dark Mode ---
  dark-bg: "#0f1117"
  dark-bg-secondary: "#1a1d27"
  dark-surface: "#1a1d27"
  dark-surface-container: "#222536"
  dark-surface-container-high: "#2d3148"
  dark-on-surface: "#e2e8f0"
  dark-on-surface-variant: "#718096"
  dark-outline: "#2d3748"
  dark-outline-variant: "#1e2535"
  dark-primary: "#6b8cff"
  dark-on-primary: "#000d8a"
  dark-primary-container: "#1a2566"
  dark-on-primary-container: "#c5cfff"
  # --- Semantic ---
  error: "#e53e3e"
  success: "#38a169"
  code-bg-light: "#e5e9f0"
  code-bg-dark: "#1e2535"

typography:
  site-title:
    fontFamily: Atkinson, sans-serif
    fontSize: 1rem
    fontWeight: "700"
    lineHeight: 1.2
    letterSpacing: 0em
  post-title:
    fontFamily: Atkinson, sans-serif
    fontSize: 2rem
    fontWeight: "700"
    lineHeight: 1.25
    letterSpacing: -0.02em
  post-title-mobile:
    fontFamily: Atkinson, sans-serif
    fontSize: 1.6rem
    fontWeight: "700"
    lineHeight: 1.3
    letterSpacing: -0.01em
  heading-2:
    fontFamily: Atkinson, sans-serif
    fontSize: 1.5rem
    fontWeight: "600"
    lineHeight: 1.35
  heading-3:
    fontFamily: Atkinson, sans-serif
    fontSize: 1.2rem
    fontWeight: "600"
    lineHeight: 1.4
  body:
    fontFamily: Atkinson, sans-serif
    fontSize: 1rem
    fontWeight: "400"
    lineHeight: 1.8
  body-mobile:
    fontFamily: Atkinson, sans-serif
    fontSize: 1.0625rem
    fontWeight: "400"
    lineHeight: 1.85
  label:
    fontFamily: Atkinson, sans-serif
    fontSize: 0.8rem
    fontWeight: "500"
    lineHeight: 1.4
    letterSpacing: 0.04em
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: 0.875rem
    fontWeight: "400"
    lineHeight: 1.7

rounded:
  sm: 0.375rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.25rem
  full: 9999px

spacing:
  unit: 8px
  container-max: 1200px
  prose-max: 720px
  gutter: 24px
  section-gap: 48px
  card-gap: 24px
  mobile-margin: 20px

components:
  post-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 24px
    border: "1px solid {colors.outline-variant}"
  post-card-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-on-surface}"
    border: "1px solid {colors.dark-outline}"
  post-card-hover:
    transform: translateY(-4px)
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)"
  tag-chip:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  tag-chip-dark:
    backgroundColor: "{colors.dark-surface-container}"
    textColor: "{colors.dark-on-surface-variant}"
  tag-chip-active:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
  tag-chip-active-dark:
    backgroundColor: "{colors.dark-primary-container}"
    textColor: "{colors.dark-on-primary-container}"
  progress-bar:
    backgroundColor: "{colors.primary}"
    height: 3px
    position: fixed
    top: 0
  progress-bar-dark:
    backgroundColor: "{colors.dark-primary}"
  theme-toggle:
    backgroundColor: "{colors.surface-container}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
    iconLibrary: "lucide-astro"
    iconSize: 16
  header:
    minHeight: 76px
    backgroundColor: "{colors.bg}"
    borderBottom: "1px solid {colors.outline-variant}"
    contains: "logo, github-link, theme-toggle"
  hero-image:
    rounded: "{rounded.lg}"
    boxShadow: "0 2px 6px rgba(96,115,159,0.25), 0 8px 24px rgba(96,115,159,0.33)"
---

## 1. Brand & Style

**Yong Joon Kwak Dev Blog**는 개인 개발자의 기록과 경험을 담는 공간이다.
디자인 원칙은 **"간결하되 비어 보이지 않는다"** — 불필요한 장식 없이 타이포그래피와 여백만으로 밀도를 만든다.

독자는 주로 개발자이므로 다크 환경 친화적 UI를 기본으로 하고, 시스템 설정에 따른 자동 전환과 수동 토글을 모두 지원한다.
모바일에서 읽는 경험이 데스크탑과 동등하게 쾌적해야 하며, 특히 코드 블록과 본문 가독성이 최우선이다.

**핵심 키워드:** 미니멀 · 가독성 · 듀얼 테마 · 개발자 친화

---

## 2. Colors

두 개의 테마(라이트/다크)가 CSS 변수로 관리된다. `data-theme="light"` / `data-theme="dark"` 속성이 `<html>` 에 적용되고, 시스템 설정(`prefers-color-scheme`)이 초기값이다. 사용자가 토글로 바꾼 값은 `localStorage`에 저장되어 방문 간 유지된다.

### 라이트 모드
- **배경:** `#ffffff` 위에 `#f4f4f8` 보조 배경으로 계층을 만든다.
- **포인트:** `#2337ff` (선명한 블루) — 링크, 태그 활성, 진행률 바에 사용.
- **텍스트:** `#0f1219` 기본, `#60739f` 보조(날짜, 설명).

### 다크 모드
- **배경:** `#0f1117` (거의 검정에 가까운 네이비). 순수 검정(`#000`)은 피한다 — 콘텐츠와 배경 간 대비가 너무 강해 눈이 피로하다.
- **포인트:** `#6b8cff` — 다크 배경에서 WCAG AA 대비비를 확보하기 위해 라이트 모드 블루보다 밝게 조정.
- **카드 배경:** `#1a1d27` — 배경보다 살짝 밝아 레이어 구분을 만든다.

### 사용 원칙
- 포인트 컬러(`--accent`)는 상호작용 요소(링크, 활성 태그, 진행률 바, 포커스 링)에만 사용한다. 장식적 배경색으로 남용하지 않는다.
- 모드 전환 시 `color` 와 `background-color` 에 `transition: 0.2s ease` 를 적용해 부드럽게 전환한다.

---

## 3. Typography

폰트는 현재 **Atkinson Hyperlegible** 을 사용한다. 가독성에 최적화된 폰트로 블로그 정체성과 잘 맞는다. 코드 블록에만 시스템 모노스페이스 폰트를 적용한다.

### 크기 체계 (모바일 우선)

| 토큰 | 데스크탑 | 모바일 | 용도 |
|------|---------|--------|------|
| `post-title` | 2rem / 700 | 1.6rem / 700 | 포스트 제목 (h1) |
| `heading-2` | 1.5rem / 600 | 1.25rem / 600 | 본문 섹션 (h2) |
| `heading-3` | 1.2rem / 600 | 1.1rem / 600 | 본문 소섹션 (h3) |
| `body` | 1rem / 400 / lh 1.8 | 1.0625rem / 400 / lh 1.85 | 본문 텍스트 |
| `label` | 0.8rem / 500 | 0.8rem / 500 | 태그, 날짜, 메타 |
| `code` | 0.875rem | 0.875rem | 인라인·블록 코드 |

### 본문 가독성 원칙 (모바일)
- 좌우 패딩은 최소 `20px` — 화면 끝까지 닿는 텍스트는 허용하지 않는다.
- 코드 블록은 `overflow-x: auto` 를 반드시 적용한다.
- `h1`의 전역 크기(`3.052em`)는 모바일 미디어쿼리 내에서 재정의해 레이아웃을 압박하지 않도록 한다.

---

## 4. Layout & Spacing

8px 베이스 유닛을 따른다.

### 페이지 구조
- **메인 페이지:** 최대 너비 `1200px`, 3열 카드 그리드 (태블릿 2열, 모바일 1열)
- **포스트 본문:** 최대 너비 `720px` 중앙 정렬

### 모바일 전환 기준점
- `768px` 이하: 카드 2열 → 1열
- `720px` 이하: 본문 패딩 최적화, 제목 크기 재정의

### 카드 레이아웃
- 카드 사이 간격 `24px`
- 카드 내부 패딩 `24px`
- `heroImage` 가 없는 포스트 카드는 `description` 을 더 크게 표시해 밀도를 보완한다.

---

## 5. Elevation & Depth

그림자보다 **테두리와 배경 단계**로 레이어를 구분한다.

- **배경 (레벨 0):** `--bg` — 페이지 배경
- **카드 (레벨 1):** `--surface` + `1px solid --outline-variant` 테두리
- **헤더 (레벨 2):** 배경색 + `box-shadow: 0 2px 8px rgba(0,0,0,0.05)` (라이트) / `rgba(0,0,0,0.3)` (다크)
- **진행률 바 (레벨 최상):** `position: fixed; z-index: 9999`

다크 모드에서는 그림자 대신 배경 단계 차이(`#0f1117` → `#1a1d27` → `#222536`)로 깊이를 표현한다.

---

## 6. Shapes

전체적으로 **Soft Modern** — 날카롭지 않되 과도하게 둥글지 않다.

| 적용 대상 | 값 |
|----------|----|
| 포스트 카드 | `rounded-lg` (1rem) |
| 태그 칩 | `rounded-full` (9999px) |
| 이미지 (카드/히어로) | `rounded-lg` (1rem) |
| 코드 블록 | `rounded-md` (0.75rem) |
| 인라인 코드 | `rounded-sm` (0.375rem) |
| 토글 버튼 | `rounded-full` |

---

## 7. Components

### 포스트 카드
- 배경: `--surface`, 테두리: `1px solid --outline-variant`
- 호버 시: `translateY(-4px)` + 소프트 박스섀도우
- `heroImage` 없을 때: `description` 텍스트를 카드 상단에 보여 공백을 채움
- 태그 칩은 카드 하단에 배치

### 태그 칩
- 기본: `--surface-container` 배경, `--on-surface-variant` 텍스트
- 활성(필터 선택 시): `--primary-container` 배경, `--on-primary-container` 텍스트

### 포스트 진행률 바
- `position: fixed; top: 0; left: 0; height: 3px; z-index: 9999`
- 색상: `--primary` (라이트) / `--dark-primary` (다크)
- 스크롤 비율에 따라 `width` 값이 `0% → 100%` 로 변함
- `transition: width 0.1s linear`

### 다크/라이트 모드 토글
- 헤더 우측에 배치 (모바일에서도 유지)
- 아이콘 라이브러리: `@lucide/astro` 사용
- 아이콘: 라이트 모드 `Moon`, 다크 모드 `Sun` (size `16`, stroke 기본값)
- 클릭 시 `<html data-theme>` 전환 + `localStorage` 저장
- 깜빡임 방지: 초기 테마 결정 스크립트를 `<head>` 최상단 인라인으로 실행

### 헤더
- 레이아웃: 좌측 브랜드 블록 + 우측 액션 그룹 2개(`GitHub`, `Theme Toggle`)
- 좌: 상단 Eyebrow(`YJK DEV LOG`) + 하단 사이트 타이틀(홈 링크)
- 우: `GitHub` 버튼(`ArrowUpRight` 아이콘 + 텍스트), `Theme Toggle` 버튼(`Moon`/`Sun`)
- 헤더는 얇은 라인 네비게이션이 아니라 **명확한 상단 바**로 보이도록 `min-height: 68~76px`를 유지한다.
- 모바일에서는 버튼 텍스트를 숨기고 아이콘만 유지해 밀도를 확보한다.

### 헤더에 보여줄 정보 가이드
- 기본(현재 권장): **브랜드, GitHub, 테마 토글**만 고정한다. 미니멀 성격과 가장 잘 맞는다.
- 2차 후보: 우측에 `Posts` 카운트 또는 `Now` 상태(예: `Working on Symfony`)를 작은 라벨로 추가한다.
- 비권장: 카테고리 탭/검색 입력을 헤더에 직접 넣어 높이를 과도하게 키우는 구성.

---

## 8. Do's and Don'ts

### Do ✅
- CSS 변수(`--bg`, `--text`, `--accent` 등)를 통해 테마를 전환한다.
- 모든 컬러 변경에 `transition: color 0.2s, background-color 0.2s` 를 적용한다.
- 코드 블록에 `overflow-x: auto` 를 설정한다.
- `heroImage` 경로는 `src/assets/` 기준 상대경로를 사용한다.
- 포인트 컬러는 상호작용 요소에만 사용한다.

### Don't ❌
- 순수 검정(`#000000`) 배경은 사용하지 않는다 — 눈의 피로를 유발한다.
- 포인트 컬러를 넓은 배경 영역에 사용하지 않는다.
- 라이트/다크 모드 중 한쪽에만 하드코딩된 색상값을 컴포넌트에 직접 넣지 않는다.
- 모바일에서 `h1` 전역 크기(`3.052em`)를 그대로 사용하지 않는다 — 반드시 미디어쿼리로 재정의한다.
- 이미지 경로에 `public/` 절대경로를 사용하지 않는다 — Astro 이미지 최적화가 적용되지 않는다.

---

## 구현 체크리스트

> 완료 시 ⬜ → ✅, 관련 커밋 해시를 기록한다.

| 항목 | 상태 | 커밋 |
|------|------|------|
| CSS 변수 라이트/다크 체계 정의 (`global.css`) | ⬜ | — |
| 초기 테마 결정 인라인 스크립트 (깜빡임 방지) | ⬜ | — |
| 다크모드 토글 버튼 (`Header.astro`) | ⬜ | — |
| 포스트 진행률 바 (`BlogPost.astro`) | ⬜ | — |
| 모바일 본문 가독성 개선 (`global.css`) | ⬜ | — |
| 카드 다크모드 대응 (`index.astro`) | ⬜ | — |
| heroImage 없는 카드 보완 | ⬜ | — |
