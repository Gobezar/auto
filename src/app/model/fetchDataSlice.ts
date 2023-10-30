import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IDataProps } from "./types";

export const FetchData = createAsyncThunk(
  "fetch/fetchData",
  async (currentPage: number) => {
    const response = await axios.get<IDataProps[]>(
      `https://6539251fe3b530c8d9e8002f.mockapi.io/auto?limit=10&page=${currentPage}`
    );
    const result = response.data;
    return result;
  }
);

interface initialStateProps {
  data: IDataProps[];
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
}

const initialState: initialStateProps = {
  data: [],
  isLoading: false,
  isError: false,
  currentPage: 1,
};

const fetchDataSlice = createSlice({
  name: "fetchData",
  initialState,
  reducers: {
    addCarData(state, action) {
      state.data.push(action.payload);
    },
    incrementPage(state) {
      if (state.currentPage <= 4) {
        state.currentPage = state.currentPage + 1;
      } else return;
    },
  },
  extraReducers: {
    [FetchData.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      action.payload.forEach((item: IDataProps) => {
        if (!state.data.some((existingItem) => existingItem.id === item.id)) {
          state.data.push(item);
        }
      });
    },
    [FetchData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [FetchData.rejected.type]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const { addCarData, incrementPage } = fetchDataSlice.actions;
export default fetchDataSlice.reducer;
