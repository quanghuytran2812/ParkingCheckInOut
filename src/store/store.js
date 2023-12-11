import { configureStore } from '@reduxjs/toolkit';
import checkInSlice from './checkInSlice';

const store = configureStore({
  reducer: {
    checkin: checkInSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: { warnAfter: 128 },
    serializableCheck: { warnAfter: 128 },
  })
});


export default store;