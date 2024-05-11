import { AcheckerResultsType } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
  results: AcheckerResultsType | null;
}

const initialState: InitialStateType = {
  results: null,
};

const acheckerSlice = createSlice({
  name: "achecker",
  initialState,
  reducers: {
    updateAcheckerResults: (state, action: PayloadAction<any>) => {
      state.results = action.payload;
    },
  },
});

export const { updateAcheckerResults } = acheckerSlice.actions;
export default acheckerSlice.reducer;
