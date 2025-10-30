import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../config";

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, credentials, {
        headers: { "Content-Type": "application/json" },
      });

      // axios puts response data on res.data
      const data = res.data;
      return data;
    } catch (err) {
      // Prefer structured error returned by server, otherwise fallback to network/error message
      const message =
        err?.response?.data?.message || err.message || "Network error";
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

const initialState = {
  user: null,
  roles: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  message: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.roles = [];
      state.status = "idle";
      state.error = null;
      state.message = null;
      state.isAuthenticated = false;
      // Optional: clear localStorage tokens
      if (typeof window !== "undefined") {
        localStorage.removeItem("authUser");
      }
    },
    clearError(state) {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const payload = action.payload || {};
        state.status = "succeeded";
        state.user = payload.username || null;
        state.roles = (payload.roles || []).map((r) => r.authority || r);
        state.message = payload.message || null;
        state.error = null;
        state.isAuthenticated = true;
        // Persist minimal info to localStorage so refresh keeps auth state (optional)
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "authUser",
            JSON.stringify({ user: state.user, roles: state.roles })
          );
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload && action.payload.message) || action.error.message;
        state.message = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthRoles = (state) => state.auth.roles;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthMessage = (state) => state.auth.message;
