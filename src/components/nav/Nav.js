import React from "react";
import styles from "./Nav.less";
import PageContainer from "../../components/pageContainer/PageContainer";
const Nav = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.spacer}></div>
      <PageContainer>
        <div className={styles.header}>New event</div>
      </PageContainer>
    </div>
  );
};

export default Nav;
