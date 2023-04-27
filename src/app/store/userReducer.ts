import { createSlice } from '@reduxjs/toolkit';
// import { RootState } from './index';

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null as null | UserInterface },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      console.log(state.user);
      localStorage.setItem('user-token', action.payload);
    },
    logout(state) {
      state.user = null;
      console.log(state.user);
      localStorage.removeItem('user-token');
    },
  },
});

export const userActions = userSlice.actions;
export const selectUser = () => {
  const result = localStorage.getItem('user-token') || null;
  console.log(result);
  return result;
};

export default userSlice;

interface UserInterface {
  token: string;
}
