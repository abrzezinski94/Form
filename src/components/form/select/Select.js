import React from "react";
import styles from "../select/Select.less";
import appStyles from "../../../App.less";
const Select = ({
  options,
  children,
  placeholder,
  value,
  className,
  isInvalid = false,
  ...props
}) => {
  const classes =
    className && !value
      ? `${className} ${styles.selectPlaceholder}`
      : className;
  return (
    <select
      className={[classes, isInvalid ? appStyles.invalid : ""].join(" ")}
      {...props}
    >
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
