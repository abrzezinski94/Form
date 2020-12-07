import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    isLoading: false,
    categories: [],
    coordinators: [],
    groupedCoordinators: {},
  },
  reducers: {
    getCategories: (state) => {
      state.loading = true;
    },
    getCategoriesSuccess: (state, { payload }) => {
      state.categories = payload;
      state.loading = false;
    },
    getCategoriesFailure: (state) => {
      state.loading = false;
    },
    getCoordinators: (state) => {
      state.loading = true;
    },
    getCoordinatorsSuccess: (state, { payload }) => {
      state.coordinators = payload.data;
      state.groupedCoordinators = payload.groupedCoordinators;
      state.loading = false;
    },
    getCoordinatorsFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  getCategories,
  getCategoriesSuccess,
  getCategoriesFailure,
  getCoordinators,
  getCoordinatorsSuccess,
  getCoordinatorsFailure,
} = formSlice.actions;

export const categoriesSelector = (state) => state.form;

export default formSlice.reducer;

export function fetchCategories() {
  return async (dispatch) => {
    dispatch(getCategories());
    try {
      const response = await fetch(
        "http://www.mocky.io/v2/5bcdd3942f00002c00c855ba"
      );
      const data = await response.json();
      dispatch(getCategoriesSuccess(data));
    } catch (error) {
      dispatch(getCategoriesFailure());
    }
  };
}

export function fetchCoordinators() {
  return async (dispatch) => {
    dispatch(getCoordinators());
    try {
      const response = await fetch(
        "http://www.mocky.io/v2/5bcdd7992f00006300c855d5"
      );
      const data = await response.json();
      const randomMeIdx = Math.floor(Math.random() * data.length);
      const groupedCoordinators = {
        Me: [data[randomMeIdx]],
        Other: [...data.filter((x, idx) => idx !== randomMeIdx)],
      };
      dispatch(getCoordinatorsSuccess({ data, groupedCoordinators }));
    } catch (error) {
      dispatch(getCoordinatorsFailure());
    }
  };
}

export function submit(payload) {
  return async (dispatch) => {
    const categoryId = payload["category_id"];
    var time = moment(`${payload.time} ${payload.period}`, ["h:mm A"]).format(
      "HH:mm"
    );
    var date = moment(payload.date).format("YYYY-MM-DD");
    var fullDate = `${date} ${time}:00`;
    const data = {
      title: payload.title,
      description: payload.description,
      category_id: categoryId ? parseInt(categoryId) : null,
      paid_event: payload["paid_event"],
      event_fee: Number(payload["event_fee"]),
      reward: Number(payload.reward),
      date: moment(fullDate).format("YYYY-MM-DDTHH:mm"),
      duration: Number(payload.duration) * 3600,
      coordinator: payload.coordinator,
    };
    console.log(data);
  };
}
