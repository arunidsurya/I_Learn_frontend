import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  email: string;
  // Add other fields as needed
}

interface LoginState {
  user: User | null;
  admin: User | null;
  tutor: User | null;
}

const initialState: LoginState = {
  user: null,
  admin: null,
  tutor: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    SaveUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    saveAdmin: (state, action: PayloadAction<User>) => {
      state.admin = action.payload;
    },
    saveTutor: (state, action: PayloadAction<User>) => {
      state.tutor = action.payload;
    },
    resetUser: (state) => {
      state.user = null;
    },
  },
});

export default loginSlice.reducer;
export const { SaveUser, saveAdmin, saveTutor, resetUser } = loginSlice.actions;
