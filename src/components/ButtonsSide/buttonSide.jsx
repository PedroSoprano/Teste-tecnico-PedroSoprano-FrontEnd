import "./style.css";
import { PageContext } from "../../Providers/handlePage";
import { useContext } from "react";

export const ButtonSide = ({ icon, select, open, setSelect, type, text }) => {
  const { setPage } = useContext(PageContext);

  return (
    <button
      className={select === type ? "itemsMenuSelect" : "itemsMenu"}
      id="firstItem"
      onClick={() => {
        setSelect(type);
        setPage(type);
      }}
    >
      {icon}
      <p className={open ? "textItemMenu" : " hidden"}>{text}</p>
    </button>
  );
};
