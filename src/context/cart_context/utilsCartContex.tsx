import { CartTypes, CartContextType } from "./CartContext";
export const addProductToCart = (
  prevCart: CartTypes[],
  product: { product: CartContextType["addToCart"] }
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

export const getCartSummary = (cart) =>
  cart.reduce(
    (summary, product) => ({
      totalAmount: summary.totalAmount + product.qty,
      totalCost: summary.totalCost + product.qty * product.price,
    }),
    {
      totalCost: 0,
      totalAmount: 0,
    }
  );
