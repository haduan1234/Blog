import { BASE_URL } from "./constants"
import axios from 'axios';

const USER_URL = `${BASE_URL}/uploads`
export const uploadFile = (data) => {
    return axios.post(`${USER_URL}`, data);
}