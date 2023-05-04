import React from "react";
import style from "./Input.module.css";

type InputProps = {
  label: string;
  error: string | undefined;
} & JSX.IntrinsicElements["input"];

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className={`${style.inputWrapper}`}>
        <label>
          <span>{label}</span>{" "}
          <input
            {...props}
            ref={ref}
            className={`${error && style.inputError}`}
          />
        </label>
        <div className={style.notification}>{error}</div>
      </div>
    );
  }
);

Input.displayName = "input";
