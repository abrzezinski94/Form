import React, { useState, useEffect } from "react";
import styles from "./TimeInput.less";
const TimeInput = ({ onChange, style }) => {
  let minuteInput = null;
  const [hour, setHour] = useState("");
  const [minutes, setMinutes] = useState("");

  const isValid = (regex, val) => {
    const isValid =
      (regex.test(val) || val === "" || val === "0") && val.length <= 2;
    return isValid;
  };
  const handleSetHour = (e) => {
    let val = e.target.value;
    const re = /(^0?[1-9]$)|(^1[0-2]$)/;
    if (isValid(re, val)) {
      setHour(val);
    }
  };
  const handleSetMinutes = (e) => {
    const val = e.target.value;
    const re = /([0-5])/;
    if (isValid(re, val)) {
      setMinutes(val);
    }
  };
  const handleHourBlur = () => {
    if (hour === "0") {
      setHour("");
    } else if (hour.length === 1) {
      setHour(`0${hour}`);
    }
  };
  const handleMinutesBlur = () => {
    if (minutes.length === 1) {
      setMinutes(`0${minutes}`);
    }
  };

  useEffect(() => {
    const skipToMinutes = () => {
      minuteInput.focus();
    };
    if (hour.length === 2) {
      skipToMinutes();
    }
  }, [hour]);
  useEffect(() => {
    console.log("call");
    if (hour.length === 2 && minutes.length === 2) {
      if (onChange) {
        onChange(`${hour}:${minutes}`);
      }
    } else {
      onChange("");
    }
  }, [hour, minutes]);
  return (
    <div className={styles.timeInput} style={style} name="time">
      <input
        type="text"
        value={hour}
        onChange={handleSetHour}
        onBlur={handleHourBlur}
      ></input>
      <span>:</span>
      <input
        ref={(input) => {
          minuteInput = input;
        }}
        type="text"
        value={minutes}
        onChange={handleSetMinutes}
        onBlur={handleMinutesBlur}
      ></input>
    </div>
  );
};

export default TimeInput;
