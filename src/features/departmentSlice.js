import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Async thunk to fetch all departments
export const fetchDepartments = createAsyncThunk(
  "departments/fetchDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/departments");
      return response.data; // expects array of departments [{id, department_name}, ...]
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch departments"
      );
    }
  }
);

const departmentSlice = createSlice({
  name: "departments",
  initialState: {
    departments: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Optional: for manual adding or resetting if needed
    resetDepartments: (state) => {
      state.departments = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetDepartments } = departmentSlice.actions;
export default departmentSlice.reducer;
