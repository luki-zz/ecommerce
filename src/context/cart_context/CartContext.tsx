import React, { useEffect, useContext, useState } from "react";
import { addProductToCart, getCartSummary } from "./utilsCartContex";
// import { calculateTotals } from "./utils_cart_context";

export type CartContextType = {
  addToCart: (product: { id: string; name: string; price: number }) => void;
  cartSummary: { totalAmount: number; totalCost: number };
};

export type CartTypes = {
  id: string;
  name: string;
  price: number;
  qty: number;
  value: number;
};

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartTypes[]>([]);

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    const initialCartState = cart ? JSON.parse(localCart) : [];
    setCart(initialCartState);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        addToCart: (product: Parameters<CartContextType["addToCart"]>[0]) => {
          setCart((prevCart) => addProductToCart(prevCart, product));
        },
        cartSummary: getCartSummary(cart),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("CartContext must be used within a CartProvider");
  }
  return context;
};
