import React from "react";
import styles from "../select/Select.less";
const Select = ({
  options,
  children,
  placeholder,
  value,
  className,
  ...props
}) => {
  const classes =
    className && !value
      ? `${className} ${styles.selectPlaceholder}`
      : className;
  return (
    <select className={classes} {...props}>
      <>
        <option value="" disabled={value !== ""}>
          {placeholder}
        </option>
        {children
          ? children
          : options.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
      </>
    </select>
  );
};

export default Select;
