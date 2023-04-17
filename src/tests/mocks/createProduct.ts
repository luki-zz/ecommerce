import { faker } from "@faker-js/faker";
import type { ProductType } from "src/context/cart_context/CartContext";

export const createProduct = (): ProductType => {
  return {
    image: {
      url: faker.image.abstract(),
      width: Number(faker.random.numeric()),
      height: Number(faker.random.numeric()),
    },
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
  };
};
