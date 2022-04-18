## 한입 크기로 잘라 먹는 리액트의 감성 일기장 예제

---

해당 예제를 작성하며 새롭게 배운 내용과 마주했던 어려움에 대한 내용을 작성할 예정입니다.

자세한 내용은 노션에 정리했습니다.

[노션링크](https://supreme-balance-5ba.notion.site/3bfafa153ed24b23ac26425d69e29d7a)

[페이지 링크](https://yoosunsang-diary-project.web.app)

1. react-router-dom 학습

<br>

2. 이미지 불러올 때 public 폴더에서 불러오기

process.env.PUBLIC_URL는 public 폴더를 의미한다.

```jsx
<img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} />
```

혹시나 안되는 불상사를 막기위해 해당 파일 윗 부분에 다음과 같이 선언한다.

```jsx
const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";
```

<br>

3. 상황에 따라 다른 클래스 이름을 주는 기발한 방법

```jsx
className={["MyButton", `MyButton_${type}`].join(" ")}
```

<br>

4. 예외적인 상황 고려하기

예를들어 props로 들어온 데이터에 의해 클래스를 부착시키는 경우 props로 들어온 데이터가 잘못된 경우가 있을 수 있다.

이러한 상황을 항상 가정해서 처리를 하자.

```jsx
const btnType = [`positive`, `negative`].includes(type) ? type : `default`;
```

<br>

5. 배열 깊은 복사하기

```jsx
const copyList = JSON.parse(JSON.stringify(diaryList));
```

배열을 `JSON.stringify`로 문자열로 만들고 `JSON.parse`로 문자열을 풀어주므로 깊은 복사를 만든다.

<br>

5. useNavigate로 이동시키고 뒤로가기 막기

글 생성 페이지에서 글을 생성 후 뒤로가기 버튼을 누르면 다시 글생성 페이지로 갈 수 있는데 이를 막기 위해 사용한다. `replace`를 `true`로 설정한다.

```jsx
navigate("/", { replace: true });
```

<br>

6. 프로젝트 최적화

   1. 코드를 보고 낭비되는 부분 찾기 (정적 분석)
   2. 도구를 사용한 낭비되는 부분 찾기 (동적 분석)

1번은 초보자에겐 적합하지 않고 2번을 사용해서 문제를 해결한다. 사용하는 도구는 React Developer Tools 이다.

React Developer Tools 에서 Components 탭의 `Highlight updates when components render` 옵션을 이용해서 수행한다.

**찾는 예시**

1. 버튼과 같은 클릭할 만한 것들을 눌러본다.
2. 불필요한 부분이 리렌더링 된다면 찾은 것이다.

찾았다면 해당 컴포넌트에 `useEffect`로 log를 찍어보면 명시적으로 확인 가능하다.

ex) 날짜를 바꾸는 버튼을 클릭시 정렬 버튼과 일기쓰기 버튼도 리렌더링 된다.

ex) 단순한 정렬인데 컴포넌트들이 리렌더링되는 경우 이미지가 있으면 더욱 낭비가 심하다.

이런경우 `React.memo`를 사용하면 되는데 이 경우 조건이 있다. 전달받는 `props` 중에 함수가 있다면 `useCallback` 처리를 해야한다.

하지만 `useState`가 반환하는 상태변화 함수를 전달했다면 이는 `useCallback` 처리를 한것이므로 따로 처리할 필요가 없다.

```jsx
const handleClickEmote = useCallback((emotion) => {
  setEmotion(emotion);
}, []);
```

<br>

7. 배포하기

**배포 전 수정할 사항들**

- **title을 변경**하려면 `index.html`에서 변경한다.
- 페이지마다 `title`을 바꾸고 싶다면 페이지에 해당하는 컴포넌트마다 아래처럼 설정한다.
  ```jsx
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감성 일기장 - ${id}번 일기`;
  }, []);
  ```
- `meta` 태그의 `name` 속성의 값을 `description`으로 가지는 태그의 `content`를 프로젝트에 맞게 설정한다.
- `lang`를 `ko`로 바꾼다.
- 아이콘을 바꾸고 싶다면 `favicon.ico` 파일을 public 폴더에 넣어준다.

**빌드 하기**

```jsx
npm run build
```

빌드 작업이 끝나면 build 폴더가 만들어진다.

build 폴더를 확인해보면 코드들이 압축된 상태로 배포할 수 있게된다.

배포하기 위해 serve를 설치한다. 그리고 배포한다.

```jsx
npm install -g serve
serve -s build
```

배포하면 다음과 같은 글구가 나오는데 의미는 다음과 같다.

- Local은 현재 내 컴퓨터로 들어갈 수 있는 주소
- On Your Network는 현재 접속중인 와이파이에서 접속 가능한 주소

만약 배포 후 문제점을 발견해 수정했다면 다시 빌드 작업 후 `serve -s build` 해야한다.
