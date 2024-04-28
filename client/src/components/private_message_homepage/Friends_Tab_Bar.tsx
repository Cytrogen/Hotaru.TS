import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import '../style.css'

const FriendsTabBar = () => {
  const [hoverStates, setHoverStates] = useState<Record<string, boolean>>({})

  /**
   * Update the hover state of the tab bar items
   * @param item
   * @param isHovered
   */
  const updateHoverState = (item: string, isHovered: boolean) => {
    setHoverStates((prev) => ({ ...prev, [item]: isHovered }))
  }

  return (
    <>
      <div className="d-flex flex-row align-items-stretch align-items-center text-center" style={{ minHeight: '32px' }}>
        <div className="d-flex flex-row align-items-center">
          <Icon icon="ls:friend" className="mx-2 tab_bar_logo_disabled" />
          <span className="fw-bold text-white mx-2">Friends</span>
          <span className="mx-2" style={{ width: '1px', height: '24px', backgroundColor: 'rgba(63, 65, 71)' }} />
        </div>

        <div className="d-flex flex-row align-items-center gap-3" style={{ color: 'rgba(128, 132, 142)' }}>
          <span
            className="px-2 py-1 rounded-2"
            onMouseEnter={() => updateHoverState('online', true)}
            onMouseLeave={() => updateHoverState('online', false)}
            style={{ backgroundColor: hoverStates['online'] ? 'rgba(57, 60, 65)' : 'rgba(49, 51, 56)' }}>
            Online
          </span>
          <span
            className="px-2 py-1 rounded-2"
            onMouseEnter={() => updateHoverState('all', true)}
            onMouseLeave={() => updateHoverState('all', false)}
            style={{ backgroundColor: hoverStates['all'] ? 'rgba(57, 60, 65)' : 'rgba(49, 51, 56)' }}>
            All
          </span>
          <span
            className="px-2 py-1 rounded-2"
            onMouseEnter={() => updateHoverState('pending', true)}
            onMouseLeave={() => updateHoverState('pending', false)}
            style={{ backgroundColor: hoverStates['pending'] ? 'rgba(57, 60, 65)' : 'rgba(49, 51, 56)' }}>
            Pending
          </span>
          <span
            className="px-2 py-1 rounded-2"
            onMouseEnter={() => updateHoverState('blocked', true)}
            onMouseLeave={() => updateHoverState('blocked', false)}
            style={{ backgroundColor: hoverStates['blocked'] ? 'rgba(57, 60, 65)' : 'rgba(49, 51, 56)' }}>
            Blocked
          </span>
          <span
            className="text-white rounded-2"
            style={{ padding: '2px 8px', margin: '0px 8px', backgroundColor: 'rgba(36, 128, 70)' }}>
            Add Friend
          </span>
        </div>
      </div>

      <div className="float-end">
        {/* TODO: add hover states */}
        <div className="d-flex flex-row align-items-center me-2 mt-1 gap-3">
          <Icon icon="mdi:chat-plus" className="tab_bar_logo" style={{ fontSize: '28px' }} />
          <span style={{ width: '1px', height: '24px', backgroundColor: 'rgba(63, 65, 71)' }} />
          <Icon icon="material-symbols:inbox" className="tab_bar_logo" style={{ fontSize: '28px' }} />
          <Icon icon="ph:question-fill" className="tab_bar_logo" style={{ fontSize: '28px' }} />
        </div>
      </div>
    </>
  )
}

export default FriendsTabBar
