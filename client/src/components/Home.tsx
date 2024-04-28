import { Outlet, Route, Routes } from 'react-router-dom'
import ServerSidebar from "./Server_Sidebar";
import PrivateMessageHomepage from './private_message_homepage/Private_Message_Homepage'
import PrivateMessageChatPage from './private_message_chat_page/Private_Message_Chat_Page'

const Home = () => {
  return (
    <div className="vh-100 vw-100 background-color d-flex flex-row">
      <Routes>
        <Route path="/" element={
          <div className="d-flex flex-row align-items-stretch flex-grow-1">
            <ServerSidebar />
            <PrivateMessageHomepage />
          </div>
        } />
        <Route path="dummy" element={
          <div className="d-flex flex-row align-items-stretch flex-grow-1">
            <ServerSidebar />
            <PrivateMessageChatPage />
          </div>
        } />
      </Routes>
    </div>
  );
}


export default Home;
