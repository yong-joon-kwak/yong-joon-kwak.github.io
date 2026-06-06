# 컴포넌트 수정 지침

> 상위 문서: [AGENTS.md](../AGENTS.md)

## 컴포넌트 역할 요약

| 파일 | 역할 | 수정 시 영향 범위 |
|------|------|-----------------|
| `BaseHead.astro` | SEO 메타태그 (`<title>`, `<meta>`, OG 태그) 중앙 관리 | 사이트 전체 |
| `Header.astro` | 사이트 공통 헤더, 내비게이션 | 사이트 전체 |
| `Footer.astro` | 사이트 공통 푸터 | 사이트 전체 |
| `HeaderLink.astro` | 헤더 내비게이션 링크 단위 | Header 내부 |
| `FormattedDate.astro` | 날짜 포맷 렌더링 | 날짜가 표시되는 모든 곳 |
| `BlogPost.astro` (레이아웃) | 포스트 공통 래퍼 (헤더·본문·푸터 구조) | 모든 블로그 포스트 |

## 수정 시 주의사항

### BaseHead.astro
- `title`과 `description` prop은 각 페이지에서 주입된다. 기본값을 바꾸면 사이트 전체 SEO에 영향을 준다.
- OG 이미지, canonical URL 등 SEO 관련 변경은 사전에 영향 범위를 확인한다.

### BlogPost.astro
- 모든 포스트가 이 레이아웃을 사용한다. 스타일·구조 변경은 포스트 전체에 즉시 반영된다.
- `title`, `description`, `pubDate`, `updatedDate`, `heroImage` prop을 frontmatter에서 받는다.

### Header.astro / Footer.astro
- 내비게이션 링크를 추가할 때는 `HeaderLink.astro` 컴포넌트를 재사용한다.
- 직접 `<a>` 태그를 추가하지 않는다.

### consts.ts
- `SITE_TITLE`, `SITE_DESCRIPTION` 은 `BaseHead.astro`와 메인 페이지에서 import하여 사용한다.
- 값을 변경하면 사이트 전체 메타 정보가 바뀐다.

## 새 컴포넌트 추가 규칙

- `src/components/` 에 위치시킨다.
- 파일명은 PascalCase로 작성한다: `MyComponent.astro`
- Vue 컴포넌트가 필요한 경우 동일 위치에 `.vue` 파일로 추가한다 (Vue 3 통합 설정 적용됨).
