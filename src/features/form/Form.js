import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Form.less";
import Section from "../../components/form/section/Section";
import Radio from "../../components/form/radio/Radio";
import FormItem from "../../components/form/formItem/FormItem";
import Select from "../../components/form/select/Select";
import Input from "../../components/form/input/Input";
import Textarea from "../../components/form/textarea/Textarea";
import TimeInput from "../../components/form/timeInput/TimeInput";
import {
  fetchCategories,
  categoriesSelector,
  fetchCoordinators,
  submit,
} from "./formSlice";
import moment from "moment";

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
  const { categories, coordinators, groupedCoordinators } = useSelector(
    categoriesSelector
  );
  const [invalidFields, setInvalidFields] = useState({});
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
    paid_event,
    period,
    event_fee,
  } = eachEntry;
  const inputsClasses = [styles.input].join(" ");
  const descriptionCharacters = description.length;
  const maxDescriptionCharacters = 140;

  const handleInputChange = (e) => {
    const key = e.target.name;
    const val = e.target.value;
    setEachEntry({ ...eachEntry, [key]: val });
  };
  const handleIsPaidChange = (e) => {
    const key = e.target.name;
    const value = e.target.value === "true";
    setEachEntry({ ...eachEntry, [key]: value, event_fee: "" });
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
  const handleTimeChange = (val) => {
    setEachEntry({ ...eachEntry, time: val });
  };
  const validateIsEmpty = (val, key) => {
    if (val === "") {
      return `${key} cannot be empty`;
    }
    return false;
  };
  const validateFields = () => {
    let invalidFields = {};
    let isValid = false;
    setInvalidFields(invalidFields);
    const required = [
      {
        key: "title",
        isInvalid: (val) => validateIsEmpty(val, "Title"),
      },
      {
        key: "description",
        isInvalid: (val) => validateIsEmpty(val, "Description"),
      },
      {
        key: "date",
        isInvalid: (val) => {
          if (val === "") {
            return "Date cannot be empty";
          }
          if (!moment(val).isValid()) {
            return "Date is invalid";
          }
          return false;
        },
      },
      {
        key: "time",
        isInvalid: (val) => validateIsEmpty(val, "Time"),
      },
      {
        key: "coordinator",
        isInvalid: (val) => {
          if (val?.id === "") {
            return "Coordinator must be selected";
          }
          return false;
        },
      },
    ];
    if (paid_event) {
      required.push({
        key: "event_fee",
        isInvalid: (val) => validateIsEmpty(val, "Fee"),
      });
    }
    for (let validator of required) {
      const invalidField = validator.isInvalid(eachEntry[validator.key]);
      if (invalidField) {
        invalidFields[validator.key] = invalidField;
      }
    }
    setInvalidFields(invalidFields);
    isValid = Object.keys(invalidFields).length;
    return isValid ? false : true;
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const isValid = validateFields();
    if (!isValid) {
      return;
    }
    dispatch(submit(eachEntry));
  };
  return (
    <form onSubmit={handleSubmit}>
      <Section title="About">
        <FormItem
          label="title"
          isRequired={true}
          invalidInputText={invalidFields.title}
        >
          <Input
            isInvalid={invalidFields.title}
            name="title"
            className={inputsClasses}
            type="text"
            placeholder="Make it short and clear"
            value={title}
            onChange={handleInputChange}
          ></Input>
        </FormItem>
        <FormItem
          invalidInputText={invalidFields.description}
          label="description"
          isRequired={true}
          bottomTextLeft={"Limit of characters"}
          bottomTextRight={`${descriptionCharacters}/${maxDescriptionCharacters}`}
        >
          <Textarea
            name="description"
            className={[inputsClasses, styles.descriptionInput].join(" ")}
            placeholder="Write about your event, be creative"
            value={description}
            isInvalid={invalidFields.description}
            onChange={handleDescriptionChange}
          ></Textarea>
        </FormItem>
        <FormItem label="category" bottomTextLeft={`Select category from list`}>
          <Select
            name="category_id"
            className={inputsClasses}
            placeholder="Select category"
            value={category_id}
            onChange={handleInputChange}
            options={categories}
          ></Select>
        </FormItem>
        <FormItem
          label="payment"
          isRequired={paid_event === true}
          invalidInputText={invalidFields["event_fee"]}
        >
          <Radio
            currentValue={paid_event}
            onChange={handleIsPaidChange}
            name="paid_event"
            options={[
              {
                name: "Free event",
                value: false,
                labelStyles: { marginRight: "5px" },
              },
              { name: "Paid event", value: true },
            ]}
          ></Radio>
          {paid_event ? (
            <div>
              <Input
                isInvalid={invalidFields["event_fee"]}
                name="event_fee"
                className={[inputsClasses, styles.inputFee].join(" ")}
                type="number"
                placeholder="Fee"
                value={event_fee}
                onChange={handleInputChange}
              ></Input>
              <small>$</small>{" "}
            </div>
          ) : null}
        </FormItem>
        <FormItem label="reward">
          <div>
            <Input
              style={{ maxWidth: "80px", marginRight: "10px" }}
              name="reward"
              className={inputsClasses}
              type="number"
              placeholder="Number"
              value={reward}
              onChange={handleInputChange}
            ></Input>
            <small>reward points for attendance</small>
          </div>
        </FormItem>
      </Section>
      <Section title="Coordinator">
        <FormItem
          label="responsible"
          invalidInputText={invalidFields.coordinator}
          isRequired={true}
        >
          <Select
            isInvalid={invalidFields.coordinator}
            name="coordinator"
            className={[inputsClasses, styles.select].join(" ")}
            value={coordinator.id}
            onChange={handleCoordinatorChange}
            options={coordinators}
            placeholder="Select coordinator"
            onBlur={() => setCoordiatorIsBlured(false)}
            onFocus={() => setCoordiatorIsBlured(true)}
          >
            <>
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
          <Input
            name="email"
            className={inputsClasses}
            type="text"
            disabled={true}
            placeholder="Email"
            value={coordinator.email}
          ></Input>
        </FormItem>
      </Section>
      <Section title="When">
        <FormItem
          label="Starts on"
          isRequired={true}
          invalidInputText={invalidFields.date || invalidFields.time}
        >
          <Input
            isInvalid={invalidFields.date}
            style={{ marginRight: "10px", maxWidth: "160px" }}
            type="date"
            className={inputsClasses}
            name="date"
            value={date}
            onChange={handleInputChange}
          ></Input>
          <small>at</small>
          <TimeInput
            isInvalid={invalidFields.time}
            onChange={handleTimeChange}
            className={styles.inputTime}
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
          <div>
            <Input
              style={{ maxWidth: "80px", marginRight: "10px" }}
              name="duration"
              className={inputsClasses}
              type="number"
              placeholder="Number"
              value={duration}
              onChange={handleInputChange}
            ></Input>
            <small>hour</small>
          </div>
        </FormItem>
      </Section>
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default Form;
