import React, { useEffect, useContext, useState } from "react";
import { addProductToCart, getCartSummary } from "./utilsCartContex";
import { cartSchema } from "./schemaCart";
import type { CartTypes } from "./schemaCart";
// import { calculateTotals } from "./utils_cart_context";

export type CartContextType = {
  addToCart: (product: {
    id: string;
    name: string;
    price: number;
    image: { url: string; width: number; height: number };
  }) => void;
  cartSummary: { totalAmount: number; totalCost: number };
  cart: CartTypes;
  clearCart: () => void;
};

export type ProductType = {
  id: string;
  name: string;
  price: number;
  image: { url: string; width: number; height: number };
};

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartTypes>([]);

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      const cartLocalStorage = JSON.parse(localCart);
      const isValidCart = cartSchema.isValidSync(cartLocalStorage);
      if (!isValidCart) {
        localStorage.removeItem("cart");
        return;
      }
      setCart(cartLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (!cart.length) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        addToCart: (product: Parameters<CartContextType["addToCart"]>[0]) => {
          setCart((prevCart) => addProductToCart(prevCart, product));
          console.log(product);
        },
        cartSummary: getCartSummary(cart),
        cart,
        clearCart: () => setCart([]),
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
