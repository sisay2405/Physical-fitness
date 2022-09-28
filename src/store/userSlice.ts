import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

// const initialState = {
//   isAuthenticated: false,
//   firstName: '',
//   lastName: '',
//   email: '',
//   authError: '',
// } ;

const initialState = {
  user: null as User | null,
  authError: null as null | string,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: { payload: User }) {
      // return { user: payload, authError: null };
      // state = { user: payload, authError: null };
      state.authError = null;
      state.user = payload;
    },
    clearUser(state) {
      state.authError = null;
    },

    setAuthError(state, { payload }: { payload: string }) {
      state.authError = payload;
    },
  },
});

export const { setUser, clearUser, setAuthError } = userSlice.actions;
export default userSlice.reducer;
