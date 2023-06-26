import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../public/logo.svg";
import { CartIcon } from "../CartIcon/CartIcon";
import style from "./Header.module.css";
import { Navlist } from "./Navlist";
import { Search } from "../Search/Search";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className={style.header}>
          <Link href="/">
            <Image src={logo} alt="SlotyComfy shop logo" />
          </Link>
          <Search />
          <Navlist />
          <div className="tools">
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
