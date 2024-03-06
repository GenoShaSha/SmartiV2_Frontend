import { createSlice } from "@reduxjs/toolkit";
import { User } from "../models/User";

interface customerSettingsState {
  customerCategories?: any;
}
const initialState: customerSettingsState = {
  customerCategories: {},
};

export const customerSettingsSlice = createSlice({
  name: "usersState",
  initialState,
  reducers: {
    setCustomersCategories: (state, action) => {
      state.customerCategories = action.payload;
    },

    resetCustomerSettingsState: () => initialState,
  },
});

export const { setCustomersCategories } = customerSettingsSlice.actions;
export const selectCustomerSettingsState = (state: any) => state.customerSettingsState;
export default customerSettingsSlice.reducer;
