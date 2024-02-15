import axios from "axios";

const API_URL = 'http://localhost:3001/api/artists/'

// Función para traer los artistas
const allArtists = async(token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await axios.get(API_URL)
    return response.data
}

// Función para registrar artista
const newArtist = async(artist, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await axios.post(API_URL,artist)
    return response.data
}

const artistService = {
    allArtists,
    newArtist
}

export default artistService