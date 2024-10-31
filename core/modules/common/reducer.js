// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { initialCommonState } from 'core/redux/initialState';

export const commmonSlice = createSlice({
  name: 'common',
  initialState: initialCommonState,
  reducers: {
    setTestCommon: (state, { payload }) => {
      state.testCommon = payload;
    },
  },
});

export const { setTestCommon } = commmonSlice.actions;

export default commmonSlice.reducer;
