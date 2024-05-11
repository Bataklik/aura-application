import {
  AxeIncompeleteType,
  AxeResultsType,
  AxeViolationType,
} from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AxeState {
  violations: AxeViolationType | null;
  incomplete: AxeIncompeleteType | null;
}

const initialState: AxeState = {
  violations: null,
  incomplete: null,
};

const axeSlice = createSlice({
  name: "axe",
  initialState,
  reducers: {
    setViolations(state, action: PayloadAction<AxeViolationType>) {
      state.violations = action.payload;
    },
    setIncomplete(state, action: PayloadAction<AxeIncompeleteType>) {
      state.incomplete = action.payload;
    },
    clearAxeData(state) {
      state.violations = null;
      state.incomplete = null;
    },
  },
});

export const { setViolations, setIncomplete, clearAxeData } = axeSlice.actions;

export default axeSlice.reducer;
