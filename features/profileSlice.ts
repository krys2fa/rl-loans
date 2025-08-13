import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProfileState {
  name: string;
  email: string;
  phone: string;
  address: string;
  occupation: string;
  creditScore: number;
}

const initialState: ProfileState = {
  name: "Kwaku Mintah",
  email: "user@example.com",
  phone: "0551234567",
  address: "123 Main St, Accra",
  occupation: "Shop Attendant",
  creditScore: 750,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
      return { ...state, ...action.payload };
    },
    setCreditScore: (state, action: PayloadAction<number>) => {
      state.creditScore = action.payload;
    },
  },
});

export const { setProfile, setCreditScore } = profileSlice.actions;
export default profileSlice.reducer;
