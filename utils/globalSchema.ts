import * as yup from "yup";

export const errorMsg = {
  requiredField: "This field is required",
  doNotMatch: "Password do not match",
  acceptTerms: "You must accept the terms and conditions",
};

export const globalSchema = {
  email: yup.string().email().required(errorMsg.requiredField),
  password: yup.string().min(6).required(errorMsg.requiredField),
  regulations: yup.boolean().oneOf([true], errorMsg.acceptTerms),
  passwordRepeat: yup
    .string()
    .required(errorMsg.requiredField)
    .oneOf([yup.ref("password")], errorMsg.doNotMatch),
};
