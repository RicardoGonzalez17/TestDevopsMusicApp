import axios from "axios";

const API_URL = 'http://localhost:3001/api/users/'

//Función para registrar un usuario
const register = async (userData) => {
    const response = await axios.post(API_URL,userData)
    return response.data
}

//Función para cargar información del usuario
const getUser = async(userId, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await axios.get(`${API_URL}${userId}`)
    return response.data
}

//Función para modificar usuario
const updateUser = async(id, userData, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await axios.put(`${API_URL}${id}`, userData)

    return response.data 
}

//Función para login de un usuario
const login = async (userData) => {
    const response = await axios.post(`${API_URL}login`,userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Función para logout del usuario
const logout = async () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout,
    getUser,
    updateUser
}

export default authService