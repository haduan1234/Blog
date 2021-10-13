import { BASE_URL } from "./constants"
import axios from 'axios';

const USER_URL = `${BASE_URL}/post_like`
export const getPost_like = (postId) => {
    return axios.get(`${USER_URL}/${postId}`);
}