import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { API_ENDPOINTS } from "../../api/apiConstants";

// ✅ Helper: safely format any date value to "YYYY-MM-DD"
const formatDate = (val: any): string => {
  if (!val) return "";
  // Already in correct format
  if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
  // ISO string like "1990-01-15T00:00:00.000Z"
  const d = new Date(val);
  if (!isNaN(d.getTime())) return d.toISOString().split("T")[0];
  return "";
};

const Profile: React.FC = () => {
  const [company, setCompany] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [isEditMode, setIsEditMode] = useState(false);

  const getValue = (val: any) => val || "N/A";

  const isProfileIncomplete =
    !company?.name ||
    !company?.email ||
    !company?.phone ||
    !company?.address ||
    !company?.username ||
    !company?.dob ||
    !company?.gender;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          localStorage.getItem("token") ||
          sessionStorage.getItem("token");

        // 1. Fetch company base data
        const companyRes = await axios.get(
          API_ENDPOINTS.COMPANY.ME,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const companyData = companyRes.data.company;
        console.log("✅ Company data:", companyData);

        // 2. Fetch complete profile (safe fallback on 404)
        let profileData: any = {};
        try {
          const profileRes = await axios.get(
            API_ENDPOINTS.COMPANY.COMPLETE_PROFILE,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          profileData = profileRes.data.profile || {};
          console.log("✅ Profile data:", profileData);
        } catch (err: any) {
          if (err.response?.status === 404) {
            console.log("⚠️ No profile found yet — using empty fallback");
          } else {
            console.error("❌ Profile API error:", err.response || err.message);
          }
        }

        // 3. Merge — ✅ FIX: format dob here so it never shows as N/A
        const finalData = {
          ...companyData,
          username:      profileData.username      || "",
          dob:           formatDate(profileData.dob),   // ✅ KEY FIX
          gender:        profileData.gender        || "",
          image:         profileData.image         || "",
          name:          profileData.companyName   || companyData.name,
          contactPerson: profileData.companyPerson || companyData.contactPerson,
        };

        console.log("✅ Final merged data:", finalData); // ✅ was logging wrong var before

        setCompany(finalData);
        setFormData(finalData);
      } catch (error) {
        console.error("❌ fetchData error:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev: any) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleCompleteProfile = () => {
    setFormData({});
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEditProfile = () => {
    setFormData(company);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!formData?.username || !formData?.dob || !formData?.gender) {
      alert("Please fill all required fields before submitting");
      return;
    }

    try {
      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

      const res = await axios.post(
        API_ENDPOINTS.COMPANY.COMPLETE_PROFILE,
        {
          company:       company._id,
          companyName:   company.name,
          companyPerson: company.contactPerson,
          username:      formData.username,
          dob:           formData.dob,
          gender:        formData.gender,
          image:         formData.image,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ Profile saved:", res.data);
      const updatedProfile = res.data.profile;

      // ✅ FIX: format dob here too so state stays consistent
      setCompany((prev: any) => ({
        ...prev,
        username:      updatedProfile.username,
        dob:           formatDate(updatedProfile.dob),  // ✅ KEY FIX
        gender:        updatedProfile.gender,
        image:         updatedProfile.image,
        name:          updatedProfile.companyName   || prev.name,
        contactPerson: updatedProfile.companyPerson || prev.contactPerson,
      }));

      setShowModal(false);
    } catch (error) {
      console.error("❌ Profile save error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const refreshToken =
        localStorage.getItem("refreshToken") ||
        sessionStorage.getItem("refreshToken");
      await axios.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
  };

  return (
    <>
      {isProfileIncomplete && (
        <div className="profile-alert" onClick={handleCompleteProfile}>
          Your profile is incomplete. Please complete it.
        </div>
      )}

      <div className="profile-page">
        <div className="profile-wrapper">

          <h4 className="profile-title">Admin View Profile</h4>
          <button className="logout-btn" onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
              viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
          <hr />

          <div className="row">
            <div className="col-md-4">
              <div className="profile-overview-card1 p-3 text-center">
                <p className="profile-overview">Profile Overview</p>
                <img
                  src={company?.image || "https://www.mjunction.in/wp-content/uploads/2020/09/Dummy.jpg"}
                  alt="profile"
                  className="profile-img mx-auto mb-3"
                />
                <h5>{getValue(company?.name)}</h5>
                <p className="text-muted">Company</p>
                <hr />
                <div className="info-row">
                  <span>ID</span>
                  <span>{getValue(company?._id)}</span>
                </div>
                <div className="info-row">
                  <span>Status</span>
                  <span className="status-wrapper">
                    <span className={`status-dot ${company?.isActive ? "status-active" : "status-inactive"}`}></span>
                    <span className={company?.isActive ? "status-text-active" : "status-text-inactive"}>
                      {company?.isActive ? "Active" : "Inactive"}
                    </span>
                  </span>
                </div>
                <div className="info-row">
                  <span>Joined</span>
                  <span>
                    {company?.createdAt
                      ? new Date(company.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                {isProfileIncomplete && (
                  <button className="btn btn-success mt-2" onClick={handleCompleteProfile}>
                    Complete Profile
                  </button>
                )}
                <button className="btn btn-primary mt-2" onClick={handleEditProfile}>
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="col-md-8">
              <div className="card p-3 mb-3">
                <h6>Personal Information</h6>
                <hr />
                <div className="info-row">
                  <span>Full Name</span>
                  <span>{getValue(company?.name)}</span>
                </div>
                <div className="info-row">
                  <span>Username</span>
                  <span>{getValue(company?.username)}</span>
                </div>
                <div className="info-row">
                  <span>Date of Birth</span>
                  <span>{getValue(company?.dob)}</span>
                </div>
                <div className="info-row">
                  <span>Gender</span>
                  <span>{getValue(company?.gender)}</span>
                </div>
              </div>

              <div className="card p-3 mb-3">
                <h6>Contact Information</h6>
                <hr />
                <div className="info-row">
                  <span>Email</span>
                  <span>{getValue(company?.email)}</span>
                </div>
                <div className="info-row">
                  <span>Phone</span>
                  <span>{getValue(company?.phone)}</span>
                </div>
                <div className="info-row">
                  <span>Address</span>
                  <span>{getValue(company?.address)}</span>
                </div>
              </div>

              <div className="card p-3">
                <h6>Activity Logs</h6>
                <hr />
                <table className="table">
                  <thead>
                    <tr>
                      <th>Activity</th>
                      <th>IP</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Login</td>
                      <td>192.168.1.1</td>
                      <td>Today</td>
                      <td className="text-success">Success</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h5>{isEditMode ? "Edit Profile" : "Complete Profile"}</h5>
            <input type="file" onChange={handleImage} />
            <input
              name="username"
              value={formData?.username || ""}
              onChange={handleChange}
              placeholder="Username"
            />
            <input
              type="date"
              name="dob"
              value={formData?.dob || ""}   // ✅ always "YYYY-MM-DD" now
              onChange={handleChange}
            />
            <select name="gender" value={formData?.gender || ""} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;