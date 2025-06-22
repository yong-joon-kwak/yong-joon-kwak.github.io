# Dev Blog

Vue3 + Vite + TypeScript 기반의 개발자 블로그입니다.

## 기술 스택

- **Vue 3** - Composition API를 활용한 모던 Vue.js
- **TypeScript** - 타입 안전성을 위한 정적 타입 검사
- **Vite** - 빠른 개발 서버와 빌드 도구
- **Vue Router** - 클라이언트 사이드 라우팅

## 프로젝트 구조

```
dev-blog/
├── src/
│   ├── views/          # 페이지 컴포넌트
│   │   ├── Home.vue    # 홈 페이지
│   │   ├── Blog.vue    # 블로그 페이지
│   │   └── About.vue   # 소개 페이지
│   ├── App.vue         # 메인 앱 컴포넌트
│   ├── main.ts         # 앱 진입점
│   ├── style.css       # 전역 스타일
│   └── vite-env.d.ts   # Vite 타입 정의
├── index.html          # HTML 템플릿
├── package.json        # 프로젝트 의존성
├── vite.config.ts      # Vite 설정
├── tsconfig.json       # TypeScript 설정
└── tsconfig.node.json  # Node.js TypeScript 설정
```

## 시작하기

### 의존성 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 http://localhost:3000 에서 실행됩니다.

### 프로덕션 빌드

```bash
npm run build
```

### 빌드 결과 미리보기

```bash
npm run preview
```

### 타입 체크

```bash
npm run type-check
```

## 주요 기능

- **반응형 디자인** - 모바일과 데스크톱에서 최적화된 UI
- **라우팅** - Vue Router를 활용한 SPA 라우팅
- **검색 및 필터링** - 블로그 포스트 검색 및 카테고리 필터링
- **모던 UI** - 깔끔하고 현대적인 디자인

## 커스터마이징

### 새로운 페이지 추가

1. `src/views/` 디렉토리에 새로운 Vue 컴포넌트 생성
2. `src/main.ts`의 라우터 설정에 새 경로 추가

### 스타일 수정

- 전역 스타일: `src/style.css`
- 컴포넌트별 스타일: 각 Vue 파일의 `<style>` 섹션

## 라이선스

MIT License 