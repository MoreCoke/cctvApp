import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  streams: [],
};

const cctvSlice = createSlice({
  name: 'cctv',
  initialState,
  reducers: {
    setStreams: (state, action) => {
      state.streams = action.payload;
    },
  },
});

export default cctvSlice;
