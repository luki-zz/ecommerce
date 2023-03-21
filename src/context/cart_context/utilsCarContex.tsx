import { CartContextType, CartTypes } from "./CartContext";

export const addProductToCart = (
  prevCart,
  product: Parameters<CartContextType["addToCart"]>[0]
) => {
  const addedProduct = prevCart.find(
    (cartItem: CartTypes) => cartItem.id === product.id
  );
  if (addedProduct) {
    const newOrder = prevCart.map((item: CartTypes) => {
      if (item.id === addedProduct.id) {
        return {
          ...item,
          qty: item.qty + 1,
          value: item.price * (item.qty + 1),
        };
      }
      return item;
    });
    return newOrder;
  }
  return [...prevCart, { ...product, qty: 1, value: product.price }];
};
