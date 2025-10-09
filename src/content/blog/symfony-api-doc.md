---
title: 'Symfony개발시 API 문서 간단하게 만들어보기'
description: 'nelmio/api-doc-bundle을 활용해 문서화를 해보자'
pubDate: 'Oct 09 2025'
heroImage: '../../assets/blog-placeholder-3.jpg'
tags: ['PHP', 'Symfony', 'Swagger']
---

## API 문서화의 필요성

API를 개발하다 보면 항상 문서화의 필요성을 느끼게 됩니다. 어떤 엔드포인트가 있고, 어떤 파라미터를 받아서 어떤 응답을 주는지에 대한 명세가 필요하죠. 특히 프론트엔드와 협업할 때나 나중에 API를 다시 확인할 때 문서가 없다면 코드를 직접 뒤져봐야 하는 번거로움이 있습니다.

## Swagger UI

[Swagger UI](https://swagger.io/tools/swagger-ui/)는 API 문서화를 위한 강력한 도구입니다. 단순히 문서를 보여주는 것뿐만 아니라 실제로 API를 테스트해볼 수 있는 인터페이스까지 제공하죠. 하지만 일반적으로 Swagger를 사용하려면 별도의 JSON이나 YAML 파일을 작성해야 하는데, 이는 개발자가 코드를 작성한 후 추가로 문서를 업데이트해야 한다는 부담이 있습니다. 그러면 우리가 작성한 코드를 토대로 JSON이나 YAML파일을 만들어주면 훨씬 간편해지지 않을까 합니다.

## Symfony의 해결책: nelmio/api-doc-bundle

다행히 Symfony 환경에서는 이런 문제를 어느 정도 해결해주는 라이브러리가 있습니다. [nelmio/api-doc-bundle](https://symfony.com/bundles/NelmioApiDocBundle/current/index.html)은 Symfony 공식 문서에도 소개된 API 문서화 번들로, 별도의 파일 생성 없이 Attribute를 통해 간편하게 API 문서를 생성할 수 있게 해줍니다.

### 설치 및 설정

먼저 Composer를 통해 번들을 설치합니다:

```bash
composer require nelmio/api-doc-bundle
```

> Composer에는 명시되어 있지 않지만, Swagger UI를 사용하기 위해서는 `symfony/twig-bundle`과 `symfony/asset`번들이 필수적입니다. 만약 위 두개 번들이 없는 상태라면 추가해주세요.

Composer를 통해 설치를 하였다면, 우선 번들을 등록합니다.

```php
// config/bundles.php
return [
    // ...
    Nelmio\ApiDocBundle\NelmioApiDocBundle::class => ['all' => true],
    // ...
];

```

후에 API 문서로 만들 범위 및 API 호출 서버 등 API 문서 JSON에 사용할 옵션을 지정할 수 있습니다.

```yaml
## config/packages/nelmio_api_doc.yaml
nelmio_api_doc:
    documentation:
        servers: ## API 호출을 할 수 있는 서버 목록입니다.
            - url: http://localhost:8000
              description: LOCAL
            - url: https://api.example.com/secured
              description: PROD
        info: ## API에 대한 기본적인 정보입니다.
            title: MY API
            description: MY API
            version: 1.0.0
    areas: ## API 문서화 할 구역에 대한 구분입니다.
        default:
            path_patterns:
                - ^/(?!(_|api/doc(\.json)?$)) ## _로 시작하거나 api/doc, api/doc.json은 문서에서 제외합니다.
```

위 설정 중 문서화 할 구역에 대한 부분을 추가로 간단하게 이야기하면, 기본적으로 api-doc-bundle은 라우팅 중 `/api` 로 시작하는 Path만 문서화를 합니다. 일반적인 WebApp 구조에서는 `/api` 부분을 API로 만들고, 나머지는 페이지 뷰로 만들어서 그런것 같은데, 순수 API 서버일 경우에는 위와 같이 설정하면 됩니다. _로 시작하는 Path를 제외시킨건 `_error` Symfony에서 제공하는 페이지 라우팅도 포함되기 때문에 그렇습니다.

위와 같이 작성된 yaml은 후에 json으로 파일이 작성될때 다음과 같이 추가됩니다.

```json
{
    "openapi": "3.0.0",
    "info": {
        "title": "MY API",
        "description": "MY API",
        "version": "1.0.0",
        "x-build": null
    },
    "servers": [
        {
            "url": "http://localhost:8000",
            "description": "LOCAL"
        },
        {
            "url": "https://api.example.com/secured",
            "description": "PROD"
        }
    ],
    "paths" : [
        // Your API Paths
    ]
}
```

이제 Swagger UI를 활용해 문서를 볼 수 있는 페이지를 라우팅에 추가합니다.

```yaml
## config/routes.yaml
controllers:
    resource:
        path: ../src/Controller/
        namespace: App\Controller
    type: attribute

app.swagger_ui: ## 직접적으로 UI를 볼 수 있는 페이지입니다.
    path: /api/doc
    methods: GET
    defaults: { _controller: nelmio_api_doc.controller.swagger_ui } ## 해당 부분을 수정해서 Swagger가 아닌 다른 UI로도 볼 수 있습니다. 자세한건 공식문서(https://symfony.com/bundles/NelmioApiDocBundle/current/index.html)를 참고해주세요.

app.swagger: ## Swagger에서 사용되는 Json을 볼 수 있는 페이지입니다.
    path: /api/doc.json
    methods: GET
    defaults: { _controller: nelmio_api_doc.controller.swagger }
```

path는 얼마든지 변경가능하며, 변경 후에는 아까 상단에서 설정했던(config/packages/nelmio_api_doc.yaml) 문서화할 path에서 제외만 해주시면 됩니다.

### 사용법

만약 다음과 같은 api가 있다고 가정해봅시다. 해당 api는 page를 입력받아 사용자 목록을 조회합니다.

```php
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;

class UserController extends AbstractController
{
    #[Route('/api/users', methods: ['GET'])]
    public function findUsers(Request $request, UserRepository $userRepository): JsonResponse
    {
        $page = $request->query->getInt('page', 1);
        $users = $userRepository->findUsers($page);

        return $this->json([
            'users' => $users
        ])
    }
}
```

그러면 문서는 다음과 같이 작성할 수 있습니다.

```php
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use OpenApi\Attributes as OA;

class UserController extends AbstractController
{
    #[Route('/api/users', methods: ['GET'])]
    #[OA\Get(
        parameters: [
            new OA\Parameter(name: 'page', in: 'query', required: false, example: 1),
        ],
        responses: [
            new OA\Response(response: 200, description: '성공', content: new OA\JsonContent(
                type: 'object',
                properties: [
                    new OA\Property(property: 'users', type: 'array', [
                        ['id' => 1, 'name' => '홍길동']
                    ]),
                ],
            )),
        ],
    )]
    public function findUsers(Request $request, UserRepository $userRepository): JsonResponse
    {
        $page = $request->query->getInt('page', 1);
        $users = $userRepository->findUsers($page);

        return $this->json([
            'users' => $users
        ])
    }
}
```

메서드를 정의하고, 해당 메서드에 맞는 Parameter와 그에 따른 Response를 위에 처럼 정의 할 수 있습니다.

그러면 Swagger를 좀 더 정리하기 위해서 태그를 달아봅시다.

```php
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use OpenApi\Attributes as OA;

class UserController extends AbstractController
{
    #[Route('/api/users', methods: ['GET'])]
    #[OA\Get(
        parameters: [
            new OA\Parameter(name: 'page', in: 'query', required: false, example: 1),
        ],
        responses: [
            new OA\Response(response: 200, description: '성공', content: new OA\JsonContent(
                type: 'object',
                properties: [
                    new OA\Property(property: 'users', type: 'array', [
                        ['id' => 1, 'name' => '홍길동']
                    ]),
                ],
            )),
        ],
    )]
    #[OA\Tag(name: 'User')]
    public function findUsers(Request $request, UserRepository $userRepository): JsonResponse
    {
        $page = $request->query->getInt('page', 1);
        $users = $userRepository->findUsers($page);

        return $this->json([
            'users' => $users
        ])
    }
}
```

이렇게 각 메서드마다 달 수 도 있지만, Controller에 달아도 유효합니다.

### 장점

1. **코드와 문서의 일체화**: 컨트롤러 코드 바로 위에 문서화 정보가 있어서 코드 변경 시 문서도 함께 수정하기 쉽습니다.
2. **자동 생성**: 라우팅 정보는 자동으로 감지되고, 추가 정보만 속성으로 제공하면 됩니다.
3. **Swagger UI 제공**: `/api/doc` 경로로 접속하면 바로 Swagger UI를 확인할 수 있습니다.

### 결론

완전한 자동화는 아니지만, `nelmio/api-doc-bundle`을 사용하면 최소한의 노력으로 깔끔한 API 문서를 만들 수 있습니다. 특히 Symfony 프로젝트에서 API를 개발한다면 꼭 한번 사용해볼 만한 도구라고 생각합니다.