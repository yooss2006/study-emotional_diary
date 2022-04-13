import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function Edit() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const mode = searchParams.get("mode");
  return (
    <div>
      <h2>Edit</h2>
      <p>이곳은 일기 수정 페이지입니다.</p>
      <button onClick={() => setSearchParams({ name: "yoo" })}>
        QS 바꾸기
      </button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        home으로 가기
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로 가기
      </button>
    </div>
  );
}

export default Edit;
