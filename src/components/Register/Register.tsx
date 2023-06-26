import React from "react";
import { useForm } from "react-hook-form";
import style from "./register.module.css";
import { registerSchema } from "./registerSchema";
import { Input } from "../Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginRegisterButton } from "../LoginRegisterButton/LoginRegisterButton";
import { InputCheckbox } from "../InputCheckbox/InputCheckbox";

export type dataType = {
  email: string;
  password: string;
  passwordRepeat: string;
  regulations: string;
};

type registerProps = {
  action: (data: dataType) => void;
};

export const Register = (props: registerProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<dataType>({ resolver: yupResolver(registerSchema) });

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit(props.action)}>
        <h2>Register:</h2>

        <Input
          type="text"
          label="Login"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          type="password"
          label="Password"
          {...register("password")}
          error={errors.password?.message}
        />

        <Input
          type="password"
          label="Repeat password"
          {...register("passwordRepeat")}
          error={errors.passwordRepeat?.message}
        />

        <InputCheckbox
          {...register("regulations")}
          label=" * I accept terms of service and I have read the information regarding mine personal details below."
          error={errors.regulations?.message}
        />

        <LoginRegisterButton text="Register" />
      </form>
    </>
  );
};
