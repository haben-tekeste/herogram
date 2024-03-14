import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signup, signin, autoLogout } from "../../Api/auth";

const initialState = {
  isLogged: false,
  isLoading: false,
  error: null,
  user: null,
  success:false
};

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password }) => {
    const data = await signup(email, password);
    return data;
  }
);

export const signinUser = createAsyncThunk(
  "auth/signinUser",
  async ({ email, password }) => {
    const data = await signin(email, password);
    return data;
  }
);

// export const tryLocalSignin = createAsyncThunk(
//   "auth/tryLocalSignin",
//   async () => {
//     const result = await authLogin();
//     return result;
//   }
// );

export const logout = createAsyncThunk("auth/logout", async () => {
  const result = await autoLogout();
  return result;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErr: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.error = null;

        state.isLoading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;

        const err = action.error;
        state.error = err.message;
      });
    builder
      .addCase(signinUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogged = true;
        state.error = null;
        state.success = true
        //navigate

      })
      .addCase(signinUser.rejected, (state, action) => {
        state.isLoading = false;
        const err = action.error;
        state.error = err.message;
        state.success = false
      });
    // builder.addCase(tryLocalSignin.fulfilled, (state, action) => {
    //   state.isLogged = true;
    // });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLogged = false;
      state.isLoading = true;
    });
  },
});

export const { clearErr } = authSlice.actions;
export default authSlice.reducer;