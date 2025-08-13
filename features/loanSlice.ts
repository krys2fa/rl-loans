import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoanState {
  amount: number;
  type: string;
  repaymentPeriod: string;
  interestRate: string;
  repaymentDate: string;
  status: "pending" | "approved" | "rejected" | "paid";
}

const initialState: LoanState = {
  amount: 0,
  type: "",
  repaymentPeriod: "",
  interestRate: "",
  repaymentDate: "",
  status: "pending",
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    setLoanDetails: (state, action: PayloadAction<Partial<LoanState>>) => {
      return { ...state, ...action.payload };
    },
    setLoanStatus: (state, action: PayloadAction<LoanState["status"]>) => {
      state.status = action.payload;
    },
    resetLoan: () => initialState,
  },
});

export const { setLoanDetails, setLoanStatus, resetLoan } = loanSlice.actions;
export default loanSlice.reducer;
