import { Outlet } from "react-router-dom";
import ServerSidebar from "./Server_Sidebar";

const Home = () => {
  return (
    <div className="vh-100 vw-100 background-color d-flex flex-row">
      <ServerSidebar />
      <div className="d-flex flex-row align-items-stretch" style={{ flex: '1 1 auto' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
