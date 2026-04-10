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

        .nxl-dropdown-wrap {
          position: relative;
          width: 100%;
        }

        .nxl-dropdown-wrap:hover .nxl-flyout {
          opacity: 1;
          visibility: visible;
          transform: translateX(0);
          pointer-events: auto;
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

        .nxl-toggle {
          appearance: none;
          background: transparent;
          border: 0;
        }

        .nxl-flyout {
          position: absolute;
          top: 5px;
          left: 68px;
          width: 190px;
          padding: 8px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.98);
          border: 1px solid #e5e7eb;
          box-shadow: 0 16px 32px rgba(15, 23, 42, 0.12);
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transform: translateX(-8px);
          pointer-events: none;
          transition: opacity 0.18s ease, visibility 0.18s ease, transform 0.18s ease;
        }

        .nxl-flyout-title {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #64748b;
          padding: 4px 10px 8px;
        }

        .nxl-flyout-link {
          display: flex;
          align-items: center;
          min-height: 40px;
          padding: 0 12px;
          margin: 3px 0;
          border-radius: 10px;
          text-decoration: none;
          color: #334155;
          font-size: 13px;
          font-weight: 600;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .nxl-flyout-link:hover {
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          color: #fff;
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
            <div className="nxl-dropdown-wrap">
              <button type="button" className="nxl-link nxl-toggle" aria-label="Contacts menu">
                <i className="feather-book-open nxl-micon"></i>
              </button>
              <span className="tooltip">Contacts</span>

              <div className="nxl-flyout">
                <div className="nxl-flyout-title">Contacts</div>
                <Link className="nxl-flyout-link" to="/contact-management">
                  Contact Management
                </Link>
                <Link className="nxl-flyout-link" to="/group-management">
                  Group Management
                </Link>
              </div>
            </div>
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
