import React from "react";
import styles from "./PageContainer.less";
const PageContainer = ({ children }) => {
  return <div className={styles.pageContainer}>{children}</div>;
};

export default PageContainer;
