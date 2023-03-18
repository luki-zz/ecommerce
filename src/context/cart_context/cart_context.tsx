import React, { useEffect, useContext, useState } from "react";

type CartContextType = {
  buy: (id: string, name: string, price: number) => void;
  cartSummary: { totalQty: number; totalValue: number };
};

type CartTypes = {
  id: string;
  name: string;
  price: number;
  qty: number;
  value: number;
};

const CartContext = React.createContext<CartContextType | null>(null);

export const CartProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartSummary, setCartSummary] = useState({
    totalQty: 0,
    totalValue: 0,
  });

  const calculateTotals = () => {
    return cart.reduce(
      (acc, el) => {
        acc.totalQty += el.qty;
        acc.totalValue += el.value;
        return acc;
      },
      { totalQty: 0, totalValue: 0 }
    );
  };

  const buy = (id, name, price) => {
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
    setCartSummary(calculateTotals());
  };

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    const initialCartState = cart ? JSON.parse(localCart) : [];
    setCart(initialCartState);
  }, []);

  useEffect(() => {
    setCartSummary(calculateTotals());
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ buy, cartSummary }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
