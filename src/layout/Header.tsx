import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../assets/images/logo/NeuroTalk_logo.jpeg";
import { API_ENDPOINTS } from "../api/apiConstants";
const Header: React.FC = () => {
  const [active, setActive] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNavClick = (name: string, path: string): void => {
    setActive(name);
    navigate(path);
  };

  // ✅ Fetch profile image on mount
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const token =
          localStorage.getItem("token") ||
          sessionStorage.getItem("token");

        if (!token) return;

        const res = await axios.get(
          API_ENDPOINTS.COMPANY.COMPLETE_PROFILE,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const img = res.data?.profile?.image;
        if (img) setProfileImage(img);

      } catch (err: any) {
        if (err.response?.status !== 404) {
          console.error("Header profile fetch error:", err.message);
        }
      }
    };

    fetchProfileImage();
  }, []);

  return (
    <>
      <style>{`
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

        .logo {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          font-size: 18px;
          cursor: pointer;
          transition: 0.3s;
          margin-left: -1vw;
        }

        .logo:hover {
          transform: scale(1.05);
          box-shadow: 0 0 1px 1px grey;
          border-radius: 100px;
        }

        .logo img {
          width: 48px;
          border-radius: 100px;
        }

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

        .header-right {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 15px;
        }

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

        .btn-orange.secondary {
          background: linear-gradient(135deg, #36d1dc, #5b86e5);
        }

        .header-right i {
          font-size: 18px;
          cursor: pointer;
          transition: 0.3s;
        }

        .header-right i:hover {
          color: #2575fc;
          transform: scale(1.2);
        }

        .profile-wrapper {
          position: relative;
          display: inline-block;
        }

        /* Tooltip */
        .tooltip-text {
          visibility: hidden;
          background-color: #333;
          color: #fff;
          text-align: center;
          padding: 5px 8px;
          border-radius: 6px;
          font-size: 9px;

          position: absolute;
          bottom: 45px;
          left: 105%;
          transform: translateX(-50%);
          white-space: nowrap;

          opacity: 0;
          transition: opacity 0.3s;
        }

        .profile-wrapper:hover .tooltip-text {
          visibility: visible;
          opacity: 1;
        }

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
          overflow: hidden;
        }

        .profile-circle:hover {
          transform: scale(1.1);
        }

        .profile-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      `}</style>

      <div className="custom-header">

        {/* LEFT */}
        <div className="logo" onClick={() => navigate("/dashboard")}>
          <img src={image} alt="logo" />
        </div>

        {/* CENTER NAV */}
        <div className="header-center">
          <div className="nav-item" onClick={() => handleNavClick("Business Phone System", "/business")}>
            Business Phone System
          </div>
          <div className="nav-item" onClick={() => handleNavClick("Call Tracking", "/tracking")}>
            Call Tracking
          </div>
          <div className="nav-item" onClick={() => handleNavClick("Coach", "/coach")}>
            Coach
          </div>
          <div className="nav-item" onClick={() => handleNavClick("Broadcast", "/broadcast")}>
            Broadcast
          </div>
        </div>

        {/* RIGHT */}
        <div className="header-right">
          <button className="btn-orange">Schedule A Demo</button>
          <button className="btn-orange secondary">📞 Open Dialer</button>
          <i className="feather-bell"></i>

          {/* ✅ Profile with Tooltip */}
          <div className="profile-wrapper">
            <div
              className="profile-circle"
              onClick={() => navigate("/dashboard/profile")}
            >
              {profileImage ? (
                <img src={profileImage} alt="profile" />
              ) : (
                "Y"
              )}
            </div>
            <span className="tooltip-text">Profile</span>
          </div>

        </div>
      </div>
    </>
  );
};

export default Header;