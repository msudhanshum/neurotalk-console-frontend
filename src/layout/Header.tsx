import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/images/logo/NeuroTalk_logo.jpeg";

const Header: React.FC = () => {
  const [active, setActive] = useState<string>(""); // ✅ FIXED
  const navigate = useNavigate();

  const handleNavClick = (name: string, path: string): void => {
    setActive(name);
    navigate(path);
  };

  return (
    <>
      <style>{`
        /* 🌈 HEADER */
        .custom-header {
          height: 9vh;
          background: linear-gradient(135deg, #ffffff, #f5f7fb);
          border-bottom: 2px solid #433a7a;
          display: flex;
          align-items: center;
          padding: 0 25px;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
        }

        /* 🧠 LOGO */
        .logo {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          font-size: 18px;
          cursor: pointer;
          transition: 0.3s;
          margin-left:-1vw;
        }

        .logo:hover {
          transform: scale(1.05);
          box-shadow: 0 0 1px 1px grey;
          border-radius:100px;
        }

        .logo img {
          width: 48px;
          border-radius: 100px;
           
        }

        /* 📍 NAV */
        .header-center {
          margin-left: 50px;
          display: flex;
          gap: 35px;
        }

        .nav-item {
          font-size: 14px;
          color: #555;
          cursor: pointer;
          position: relative;
          padding: 6px 0;
          transition: 0.3s;
        }

        /* ✨ Hover ONLY */
        .nav-item:hover {
          color: #2575fc;
        }

        .nav-item::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0%;
          height: 3px;
          border-radius: 10px;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          transition: 0.3s ease;
        }

        .nav-item:hover::after {
          width: 100%;
        }

        /* 👉 RIGHT SIDE */
        .header-right {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        /* 🎯 BUTTONS */
        .btn-orange {
          background: linear-gradient(135deg, #ff7e5f, #feb47b);
          color: #fff;
          padding: 8px 16px;
          border-radius: 20px;
          border: none;
          font-size: 13px;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }

        .btn-orange:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 6px 15px rgba(0,0,0,0.25);
        }

        /* 📞 SECOND BUTTON */
        .btn-orange.secondary {
          background: linear-gradient(135deg, #36d1dc, #5b86e5);
        }

        /* 🔔 ICON */
        .header-right i {
          font-size: 18px;
          cursor: pointer;
          transition: 0.3s;
        }

        .header-right i:hover {
          color: #2575fc;
          transform: scale(1.2);
        }

        /* 👤 PROFILE */
        .profile-circle {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }

        .profile-circle:hover {
          transform: scale(1.1);
        }
      `}</style>

      <div className="custom-header">

        {/* LEFT */}
        <div className="logo" onClick={() => navigate("/dashboard")}>
          <img src={image} alt="logo" />
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

          <button className="btn-orange secondary">
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