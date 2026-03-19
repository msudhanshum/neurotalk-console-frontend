import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URLS } from "../api/apiConstants";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();

  const logout = async () => {

    try {

      const refreshToken =
        localStorage.getItem("refreshToken") ||
        sessionStorage.getItem("refreshToken");

      await axios.post(
        API_URLS.LOGOUT,
        { refreshToken },
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("token") ||
              sessionStorage.getItem("token")
            }`
          }
        }
      );

      Swal.fire({
        icon: "success",
        title: "Logged out successfully",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false
      });

    } catch (error) {

      console.log("Logout error", error);

    }

    // clear storage
    localStorage.clear();
    sessionStorage.clear();

    // redirect
    navigate("/", { replace: true });

  };

  return (
    <>
      <div className="dropdown nxl-h-item">
        <a
          href="#"
          data-bs-toggle="dropdown"
          role="button"
          data-bs-auto-close="outside"
        >
          <img
            src="assets/images/avatar/1.png"
            alt="user"
            className="img-fluid user-avtar me-0"
          />
        </a>

        <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-user-dropdown">

          <div className="dropdown-header">
            <div className="d-flex align-items-center">
              <img
                src="assets/images/avatar/1.png"
                alt="user"
                className="img-fluid user-avtar"
              />

              <div>
                <h6 className="text-dark mb-0">
                  Admin User
                </h6>

                <span className="fs-12 fw-medium text-muted">
                  admin@example.com
                </span>
              </div>
            </div>
          </div>

          <div className="dropdown-divider"></div>

          <a href="#" className="dropdown-item">
            <i className="feather-user"></i>
            <span>Profile Details</span>
          </a>

          <a href="#" className="dropdown-item">
            <i className="feather-settings"></i>
            <span>Account Settings</span>
          </a>

          <div className="dropdown-divider"></div>

          {/* LOGOUT BUTTON */}

          <a
            href="#"
            className="dropdown-item"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            <i className="feather-log-out"></i>
            <span> Logout</span>
          </a>

        </div>
      </div>
    </>
  );
};

export default Profile;