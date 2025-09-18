---
title: "CI3 VS Symfony"
description: "PHP 개발프레임워크인 Codeigniter3 와 Symfony의 비교"
pubDate: "Aug 24 2025"
heroImage: "../../assets/blog-placeholder-5jpg"
tags: ["PHP", "Codeigniter3", "Symfony"]
---

PHP로 개발을 하면서 제일 간편하게 쓰인 프레임워크는 Codeigniter3 였습니다. 용량도 적고, 설정이 간편하며, 핵심 기능도 간편하게 이해가 가능하기 때문입니다. 실제로 Codeigniter3 `Welcome` 페이지에는 본인들을 이렇게 어필합니다.

> - You want a framework with a small footprint.
> - You want a framework that requires nearly zero configuration.
> - You do not want to be forced to learn a templating language (although a template parser is optionally available if you desire one).

실제로 Codeigniter3 로 개발을 시작하면 저 말이 모두 사실임을 알 수 있습니다. 최신 버전을 다운로드해도 전체 폴더용량이 2MB가 채 되지 않고, 복잡한 설정은 필요없이 바로 실행시켜도 무방합니다. 또한 별도의 템플릿문법이나 템플릿 시스템도 필요없어서 그냥 HTML 파일에 `<?= ?>`를 활용한 PHP 문법으로도 View 파일을 제작할 수 있죠.

다만 어느정도 사용하다보니 분명한 한계점이 있었습니다.

- **API 중심 아키텍처**: RESTful API의 필요성 증대
- **타입 안정성**: 코드 품질 및 유지보수성 향상 요구
- **테스트 용이성**: 배포 및 커밋 전 자동화된 테스트 환경 구축 필요성
- **확장성**: 기능 확장 및 서드파티 라이브러리 통합의 유연성

이러한 배경에서 Symfony를 기술적 대안으로 검토하게 되었으며, 주요 비교 분석 결과는 다음과 같습니다.

### 1. 의존성 관리 및 아키텍처 패턴

**의존성 주입(Dependency Injection) 지원 차이**

CodeIgniter 3는 Service Locator 패턴을 기반으로 하며, 런타임 의존성 해결에 의존합니다. 반면 Symfony는 컴파일 타임 의존성 주입을 통해 더 명확한 의존성 관리가 가능합니다. 다음 코드는 실제로 Codeigniter3 환경에서 일반적으로 작성하게 되는 코드입니다.

```php
<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Main extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model("Main");
    }

    public function index()
    {
        $viewModel = [
            'list' => $this->Main->loadSomething()
        ];
        $this->load->view('main/index', $viewModel);
    }
}
```

익숙한 코드이겠지만 다음과 같은 문제점이 있습니다.

- Service Locator 패턴: `$this->load->model()` 방식의 런타임 의존성 해결
- 암시적 의존성: `$this->Main` 프로퍼티의 출처가 코드상에서 명확하지 않음

### 2. 라우팅 시스템 및 API 설계

API를 작성하면 정확한 HTTP 메서드 제한과 파라미터 검증이 중요합니다. 하지만 기본적으로는 Codeigniter3에서는 메서드를 제한하고, 파라미터의 타입도 제한을 할 수없습니다. 그래서 보통 이런식으로 코드를 작성했습니다.

```php
<?php
// /application/core/MY_Controller.php

class MY_Controller extends CI_Controller
{
    private function assertMethod(string $method) {
       if (strtoupper($this->input->method()) !== strtoupper($methodName)) {
            show_error('Method Not Allowed', 405);
        }
    }

    protected function assertPostMethod()
    {
        $this->assertMethod('post');
    }

    protected function assertGetMethod()
    {
        $this->assertMethod('get');
    }
}
```

이런식으로 컨트롤러 내부에다가 메서드 제한 함수를 미리 정의를 해두고 사용했습니다.

