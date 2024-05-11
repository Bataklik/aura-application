import { PA11YIssueType } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
  issues: PA11YIssueType[] | null;
}

const initialState: InitialStateType = {
  issues: null,
};

const pa11ySlice = createSlice({
  name: "pa11y",
  initialState,
  reducers: {
    updatePa11yResults: (state, action: PayloadAction<any>) => {
      state.issues = action.payload;
    },
  },
});

export const { updatePa11yResults } = pa11ySlice.actions;
export default pa11ySlice.reducer;
