import React from 'react'
import { Icon } from '@iconify/react'
import '../style.css'
import imgURL from '../../static/avatar.png'

interface PrivateMessageTabBarProps {
  receiverUsername: string
  setReceiverUsername: React.Dispatch<React.SetStateAction<string>>
}

// TODO: Add the functionality to change the receiverUsername when the user clicks on the user's avatar

const PrivateMessageTabBar: React.FC<PrivateMessageTabBarProps> = ({ receiverUsername, setReceiverUsername }) => {
  return (
    <>
      <div
        className="d-flex flex-row align-items-stretch align-items-center justify-content-between w-100"
        style={{ minHeight: '32px' }}>
        <div className="d-flex flex-row align-items-center">
          <img src={imgURL} className="ms-3 me-3 rounded-circle" style={{ width: '24px', height: '24px' }} alt=""></img>
          <span className="me-3 text-white fw-bolder">{receiverUsername}</span>
        </div>
        <div className="d-flex flex-row align-items-center gap-3 me-2">
          <Icon icon="material-symbols:phone-in-talk-watchface-indicator" className="tab_bar_logo" />
          <Icon icon="ph:video-camera-fill" className="tab_bar_logo" />
          <Icon icon="solar:pin-bold" className="tab_bar_logo" />
          <Icon icon="whh:addfriend" className="tab_bar_logo" style={{ fontSize: '22px' }} />
          <Icon icon="ic:round-account-circle" className="tab_bar_logo_active" style={{ fontSize: '28px' }} />
          <span
            className="rounded-2 ps-2 pe-2 py-1 gap-5 d-flex flex-row justify-content-between align-items-center"
            style={{ backgroundColor: 'rgba(30, 31, 34)', color: 'rgba(148, 155, 164)', fontSize: '14px' }}>
            Search
            <Icon icon="mingcute:search-2-line" className="tab_bar_logo_disabled" style={{ fontSize: '18px' }} />
          </span>
          <Icon icon="material-symbols:inbox" className="tab_bar_logo" style={{ fontSize: '28px' }} />
          <Icon icon="ph:question-fill" className="tab_bar_logo" style={{ fontSize: '28px' }} />
        </div>
      </div>
    </>
  )
}

export default PrivateMessageTabBar
