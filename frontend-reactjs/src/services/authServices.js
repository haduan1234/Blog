import { BASE_URL } from "./constants"
import axios from 'axios';

const USER_URL = `${BASE_URL}/user/signin`

export const signinUser = (body) => {
    return axios.post(`${USER_URL}`, { ...body });
}