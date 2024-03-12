import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Guard from "./components/utils/guard";
import PrivateMessageHomepage from "./components/private_message_homepage/Private_Message_Homepage";
import PrivateMessageChatPage from "./components/private_message_chat_page/Private_Message_Chat_Page";
import socket from "./components/utils/actions/authActions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate to="/channels/@me" replace /> } />
        <Route path="/channels/@me" element={ <Guard /> }>
          <Route path="" element={ <Home />} />
          <Route path="dummy" element={ <PrivateMessageChatPage style={{ flex: '1 1 auto' }} /> }/>
        </Route>

        <Route path="/login" element={ <Login socket={ socket } /> } />
        <Route path="/register" element={ <Register /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
