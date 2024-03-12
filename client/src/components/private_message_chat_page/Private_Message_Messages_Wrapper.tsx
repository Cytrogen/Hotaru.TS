// import { useState } from "react";
import imgURL from "../static/avatar.png";
import PrivateMessageTextBox from "./Private_Message_Text_Box";
// import socket from "../utils/actions/authActions";

const PrivateMessageMessagesWrapper = () => {
  // TODO: finish message sending and receiving functionality
  // const [messages, setMessages] = useState([]);
  //
  // const sendMessages = event => {
  //     if(event.key === "Enter") {
  //         socket.emit("privateMessageSent", event.target.value);
  //         event.target.value = "";
  //     }
  // }
  //
  // socket.on("privateMessageReceived", msg => setMessages(prev => [...prev, msg]));

  return (
    <div className="d-flex flex-column w-100 h-100">
      <div style={{ flex: 1 }}>
        <ol className="p-0 m-0 overflow-hidden" style={{ minHeight: '0', listStyle: 'none' }}>
          <li className="position-relative mx-2" style={{outline: 'none'}}>
            <div
              className="position-relative"
              style={{
                marginTop: '1.0625rem', minHeight: '2.75rem',
                paddingTop: '0.125rem', paddingBottom: '0.125rem',
                paddingLeft: '72px', paddingRight: '48px!important',
                wordWrap: 'break-word', userSelect: 'text'
              }}
            >
              <div className="position-static ms-0 ps-0" style={{textIndent: 'none'}}>
                {/* User's avatar */}
                <img
                  src={imgURL}
                  className="position-absolute overflow-hidden"
                  style={{
                    pointerEvents: 'auto', textIndent: '-9999px',
                    left: '16px', marginTop: 'calc(4px-0.125rem)',
                    width: '40px', height: '40px', borderRadius: '50%',
                    cursor: 'pointer', userSelect: 'none'
                  }}
                  alt=""
                />

                {/* Username and message time */}
                <h3 className="overflow-hidden position-relative p-0 m-0 d-flex flex-row align-items-center"
                    style={{
                      display: 'block',
                      lineHeight: '1.375rem',
                      minHeight: '1.375rem',
                      whiteSpace: 'break-spaces'
                    }}
                >
                  <span
                    className="me-1 fs-6 position-relative overflow-hidden text-white"
                    style={{
                      fontWeight: '500',
                      display: 'inline',
                      verticalAlign: 'baseline',
                      outline: 'none'
                    }}
                  >
                    Dummy
                  </span>
                  <span
                    className="ms-1"
                    style={{
                      fontSize: '0.75rem', height: '1.25rem',
                      verticalAlign: 'baseline', display: 'inline-block',
                      cursor: 'default', pointerEvents: 'none', outline: 'none',
                      fontWeight: '500', color: 'rgba(148, 154, 158)'
                    }}
                  >
                    <time dateTime="2024-02-03T01:59:00.997Z">2024/02/03 01:59</time>
                  </span>
                </h3>
              </div>

              {/* Message Content */}
              <div
                className="overflow-hidden position-relative fs-6 p-0 m-0"
                style={{
                  userSelect: 'text', whiteSpace: 'break-spaces', wordWrap: 'break-word',
                  marginLeft: 'calc(-1 * 72px)', paddingLeft: '72px', textIndent: '0',
                  lineHeight: '1.375rem', color: 'rgba(219, 222, 225)'
                }}
              >
                <span>I'm a dummy, click to talk to me.</span>
              </div>
            </div>
          </li>
        </ol>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <PrivateMessageTextBox />
      </div>
    </div>
  );
}

export default PrivateMessageMessagesWrapper;
