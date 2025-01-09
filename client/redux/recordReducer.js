import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOADING } from "../constants";
import {
  createRecord,
  deleteRecord,
  getAllRecords,
} from "../services/recordService";

export const postNewRecord = createAsyncThunk(
  "newRecord",
  async (params, { rejectWithValue }) => {
    try {
      console.log(
        "\x1b[31mGönderilen Parametreler Reducer Screen (params):\x1b[0m:",
        JSON.stringify(params, null, 2)
      ); // Gönderilen parametreleri detaylı göster
      const response = await createRecord(params);
      console.log(
        "\x1b[31mSunucudan Gelen Cevap (response):\x1b[0m:",
        JSON.stringify(response, null, 2)
      ); // Tüm cevabı detaylı göster
      console.log(
        "\x1b[31mCevap Verisi (response.data):\x1b[0m:",
        JSON.stringify(response.data, null, 2)
      ); // Cevap verisini detaylı göster
      return response.data;
    } catch (e) {
      console.error(
        "\x1b[31mHata Oluştu (error):\x1b[0m:",
        JSON.stringify(e, null, 2)
      ); // Hatayı detaylı göster
      if (e.response) {
        console.error(
          "\x1b[31mHata Cevabı (e.response):\x1b[0m:",
          JSON.stringify(e.response, null, 2)
        );
        console.error(
          "\x1b[31mHata Cevap Verisi (e.response.data):\x1b[0m:",
          JSON.stringify(e.response.data, null, 2)
        );
        console.error(
          "\x1b[31mHata Mesajı (e.response.data.message):\x1b[0m:",
          e.response.data.message
        );
      } else {
        console.error("\x1b[31mBeklenmeyen Hata (e):\x1b[0m:", e); // e.response yoksa genel hatayı göster
      }
      return rejectWithValue(
        e.response?.data?.message || String(e.response?.data) || String(e) // Optional chaining ile daha güvenli erişim
      );
    }
  }
);

export const fetchAllRecords = createAsyncThunk(
  "fetchAllRecords",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllRecords();
      return response.data;
    } catch (e) {
      console.log("record reducer 2 e response data" + e.response.data);
      return rejectWithValue(
        e.response.data.message || String(e.response.data)
      );
    }
  }
);

export const removeRecord = createAsyncThunk(
  "removeRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteRecord(id);
      return response.data;
    } catch (e) {
      console.log("record reducer 3 e response data " + e.response.data);
      return rejectWithValue(
        e.response.data.message || String(e.response.data)
      );
    }
  }
);

const recordSlice = createSlice({
  name: "record",
  initialState: {
    newRecord: {
      isLoading: LOADING.INITIAL,
      data: null,
      error: null,
    },
    allRecords: {
      isLoading: LOADING.INITIAL,
      data: null,
      error: null,
    },
    removeRecord: {
      isLoading: LOADING.INITIAL,
      data: null,
      error: null,
    },
  },
  reducers: {
    resetNewRecordLoadingState: (state) => {
      state.newRecord.isLoading = LOADING.INITIAL;
    },
    resetRemoveRecordLoadingState: (state) => {
      state.removeRecord.isLoading = LOADING.INITIAL;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postNewRecord.pending, (state) => {
        state.newRecord.isLoading = LOADING.PENDING;
      })
      .addCase(postNewRecord.fulfilled, (state, action) => {
        state.newRecord.data = action.payload;
        state.newRecord.isLoading = LOADING.FULFILLED;
      })
      .addCase(postNewRecord.rejected, (state, action) => {
        state.newRecord.error = action.payload;
        state.newRecord.isLoading = LOADING.REJECTED;
      })

      .addCase(fetchAllRecords.pending, (state) => {
        state.allRecords.isLoading = LOADING.PENDING;
      })
      .addCase(fetchAllRecords.fulfilled, (state, action) => {
        state.allRecords.data = action.payload;
        state.allRecords.isLoading = LOADING.FULFILLED;
      })
      .addCase(fetchAllRecords.rejected, (state, action) => {
        state.allRecords.error = action.payload;
        state.allRecords.isLoading = LOADING.REJECTED;
      })

      .addCase(removeRecord.pending, (state) => {
        state.removeRecord.isLoading = LOADING.PENDING;
      })
      .addCase(removeRecord.fulfilled, (state, action) => {
        state.removeRecord.data = action.payload;
        state.removeRecord.isLoading = LOADING.FULFILLED;
      })
      .addCase(removeRecord.rejected, (state, action) => {
        state.removeRecord.error = action.payload;
        state.removeRecord.isLoading = LOADING.REJECTED;
      });
  },
});

export const selectNewRecordData = (state) => state.record.newRecord;

export const selectAllRecordsData = (state) => state.record.allRecords;

export const selectRemoveRecordData = (state) => state.record.removeRecord;

export const { resetNewRecordLoadingState, resetRemoveRecordLoadingState } =
  recordSlice.actions;

export default recordSlice.reducer;
