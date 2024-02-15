import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice"
import songReducer from "../features/song/songSlice"
import artistReducer from "../features/artist/artistSlices"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        song: songReducer,
        artist: artistReducer
    }
})