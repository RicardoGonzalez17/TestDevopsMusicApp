import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
    users: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//función para traer todos los usuarios
export const allUsers = createAsyncThunk('user/users', async(_, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await userService.allUsers(token)
    } catch (error) {
        const message = (error.response &&  error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//función para actualizar permisos admin a usuario
export const updateAdminUser = createAsyncThunk('auth/user', async (userData, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await userService.updateUser(userData._id, userData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const userSlice = createSlice({
    //nombre del slice (rebanada)
    name: 'users',
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
        .addCase(allUsers.pending, (state) => {
            state.isLoading = true
        })
        .addCase(allUsers.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.users = action.payload
        })
        .addCase(allUsers.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.users = null
        })
        
        .addCase(updateAdminUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateAdminUser.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.users = state.users.map((user) => {
                if(user._id == action.payload._id){
                    return {...user, isAdmin: action.payload.isAdmin}
                }
                return user
            })
        })
        .addCase(updateAdminUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = userSlice.actions
export default userSlice.reducer