import React from "react";
import Header from "src/components/layout/Header";
import { PageHeader } from "src/components/PageHeader/PageHeader";
import { useCartContext } from "src/context/cart_context/cart_context";

const CartPage = () => {
  const { cart } = useCartContext();
  return (
    <>
      <PageHeader title={"Cart"} />
    </>
  );
};

export default CartPage;
