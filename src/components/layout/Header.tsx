import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../public/logo.svg";
import style from "../../../styles/Header.module.css";
import { Navlist } from "./Navlist";
import { Search } from "./Search";

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
          <div className="tools">Cart | Login</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
