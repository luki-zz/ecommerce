import { CartTypes, ProductType } from "../CartContext";
import { faker } from "@faker-js/faker";
import { addProductToCart } from "../utilsCartContex";

const createProduct = (): ProductType => {
  return {
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
  };
};

const createCart = (numberItems: number): CartTypes[] => {
  const amoutProduct = faker.datatype.number({ min: 1, max: 10 });
  return Array.from({ length: numberItems }, () => {
    const newProduct = createProduct();
    return {
      ...newProduct,
      qty: amoutProduct,
      value: amoutProduct * newProduct.price,
    };
  });
};

describe("utilsCartContext test", () => {
  it("if we add first time product to cart, item should have quantity and value", () => {
    const cart = createCart(2);
    const addedProduct = createProduct();
    const newOrder = addProductToCart(cart, addedProduct);
    expect(newOrder.length).toBe(cart.length + 1);
  });
  it("if we add existing product to cart, quantity and value should increase", () => {
    const cart = createCart(2);
    const newOrder = addProductToCart(cart, cart[0]);
    const addedProduct = {
      ...cart[0],
      qty: 1,
      value: cart[0].value / cart[0].qty,
    };
    expect(newOrder[0].qty).toBe(cart[0].qty + 1);
    expect(newOrder[0].value).toBe(cart[0].value + addedProduct.value);
  });
});
export {};
