import React from "react";
const Radio = ({ onChange, options, name, currentValue }) => {
  return (
    <div>
      {options.map((x, idx) => (
        <label key={idx} style={x.labelStyles ? { ...x.labelStyles } : {}}>
          <input
            onChange={onChange}
            type="radio"
            value={x.value}
            checked={x.value === currentValue}
            name={name}
          />
          {x.name}
        </label>
      ))}
    </div>
  );
};

export default Radio;
