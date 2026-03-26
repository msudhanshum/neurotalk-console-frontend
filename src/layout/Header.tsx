import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/images/logo/NeuroTalk_logo.jpeg";

const Header: React.FC = () => {
  const [active, setActive] = useState<string>("Business Phone System");
  const navigate = useNavigate();

  const handleNavClick = (name: string, path: string): void => {
    setActive(name);
    navigate(path);
  };

  return (
    <>
      <style>{`
        .custom-header {
  height: 9vh;
  background: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  padding: 0 20px;

  position: fixed;   /* ✅ ADD THIS */
  top: 0;            /* ✅ ADD THIS */
  left: 0;           /* ✅ ADD THIS */
  width: 100%;       /* ✅ ADD THIS */
  z-index: 1000;     /* ✅ ADD THIS (keeps it above everything) */
}

        .logo {
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 600;
          font-size: 18px;
          cursor: pointer;
          margin-left:-0.7vw
        }

        .logo img {
          width: 50px;
          background-color:green
        }

        .header-center {
          margin-left: 40px;
          display: flex;
          gap: 30px;
        }

        .nav-item {
          font-size: 14px;
          color: #555;
          cursor: pointer;
          padding-bottom: 1px;
          position: relative;
        }

        .nav-item::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0%;
          height: 3px;
          background: #f47c2c;
          transition: 0.3s ease;
        }

        .nav-item:hover::after {
          width: 100%;
        }

        .nav-item:hover {
          color: #000;
        }

        .btn-orange {
          background: #f47c2c;
          color: #fff;
          padding: 8px 15px;
          border-radius: 20px;
          border: none;
          font-size: 13px;
          cursor: pointer;
        }

        .header-right {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .profile-circle {
          width: 35px;
          height: 35px;
          background: #2c3e50;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>

      <div className="custom-header">

        {/* LEFT */}
        <div className="logo" onClick={() => navigate("/dashboard")}>
          <img
            src={image} alt="logo"
          />
           
        </div>

        {/* CENTER NAV */}
        <div className="header-center">

          

          <div
            className="nav-item"
            onClick={() =>
              handleNavClick("Business Phone System", "/business")
            }
          >
            Business Phone System
          </div>

          <div
            className="nav-item"
            onClick={() => handleNavClick("Call Tracking", "/tracking")}
          >
            Call Tracking
          </div>

          <div
            className="nav-item"
            onClick={() => handleNavClick("Coach", "/coach")}
          >
            Coach
          </div>

          <div
            className="nav-item"
            onClick={() => handleNavClick("Broadcast", "/broadcast")}
          >
            Broadcast
          </div>

        </div>

        {/* RIGHT */}
        <div className="header-right">

          <button className="btn-orange">Schedule A Demo</button>

          <button
            className="btn-orange"
            style={{ background: "#ff8c42" }}
          >
            📞 Open Dialer
          </button>

          <i className="feather-bell"></i>

          <div
            className="profile-circle"
          onClick={() => navigate("/dashboard/profile")}
          >
            Y
          </div>

        </div>

      </div>
    </>
  );
};

export default Header;