import React from "react";
import style from "./Login.module.css";

export const Login = () => {
  return (
    <>
      <h2>Login Here</h2>
      <form className={style.form}>
        <label htmlFor="login">
          Login:
          <input name="login" type="text" />
        </label>
        <label htmlFor="password">
          Password:
          <input name="password" type="password" />
        </label>
      </form>
    </>
  );
};
