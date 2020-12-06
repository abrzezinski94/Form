import React from "react";
const Select = ({ options, children, ...props }) => {
  return (
    <select {...props}>
      {children ? (
        children
      ) : (
        <>
          <option value=""></option>
          {options.map((x) => (
            <option key={x.id} value={x.id}>
              {x.name}
            </option>
          ))}
        </>
      )}
    </select>
  );
};

export default Select;
