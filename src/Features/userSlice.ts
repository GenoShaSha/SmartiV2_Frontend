import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  user: {
    id?: string;
    displayName?: string;
    email?: string;
    emailVerified?: boolean;
    photoURL?: string;
  };
  loggedIn?: boolean;
}

const initialState: userState = {
  user: {},
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{}>) => {
      state.user = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setUser, setLoggedIn } = userSlice.actions;
export const selectUserState = (state: any) => state.userState;
export default userSlice.reducer;
