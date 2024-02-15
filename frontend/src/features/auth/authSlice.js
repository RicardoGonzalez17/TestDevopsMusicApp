import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//Obtener del localstorage los datos del usuario si es que existen
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//función para registrar usuario
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    try {
         return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//función para cargar información de usuario
export const getUser = createAsyncThunk('auth/user', async (_, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.getUser(user._id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//función para actualizar usuario
export const updateUser = createAsyncThunk('auth/user', async (userData, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.updateUser(user._id, userData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//función para login usuario
export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    try {
         return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//logout al usuario
export const logout = createAsyncThunk('auth/logout', async(_, thunkAPI)=>{
    try {
        await authService.logout()
    } catch (error) {
        return thunkAPI.rejectWithValue('Server error. Please try again')
    }
})

export const authSlice = createSlice({
    //nombre del slice (rebanada)
    name: 'auth',
    //estado inicial
    initialState,
    //Acciones reducers
    reducers:{
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(logout.fulfilled, (state) => {
            state.isSuccess = true
            state.user = null
        })
        .addCase(updateUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateUser.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload._id !== state.user._id ? state.user: action.payload
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer