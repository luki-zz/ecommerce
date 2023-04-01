import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PageHeader } from "src/components/PageHeader/PageHeader";
import { useCartContext } from "src/context/cart_context/CartContext";
import style from "./cart.module.css";

const CartPage = () => {
  const { cart, cartSummary, clearCart } = useCartContext();
  {
    if (cart.length < 1) {
      return (
        <>
          <PageHeader title={"Cart"} />
          <div className="container">
            <div className={style.cartEmpyt}>
              Your Cart is empty, please continue shopping
            </div>
          </div>
        </>
      );
    }

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
          <div className={style.cartFooter}>
            <Link className={style.continueShoppingBtn} href="/">
              Continue Shopping
            </Link>
            <button onClick={clearCart} className={style.clearCartBtn}>
              Clear cart
            </button>
          </div>
          <section className={style.cartSummaryWrap}>
            <div className={style.cartSummary}>
              <h4>Order Total: {cartSummary.totalCost}</h4>
            </div>
          </section>
        </div>
      </>
    );
  }
};

export default CartPage;
