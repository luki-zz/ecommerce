import React from "react";
import { Login } from "src/components/Login/Login";
import { PageHeader } from "src/components/PageHeader/PageHeader";
import { Register } from "src/components/Register/Register";
import style from "./login.module.css";

const LoginPage = () => {
  return (
    <>
      <PageHeader title="Login / Register" />
      <div className="container">
        <section className={style.loginRegisterWrap}>
          <Login />

          <Register />
        </section>
      </div>
    </>
  );
};

export default LoginPage;
