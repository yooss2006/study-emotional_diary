## 한입 크기로 잘라 먹는 리액트의 감성 일기장 예제

---

해당 예제를 작성하며 새롭게 배운 내용과 마주했던 어려움에 대한 내용을 작성할 예정입니다.

자세한 내용은 노션에 정리했습니다.

[노션링크](https://supreme-balance-5ba.notion.site/3bfafa153ed24b23ac26425d69e29d7a)

1. react-router-dom 학습

2. 이미지 불러올 때 public 폴더에서 불러오기

process.env.PUBLIC_URL는 public 폴더를 의미한다.

```
<img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} />
```
