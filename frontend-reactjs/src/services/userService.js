import { BASE_URL } from "./constants"
import axios from 'axios';

const USER_URL = `${BASE_URL}/user`
export const getUsers = () => {
    return axios.get(`${USER_URL}`);
}

export const getUserById = (id) => {
    return axios.get(`${USER_URL}/${id}`);
}

export const createUser = (body) => {
    return axios.post(`${USER_URL}`, { ...body });
}

export const updateUser = (id, body) => {
    return axios.put(`${USER_URL}/${id}`, { ...body });
}

export const deleteUser = (id) => {
    return axios.delete(`${USER_URL}/${id}`);
}