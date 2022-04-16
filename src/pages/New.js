import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

function New() {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감성 일기장 - 새 일기`;
  }, []);
  return (
    <div>
      <DiaryEditor />
    </div>
  );
}

export default New;
