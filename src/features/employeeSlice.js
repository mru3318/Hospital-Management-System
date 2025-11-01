import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config";

// 1️⃣ Create Async Thunk for Posting Form Data
export const registerEmployee = createAsyncThunk(
  "employee/registerEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      // If caller already passed a FormData instance, send it directly.
      // Avoid manually setting Content-Type so the browser/axios includes the correct boundary.
      let body = employeeData;
      console.log("Employee Data to be sent:", employeeData);
      if (!(employeeData instanceof FormData)) {
        body = new FormData();
        for (let key in employeeData) {
          body.append(key, employeeData[key]);
        }
      }

      const response = await axios.post(`${API_BASE_URL}/register/add`, body);
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// 2️⃣ Slice
const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetEmployeeState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerEmployee.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerEmployee.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerEmployee.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetEmployeeState } = employeeSlice.actions;
export default employeeSlice.reducer;
