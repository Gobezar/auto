import { createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
  activeSort: string;
}

const initialState: initialStateProps = {
  activeSort: "",
};

const SortItemsSlice = createSlice({
  name: "sortItems",
  initialState,
  reducers: {
    setActiveSort(state, action) {
      state.activeSort = action.payload;
    },
  },
});

export const { setActiveSort } = SortItemsSlice.actions;
export default SortItemsSlice.reducer;
