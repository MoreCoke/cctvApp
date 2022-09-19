import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  streams: [],
  citys: [],
};

const cctvSlice = createSlice({
  name: 'cctv',
  initialState,
  reducers: {
    setStreams: (state, action) => {
      state.streams = action.payload;
    },
    setCitys: (state, action) => {
      state.citys = action.payload;
    },
  },
});

export default cctvSlice;
