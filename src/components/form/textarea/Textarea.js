import React from "react";
import styles from "../../../App.less";

const Textarea = ({ isInvalid = false, className, ...props }) => {
  const classes = `${className} ${isInvalid ? styles.invalid : ""}`;
  return <textarea {...props} className={classes}></textarea>;
};

export default Textarea;
