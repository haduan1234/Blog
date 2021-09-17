import { BASE_URL } from "./constants"
import axios from 'axios';

const USER_URL = `${BASE_URL}/post_category`
export const getPost_category =(search, page = 1, size = 10) => {
    let DEFAULT_URL = `${USER_URL}?size=${size}&&page=${page}`
    let url = !!search ? `${DEFAULT_URL}&&search=${search}` : `${DEFAULT_URL}`
    return axios.get(url);
}


export const getPost_categoryById = (id) => {
    return axios.get(`${USER_URL}/${id}`);
}

export const createPost_category = (body) => {
    return axios.post(`${USER_URL}`, { ...body });
}

export const updatePost_category= (id, body) => {
    return axios.put(`${USER_URL}/${id}`, { ...body });
}

export const deletePost_category= (id) => {
    return axios.delete(`${USER_URL}/${id}`);
}