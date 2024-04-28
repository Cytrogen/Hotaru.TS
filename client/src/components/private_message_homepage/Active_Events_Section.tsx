import React from 'react'
import { Icon } from '@iconify/react'

const ActiveEventsSection = () => {
  return (
    <div style={{ minWidth: '360px', maxWidth: '420px' }}>
      <div className="px-3 py-4 d-flex flex-column">
        <h4 className="text-white mb-5">Current Event</h4>
        <Icon
          icon="fluent-emoji-high-contrast:yawning-face"
          className="mt-5 mx-auto"
          style={{ color: 'rgb(181, 186, 193)', fontSize: '100px' }}
        />
        {/* TODO: [epic] detect friends' actions */}
        <h5 className="mt-4 mx-auto" style={{ color: 'rgba(172, 176, 183)' }}>
          Nothing here yet...
        </h5>
      </div>
    </div>
  )
}

export default ActiveEventsSection
