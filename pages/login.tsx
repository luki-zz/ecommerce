import React from "react";
import { LoginRegister } from "src/components/Login/LoginRegister";
import { PageHeader } from "src/components/PageHeader/PageHeader";
import style from "./login.module.css";
import { dataType } from "src/components/Login/LoginRegister";

const LoginPage = () => {
  const login = (data: dataType) => {
    console.log(data);
  };
  const register = (data: dataType) => console.log(data);
  return (
    <>
      <PageHeader title="Login / Register" />
      <div className="container">
        <section className={style.loginRegisterWrap}>
          <LoginRegister title="Login Here" action={login} />
          <LoginRegister title="Register Here" action={register} />
        </section>
      </div>
    </>
  );
};

export default LoginPage;
