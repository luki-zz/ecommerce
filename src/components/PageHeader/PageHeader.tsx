import React from "react";
import style from "./PageHeader.module.css";
import Link from "next/link";

export const PageHeader = ({ title }: { title: string }) => {
  return (
    <section className={style.productHeader}>
      <div className="container">
        <h3 className={style.breadCrumbs}>
          <Link href="/">Home</Link> / {title}
        </h3>
      </div>
    </section>
  );
};
