import Link from "next/link";
import React from "react";
import { GrTechnology } from "react-icons/gr";

import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div>
          <Link href={"/"} className={styles.logo}>
            CLOUD <GrTechnology /> HOSTING
          </Link>
        </div>
        <ul className={styles.navLinks}>
          <Link href={"/articles"} className={styles.navLink}>
            Articles
          </Link>
          <Link href={"/about"} className={styles.navLink}>
            About
          </Link>
          <Link href={"/admin"} className={styles.navLink}>
            Admin Dashboard
          </Link>
        </ul>
      </nav>
      <div className={styles.right}>
        <Link href={"/login"} className={styles.btn}>
          Login
        </Link>
        <Link href={"/register"} className={styles.btn}>
          Register
        </Link>
      </div>
    </header>
  );
};

export default Header;
