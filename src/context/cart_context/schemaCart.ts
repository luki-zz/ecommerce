import * as yup from "yup";

export const cartSchema = yup
  .array()
  .of(
    yup
      .object({
        id: yup.string().required(),
        name: yup.string().required(),
        price: yup.number().required(),
        qty: yup.number().required(),
        value: yup.number().required(),
        image: yup
          .object({
            url: yup.string().url().required(),
            width: yup.number().required(),
            height: yup.number().required(),
          })
          .required(),
      })
      .required()
  )
  .required();

export type CartTypes = yup.InferType<typeof cartSchema>;
