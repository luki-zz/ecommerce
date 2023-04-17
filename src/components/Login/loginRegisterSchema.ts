import * as yup from "yup";
import { globalSchema } from "utils/globalSchema";

export const registerSchema = yup.object({
  email: globalSchema.email,
  password: globalSchema.password,
});
