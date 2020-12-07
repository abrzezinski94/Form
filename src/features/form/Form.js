import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Form.less";
import Section from "../../components/form/section/Section";
import Radio from "../../components/form/radio/Radio";
import FormItem from "../../components/form/formItem/FormItem";
import Select from "../../components/form/select/Select";
import TimeInput from "../../components/form/timeInput/TimeInput";
import {
  fetchCategories,
  categoriesSelector,
  fetchCoordinators,
} from "./formSlice";

const defaultCoordinator = Object.freeze({
  id: "",
  email: "",
});
const defaultFormState = Object.freeze({
  title: "",
  description: "",
  category_id: "",
  paid_event: false,
  event_fee: "",
  reward: "",
  date: "",
  time: "",
  duration: "",
  period: "AM",
  coordinator: defaultCoordinator,
});

const Form = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCoordinators());
  }, [dispatch]);
  const {
    categories,
    loading,
    coordinators,
    groupedCoordinators,
  } = useSelector(categoriesSelector);
  const [eachEntry, setEachEntry] = useState(defaultFormState);
  const [isCoordiatorSelectBlured, setCoordiatorIsBlured] = useState(false);
  const {
    title,
    description,
    category_id,
    reward,
    coordinator,
    duration,
    date,
    time,
    paid_event,
    period,
  } = eachEntry;

  const inputsClasses = [styles.input].join(" ");
  const descriptionCharacters = description.length;
  const maxDescriptionCharacters = 140;
  const handleInputChange = (e) => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };
  const handleIsPaidChange = (e) => {
    const value = e.target.value === "true";
    setEachEntry({ ...eachEntry, [e.target.name]: value });
  };
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxDescriptionCharacters) {
      handleInputChange(e);
    }
  };
  const handleCoordinatorChange = (e) => {
    const coordinator = coordinators.find(
      (x) => x.id === parseInt(e.target.value)
    );
    const value = coordinator
      ? { id: coordinator.id, email: coordinator.email }
      : defaultCoordinator;
    setCoordiatorIsBlured(false);
    setEachEntry({ ...eachEntry, coordinator: value });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(eachEntry);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Section title="About">
        <FormItem label="title" isRequired={true}>
          <input
            name="title"
            className={inputsClasses}
            type="text"
            placeholder="Make it short and clear"
            value={title}
            onChange={handleInputChange}
          ></input>
        </FormItem>
        <FormItem
          label="description"
          isRequired={true}
          bottomTextLeft={"Limit of characters"}
          bottomTextRight={`${descriptionCharacters}/${maxDescriptionCharacters}`}
        >
          <textarea
            name="description"
            className={[inputsClasses, styles.descriptionInput].join(" ")}
            placeholder="Write about your event, be creative"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </FormItem>
        <FormItem label="category">
          <Select
            name="category_id"
            className={inputsClasses}
            placeholder="Select category"
            value={category_id}
            onChange={handleInputChange}
            options={categories}
          ></Select>
        </FormItem>
        <FormItem label="payment">
          <Radio
            currentValue={paid_event}
            onChange={handleIsPaidChange}
            name="paid_event"
            options={[
              {
                name: "Free event",
                value: true,
                labelStyles: { marginRight: "5px" },
              },
              { name: "Paid event", value: false },
            ]}
          ></Radio>
        </FormItem>
        <FormItem label="reward">
          <input
            style={{ maxWidth: "80px", marginRight: "10px" }}
            name="reward"
            className={inputsClasses}
            type="number"
            placeholder="Number"
            value={reward}
            onChange={handleInputChange}
          ></input>
          <small>reward points for attendance</small>
        </FormItem>
      </Section>
      <Section title="Coordinator">
        <FormItem label="responsible" isRequired={true}>
          <Select
            name="coordinator"
            className={[inputsClasses, styles.select].join(" ")}
            placeholder="Select category"
            value={coordinator.id}
            onChange={handleCoordinatorChange}
            options={coordinators}
            onBlur={() => setCoordiatorIsBlured(false)}
            onFocus={() => setCoordiatorIsBlured(true)}
          >
            <>
              <option value=""></option>
              {Object.keys(groupedCoordinators).map((key) => (
                <optgroup label={key} key={key}>
                  {groupedCoordinators[key].map((x) => (
                    <option
                      data-value={`${key} - ${x.name} ${x.lastname}`}
                      key={x.id}
                      value={x.id}
                    >
                      {x.id === coordinator.id && !isCoordiatorSelectBlured
                        ? `${key} - ${x.name} ${x.lastname}`
                        : `${x.name} ${x.lastname}`}
                    </option>
                  ))}
                </optgroup>
              ))}
            </>
          </Select>
        </FormItem>
        <FormItem label="email">
          {/* idk if we should get email from coordiatiors object and disable it or let someone edit no info about that*/}
          <input
            name="email"
            className={inputsClasses}
            type="text"
            disabled={true}
            placeholder="Email"
            value={coordinator.email}
          ></input>
        </FormItem>
      </Section>
      <Section title="When">
        <FormItem label="Starts on" isRequired={true}>
          <input
            style={{ marginRight: "10px", maxWidth: "160px" }}
            type="date"
            className={inputsClasses}
            name="date"
            value={date}
            onChange={handleInputChange}
          ></input>
          <small>at</small>
          <TimeInput
            onChange={(val) => {
              console.log(val);
            }}
            style={{ marginLeft: "10px", marginRight: "10px" }}
          ></TimeInput>
          <Radio
            onChange={handleInputChange}
            name="period"
            currentValue={period}
            options={[
              {
                name: "AM",
                value: "AM",
                labelStyles: { marginRight: "5px" },
              },
              { name: "PM", value: "PM" },
            ]}
          ></Radio>
        </FormItem>
        <FormItem label="duration">
          <input
            style={{ maxWidth: "80px", marginRight: "10px" }}
            name="duration"
            className={inputsClasses}
            type="number"
            placeholder="Number"
            value={duration}
            onChange={handleInputChange}
          ></input>
          <small>hour</small>
        </FormItem>
      </Section>
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default Form;
