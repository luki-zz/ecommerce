import React, { useEffect, useContext, useState } from "react";

type CartContextType = {
  addToCart: (id: string, name: string, price: number) => void;
  cartSummary: { totalAmount: number; totalCost: number };
};

type CartTypes = {
  id: string;
  name: string;
  price: number;
  qty: number;
  value: number;
};

type SummaryType = {
  totalAmount: number;
  totalCost: number;
};

const CartContext = React.createContext<CartContextType | null>(null);

export const CartProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [cart, setCart] = useState<CartTypes[]>([]);

  const addToCart = (id: string, name: string, price: number) => {
    setCart((prevCart) => {
      if (prevCart.find((cartItem: CartTypes) => cartItem.id === id)) {
        const newState = prevCart.map((item: CartTypes) => {
          return {
            id: item.id,
            name: item.name,
            price: item.price,
            qty: item.qty + 1,
            value: item.price * (item.qty + 1),
          };
        });
        return newState;
      } else {
        return [...prevCart, { id, name, price, qty: 1 }];
      }
    });
  };

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
        addToCart,
        cartSummary:
          cart.reduce(
            (summary, product) => {
              return {
                totalAmount: summary.totalAmount + product.qty,
                totalCost: summary.totalCost + product.price * product.qty,
              };
            },
            { totalAmount: 0, totalCost: 0 }
          ) ?? 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
