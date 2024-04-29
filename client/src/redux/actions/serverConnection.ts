import axios from 'axios'
import { User } from '../../types/interfaces'

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
})

export const AuthService = {
  register: (data: User) => {
    return api.post('/auth/register', data)
  },

  login: (data: User) => {
    return api.post('/auth/login', data)
  },
}

export const UserService = {
  getUserByUsername: (username: string) => {
    return api.get(`/users/${username}`)
  },
}
