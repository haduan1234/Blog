import { BASE_URL } from "./constants"
import axios from 'axios';

const USER_URL = `${BASE_URL}/post_like`
// export const getPost_like = (body) => {
//     return axios.get(`${USER_URL}`, {body});
// }

export const createPost_like = (body) => {
    return axios.post(`${USER_URL}`, { ...body });
}

export const deletePost_like = (id) =>{
    return axios.delete(`${USER_URL},${id}`)
}