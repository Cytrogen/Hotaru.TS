import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { useSelector } from 'react-redux'
import { User } from '../../types/interfaces'
import dummyAvatarURL from '../../static/avatar.png'
import { setUserDetails } from '../../redux/actions/authActions'
import userDefaultAvatarURL from '../../static/Hotaru_default_avatar.png'

type UserProfile = Pick<User, 'username'>

const FriendsListSidebar: React.FC = () => {
  const [hoverStates, setHoverStates] = useState<Record<string, boolean>>({})
  const currentUser = useSelector((state: { auth: { user: UserProfile } }) => state.auth.user)
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    console.log('friends list sidebar', userId)
    if (userId && !currentUser) {
      setUserDetails(userId)
    }
  }, [userId, currentUser])

  /**
   * Update the hover state of the item.
   * @param item
   * @param isHovered
   */
  const updateHoverState = (item: string, isHovered: boolean) => {
    setHoverStates({
      ...hoverStates,
      [item]: isHovered,
    })
  }

  return (
    <div
      className="d-flex flex-column"
      style={{ width: '240px', height: '100vh', backgroundColor: 'rgba(43, 45, 49)' }}>
      <div className="mb-3 mt-4 d-flex flex-column">
        {/* TODO: add hover state */}
        <div className="rounded-1 w-100 mx-2">
          <a
            href="/channels/@me"
            className="d-flex flex-row m-2 "
            style={{ color: 'rgba(128, 133, 142)', textDecoration: 'none' }}>
            <Icon
              icon="game-icons:three-friends"
              style={{ color: 'rgba(148, 155, 164)', fontSize: '28px', marginRight: '12px' }}
            />
            <span>Friends</span>
          </a>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '12px', padding: '18px 8px 4px 18px', color: 'rgba(128, 133, 142)' }}>
          Private Messages
        </h2>
      </div>

      <div className="d-flex flex-row flex-grow-1">
        <div
          className="rounded-1 w-100 mx-2"
          onMouseEnter={() => updateHoverState('online', true)}
          onMouseLeave={() => updateHoverState('online', false)}
          style={{ height: '50px', backgroundColor: hoverStates['online'] ? 'rgba(53, 55, 60)' : 'rgba(43, 45, 49)' }}>
          <a href="/channels/@me/dummy" style={{ color: 'rgba(128, 133, 142)', textDecoration: 'none' }}>
            <div className="m-2">
              <img
                className="rounded-circle"
                style={{ width: '32px', height: '32px', marginRight: '12px' }}
                src={dummyAvatarURL}
                alt=""
              />
              <span className="fw-bolder">Dummy</span>
            </div>
          </a>
        </div>
      </div>

      {/* User panel */}
      <div
        className="d-flex flex-row align-items-center"
        style={{
          height: '52px',
          padding: '0px 8px',
          marginBottom: '1px',
          fontSize: '14px',
          fontWeight: '500',
          backgroundColor: 'rgba(35, 36, 40)',
        }}>
        <span
          className="d-flex flex-row align-items-center"
          style={{ marginLeft: '-2px', minWidth: '120px', paddingLeft: '2px' }}>
          {/* TODO: add hover states */}
          <img
            className="rounded-circle flex-shrink-0"
            style={{ width: '32px', height: '32px', borderRadius: '50%' }}
            src={userDefaultAvatarURL}
            alt=""
          />
          <span
            className="d-flex flex-column flex-grow-1"
            style={{ paddingBottom: '4px', paddingLeft: '8px', paddingTop: '4px', marginRight: '4px', minHeight: '0' }}>
            {currentUser && (
              <span
                className="overflow-hidden"
                style={{
                  fontSize: '14px',
                  fontWeight: '400',
                  lineHeight: '1.2',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  color: 'rgba(242, 243, 245)',
                }}>
                {currentUser.username}
              </span>
            )}
            <span
              className="overflow-hidden"
              style={{
                fontSize: '12px',
                fontWeight: '400',
                lineHeight: '1.3',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                color: 'rgba(242, 243, 245)',
              }}>
              Active
            </span>
          </span>
        </span>

        <span className="d-flex flex-row justify-content-start align-items-stretch gap-2">
          <Icon icon="carbon:microphone-off-filled" className="text-danger" style={{ fontSize: '18px' }} />
          <Icon icon="ph:headphones-fill" style={{ fontSize: '18px', color: 'rgba(181, 186, 193)' }} />
          <Icon icon="octicon:gear" style={{ fontSize: '18px', color: 'rgba(181, 186, 193)' }} />
        </span>
      </div>
    </div>
  )
}

export default FriendsListSidebar
