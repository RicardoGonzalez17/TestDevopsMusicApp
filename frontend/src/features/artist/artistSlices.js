import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import artistService from "./artistServices";

const initialState = {
    artists: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Función para traer todos los artistas
export const allArtists = createAsyncThunk('artist/artists', async(_, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await artistService.allArtists(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const newArtist = createAsyncThunk('artist/newartist', async(artist, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await artistService.newArtist(artist, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const artistSlice = createSlice({
    // Nombre de la rebanada
    name: 'artist',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(allArtists.pending, (state) => {
            state.isSuccess = false,
            state.isError = false,
            state.isLoading = true
        })
        .addCase(allArtists.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.isSuccess = true,
            state.artists = action.payload
        })
        .addCase(allArtists.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.artists = null
        })
        .addCase(newArtist.pending, (state) => {
            state.isSuccess = false,
            state.isError = false,
            state.isLoading = true
        })
        .addCase(newArtist.fulfilled, (state, action)=>{
            state.isError= false,
            state.isLoading = false,
            state.isSuccess = true,
            state.artists = [...state.artists, action.payload]
        })
        .addCase(newArtist.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = artistSlice.actions
export default artistSlice.reducer