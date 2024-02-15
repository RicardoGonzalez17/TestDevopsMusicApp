import axios from "axios";

const API_URL = 'http://localhost:3001/api/songs/'

// Función para traer todas las canciones
const allSongs = async(token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await axios.get(`${API_URL}`)
    return response.data
}

const newSong = async(song, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await axios.post(API_URL,song)
    return response.data
}

const songService = {
    allSongs,
    newSong
}

export default songService