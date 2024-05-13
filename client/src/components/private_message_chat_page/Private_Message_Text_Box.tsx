import React, { useState, useContext, KeyboardEvent, ChangeEvent, FormEvent } from 'react'
import { Icon } from '@iconify/react'
import { MessageContext } from '../context/Message_Context'
import { Message } from '../../types/interfaces'
import socket from '../../redux/actions/messageActions'
import { UserService } from '../../redux/actions/serverConnection'

interface PrivateMessageTextBoxProps {
  receiverUsername: string
  addMessage: (message: Message) => void
}

const PrivateMessageTextBox: React.FC<PrivateMessageTextBoxProps> = ({ receiverUsername }) => {
  const [message, setMessage] = useState<string>('')
  const context = useContext(MessageContext)
  if (!context) {
    throw new Error('MessageContext is undefined')
  }
  const { addMessage } = context

  /**
   * Handle the key down event for the message input.
   * If the user presses the enter key, send the message.
   * Shift + Enter will create a new line.
   * @param e
   */
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage().then((r) => console.log(r))
    }
  }

  /**
   * Handle the change event for the message input.
   * Update the message state with the new value.
   * @param e
   */
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  /**
   * Handle the form submit event.
   * Send the privateMessageSent event to the server.
   */
  const handleSendMessage = async (e?: FormEvent) => {
    // Prevent the default form submission behavior
    e && e.preventDefault()

    const senderId = localStorage.getItem('userId')
    const response = await UserService.getUserByUsername(receiverUsername)
    const receiver = response.data

    socket.emit('privateMessageSent', {
      id: `${socket.id}${Math.random()}`,
      senderId: senderId,
      receiverId: receiver._id,
      text: message,
    })
    addMessage(privateMessage)
    setMessage('')
  }

  return (
    <form className="px-2 m-3" onSubmit={handleSendMessage}>
      <div
        className="w-100 p-0 m-0"
        style={{ backgroundColor: 'rgba(56, 58, 64)', textIndent: '0', borderRadius: '8px' }}>
        <div
          className="overflow-x-hidden overflow-y-scroll"
          style={{ borderRadius: '8px', backfaceVisibility: 'hidden', scrollbarWidth: 'none' }}>
          <div className="d-flex position-relative">
            <span className="position-sticky" style={{ flex: '0 0 auto', alignSelf: 'stretch' }}>
              <Icon
                icon="bi:plus-circle-fill"
                className="position-sticky w-auto m-0"
                style={{
                  height: '44px',
                  padding: '10px 16px',
                  top: '0',
                  marginLeft: '-16px',
                  background: 'transparent',
                  color: 'rgba(181, 186, 193)',
                  border: '0',
                }}
              />
            </span>

            <span
              className="p-0 fs-6 w-100 position-relative"
              style={{
                background: 'transparent',
                resize: 'none',
                border: 'none',
                appearance: 'none',
                fontWeight: '400',
                lineHeight: '1.375rem',
                height: '44px',
                minHeight: '44px',
                boxSizing: 'border-box',
                color: 'rgba(219, 222, 225)',
              }}>
              <textarea
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                autoFocus={true}
                placeholder="Text @dummy"
                spellCheck="true"
                className="position-absolute overflow-hidden"
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                style={{
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  paddingBottom: '11px',
                  paddingTop: '11px',
                  paddingRight: '10px',
                  left: '0',
                  right: '10px',
                  background: 'transparent',
                  caretColor: 'rgba(219, 222, 225)',
                  color: 'rgba(219, 222, 225)',
                }}
              />
            </span>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PrivateMessageTextBox
