import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./features/profileSlice";
import authReducer from "./features/authSlice";
import loanReducer from "./features/loanSlice";
import paymentReducer from "./features/paymentSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: authReducer,
    loan: loanReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
