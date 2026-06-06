# 콘텐츠 작성 가이드

> 상위 문서: [AGENTS.md](../AGENTS.md)

## Frontmatter 스키마

`src/content.config.ts` 에 정의된 스키마를 반드시 준수한다.
필수 필드가 누락되면 `npm run build` 가 타입 오류로 실패한다.

```yaml
---
title: string           # 필수 — 포스트 제목
description: string     # 필수 — 짧은 요약 (SEO 및 목록 카드에 표시)
pubDate: 'MMM DD YYYY'  # 필수 — 예: 'Jun 06 2026'
updatedDate: date       # 선택 — 수정일, 형식 동일
heroImage: path         # 선택 — 예: '../../assets/images/my-image.png'
tags: [string]          # 선택 — 예: ['Astro', 'PHP', 'Symfony']
---
```

### 필드별 주의사항

- `pubDate`: `'Jun 06 2026'` 형식의 문자열로 작성한다. Astro가 내부적으로 Date 객체로 변환한다.
- `heroImage`: `src/assets/` 기준 상대경로를 사용한다. `public/` 절대경로(`/images/...`)는 Astro 이미지 최적화를 우회하므로 사용하지 않는다.
- `tags`: 기존 포스트에서 사용 중인 태그와 통일성을 유지한다. 메인 페이지 태그 필터에 자동으로 반영된다.

## 본문 작성 규칙

- 본문은 한국어를 기본으로 하고, 코드·기술 용어·고유명사는 영문 원문을 사용한다.
- 제목 계층은 `##` 부터 시작한다. `#` 은 레이아웃(`BlogPost.astro`)이 `title` frontmatter로 렌더링하므로 본문에서 사용하지 않는다.
- 코드 블록에는 반드시 언어 식별자를 명시한다.

  ````md
  ```php
  echo "hello";
  ```
  ````

## 이미지 사용

1. 이미지 파일을 `src/assets/images/` 에 추가한다.
2. 포스트 본문에서 상대경로로 참조한다.

   ```md
   ![설명](../../assets/images/my-image.png)
   ```

3. `heroImage` 에도 동일한 상대경로를 사용한다.

## 파일 생성 체크리스트

새 포스트를 추가할 때 아래 항목을 확인한다.

- [ ] 파일명이 영문 kebab-case인가 (`my-new-post.md`)
- [ ] `title`, `description`, `pubDate` 가 모두 작성되어 있는가
- [ ] `pubDate` 형식이 `'MMM DD YYYY'` 인가
- [ ] `heroImage` 경로가 `src/assets/` 기준 상대경로인가 (사용한 경우)
- [ ] `npm run build` 가 오류 없이 완료되는가
