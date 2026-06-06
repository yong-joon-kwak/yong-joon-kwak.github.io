# 작업 흐름

> 상위 문서: [AGENTS.md](../AGENTS.md)

## 주요 명령어

```sh
npm run dev      # 개발 서버 시작 (http://localhost:4321)
npm run build    # 프로덕션 빌드 → ./dist/ 생성
npm run preview  # 빌드 결과물 로컬 미리보기
```

변경 작업 후에는 반드시 `npm run build` 로 빌드 성공을 확인한다.

## 배포 흐름

`master` 브랜치에 push하면 자동으로 배포된다. 수동 개입은 필요 없다.

```
로컬 변경 → git push origin master
  → GitHub Actions (build job)
  → GitHub Actions (deploy job)
  → https://yong-joon-kwak.github.io 반영
```

배포 설정 파일: `.github/workflows/deploy.yml`
배포 설정은 사전 승인 없이 수정하지 않는다.

## 새 블로그 포스트 추가

1. `src/content/blog/` 에 `kebab-case.md` 파일을 생성한다.
2. frontmatter를 작성한다. → [콘텐츠 작성 가이드](content-guide.md) 참조
3. `npm run build` 로 빌드 성공을 확인한다.
4. 커밋 후 `master` 에 push한다.

## 커밋 메시지 규칙

```
feat: [포스트 제목] 블로그 포스트 추가
fix: [수정 내용]
style: [변경 내용]
docs: [문서 변경 내용]
chore: [기타 작업]
```

## 자주 발생하는 문제

### 빌드 오류: `Expected type "string", received "undefined"`
frontmatter 필수 필드(`title`, `description`, `pubDate`)가 누락된 경우.
[콘텐츠 작성 가이드](content-guide.md)의 스키마를 확인한다.

### 이미지가 표시되지 않음
`heroImage` 경로가 잘못된 경우. `public/` 절대경로 대신 `src/assets/` 기준 상대경로를 사용해야 한다.
`../../assets/images/my-image.png` 형식을 확인한다.

### 태그 필터가 업데이트되지 않음
메인 페이지의 태그 목록은 `getCollection('blog')` 로 수집된 포스트들의 `tags` frontmatter를 기반으로 빌드 시점에 생성된다. 빌드 후 확인한다.
