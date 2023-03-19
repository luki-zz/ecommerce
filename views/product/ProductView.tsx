import React from "react";
import Image from "next/image";
import style from "./ProductView.module.css";
import { useCartContext } from "src/context/cart_context/cart_context";
import Link from "next/link";

export function Product({ product }) {
  const { name, description, price, images, id } = product;

  const { addToCart } = useCartContext();

  return (
    <>
      <section className={style.productHeader}>
        <div className="container">
          <h3 className={style.breadCrumbs}>
            <Link href="/">Home</Link> / {name}
          </h3>{" "}
        </div>
      </section>
      <div className="container">
        <main className={style.products_details}>
          <div className={style.col1}>
            {images[0].width && images[0].height ? (
              <Image
                src={images[0].url}
                alt={name}
                width={images[0].width}
                height={images[0].height}
              />
            ) : (
              <></>
            )}
          </div>
          <div className={style.col2}>
            <h1 className={style.productTitle}>{name}</h1>
            <h5 className={style.price}>${price}</h5>
            <p className={style.productDescription}>{description}</p>
            <button
              className={style.addToCart}
              onClick={() => addToCart(id, name, price)}
            >
              Add To Cart
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
