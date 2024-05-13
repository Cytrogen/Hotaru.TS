import React, { useState } from 'react'
import FriendsListSideBar from '../private_message_common/Friends_List_Sidebar'
import PrivateMessageTabBar from './Private_Message_Tab_Bar'
import PrivateMessageMessagesWrapper from './Private_Message_Messages_Wrapper'
import PrivateMessageProfilePanel from './Private_Message_Profile_Panel'
import PrivateMessageTextBox from './Private_Message_Text_Box'
import { Message } from '../../types/interfaces'
import { MessageContext } from '../context/Message_Context'

const PrivateMessageChatPage = () => {
  const [receiverName, setReceiverName] = useState<string>('Dummy')
  const [newMessage, setNewMessage] = useState<Message | null>(null)

  const addMessage = (message: Message) => {
    setNewMessage(message)
  }

  return (
    <MessageContext.Provider value={{ newMessage, addMessage }}>
      <FriendsListSideBar />
      <div className="d-flex flex-column mx-0 h-100 w-100">
        <div
          className="d-flex flex-row"
          style={{ height: '48px', padding: '8px', fontSize: '16px', borderBottom: 'solid 3px rgba(45, 47, 52)' }}>
          <PrivateMessageTabBar receiverUsername={receiverName} setReceiverUsername={setReceiverName} />
        </div>
        <div className="d-flex flex-row flex-fill align-items-stretch p-0">
          <div
            className="d-flex flex-column h-100 position-relative"
            style={{ minWidth: 0, minHeight: 0, flex: '1 1 auto' }}>
            <div className="position-relative" style={{ flex: '1 1 auto', minHeight: 0, minWidth: 0, zIndex: 0 }}>
              <PrivateMessageMessagesWrapper receiverUsername={receiverName} />
            </div>
            <div className="position-sticky bottom-0 w-100" style={{ backgroundColor: 'rgba(49, 51, 56)' }}>
              <PrivateMessageTextBox receiverUsername={receiverName} addMessage={addMessage} />
            </div>
          </div>
          <PrivateMessageProfilePanel />
        </div>
      </div>
    </MessageContext.Provider>
  )
}

export default PrivateMessageChatPage
