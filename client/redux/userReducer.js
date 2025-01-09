import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LOADING } from "../constants";
import { checkToken } from "../services/authService";

export const validateToken = createAsyncThunk(
  "validateToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await checkToken();
      return response.data;
    } catch (e) {
      console.log("User reducer validation token ");
      return rejectWithValue(e.response.data.error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    isAuth: null,
    isLoading: LOADING.INITIAL,
    error: null,
  },
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
      console.log("user reudcer action payload " + action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateToken.pending, (state) => {
        state.isLoading = LOADING.PENDING;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.isLoading = LOADING.FULFILLED;
        state.data = action.payload;
        state.isAuth = true;
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.isLoading = LOADING.REJECTED;
        state.error = action.payload;
        state.isAuth = false;
      });
  },
});

export const selectUserData = (state) => state.user;
export const { setIsAuth } = userSlice.actions;

export default userSlice.reducer;
