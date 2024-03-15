import axios from 'axios';
import { User } from "../interfaces";

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export const UsersService = {
  register: (data: User) => {
    return api.post('/users/register', data);
  },

  login: (data: User) => {
    return api.post('/users/login', data);
  },
}
