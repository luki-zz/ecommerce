import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import style from "./Login.module.css";
import { registerSchema } from "./loginRegisterSchema";
import { Input } from "../Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";

export type dataType = {
  email: string;
  password: string;
};

type loginProps = {
  title: string;
  action: (data: dataType) => void;
};

export const LoginRegister = (props: loginProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isValid },
  } = useForm<dataType>({ resolver: yupResolver(registerSchema) });

  // useEffect(() => {
  //   if (isValid) {
  //     reset({
  //       login: "",
  //       password: "",
  //     });
  //   }
  // }, [isSubmitted]);

  return (
    <>
      <form onSubmit={handleSubmit(props.action)} className={style.form}>
        <h2>{props.title}</h2>

        <Input
          label="Login"
          {...register("email")}
          error={errors.login?.message}
        />

        <Input
          label="Password"
          {...register("password")}
          error={errors.password?.message}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
