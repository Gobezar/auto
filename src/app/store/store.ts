import { combineReducers, configureStore } from "@reduxjs/toolkit";
import fetchDataSlice from "../model/fetchDataSlice";
import FilterItemsSlice from "../../features/FilterItems/model/FilterItemsSlice";
import SortItemsSlice from "../../features/SortItems/model/SortItemsSlice";
import LoginPageSlice from "../../pages/LoginPage/model/LoginPageSlice";

const rootReducer = combineReducers({
  fetchDataSlice,
  FilterItemsSlice,
  SortItemsSlice,
  LoginPageSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
