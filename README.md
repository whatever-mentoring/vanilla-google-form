# vanilla-google-form
구글폼을 바닐라JS를 이용하여 spa로 만들어보는 프로젝트입니다.
react의 함수형 컴포넌트 컨셉을 이용하여 spa를 구현했습니다. (가상돔,함수형 컴포넌트,라우터 구현)

## 핵심 동작 과정
1. esbuild를 통해 jsx문법을 js로 트랜스파일링하여 VDOM을 생성
2. VDOM을 DOM에 올리기 전에 **new VDOM**과 **old VDOM**을 비교하여 **new VDOM**을 DOM에 업데이트
3. 컴포넌트에서 상태가 변경이 되면, 2번 과정을 거쳐서 리렌더링

## 폴더 구조 컨셉

```
├── public
│   └── vite.svg
├── src
│   ├── infrastructure
│   │   └── localstorage.ts
│   ├── repository
│   ├── lib
│   ├── components
│   ├── styles
│   ├── utils
│   ├── hooks
│   ├── pages
│   │   ├── home
│   │   │   └── page.tsx
│   │   ├── layouts
│   │   │   └── BaseLayout.tsx
│   │   └── servey
│   │       ├── complete
│   │       │   └── page.tsx
│   │       ├── components
│   │       │   └── ServeyTitle.tsx
│   │       ├── first
│   │       │   ├── hooks
│   │       │   │   └── useFirstPageViewModel.ts
│   │       │   └── page.tsx
│   │       └── second
│   │           ├── hooks
│   │           │   └── useSecondPageViewModel.ts
│   │           └── page.tsx
│   ├── routes
│   ├── main.tsx
│   └── not-found.tsx
├── tsconfig.json
└── vite.config.js
```
    
- public : 번들링이 필요없는 static assets 파일들은 전부 public 폴더 아래에 위치시킵니다.
- src : 프로젝트 관련 소스 코드 파일들이 위치하는 폴더입니다. 이 폴더는 프로젝트의 핵심 소스 코드가 포함됩니다.
- infrastructure : 현재 프로젝트 기준으로 web storage api(localstorage)관련 코드가 존재합니다.
- repository : infrastructure를 통해 데이터를 가져오기 위한 코드가 존재합니다.
- [lib,components,styles,utils,hooks] : 이 그룹을 `segments`라고 하겠습니다. 전역적으로 재사용될 여지가 높으면 src바로 하위에 `segements`를 위치 시켰습니다. 만약, `pages/servey` 에서만 쓰이는 `segments` 라면 servey바로 하위에 위치를 시킵니다. `pages/servey`와 같은 레벨이거나 하위레벨에 있는 폴더의 경우에만 `pages/servey`의 `segments에 접근이 가능합니다.
  - lib : 외부 의존성(또는 모듈로 뺄 만한 vdom,router,jsx관련 기능들)이 있는 파일이 존재합니다.
  - components : ui 컴포넌트가 존재합니다.
  - styles : 스타일 관련 코드들이 존재합니다.
  - utils : 외부 의존성을 최소화한, 유틸리티 함수들이 존재합니다.
  - hooks : 재사용 가능한 hook로직이 존재합니다. (현재 프로젝트에선 use***ViewModel 훅이 존재합니다. viewmodel레이어에서만 repository에 접근이 가능합니다.)
- routes : 라우팅을 위한 구조가 정의되어 있습니다.
- main.tsx : 프로젝트의 entry파일입니다.
