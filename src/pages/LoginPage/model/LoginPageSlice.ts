import { createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
  isAuth: boolean;
  isGuest: boolean;
}

const initialState: initialStateProps = {
  isAuth: false,
  isGuest: false,
};

const LoginPageSlice = createSlice({
  name: "LoginPage",
  initialState,
  reducers: {
    logIn(state) {
      state.isAuth = true;
    },
    logOut(state) {
      state.isAuth = false;
    },
    setGuest(state, action) {
      state.isGuest = action.payload;
    },
  },
  extraReducers: {},
});

export const { logIn, logOut, setGuest } = LoginPageSlice.actions;
export default LoginPageSlice.reducer;
