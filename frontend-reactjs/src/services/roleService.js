import { BASE_URL } from "./constants"
import axios from 'axios';

const ROLE_URL = `${BASE_URL}/role`
export const getRole = () => {
    return axios.get(ROLE_URL);
}