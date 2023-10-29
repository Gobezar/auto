import { createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
  activeBrand: string;
  activeColor: string;
}

const initialState: initialStateProps = {
  activeBrand: "",
  activeColor: "",
};

const FilterItemsSlice = createSlice({
  name: "filterItems",
  initialState,
  reducers: {
    setActiveBrand(state, action) {
      state.activeBrand = action.payload;
    },
    setActiveColor(state, action) {
      state.activeColor = action.payload;
    },
  },
});

export const { setActiveBrand, setActiveColor } = FilterItemsSlice.actions;
export default FilterItemsSlice.reducer;
