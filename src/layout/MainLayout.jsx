import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
     
        <Header />
         <Sidebar />


      <main className="nxl-container">
        <div className="nxl-content">
          <div className="main-content">
            <Outlet />
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default MainLayout;