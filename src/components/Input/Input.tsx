import React from "react";
import style from "./Input.module.css";

type InputProps = {
  label: string;
  error: string;
} & JSX.IntrinsicElements["input"];

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <>
        <label htmlFor="login">
          {label}
          <input {...props} ref={ref} />
        </label>
        <div className={style.notification}>{error}</div>
      </>
    );
  }
);

Input.displayName = "input";
