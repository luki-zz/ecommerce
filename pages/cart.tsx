import Image from "next/image";
import React from "react";
import Header from "src/components/layout/Header";
import { PageHeader } from "src/components/PageHeader/PageHeader";
import { useCartContext } from "src/context/cart_context/CartContext";
import style from "./cart.module.css";

const CartPage = () => {
  const { cart } = useCartContext();
  console.log(cart);
  return (
    <>
      <PageHeader title={"Cart"} />
      <div className="container">
        <div className={style.header}>
          <div>
            <h5>Item</h5>
          </div>
          <div>
            <h5>Price</h5>
          </div>
          <div>
            <h5>Qurantity</h5>
          </div>
          <div>
            <h5>Subtotal</h5>
          </div>
          <div></div>
        </div>
        <div className={style.articles}>
          {cart.map((product) => {
            return (
              <div className={style.article} key={product.id}>
                <div className={style.articleNameCol}>
                  <Image
                    src={product.image.url}
                    width={product.image.width}
                    height={product.image.height}
                    alt={product.name}
                    className={style.articleImage}
                  />
                  <h5>{product.name}</h5>
                </div>
                <div className={style.col2}>
                  <h5>{product.price}</h5>
                </div>
                <div className={style.col3}>
                  <h5>{product.qty}</h5>
                </div>
                <div className={style.col4}>
                  <h5>{product.value}</h5>
                </div>
                <div className={style.col5}></div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CartPage;
