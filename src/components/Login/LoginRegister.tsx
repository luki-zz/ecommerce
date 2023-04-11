import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import style from "./Login.module.css";

export type dataType = {
  login: string;
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
    watch,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<dataType>();

  useEffect(() => {
    reset({
      login: "",
      password: "",
    });
  }, [isSubmitted]);

  return (
    <>
      <form onSubmit={handleSubmit(props.action)} className={style.form}>
        <h2>{props.title}</h2>
        <label htmlFor="login">
          Login:
          <br />
          <input {...register("login", { required: true })} type="text" />
          <br />
          <div className={style.notification}>
            {errors.login && <span>This filed is required</span>}
          </div>
        </label>
        <label htmlFor="password">
          Password:
          <br />
          <input
            {...register("password", { required: true })}
            type="password"
          />
          <br />
          <div className={style.notification}>
            {errors.password && <span>This filed is required</span>}
          </div>
        </label>
        <input type="submit" value="submit" />
      </form>
    </>
  );
};
