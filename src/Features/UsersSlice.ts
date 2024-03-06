import { createSlice } from "@reduxjs/toolkit";
import { User } from "../models/User";

interface usersState {
  users?: User[];
  lsps?: any[];
}
const initialState: usersState = {
  users: [],
  lsps:[]
};

export const usersSlice = createSlice({
  name: "usersState",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setLsps:(state,action)=>{
    state.lsps = action.payload
    },
    resetUsersState: () => initialState,
  },
});

export const { setUsers, resetUsersState,setLsps } = usersSlice.actions;
export const selectUsersState = (state: any) => state.usersState;
export default usersSlice.reducer;
