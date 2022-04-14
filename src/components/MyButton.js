const MyButton = ({ text, type, onClick }) => {
  const btnType = [`positive`, `negative`].includes(type) ? type : `default`;
  return (
    <button
      className={["MyButton", `MyButton_${type}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaltProps = {
  type: "default",
};
export default MyButton;
