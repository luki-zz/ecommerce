import React, { useState } from "react";
import { Login } from "src/components/Login/Login";
import { PageHeader } from "src/components/PageHeader/PageHeader";
import style from "./login.module.css";
import type { dataType } from "src/components/Login/Login";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Register } from "src/components/Register/Register";

const LoginPage = () => {
  const login = (data: dataType) => {
    signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
  };
  const register = async (data: dataType) => {
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
  };
  return (
    <>
      <PageHeader title="Login / Register" />
      <div className="container">
        <section className={style.loginRegisterWrap}>
          <Login action={login} />
          <Register action={register} />
        </section>
      </div>
    </>
  );
};

export default LoginPage;
