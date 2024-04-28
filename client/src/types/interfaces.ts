export interface User {
  id?: number
  emailAddress?: string
  username: string
  password?: string
  access_token?: string
}

export interface Message {
  id?: number
  senderId: number
  receiverId: number
  content: string
  timestamp: string
}
