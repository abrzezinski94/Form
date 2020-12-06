import React from "react";
import styles from "./Nav.less";
const Nav = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.spacer}></div>
      <div className={styles.header}>New event</div>
    </div>
  );
};

export default Nav;