import { createSlice } from '@reduxjs/toolkit';
// import { RootState } from './index';

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null as null | UserInterface },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem('user-token', action.payload);
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('user-token');
    },
  },
});

export const userActions = userSlice.actions;
export const selectUser = () => {
  return localStorage.getItem('user-token') || null;
};

export default userSlice;

interface UserInterface {
  token: string;
}
