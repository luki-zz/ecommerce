import React from "react";
import style from "./loginRegisterButton.module.css";

type propType = {
  text: string;
};

export const LoginRegisterButton = ({ text }: propType) => {
  return (
    <button className={style.loginRegisterButton} type="submit">
      {text}
    </button>
  );
};
