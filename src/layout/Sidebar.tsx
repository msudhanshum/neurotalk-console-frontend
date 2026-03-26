import { Link } from "react-router-dom";
import React from "react";

const Sidebar: React.FC = () => {
  return (
    <>
      <style>{`
        .nxl-navigation {
          width:50px;
          background: #ffffff;
          height: 90vh;
          border-right: 1px solid #eee;
          margin-top: 8.9vh;
          
        }

        .nxl-navbar {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nxl-item {
          position: relative;
        }

        .nxl-link {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 7vh;
          width:1vw;
          cursor: pointer;
        }

        .nxl-link:hover {
          color:red;
        }

        .nxl-micon {
          font-size: 20px;
          color: #333;
        }

        .tooltip {
          position: absolute;
          left: 50px;
          top: 50%;
          transform: translateY(-50%);
          background: #333;
          color: #fff;
          padding: 6px 10px;
          border-radius: 4px;
          white-space: nowrap;
          font-size: 12px;
          opacity: 0;
          visibility: hidden;
          transition: 0.2s ease;
        }

        .nxl-item:hover .tooltip {
          opacity: 1;
          visibility: visible;
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