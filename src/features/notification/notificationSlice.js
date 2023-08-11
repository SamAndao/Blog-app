import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    isHidden: true,
    color: "notification--success",
    message: "",
    heading: "",
  },
  reducers: {
    setSuccess: (state, action) => {
      const { message } = action.payload;
      state.isHidden = false;
      state.color = "notification--success";
      state.message = message;
      state.heading = "Success";
    },
    setFailed: (state, action) => {
      const { message } = action.payload;
      state.isHidden = false;
      state.color = "notification--success";
      state.message = message;
      state.heading = "Success";
    },
    setHidden: (state, action) => {
      state.isHidden = true;
    },
  },
});

export default notificationSlice.reducer;
export const { setSuccess, setFailed, setHidden } = notificationSlice.actions;
