import React from "react";
import { Product } from "../Product/Product";
import style from "./ProductList.module.css";

export const ProductsList = (props) => {
  return (
    <ul className={style.productsList}>
      {props.products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ul>
  );
};
