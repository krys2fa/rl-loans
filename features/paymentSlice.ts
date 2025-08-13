import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PaymentState {
  amount: number;
  date: string;
  method: string;
  status: "pending" | "completed" | "failed";
}

const initialState: PaymentState = {
  amount: 0,
  date: "",
  method: "",
  status: "pending",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentDetails: (
      state,
      action: PayloadAction<Partial<PaymentState>>
    ) => {
      return { ...state, ...action.payload };
    },
    setPaymentStatus: (
      state,
      action: PayloadAction<PaymentState["status"]>
    ) => {
      state.status = action.payload;
    },
    resetPayment: () => initialState,
  },
});

export const { setPaymentDetails, setPaymentStatus, resetPayment } =
  paymentSlice.actions;
export default paymentSlice.reducer;
