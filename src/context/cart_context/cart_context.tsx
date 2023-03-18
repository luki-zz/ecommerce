import React, { useEffect, useContext, useState } from "react";

type CartContextType = {
  buy: (id: string, name: string, price: number) => void;
};

const CartContext = React.createContext<CartContextType | null>(null);

export const CartProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [cart, setCart] = useState([]);
  const buy = (id, name, price) => {
    console.log("add to cart works");
    setCart((prevCart) => {
      prevCart.push({ id, name, price, qty: 1 });
    });
  };
  return (
    <CartContext.Provider value={{ buy }}>{children}</CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
