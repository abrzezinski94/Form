import React from "react";
import styles from "./FormItem.less";
const FormItem = ({
  children,
  label,
  isRequired = false,
  bottomTextLeft = "",
  bottomTextRight = "",
  invalidInputText = "",
}) => {
  return (
    <div className={styles.formItem}>
      <div className={styles.top}>
        <label className={styles.label}>
          {label} {isRequired ? "*" : null}
        </label>
        {children}
        {invalidInputText ? (
          <div className={styles.invalidInputText}>{invalidInputText}</div>
        ) : null}
      </div>
      {bottomTextLeft || bottomTextRight ? (
        <div className={styles.bottom}>
          <div>{bottomTextLeft}</div>
          <div>{bottomTextRight}</div>
        </div>
      ) : null}
    </div>
  );
};

export default FormItem;
