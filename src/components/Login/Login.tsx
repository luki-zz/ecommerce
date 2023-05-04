import React from "react";
import { useForm } from "react-hook-form";
import style from "./Login.module.css";
import { registerSchema } from "./loginRegisterSchema";
import { Input } from "../Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginRegisterButton } from "../LoginRegisterButton/LoginRegisterButton";

export type dataType = {
  email: string;
  password: string;
};

type loginProps = {
  action: (data: dataType) => void;
};

export const Login = (props: loginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<dataType>({ resolver: yupResolver(registerSchema) });

  return (
    <>
      <form onSubmit={handleSubmit(props.action)} className={style.form}>
        <h2>Log in:</h2>

        <Input
          label="Login"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          {...register("password")}
          error={errors.password?.message}
        />
        <LoginRegisterButton text="Login" />
      </form>
    </>
  );
};
