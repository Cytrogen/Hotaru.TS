import axios from 'axios'
import { User } from '../../types/interfaces'

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401 && error.response.statusText === 'Unauthorized') {
        localStorage.removeItem('jwtToken')
        window.location.reload()
      }
    }

    return Promise.reject(error)
  },
)

export const AuthService = {
  register: (data: User) => {
    return api.post('/auth/register', data)
  },

  login: (data: User) => {
    return api.post('/auth/login', data)
  },
}

export const UserService = {
  getUserByUsername: (token: string | null, username: string) => {
    return api.get(`/users/username/${username}`, { headers: { Authorization: `Bearer ${token}` } })
  },

  getUserByUserId: (token: string | null, userId: string) => {
    return api.get(`/users/userid/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
  },
}

export const MessageService = {
  getMessagesByUserId: (token: string | null, senderId: string | null, receiverId: string) => {
    return api.get(`/messages/${senderId}/${receiverId}`, { headers: { Authorization: `Bearer ${token}` } })
  },
}
