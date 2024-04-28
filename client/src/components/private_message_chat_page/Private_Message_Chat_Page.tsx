import React, { useState } from 'react'
import FriendsListSideBar from '../private_message_common/Friends_List_Sidebar'
import PrivateMessageTabBar from './Private_Message_Tab_Bar'
import PrivateMessageMessagesWrapper from './Private_Message_Messages_Wrapper'
import PrivateMessageProfilePanel from './Private_Message_Profile_Panel'

const PrivateMessageChatPage = () => {
  const [receiverName, setReceiverName] = useState<string>('Dummy')
  return (
    <>
      <FriendsListSideBar />
      <div className="d-flex flex-column mx-0 h-100 w-100">
        <div
          className="d-flex flex-row"
          style={{ height: '48px', padding: '8px', fontSize: '16px', borderBottom: 'solid 3px rgba(45, 47, 52)' }}>
          <PrivateMessageTabBar receiverUsername={receiverName} setReceiverUsername={setReceiverName} />
        </div>
        <div className="d-flex flex-row flex-fill align-items-stretch p-0">
          <PrivateMessageMessagesWrapper receiverUsername={receiverName} />
          <PrivateMessageProfilePanel />
        </div>
      </div>
    </>
  )
}

export default PrivateMessageChatPage
