import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "../style.css";
import imgURL from "../static/avatar.png";

const ActiveFriendsList = () => {
  const navigate = useNavigate();
  const [hoverStates, setHoverStates] = useState<Record<string, boolean>>({});

  const updateHoverState = (item: string, isHovered: boolean) => {
    setHoverStates(prev => ({ ...prev, [item]: isHovered }));
  }

  return (
    <div className="d-flex flex-column" style={{ height: '100vh', flex: '1 1 auto', borderRight: 'solid 3px rgba(63, 65, 71)' }}>
      {/* TODO: make search function */}
      <div className="rounded-2 mt-3 ms-3 me-4 px-3 py-2" style={{ color: 'rgba(148, 155, 164)', backgroundColor: 'rgba(30, 31, 34)', fontSize: '16px' }}>
        Search
        <Icon icon="mingcute:search-2-line" className="float-end text-white fs-4"/>
      </div>

      {/* TODO: make the number dynamic */}
      <div className="mt-4 ms-4 me-3 mb-2 fw-bolder" style={{ color: 'rgba(181, 186, 193)' }}>Online - 1</div>

      <div className="d-flex flex-column mt-2">
        <div className="ms-4 me-5">
          {/* TODO: improve hover state */}
          <div
            className="ps-3 rounded-3"
            onClick={ () => navigate("/channels/@me/dummy") }
            onMouseEnter={ () => updateHoverState("dummy", true) }
            onMouseLeave={ () => updateHoverState("dummy", false) }
            style={{ backgroundColor: hoverStates["dummy"] ? "rgba(57, 60, 65)" : "rgba(49, 51, 56)" }}
          >
            <div className="d-flex flex-row justify-content-between py-3 ps-2 me-2" style={{ borderTop: hoverStates["dummy"] ? "solid 2px rgba(57, 60, 65)" : "solid 2px rgba(63, 65, 71)" }}>
              <div className="d-flex flex-row">
                <img className="rounded-circle me-3" style={{ width: '32px', height: '32px', marginRight: '12px' }} src={ imgURL } alt="" />
                <span className="d-flex flex-column">
                  <span className="fw-bolder py-auto" style={{ color: 'rgba(230, 231, 234)', fontSize: '14px' }}>Dummy</span>
                  <span className="py-auto" style={{ color: 'rgba(172, 176, 183)', fontSize: '12px' }}>I'm a dummy, click me, talk to me.</span>
                </span>
              </div>


              <div className="d-flex flex-row mt-1 me-3">
                {/* TODO: remake the circle */}
                <span className="rounded-circle px-2 py-1" style={{ backgroundColor: 'rgba(41, 43, 46)' }}>
                  <Icon icon="tabler:message-circle-2-filled" className="tab_bar_logo" />
                </span>
                <span className="rounded-circle px-2 py-1 mx-3" style={{ backgroundColor: 'rgba(41, 43, 46)' }}>
                  <Icon icon="icon-park-solid:more-three" className="tab_bar_logo" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveFriendsList;
