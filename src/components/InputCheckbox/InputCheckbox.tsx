import React from "react";
import style from "./imputCheckbox.module.css";

type InputProps = {
  error: string | undefined;
  label: string;
};

// eslint-disable-next-line react/display-name
export const InputCheckbox = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className={style.inputWrapper}>
        <label>
          <input className={style.input} type="checkbox" {...props} ref={ref} />
          {label}
        </label>
        <div className={style.notification}>{error}</div>
      </div>
    );
  }
);
