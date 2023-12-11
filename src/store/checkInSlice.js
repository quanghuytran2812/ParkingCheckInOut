import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiContans } from '../contants';

export const apiCheckIn = createAsyncThunk('checkin/apiCheckIn', async (bookingid) => {
  try {
    const response = await axios.get(
      `${ApiContans.BACKEND_API.BASE_API_URL}/checkQR/checkInViaQR/` + bookingid);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const apiCheckOut = createAsyncThunk('checkin/apiCheckOut', async (bookingid) => {
  try {
    const response = await axios.get(
      `${ApiContans.BACKEND_API.BASE_API_URL}/checkQR/checkOutViaQR/` + bookingid);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});


const checkInSlice = createSlice({
  name: 'checkin',
  initialState: {
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Check In
      .addCase(apiCheckIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(apiCheckIn.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(apiCheckIn.rejected, (state) => {
        state.loading = false;
      })
      // Check Out
      .addCase(apiCheckOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(apiCheckOut.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(apiCheckOut.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default checkInSlice.reducer;