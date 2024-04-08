import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useLoginUser } from './authApi';


const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }) => {
    try {
      const { data } = await useLoginUser({ email, password });
      return data;
    } catch (error) {
      throw error; 
    }
  }
);;


// Création de la tranche Redux
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});

export default authSlice.reducer;



