import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="nxl-navigation">
        <div className="navbar-wrapper">
            <div className="m-header">
                <a href="index.html" className="b-brand">
                   
                    <img src="assets/images/logo-full.png" alt="" className="logo logo-lg" />
                    <img src="assets/images/logo-abbr.png" alt="" className="logo logo-sm" />
                </a>
            </div>
            <div className="navbar-content">
                <ul className="nxl-navbar">
                    <li className="nxl-item nxl-caption">
                        <label>Navigation</label>
                    </li>
                   
                    <li className="nxl-item nxl-hasmenu">
                        <a href="javascript:void(0);" className="nxl-link">
                            <span className="nxl-micon"><i className="feather-airplay"></i></span>
                            <span className="nxl-mtext">Dashboards</span><span className="nxl-arrow"><i className="feather-chevron-right"></i></span>
                        </a>
                        <ul className="nxl-submenu">
                            <li className="nxl-item"><a className="nxl-link" href="payment.html">Payment</a></li>
                            <li className="nxl-item"><a className="nxl-link" href="invoice-view.html">Invoice View</a></li>
                            <li className="nxl-item"><a className="nxl-link" href="invoice-create.html">Invoice Create</a></li>
                        </ul>
                    </li>
                   
                </ul>
                
            </div>


        </div>
    </nav>

  );
};

export default Sidebar;
