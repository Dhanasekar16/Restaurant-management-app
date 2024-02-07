// crudSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialFormData = {
  storeData: [],
  crudData1: {},
  isLoading: false,
  error: '',
};

// console.log("storeData " , initialFormData.storeData)

const apiUrl = "http://localhost:5000/restaurantList";

export const getDataFromServer = createAsyncThunk(
  "crudData/getDataFromServer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: "Server Error!" });
    }
  }
);

export const postDataToServer = createAsyncThunk(
  "crudData/postDataToServer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiUrl, data);
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: "Data not saved!" });
    }
  }
);

export const updateDataToServer = createAsyncThunk(
  "crudData/updateDataToServer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${apiUrl}/${data.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: "Data not updated!" });
    }
  }
);

export const deleteDataToServer = createAsyncThunk(
  "crudData/deleteDataToServer",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      // Instead of returning response.data, dispatch another action to update the storeData array.
      dispatch(getDataFromServer());
    } catch (error) {
      return rejectWithValue({ error: "Data not deleted!" });
    }
  }
)

export const crudList = createSlice({
  name: 'crudData',
  initialState: initialFormData,
  reducers: {
    addData: (state, action) => {
      const id = Math.floor(Math.random() * 100);
      const data = { id, ...action.payload };
      state.storeData = [...state.storeData, data];
    },
    deleteData: (state, action) => {
      state.storeData = state.storeData.filter((data) => data.id !== action.payload);
    },
    updateData: (state, action) => {
      const index = state.storeData.findIndex((data) => data.id === action.payload.id);
      if (index !== -1) {
        state.storeData[index] = action.payload;
      }
    },
    setCrudData1: (state, action) => {
      state.crudData1 = action.payload || {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataFromServer.fulfilled, (state, action) => {
        state.storeData = action.payload;
        state.error = '';
        state.isLoading = false;
      })
      .addCase(getDataFromServer.rejected, (state, action) => {
        state.storeData = [];
        state.error = action.payload?.error || "Error fetching data";
        state.isLoading = false;
      })
      .addCase(getDataFromServer.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(postDataToServer.fulfilled, (state, action) => {
        state.storeData = [...state.storeData, action.payload];
        state.error = '';
        state.isLoading = false;
      })
      .addCase(postDataToServer.rejected, (state, action) => {
        state.error = action.payload?.error || "Error saving data";
        state.isLoading = false;
      })
      .addCase(postDataToServer.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(updateDataToServer.fulfilled, (state, action) => {
        state.storeData = state.storeData.map((data) => {
          if (data.id === action.payload.id) {
            return action.payload;
          }
          return data;
        });
        state.error = '';
        state.isLoading = false;
      })
      .addCase(updateDataToServer.rejected, (state, action) => {
        state.error = action.payload?.error || "Error updating data";
        state.isLoading = false;
      })
      .addCase(updateDataToServer.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(deleteDataToServer.fulfilled, (state, action) => {
        state.storeData = state.storeData.filter((data) => data.id !== action.payload);
        state.error = '';
        state.isLoading = false;
      })
      .addCase(deleteDataToServer.rejected, (state, action) => {
        state.error = action.payload?.error || "Error deleting data";
        state.isLoading = false;
      })
      .addCase(deleteDataToServer.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
  }
});

export const { addData, deleteData, updateData, setCrudData1 } = crudList.actions;
export default crudList.reducer;
