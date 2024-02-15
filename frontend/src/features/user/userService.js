import axios from "axios";

const API_URL = 'http://localhost:3001/api/users/'

//función para traer todos los usuarios
const allUsers = async(token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await axios.get(`${API_URL}`)
    return response.data
}

//Función para modificar usuario
const updateUser = async(id, userData, token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await axios.put(`${API_URL}updateAdmin/${id}`, userData)

    return response.data 
}

const userService = {
    allUsers,
    updateUser
}

export default userService