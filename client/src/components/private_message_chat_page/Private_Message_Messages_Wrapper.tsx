import React, { useEffect, useState, useContext, useRef } from 'react'
import { useSelector } from 'react-redux'
import { MessageContext } from '../context/Message_Context'
import imgURL from '../../static/avatar.png'
import { UserService, MessageService } from '../../redux/actions/serverConnection'
import { Message, User } from '../../types/interfaces'
import { formatDate } from '../../utils/time'

interface PrivateMessageMessagesWrapperProps {
  receiverUsername: string
}

type UserProfile = Pick<User, 'username' | '_id'>

const PrivateMessageMessagesWrapper: React.FC<PrivateMessageMessagesWrapperProps> = ({ receiverUsername }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const context = useContext(MessageContext)
  const endOfMessagesRef = useRef<null | HTMLSpanElement>(null)
  const prevMessagesLength = useRef<number>(0)
  const currentUser = useSelector((state: { auth: { user: UserProfile } }) => state.auth.user)

  // console.log('currentUser: ', currentUser)

  if (!context) {
    throw new Error('MessageContext is undefined')
  }
  const { newMessage } = context

  useEffect(() => {
    const fetchMessages = async () => {
      const jwtToken = localStorage.getItem('jwtToken')
      const senderId = localStorage.getItem('userId')
      const response = await UserService.getUserByUsername(jwtToken, receiverUsername)
      const receiver = response.data

      try {
        const res = await MessageService.getMessagesByUserId(jwtToken, senderId, receiver._id)
        setMessages(res.data)
        return res.data
      } catch (err) {
        console.error(err)
      }
    }

    fetchMessages().then((r) => console.log('Messages fetched:', r))
  }, [receiverUsername])

  useEffect(() => {
    if (newMessage) {
      setMessages((prevMessages) => [...prevMessages, newMessage])
    }
  }, [newMessage])

  useEffect(() => {
    if (endOfMessagesRef.current && messages.length > prevMessagesLength.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }
    prevMessagesLength.current = messages.length
  }, [messages])

  return (
    <div
      className="d-flex flex-column position-absolute top-0 bottom-0 overflow-y-scroll overflow-x-hidden"
      style={{ left: 0, right: 0, overflowAnchor: 'none' }}>
      <ol className="p-0 m-0" style={{ flex: 1, minHeight: '0', listStyle: 'none' }}>
        {messages.map((message, index) => (
          <li key={message.id || index} className="position-relative mx-2" style={{ outline: 'none' }}>
            <div
              className="position-relative"
              style={{
                marginTop: '1.0625rem',
                minHeight: '2.75rem',
                paddingTop: '0.125rem',
                paddingBottom: '0.125rem',
                paddingLeft: '72px',
                paddingRight: '48px!important',
                wordWrap: 'break-word',
                userSelect: 'text',
              }}>
              <div className="position-static ms-0 ps-0" style={{ textIndent: 'none' }}>
                {/* User's avatar */}
                <img
                  src={imgURL}
                  className="position-absolute overflow-hidden"
                  style={{
                    pointerEvents: 'auto',
                    textIndent: '-9999px',
                    left: '16px',
                    marginTop: 'calc(4px-0.125rem)',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                  alt=""
                />

                {/* Username and message time */}
                <h3
                  className="overflow-hidden position-relative p-0 m-0 d-flex flex-row align-items-center"
                  style={{
                    display: 'block',
                    lineHeight: '1.375rem',
                    minHeight: '1.375rem',
                    whiteSpace: 'break-spaces',
                  }}>
                  <span
                    className="me-1 fs-6 position-relative overflow-hidden text-white"
                    style={{
                      fontWeight: '500',
                      display: 'inline',
                      verticalAlign: 'baseline',
                      outline: 'none',
                    }}>
                    {message.senderId === currentUser._id ? currentUser.username : receiverUsername}
                  </span>
                  <span
                    className="ms-1"
                    style={{
                      fontSize: '0.75rem',
                      height: '1.25rem',
                      verticalAlign: 'baseline',
                      display: 'inline-block',
                      cursor: 'default',
                      pointerEvents: 'none',
                      outline: 'none',
                      fontWeight: '500',
                      color: 'rgba(148, 154, 158)',
                    }}>
                    <time dateTime={message.timestamp.toString()}>{formatDate(message.timestamp)}</time>
                  </span>
                </h3>
              </div>

              {/* Message Content */}
              <div
                className="overflow-hidden position-relative fs-6 p-0 m-0"
                style={{
                  userSelect: 'text',
                  whiteSpace: 'break-spaces',
                  wordWrap: 'break-word',
                  marginLeft: 'calc(-1 * 72px)',
                  paddingLeft: '72px',
                  textIndent: '0',
                  lineHeight: '1.375rem',
                  color: 'rgba(219, 222, 225)',
                }}>
                {/* TODO: Fix ESLint: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.(react/no-unescaped-entities) */}
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <span>{message.text}</span>
              </div>
            </div>
          </li>
        ))}
        <span ref={endOfMessagesRef} />
      </ol>
    </div>
  )
}

export default PrivateMessageMessagesWrapper
