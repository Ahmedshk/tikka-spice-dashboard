import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UserState {
  profile: User | null;
  isLoading: boolean;
}

const initialState: UserState = {
  profile: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.isLoading = false;
    },
  },
});

export const { setProfile, setLoading, clearProfile } = userSlice.actions;
export default userSlice.reducer;
