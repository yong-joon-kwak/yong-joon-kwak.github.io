---
title: '블로그 제작기'
description: 'Astro 블로그 제작기'
pubDate: 'Jul 26 2025'
heroImage: '../../assets/blog-placeholder-3.jpg'
tags: ['Blog', 'Astro', 'Vite']
---

## 블로그 구동 설계 및 과정

이전에 [블로그 제작 실패기](/blog/blog-creation-failure)를 작성했던 이후로 다른 방법을 찾게 되었다. 이번 블로그 제작에서 가장 중요하게 생각했던 부분은 다음과 같다.

- 블로그 제작이 간단할 것 - DB에 내용 저장을 하고 불러오는 식이 아니라, 프론트에서만 처리할 수 있도록
- 파일은 MD형식으로 간단하게 작성할 것 - 파일 작성이 어려워지면 추후에 관리가 힘들어질 것
- 배포과정도 단순할 것

요약하자면 최대한 단순하게 만들고 싶었다. 그래서 Vue3를 활용해서 만들고 싶었으나, 파일을 작성하는 부분에서 막혀 다른 길을 찾았다.

## Astro + GitHub Pages

결론적으로 말하면 [Astro](https://astro.build/)를 활용해서 블로그를 제작하였다. Astro를 선택하게 된 이유는 다음과 같았다.

1. **초기 세팅이 간편함** - 블로그 템플릿이 이미 제공됨
2. **글 작성이 간단함** - MD 파일 작성만으로 블로그 포스트가 됨
3. **정적 사이트 생성** - 빌드 시점에 HTML이 생성되어 빠른 로딩 속도
4. **배포 자동화** - GitHub Actions와의 연동이 간단함

### Astro 프로젝트 생성

Astro 프로젝트를 만드는건 굉장히 간단했다.

```bash
npm create astro@latest .
```

해당 명령어 실행하면 여러가지 옵션을 선택할 수 있다.

```
✔ How would you like to start your new project?
  › Use blog template

✔ Do you plan to write TypeScript?
  › Yes

✔ Initialize a new git repository?
  › Yes

✔ Install dependencies?
  › Yes
```

Template은 "Blog"를, TypeScript는 "Yes"를 선택했다. 이렇게 되면 블로그에 최적화된 프로젝트가 생성된다. 

컨텐츠 중심을 선호하는 Astro이다 보니, `/src/content/blog/` 폴더 하위에 MD 파일들을 두면 자동으로 블로그 포스트가 된다.

```
프로젝트 구조:
├── src/
│   ├── content/
│   │   └── blog/          # 여기에 .md 파일들
│   ├── layouts/
│   ├── pages/
│   └── components/
└── astro.config.mjs
```

### 컨텐츠 작성

Astro에서 글을 작성하는 과정은 매우 단순하다. `/src/content/blog/` 폴더에 마크다운 파일을 만들고 상단에 메타데이터를 작성하면 된다.

```markdown
---
title: '포스트 제목'
description: '포스트 설명'
pubDate: '2025-01-01'
tags: ['태그1', '태그2']
---

# 내용 제목
여기에 마크다운으로 내용을 작성한다.
```

이게 전부다. 별도의 파싱 로직이나 컴포넌트 작성 없이도 자동으로 블로그 포스트가 된다.

### 프로젝트 마무리

프로젝트 설정 자체는 너무 간단했고, 스타일만 조금 다듬었다. 후에 글 작성도 미리 지정해둔 폴더 하위에 작성하면 끝이다.

## GitHub Pages 배포

이제 프로젝트 완성이 되었으니, 배포를 해보았다. 배포는 [Astro Document](https://docs.astro.build/ko/guides/deploy/github/)와 [GitHub Pages Document](https://pages.github.com/)를 참고했다.

### 리포지토리 설정

우선 리포지토리 이름을 `{github-username}.github.io`로 변경한다. 그 다음 프로젝트 루트 기준 `.github/workflows/deploy.yml` 파일을 만들어 GitHub Actions Workflow를 생성해준다.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v4
      - name: Install, build, and upload your site
        uses: withastro/action@v3

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Astro 공식 Document 내용중에 브랜치 이름만 수정한 것이다. 내용을 살펴보면, `build`와 `deploy` 두 job을 설정해 둔 뒤 master 푸시 후에 실행되게 해둔 것 같다. 이렇게 설정 한 뒤 푸시 한다.

### GitHub Pages 설정

GitHub Repository에서 `Settings`에 들어가면 `Pages`에 GitHub Pages 관련 설정이 있다. 여기서 `Source`를 `GitHub Actions`로 변경해준다.

### 배포 마무리

이제 `master` 브랜치에 push할때마다 자동으로 배포 라인을 타게 된다. 자세한 배포과정은 Actions에서 확인도 가능하며, 재배포도 가능하다. 전체 빌드 과정은 보통 2-3분 정도 소요된다.

## 결과 및 비교

앞서 실패기에서 작성했던 방법과 성공기를 비교해보면 확실히 간단해진걸 알 수 있다.

| 구분 | Vue3 + Vite 방법 | Astro 방법 |
|------|------------------|------------|
| 설정 복잡도 | 높음 (마크다운 파싱 로직 필요) | 낮음 (내장 지원) |
| 마크다운 처리 | 수동 구현 (gray-matter, 파서 등) | 자동 처리 |
| 배포 과정 | 복잡함 | GitHub Actions 템플릿 제공 |
| 유지보수 | 어려움 | 간단함 |

실패기를 마무리하면서 적었던 건 "과연 이 길이 아닌게 맞을까?"라는 다소 의문스러운 마무리였다. 물론 그 방법을 그대로 고수했어도 블로그를 만드는건 가능했을 것이다. 하지만 개발하는 과정과, 추후 유지보수하는 과정이 더욱 복잡했을것이다. 

결국 "기술적으로 가능한가?"와 "실용적으로 합리적인가?"는 다른 문제라는 것을 깨달았다. 복잡한 커스텀 솔루션보다는 목적에 맞는 도구를 선택하는 것이 더 중요하다는 결론에 도달했다.

## 마무리

블로그 제작 과정에서 가장 중요한 것은 **단순함**이었다. Astro를 선택함으로써 기술적인 복잡성을 제거하고 글 작성에만 집중할 수 있게 되었다. 앞으로는 컨텐츠 제작에 더 많은 시간을 투자할 수 있을 것 같다.