import React from 'react'
import { Message } from '../../types/interfaces'

interface MessageContextType {
  newMessage: Message | null
  addMessage: (message: Message) => void
}

export const MessageContext = React.createContext<MessageContextType | undefined>(undefined)
