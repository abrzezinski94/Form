import React from "react";
import styles from "../../../App.less";

const Input = ({ isInvalid = false, className, ...props }) => {
  const classes = `${className} ${isInvalid ? styles.invalid : ""}`;
  return <input {...props} className={classes}></input>;
};

export default Input;
