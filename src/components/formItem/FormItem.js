import React from "react";
import styles from "./FormItem.less";
const FormItem = ({
  children,
  label,
  isRequired = false,
  bottomTextLeft = "",
  bottomTextRight = "",
}) => {
  return (
    <div className={styles.formItem}>
      <div className={styles.top}>
        <label className={styles.label}>
          {label} {isRequired ? "*" : null}
        </label>
        {children}
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
