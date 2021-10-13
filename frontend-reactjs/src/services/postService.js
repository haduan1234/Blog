
import { BASE_URL } from "./constants"
import axios from 'axios';

const USER_URL = `${BASE_URL}/post`
export const getPost =(search, page = 1, size = 10) => {
    let DEFAULT_URL = `${USER_URL}?size=${size}&&page=${page}`
    let url = !!search ? `${DEFAULT_URL}&&search=${search}` : `${DEFAULT_URL}`
    return axios.get(url);
}

export const getIsHot = () =>{
    return axios.get(`${USER_URL}/ishot`)
}

export const getfindInCategoryId  = () =>{
    return axios.get(`${USER_URL}/categoryId`)
}

export const getPostById = (id) => {
    return axios.get(`${USER_URL}/${id}`);
}

export const createPost = (body) => {
    return axios.post(`${USER_URL}`, { ...body });
}

export const updatePost= (id, body) => {
    return axios.put(`${USER_URL}/${id}`, { ...body });
}

export const deletePost= (id) => {
    return axios.delete(`${USER_URL}/${id}`);
}