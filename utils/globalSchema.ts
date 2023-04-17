import * as yup from "yup";

export const errorMsg = {
  requiredField: "This field is required",
};

export const globalSchema = {
  email: yup.string().email().required(errorMsg.requiredField),
  password: yup.string().min(6).required(errorMsg.requiredField),
};
