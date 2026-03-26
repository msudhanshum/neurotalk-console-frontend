import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <>
      <style>{`
        .layout-wrapper {
          margin-left: 55px;              /* sidebar width */
          margin-top: 0vh;             /* header height */
          padding: 20px;
          min-height: calc(100vh - 10.2vh - 50px);
          //background:  hsl(202, 27%, 77%);;
        }

        .main-content {
          width: 100%;
          //background:  hsl(202, 27%, 77%);
          border-radius: 12px;
          padding: 20px;
        }
      `}</style>

      <Header />
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="layout-wrapper">
        <div className="main-content">
          <Outlet />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MainLayout;