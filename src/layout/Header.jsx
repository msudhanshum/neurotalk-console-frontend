import { useEffect } from "react";
import Profile from "../component/Profile";
import { Notification } from "../component/Notification";
import { Timesheets } from "../component/Timesheets";
import { Search } from "react-feather";

const Header = () => {
  const preventDefault = (e) => e.preventDefault();
   const handleFullScreen = (e) => {
    e.preventDefault();

    // theme ka existing jQuery function call karega
    if (window.$) {
      window.$("body").fullScreenHelper("toggle");
    }
  };

  return (
    <>
      <header className="nxl-header">
        <div className="header-wrapper">

          <div className="header-left d-flex align-items-center gap-4">

            <a href="#" onClick={preventDefault} className="nxl-head-mobile-toggler" id="mobile-collapse">
              <div className="hamburger hamburger--arrowturn">
                <div className="hamburger-box">
                  <div className="hamburger-inner"></div>
                </div>
              </div>
            </a>

            <div className="nxl-navigation-toggle">
              <a href="#" onClick={preventDefault} id="menu-mini-button">
                <i className="feather-align-left"></i>
              </a>
              <a href="#" onClick={preventDefault} id="menu-expend-button" style={{ display: "none" }}>
                <i className="feather-arrow-right"></i>
              </a>
            </div>

            <div className="nxl-drp-link nxl-lavel-mega-menu">
              <div className="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
                <a href="#" onClick={preventDefault} id="nxl-lavel-mega-menu-hide">
                  <i className="feather-arrow-left me-2"></i>
                  <span>Back</span>
                </a>
              </div>
            </div>

          </div>

          <div className="header-right ms-auto">
            <div className="d-flex align-items-center">

      <div className="dropdown nxl-h-item nxl-header-search">
                        <a href="javascript:void(0);" className="nxl-head-link me-0" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                            <i className="feather-search"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-search-dropdown">
                            <div className="input-group search-form">
                                <span className="input-group-text">
                                    <i className="feather-search fs-6 text-muted"></i>
                                </span>
                                <input type="text" className="form-control search-input-field" placeholder="Search...." />
                                <span className="input-group-text">
                                    <button type="button" className="btn-close"></button>
                                </span>
                            </div>
                            <div className="dropdown-divider mt-0"></div>
                            <div className="search-items-wrapper">
                                <div className="searching-for px-4 py-2">
                                    <p className="fs-11 fw-medium text-muted">I'm searching for...</p>
                                    <div className="d-flex flex-wrap gap-1">
                                        <a href="javascript:void(0);" className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold">Projects</a>
                                        <a href="javascript:void(0);" className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold">Leads</a>
                                        <a href="javascript:void(0);" className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold">Contacts</a>
                                        <a href="javascript:void(0);" className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold">Inbox</a>
                                        <a href="javascript:void(0);" className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold">Invoices</a>
                                        <a href="javascript:void(0);" className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold">Tasks</a>
                                        <a href="javascript:void(0);" className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold">Customers</a>
                                        <a href="javascript:void(0);" className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold">Notes</a>
                                        <a href="javascript:void(0);" className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold">Affiliate</a>
                                        <a href="javascript:void(0);" className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold">Storage</a>
                                        <a href="javascript:void(0);" className="flex-fill border rounded py-1 px-2 text-center fs-11 fw-semibold">Calendar</a>
                                    </div>
                                </div>
                                <div className="dropdown-divider"></div>
                                <div className="recent-result px-4 py-2">
                                    <h4 className="fs-13 fw-normal text-gray-600 mb-3">Recnet <span className="badge small bg-gray-200 rounded ms-1 text-dark">3</span></h4>
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="avatar-text rounded">
                                                <i className="feather-airplay"></i>
                                            </div>
                                            <div>
                                                <a href="javascript:void(0);" className="font-body fw-bold d-block mb-1">CRM dashboard redesign</a>
                                                <p className="fs-11 text-muted mb-0">Home / project / crm</p>
                                            </div>
                                        </div>
                                        <div>
                                            <a href="javascript:void(0);" className="badge border rounded text-dark">/<i className="feather-command ms-1 fs-10"></i></a>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="avatar-text rounded">
                                                <i className="feather-file-plus"></i>
                                            </div>
                                            <div>
                                                <a href="javascript:void(0);" className="font-body fw-bold d-block mb-1">Create new document</a>
                                                <p className="fs-11 text-muted mb-0">Home / tasks / docs</p>
                                            </div>
                                        </div>
                                        <div>
                                            <a href="javascript:void(0);" className="badge border rounded text-dark">N /<i className="feather-command ms-1 fs-10"></i></a>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="avatar-text rounded">
                                                <i className="feather-user-plus"></i>
                                            </div>
                                            <div>
                                                <a href="javascript:void(0);" className="font-body fw-bold d-block mb-1">Invite project colleagues</a>
                                                <p className="fs-11 text-muted mb-0">Home / project / invite</p>
                                            </div>
                                        </div>
                                        <div>
                                            <a href="javascript:void(0);" className="badge border rounded text-dark">P /<i className="feather-command ms-1 fs-10"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown-divider my-3"></div>
                                <div className="users-result px-4 py-2">
                                    <h4 className="fs-13 fw-normal text-gray-600 mb-3">Users <span className="badge small bg-gray-200 rounded ms-1 text-dark">5</span></h4>
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="avatar-image rounded">
                                                <img src="assets/images/avatar/1.png" alt="" className="img-fluid" />
                                            </div>
                                            <div>
                                                <a href="javascript:void(0);" className="font-body fw-bold d-block mb-1">Alexandra Della</a>
                                                <p className="fs-11 text-muted mb-0">alex@example.com</p>
                                            </div>
                                        </div>
                                        <a href="javascript:void(0);" className="avatar-text avatar-md">
                                            <i className="feather-chevron-right"></i>
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="avatar-image rounded">
                                                <img src="assets/images/avatar/2.png" alt="" className="img-fluid" />
                                            </div>
                                            <div>
                                                <a href="javascript:void(0);" className="font-body fw-bold d-block mb-1">Green Cute</a>
                                                <p className="fs-11 text-muted mb-0">green.cute@outlook.com</p>
                                            </div>
                                        </div>
                                        <a href="javascript:void(0);" className="avatar-text avatar-md">
                                            <i className="feather-chevron-right"></i>
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="avatar-image rounded">
                                                <img src="assets/images/avatar/3.png" alt="" className="img-fluid" />
                                            </div>
                                            <div>
                                                <a href="javascript:void(0);" className="font-body fw-bold d-block mb-1">Malanie Hanvey</a>
                                                <p className="fs-11 text-muted mb-0">malanie.anvey@outlook.com</p>
                                            </div>
                                        </div>
                                        <a href="javascript:void(0);" className="avatar-text avatar-md">
                                            <i className="feather-chevron-right"></i>
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="avatar-image rounded">
                                                <img src="assets/images/avatar/4.png" alt="" className="img-fluid" />
                                            </div>
                                            <div>
                                                <a href="javascript:void(0);" className="font-body fw-bold d-block mb-1">Kenneth Hune</a>
                                                <p className="fs-11 text-muted mb-0">kenth.hune@outlook.com</p>
                                            </div>
                                        </div>
                                        <a href="javascript:void(0);" className="avatar-text avatar-md">
                                            <i className="feather-chevron-right"></i>
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-0">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="avatar-image rounded">
                                                <img src="assets/images/avatar/5.png" alt="" className="img-fluid" />
                                            </div>
                                            <div>
                                                <a href="javascript:void(0);" className="font-body fw-bold d-block mb-1">Archie Cantones</a>
                                                <p className="fs-11 text-muted mb-0">archie.cones@outlook.com</p>
                                            </div>
                                        </div>
                                        <a href="javascript:void(0);" className="avatar-text avatar-md">
                                            <i className="feather-chevron-right"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="dropdown-divider my-3"></div>
                                <div className="file-result px-4 py-2">
                                    <h4 className="fs-13 fw-normal text-gray-600 mb-3">Files <span className="badge small bg-gray-200 rounded ms-1 text-dark">3</span></h4>
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="avatar-image bg-gray-200 rounded">
                                                <img src="assets/images/file-icons/css.png" alt="" className="img-fluid" />
                                            </div>
                                            <div>
                                                <a href="javascript:void(0);" className="font-body fw-bold d-block mb-1">Project Style CSS</a>
                                                <p className="fs-11 text-muted mb-0">05.74 MB</p>
                                            </div>
                                        </div>
                                        <a href="javascript:void(0);" className="avatar-text avatar-md">
                                            <i className="feather-download"></i>
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="avatar-image bg-gray-200 rounded">
                                                <img src="assets/images/file-icons/zip.png" alt="" className="img-fluid" />
                                            </div>
                                            <div>
                                                <a href="javascript:void(0);" className="font-body fw-bold d-block mb-1">Dashboard Project Zip</a>
                                                <p className="fs-11 text-muted mb-0">46.83 MB</p>
                                            </div>
                                        </div>
                                        <a href="javascript:void(0);" className="avatar-text avatar-md">
                                            <i className="feather-download"></i>
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-0">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="avatar-image bg-gray-200 rounded">
                                                <img src="assets/images/file-icons/pdf.png" alt="" className="img-fluid" />
                                            </div>
                                            <div>
                                                <a href="javascript:void(0);" className="font-body fw-bold d-block mb-1">Project Document PDF</a>
                                                <p className="fs-11 text-muted mb-0">12.85 MB</p>
                                            </div>
                                        </div>
                                        <a href="javascript:void(0);" className="avatar-text avatar-md">
                                            <i className="feather-download"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="dropdown-divider mt-3 mb-0"></div>
                                <a href="javascript:void(0);" className="p-3 fs-10 fw-bold text-uppercase text-center d-block">Loar More</a>
                            </div>
                        </div>
              </div>
            

 <div className="nxl-h-item d-none d-sm-flex">
      <div className="full-screen-switcher">
        <a
          href="#"
          className="nxl-head-link me-0"
          onClick={handleFullScreen}
        >
          <i className="feather-maximize maximize"></i>
          <i className="feather-minimize minimize"></i>
        </a>
      </div>
    </div>
             

              {/* Dark Light */}
              <div className="nxl-h-item dark-light-theme">
                <a href="#" onClick={preventDefault} className="nxl-head-link me-0 dark-button">
                  <i className="feather-moon"></i>
                </a>
                <a href="#" onClick={preventDefault} className="nxl-head-link me-0 light-button" style={{ display: "none" }}>
                  <i className="feather-sun"></i>
                </a>
              </div>

              <Timesheets/>

              


            <Notification />

              <Profile/>


            </div>
          </div>

        </div>
      </header>
    </>
  );
};

export default Header;