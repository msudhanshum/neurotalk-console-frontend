import { Link } from "react-router-dom";
import React from "react";

const Sidebar: React.FC = () => {
  return (
    <>
      <style>{`
        /* 🌈 SIDEBAR */
        .nxl-navigation {
          width: 60px;
          background: linear-gradient(180deg, #ffffff, #f4f7fb);
          height: 91h;
          border-right: 1px solid #eee;
          margin-top: 8.8vh;
          border-right:2px solid #433a7a;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .nxl-navbar {
          list-style: none;
          padding: 10px 0;
          margin: 0;
        
        }

        .nxl-item {
          position: relative;
          width: 100%;
        }

        /* 🔘 ICON LINK */
        .nxl-link {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 45px;
          width:3vw;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 12px;
          margin: 5px;
        }

        /* ✨ HOVER EFFECT */
        .nxl-link:hover {
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          transform: scale(1.08);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .nxl-link:hover .nxl-micon {
          color: #fff;
        }

        /* 🎯 ICON */
        .nxl-micon {
          font-size: 20px;
          color: #444;
          transition: 0.3s;
        }

        /* 💡 TOOLTIP */
        .tooltip {
          position: absolute;
          left: 70px;
          top: 50%;
          transform: translateY(-50%) translateX(-10px);
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          color: #fff;
          padding: 6px 12px;
          border-radius: 20px;
          white-space: nowrap;
          font-size: 12px;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .nxl-item:hover .tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateY(-50%) translateX(0);
        }

        /* ✨ ACTIVE EFFECT (optional future ready) */
        .nxl-link.active {
          background: linear-gradient(135deg, #36d1dc, #5b86e5);
        }

      `}</style>

      <nav className="nxl-navigation">
        <ul className="nxl-navbar">

          <li className="nxl-item">
            <Link className="nxl-link" to="/dashboard">
              <i className="feather-grid nxl-micon"></i>
            </Link>
            <span className="tooltip">Dashboard</span>
          </li>

          <li className="nxl-item">
            <Link className="nxl-link" to="/numbers">
              <i className="feather-phone nxl-micon"></i>
            </Link>
            <span className="tooltip">Number and DID</span>
          </li>

          <li className="nxl-item">
            <Link className="nxl-link" to="/users">
              <i className="feather-users nxl-micon"></i>
            </Link>
            <span className="tooltip">Users & Performance</span>
          </li>

          <li className="nxl-item">
            <Link className="nxl-link" to="/integrations">
              <i className="feather-share-2 nxl-micon"></i>
            </Link>
            <span className="tooltip">Integrations</span>
          </li>

          <li className="nxl-item">
            <Link className="nxl-link" to="/activity">
              <i className="feather-activity nxl-micon"></i>
            </Link>
            <span className="tooltip">Activity Feed</span>
          </li>

          <li className="nxl-item">
            <Link className="nxl-link" to="/reports">
              <i className="feather-bar-chart-2 nxl-micon"></i>
            </Link>
            <span className="tooltip">Reports</span>
          </li>

          <li className="nxl-item">
            <Link className="nxl-link" to="/call-planner">
              <i className="feather-calendar nxl-micon"></i>
            </Link>
            <span className="tooltip">Call Planner</span>
          </li>

          <li className="nxl-item">
            <Link className="nxl-link" to="/power-dialer">
              <i className="feather-zap nxl-micon"></i>
            </Link>
            <span className="tooltip">Power Dialer</span>
          </li>

          <li className="nxl-item">
            <Link className="nxl-link" to="/call-scripts">
              <i className="feather-code nxl-micon"></i>
            </Link>
            <span className="tooltip">Call Scripts</span>
          </li>

          <li className="nxl-item">
            <Link className="nxl-link" to="/campaigns">
              <i className="feather-aperture nxl-micon"></i>
            </Link>
            <span className="tooltip">Campaign Management</span>
          </li>

          <li className="nxl-item">
            <Link className="nxl-link" to="/billing">
              <i className="feather-file-text nxl-micon"></i>
            </Link>
            <span className="tooltip">Plan and Billing</span>
          </li>

          <li className="nxl-item">
            <Link className="nxl-link" to="/settings">
              <i className="feather-settings nxl-micon"></i>
            </Link>
            <span className="tooltip">Settings</span>
          </li>

        </ul>
      </nav>
    </>
  );
};

export default Sidebar;