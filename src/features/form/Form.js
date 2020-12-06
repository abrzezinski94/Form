import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from "./formSlice";
import styles from "./Form.less";
import Section from "../../components/section/Section";
const defaultFormState = Object.freeze({
  title: "",
  description: "",
  category_id: null,
  paid_event: false,
  event_fee: null,
  reward: null,
  date: "",
  duration: null,
  coordinator: null,
});
const Form = () => {
  return (
    <div>
      <Section title="About"></Section>
    </div>
  );
};

export default Form;
