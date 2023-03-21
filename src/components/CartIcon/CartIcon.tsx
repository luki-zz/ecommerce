import React from "react";
import { useCartContext } from "src/context/cart_context/CartContext";

export const CartIcon = () => {
  const { cartSummary } = useCartContext();
  return <>Cart: {cartSummary.totalAmount}</>;
};
