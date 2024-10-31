// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { initialGeneralState } from 'core/redux/initialState';

export const generalSlice = createSlice({
  name: 'general',
  initialState: initialGeneralState,
  reducers: {
    setTestGeneral: (state, { payload }) => {
      state.testGeneral = payload;
    },
  },
});

export const { setTestGeneral } = generalSlice.actions;

export default generalSlice.reducer;
