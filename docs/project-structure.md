# 프로젝트 구조

> 상위 문서: [AGENTS.md](../AGENTS.md)

```
dev-blog/
├── src/
│   ├── assets/
│   │   └── images/          # 포스트 본문 이미지 (Astro 이미지 최적화 대상)
│   ├── components/
│   │   ├── BaseHead.astro   # SEO 메타태그 중앙 관리
│   │   ├── Header.astro     # 사이트 공통 헤더
│   │   ├── Footer.astro     # 사이트 공통 푸터
│   │   ├── HeaderLink.astro # 헤더 내비게이션 링크 단위 컴포넌트
│   │   └── FormattedDate.astro  # 날짜 포맷 컴포넌트
│   ├── content/
│   │   └── blog/            # 블로그 포스트 (.md / .mdx)
│   ├── layouts/
│   │   └── BlogPost.astro   # 포스트 공통 래퍼 레이아웃
│   ├── pages/
│   │   ├── index.astro      # 메인 페이지 (포스트 목록 + 태그 필터)
│   │   ├── [...slug].astro  # 포스트 동적 라우팅
│   │   └── rss.xml.js       # RSS 피드
│   ├── styles/
│   │   └── global.css       # 전역 스타일 (CSS 변수 포함)
│   ├── content.config.ts    # 콘텐츠 컬렉션 스키마 정의
│   └── consts.ts            # SITE_TITLE, SITE_DESCRIPTION 전역 상수
├── public/
│   ├── favicon.svg
│   └── fonts/               # 정적 폰트 파일
├── docs/                    # AI 하네스 엔지니어링 세부 지침
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Pages 자동 배포 워크플로우
├── astro.config.mjs         # Astro 설정 (site, base, integrations)
├── AGENTS.md                # AI 작업 SSOT
└── CLAUDE.md                # Claude Code 진입점 → AGENTS.md 위임
```

## 주요 경로 규칙

- 블로그 포스트 본문에서 참조하는 이미지는 `src/assets/images/` 에 넣고 상대경로로 참조한다.
  - 올바른 예: `../../assets/images/my-image.png`
  - 잘못된 예: `/images/my-image.png` (`public/` 경로는 Astro 이미지 최적화가 적용되지 않음)
- 포스트 파일명은 영문 kebab-case로 작성한다: `symfony-start.md`, `api-doc.md`
- 새 컴포넌트는 `src/components/` 에 추가하고 PascalCase로 명명한다.
