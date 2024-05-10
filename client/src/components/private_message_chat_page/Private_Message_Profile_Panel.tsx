import React from 'react'
import imgURL from '../../static/avatar.png'

const PrivateMessageProfilePanel = () => {
  return (
    <div className="overflow-hidden h-100" style={{ backgroundColor: 'rgba(35, 36, 40)' }}>
      <div className="d-flex flex-column mb-5">
        {/* Profile background color and profile avatar */}
        <div
          className="w-auto position-relative"
          style={{ minHeight: '120px', minWidth: '430px', backgroundColor: 'rgba(196, 255, 0)' }}>
          <img
            src={imgURL}
            className="position-absolute rounded-circle"
            style={{
              height: '92px',
              width: '92px',
              top: '72px',
              left: '18px',
              zIndex: '1',
              borderStyle: 'solid',
              borderColor: 'rgba(35, 36, 40)',
              borderWidth: '6px',
            }}
            alt=""
          />
        </div>
        <span className="w-auto" style={{ minHeight: '28px', flex: '1' }} />
      </div>

      <div className="d-flex flex-column m-4 pb-3 rounded-3 gap-1" style={{ backgroundColor: 'rgba(17, 18, 20)' }}>
        {/* Nickname, Username, and Status */}
        <div className="text-white mt-3 mx-3">
          <h2 className="m-0" style={{ fontSize: '20px' }}>
            Dummy
          </h2>
          <p className="mb-1" style={{ fontSize: '14px', color: 'rgba(242, 243, 238)' }}>
            dummy1hotaru
          </p>
          <p className="text-wrap pt-1" style={{ fontSize: '14px' }}>
            {/* TODO: fix ESLint warning: */}
            {/* TODO: ESLint: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.(react/no-unescaped-entities) */}
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            I'm a dummy, click me, talk to me.
          </p>
        </div>

        {/* hr */}
        <div className="d-flex flex-row justify-content-center">
          <span className="w-100 mb-3 mx-3" style={{ backgroundColor: 'rgba(46, 47, 52)', height: '1px' }} />
        </div>

        {/* Personal bio */}
        <div className="text-white mx-3">
          <h2 className="m-0 fw-bolder" style={{ fontSize: '12px' }}>
            Bio
          </h2>
          <p className="mt-1 mb-2 fw-lighter" style={{ fontSize: '14px' }}>
            This is a testing dummy.
          </p>
        </div>

        {/* User join date */}
        <div className="text-white mx-3">
          <h2 className="m-0 fw-bolder" style={{ fontSize: '12px' }}>
            Join Date
          </h2>
          <p className="mt-1 mb-3 fw-lighter" style={{ fontSize: '14px' }}>
            2024/01/30
          </p>
        </div>

        {/* hr */}
        <div className="d-flex flex-row justify-content-center">
          <span className="w-100 mb-3 mx-3" style={{ backgroundColor: 'rgba(46, 47, 52)', height: '1px' }} />
        </div>

        {/* Notes */}
        <div className="text-white mx-3">
          <h2 className="m-0 fw-bolder" style={{ fontSize: '12px' }}>
            Notes
          </h2>
          <textarea
            className="w-100 p-2 mt-1"
            placeholder="Click to add notes"
            maxLength={256}
            autoCorrect="off"
            style={{
              height: '36px',
              fontSize: '12px',
              lineHeight: '14px',
              maxHeight: '88px',
              resize: 'none',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'rgba(181, 186, 193)',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default PrivateMessageProfilePanel
