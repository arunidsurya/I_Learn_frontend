import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface User {
  _id?: string;
  name: string;
  email: string;
  gender: string;
  avatar?: {
    url: string;
    public_id: string;
  };
  isVerified: boolean;
  isBlocked: boolean;
  courses: string[];
  premiumAccount: boolean;
  premiumCourses: number;
}
interface Admin {
  _id?: string;
  name: string;
  email: string;
  gender: string;
  avtar?: string;
  isVerified: boolean;
}
interface Tutor {
  _id?: string;
  name: string;
  email: string;
  gender: string;
  institute: string;
  qualifiaction: string;
  experience: string;
  avtar?: string;
  isVerified?: boolean;
  isBolcked?: boolean;
}

interface LoginState {
  user: User | null;
  admin: Admin | null;
  tutor: Tutor | null;
  isLoggedIn:boolean;
}

const initialState: LoginState = {
  user: null,
  admin: null,
  tutor: null,
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    SaveUser: (state, action: PayloadAction<User>) => {
      console.log("Incoming user data:", action.payload);
      state.user = action.payload;
    },
    saveAdmin: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
    },
    saveTutor: (state, action: PayloadAction<Tutor>) => {
      state.tutor = action.payload;
    },
    resetUser: (state) => {
      state.user = null;
    },
    resetAdmin: (state) => {
      state.admin = null;
    },
    resetTutor: (state) => {
      state.tutor = null;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export default loginSlice.reducer;
export const { SaveUser, saveAdmin, saveTutor, resetUser,resetAdmin,resetTutor, setLoggedIn } = loginSlice.actions;
