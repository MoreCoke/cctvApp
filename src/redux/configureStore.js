import {configureStore} from '@reduxjs/toolkit';

import cctvSlice from './slices/cctv';

export default configureStore({
  reducer: {
    cctv: cctvSlice.reducer,
  },
});
