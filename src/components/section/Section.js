import React from "react";
import styles from "./Section.less";
const Section = ({ children, title }) => {
  return (
    <div className={styles.section}>
      <div className={styles.title}>{title}</div>
      {children}
    </div>
  );
};

export default Section;
