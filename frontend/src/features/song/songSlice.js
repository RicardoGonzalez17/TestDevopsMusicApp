import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import songService from "./songService";

const initialState = {
    songs: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Función para traer todas las canciones
export const allSongs = createAsyncThunk('song/songs', async(_, thunkAPI) => {
    try {
        // Obtengo el token de la ruta del state: auth > user > token
        const token = thunkAPI.getState().auth.user.token
        return await songService.allSongs(token)
    } catch (error) {
        const message = (error.response &&  error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Función para guardar un canción
export const newSong = createAsyncThunk('song/newsong', async(song, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await songService.newSong(song, token)
    } catch (error) {
        const message = (error.response &&  error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const songSlice = createSlice({
    //nombre de la rebanada/slice
    name: 'song',
    // Estado inicial de la rebanada
    initialState,
    // Actions reducers
    reducers:{
        reset: (state) => {
            state.isLoading = false,
            state.isError = false,
            state.isSuccess = false,
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(allSongs.pending, (state) => {
            state.isSuccess = false
            state.isError = false
            state.isLoading = true
        })
        .addCase(allSongs.fulfilled, (state, action) => {
            state.isLoading = false,
            state.songs = action.payload
        })
        .addCase(allSongs.rejected, (state, action) => {
            state.isLoading = false,
            state.isError = true,
            state.message = action.payload,
            state.songs = null
        })
        .addCase(newSong.pending, (state) => {
            state.isSuccess = false
            state.isError = false
            state.isLoading = true
        })
        .addCase(newSong.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isSuccess = true,
            state.songs = [...state.songs, action.payload]
        })
        .addCase(newSong.rejected, (state, action) => {
            state.isLoading = false,
            state.isError = true,
            state.message = action.payload,
            state.songs = null
        })

    }
})

export const {reset} = songSlice.actions
export default songSlice.reducer