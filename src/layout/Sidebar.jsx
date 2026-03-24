import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {

  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {

    // अगर sidebar collapsed है तो submenu open नहीं होगा
    if (document.body.classList.contains("sidebar-collapsed")) {
      return;
    }

    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <nav className="nxl-navigation">
      <div className="navbar-wrapper">

        {/* Logo Section */}
        <div className="m-header">
          <Link className="nxl-link" to="/dashboard">
            <img src="assets/images/logo.png" alt="logo" className="logo logo-lg" />
            <img src="assets/images/logo.png" alt="logo" className="logo logo-sm" />
          </Link>
        </div>

        <div className="navbar-content">
          <ul className="nxl-navbar">

            <li className="nxl-item nxl-caption">
              <label>Navigation</label>
            </li>

            {/* ================= Dashboard ================= */}

            <li className="nxl-item">
              <Link className="nxl-link" to="/dashboard">

                <span className="nxl-micon">
                  <i className="feather-airplay"></i>
                </span>

                <span className="nxl-mtext">
                  Dashboard
                </span>

              </Link>
            </li>

            {/* ================= Applications ================= */}

            <li className="nxl-item">
              <Link className="nxl-link" to="/dashboard/subscription-plan">

                <span className="nxl-micon">
                  <i className="feather-airplay"></i>
                </span>

                <span className="nxl-mtext">
                   Subscription Plan
                </span>

              </Link>
            </li>

            {/* ================= Company Management ================= */}

            <li className={`nxl-item nxl-hasmenu ${openMenu === "company" ? "active" : ""}`}>

              <div
                className="nxl-link"
                onClick={() => toggleMenu("company")}
                style={{ cursor: "pointer" }}
              >

                <span className="nxl-micon">
                  <i className="feather-briefcase"></i>
                </span>

                <span className="nxl-mtext">
                  Company Management
                </span>

                <span className="nxl-arrow">
                  <i className="feather-chevron-right"></i>
                </span>

              </div>

              {openMenu === "company" && (
                <ul className="nxl-submenu">

                  <li className="nxl-item">
                    <Link className="nxl-link" to="/dashboard/company-list">
                      Company List
                    </Link>
                  </li>

                  <li className="nxl-item">
                    <Link className="nxl-link" to="/dashboard/add-company">
                      Add Company
                    </Link>
                  </li>

                    {/* ✅ NEW MODULE 1 */}
    <li className="nxl-item">
      <Link className="nxl-link" to="/dashboard/create-login">
        Create Login
      </Link>
    </li>
                </ul>
              )}

            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;