```php
// /application/controller/Example.php
<?php

class Example extends MY_Controller
{
    // 뷰 파일, GET Method만 호출 가능
    public function list(int $type = 1)
    {
        $this->assertGetMethod();

        $this->load->model('Example');

        $list = $this->Example->findList($type);
        $this->load->view('example/list_v', ['list' => $list]);
    }

    // API 호출 전용, POST Method만 호출 가능
    public function add()
    {
        $this->assertPostMethod();

        $brandName = $this->input->post('name');
        $brandUrl = $this->input->post('url');

        $this->load->model('Example');
        $this->Example->addSomething($brandName, $brandUrl);

        echo_json(['code' => 'success']);
    }
}
```

또한 Parameter에 타입을 지정해서 제한할 수 있습니다. 문제는 Parameter에 타입을 지정하게 되면, 400 Error가 아닌 Server Type Error이기 때문에 500대 Error가 발생합니다. Codeigniter3에서는 우선 사용자 요청 URI로 Controller와 Method, Parameter를 추출합니다. 그리고 알게된 Controller를 `require_once`로 붙여넣고, 클래스를 new 한 후 `call_user_func_array`로 메서드를 실행하게 됩니다.

`Symfony`에서는 보다 간편하게 설정이 가능합니다. 위 코드를 동일하게 작성한다면 다음과 같습니다.

```php
<?php

namespace App\Controller;

use App\Repository\ExampleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ExampleController extends AbstractController
{
    #[Route('/example/list/{type}', name: 'example_list', methods: ['GET'], requirements: ['type' => '\d+'])]
    public function list(int $type = 1, ExampleRepository $exampleRepository): Response
    {
        $list = $exampleRepository->findBrands($type);
        return $this->render('example/list.html.twig', ['list' => $list]);
    }

    #[Route('/example/add', name: 'example_add', methods: ['POST'])]
    public function add(Request $request, ExampleRepository $exampleRepository): JsonResponse
    {
        $name = $request->get('name');
        $url = $request->get('url');

        $something = new Something($name, $url);
        $exampleRepository->save($something);

        return $this->json(['code' => 'success']);
    }
}
```

**Symfony 라우팅 시스템의 장점:**

1. **선언적 라우팅**: PHP 8 Attributes를 활용한 메타데이터 기반 라우팅
2. **컴파일 타임 검증**: 라우팅 규칙의 사전 검증으로 런타임 오류 방지
3. **타입 안전성**: 파라미터 타입 불일치 시 자동 400 에러 응답
4. **HTTP 메서드 제한**: 프레임워크 레벨에서의 메서드 검증

**개발 생산성 향상:**

- 코드와 라우팅 정보의 공존으로 가독성 향상
- Attribute 사용시 IDE 지원을 통한 자동완성 및 리팩토링 안전성

### 3. HTTP 응답 처리 및 API 표준화

**응답 처리 방식의 기술적 차이**

API 개발에서는 일관된 응답 형식과 적절한 HTTP 상태 코드 관리가 중요합니다. 하지만 Codeigniter3에서는 `json` 반환도 지원하지 않아. 다음처럼 사용해야합니다.

**CodeIgniter 3:**

```php
$this->output
        ->set_content_type('application/json')
        ->set_output(json_encode(array('foo' => 'bar')));
```

하지만 Symfony에선 다음처럼 Response에 대한 더욱 다양한 지원이 있습니다.

**Symfony:**

```php
return $this->json(['foo' => 'bar']);
```

**기술적 분석:**

- **HTTP 표준 준수**: Symfony는 RFC 표준에 맞는 응답 헤더 자동 설정
- **타입 안전성**: JsonResponse 클래스를 통한 명시적 응답 타입 지정
- **에러 처리**: 예외 상황 시 적절한 HTTP 상태 코드 자동 매핑

## 결론

"CodeIgniter 3보다 Symfony가 더 우월하니까 사용하자"는 잘못된 접근이라고 생각합니다. 다만 앞서 살펴본 바와 같이 특정 영역에서 더 나은 지원을 제공하는 것은 사실입니다. 특히 더 견고하고 기술적 범위가 큰 프로젝트에서는 생각보다 간편하게 도입하여 상당한 이점을 얻을 수 있을 것으로 판단됩니다.
