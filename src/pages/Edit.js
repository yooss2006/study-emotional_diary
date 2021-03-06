import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dirayList = useContext(DiaryStateContext);
  const [originData, setOriginData] = useState();
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감성 일기장 - ${id}번 일기 수정`;
  }, []);
  useEffect(() => {
    if (dirayList.length >= 1) {
      const targetDiary = dirayList.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
      console.log(targetDiary, dirayList);
      if (targetDiary) {
        setOriginData(targetDiary);
        console.log(targetDiary, originData);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, dirayList]);
  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
}

export default Edit;
