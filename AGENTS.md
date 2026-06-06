# AGENTS.md

이 파일은 이 프로젝트에 대한 AI 하네스 엔지니어링의 **SSOT(Single Source of Truth)** 입니다.
Claude Code, Cursor, Copilot, Codex 등 모든 AI 에이전트는 이 파일을 유일한 진입점으로 삼습니다.

세부 지침은 아래 `docs/` 하위 문서를 참조하십시오.
이 파일과 하위 문서 간에 충돌이 생기면 이 파일이 우선합니다.

---

## 프로젝트 개요

곽용준의 개인 개발 블로그.
Astro 기반 정적 사이트로, `master` 브랜치 push 시 GitHub Actions를 통해 GitHub Pages에 자동 배포됩니다.

- **사이트**: https://yong-joon-kwak.github.io
- **스택**: Astro · Vue 3 · Tailwind CSS
- **콘텐츠**: `src/content/blog/` 하위 `.md` / `.mdx` 파일

---

## 핵심 규칙

1. **요청 범위만 수정한다.** 요청하지 않은 리팩터링, 스타일 정리, 주석 추가를 하지 않는다.
2. **빌드를 깨뜨리지 않는다.** 변경 후 `npm run build` 가 성공해야 작업 완료로 간주한다.
3. **배포 설정은 사전 승인 없이 변경하지 않는다.** `astro.config.mjs`, `.github/workflows/deploy.yml` 이 여기에 해당한다.
4. **`node_modules/`, `dist/`는 절대 수정하지 않는다.**
5. **지침을 변경할 때는 이 파일 또는 해당 하위 문서만 수정한다.** 다른 위치에 지침을 분산시키지 않는다.

---

## 하위 문서 목록

| 문서 | 내용 |
|------|------|
| [docs/content-guide.md](docs/content-guide.md) | 블로그 포스트 작성 규칙, frontmatter 스키마 |
| [docs/project-structure.md](docs/project-structure.md) | 파일 구조 및 각 파일의 역할 |
| [docs/workflow.md](docs/workflow.md) | 주요 작업 흐름 및 명령어 |
| [docs/component-guide.md](docs/component-guide.md) | 컴포넌트·레이아웃 수정 지침 |
