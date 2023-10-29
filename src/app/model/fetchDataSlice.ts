import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IDataProps } from "./types";

export const FetchData = createAsyncThunk("fetch/fetchData", async () => {
  const response = await axios.get<IDataProps[]>(
    `https://6539251fe3b530c8d9e8002f.mockapi.io/auto`
  );
  const result = response.data;
  return result;
});

interface initialStateProps {
  data: IDataProps[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: initialStateProps = {
  data: [],
  isLoading: false,
  isError: false,
};

const fetchDataSlice = createSlice({
  name: "fetchData",
  initialState,
  reducers: {
    addCarData(state, action) {
      state.data.push(action.payload);
    },
  },
  extraReducers: {
    [FetchData.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
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

export const { addCarData } = fetchDataSlice.actions;
export default fetchDataSlice.reducer;
