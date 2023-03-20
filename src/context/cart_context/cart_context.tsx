import React, { useEffect, useContext, useState } from "react";
import { calculateTotals } from "./utils_cart_context";

type CartContextType = {
  addToCart: (product: { id: string; name: string; price: number }) => void;
  cartSummary: { totalAmount: number; totalCost: number };
};

type CartTypes = {
  id: string;
  name: string;
  price: number;
  qty: number;
  value: number;
};

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartTypes[]>([]);
  const [cartSummary, setCartSummary] = useState<SummaryType>({
    totalQty: 0,
    totalValue: 0,
  });

  const calculateTotals = () => {
    return cart.reduce(
      (acc, el: CartTypes) => {
        acc.totalQty += el.qty;
        acc.totalValue += el.value;
        return acc;
      },
      { totalQty: 0, totalValue: 0 }
    );
  };

  const addToCart = (id: string, name: string, price: number) => {
    setCart((prevCart) => {
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
    });
  };

  // useEffect(() => {
  //   const localCart = localStorage.getItem("cart");
  //   const initialCartState = cart ? JSON.parse(localCart) : [];
  //   setCart(initialCartState);
  // }, []);

  useEffect(() => {
    setCartSummary(calculateTotals());
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ addToCart, cartSummary }}>
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
