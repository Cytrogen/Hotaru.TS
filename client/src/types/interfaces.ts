export interface User {
  _id?: string
  emailAddress?: string
  username: string
  password?: string
  access_token?: string
}

export interface Message {
  id?: string
  senderId: string
  receiverId: string
  text: string
  timestamp: string
}
