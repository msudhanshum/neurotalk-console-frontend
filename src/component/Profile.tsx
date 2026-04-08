import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile: React.FC = () => {

  const [company, setCompany] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [isEditMode, setIsEditMode] = useState(false); // ✅ NEW

  const getValue = (val: any) => val || "N/A";

  const isProfileIncomplete =
    !company?.name ||
    !company?.email ||
    !company?.phone ||
    !company?.address ||
    !formData?.username ||
    !formData?.dob ||
    !formData?.gender;

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token =
          localStorage.getItem("token") ||
          sessionStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/v1/company/me",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setCompany(res.data.company);
        setFormData(res.data.company);

      } catch (error) {
        console.error(error);
      }
    };

    fetchCompany();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setFormData((prev: any) => ({
      ...prev,
      image: URL.createObjectURL(file)
    }));
  };

  // ✅ NEW
  const handleCompleteProfile = () => {
    setFormData({});
    setIsEditMode(false);
    setShowModal(true);
  };

  // ✅ NEW
  const handleEditProfile = () => {
    setFormData(company);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleSubmit = () => {

    if (!formData?.username || !formData?.dob || !formData?.gender) {
      alert("Please fill all required fields before submitting");
      return;
    }

  setCompany((prev: any) => ({
  ...prev,
  ...formData
}));
    setShowModal(false);
  };

  return (
    <>
     <style>{`
/* 🌈 PAGE */
.profile-page {
  padding: 20px;
  min-height: 100%;
  background: linear-gradient(135deg, #eef2f7, #d9e4f5);
  margin-top: -5.5vh;
  margin-left: -3vw;
  width: 100vw;
}

/* 📦 WRAPPER */
.profile-wrapper {
  padding: 25px;
  border-radius: 16px;
}

/* 🏷 TITLE */
.profile-title {
  font-weight: 700;
  color: #2c3e50;
  margin-top: 5vh;
  margin-bottom: 10px;
}

/* 🪪 CARD */
.card {
  border: none;
  WIDTH:60VW;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  transition: 0.3s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.15);
}

.profile-overview-card1:hover{
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.15);

}

/* 👤 PROFILE TITLE */
.profile-overview {
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  color: #2575fc;
 
}

.profile-overview-card1{
width:30vw;
  border: none;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  transition: 0.3s ease;
  
}

/* 📏 ROWS */
.info-row {
  display: grid;
  grid-template-columns: 180px 1fr;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.info-row span:first-child {
  font-weight: 600;
  color: #555;
}

.info-row span:last-child {
  color: #333;
}

/* 🚨 ALERT */
.profile-alert {
  position: fixed;
  top: 75px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #ff4d4f, #ff7a7a);
  color: white;
  padding: 12px 22px;
  border-radius: 30px;
  font-weight: 500;
  z-index: 1000;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  animation: slideDown 0.4s ease;
}

/* 🪟 MODAL */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  backdrop-filter: blur(4px);
}

.modal-box {
  background: white;
  padding: 20px;
  border-radius: 14px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: scaleIn 0.3s ease;
  box-shadow: 0 15px 35px rgba(0,0,0,0.25);
}

.modal-box h5 {
  text-align: center;
  color: #2575fc;
  font-weight: 600;
}

/* ✍️ INPUTS */
.modal-box input,
.modal-box select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: 0.3s;
  font-size: 14px;
}

.modal-box input:focus,
.modal-box select:focus {
  border-color: #2575fc;
  box-shadow: 0 0 5px rgba(37,117,252,0.4);
}

/* 🔘 BUTTONS */
.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.modal-actions button {
  flex: 1;
  margin: 0 5px;
  padding: 8px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}

.modal-actions button:first-child {
  background: #eee;
}

.modal-actions button:last-child {
  background: linear-gradient(135deg, #36d1dc, #5b86e5);
  color: white;
}

.modal-actions button:hover {
  transform: scale(1.05);
}

/* 🖼 PROFILE IMAGE */
.profile-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid transparent;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(135deg, #6a11cb, #2575fc) border-box;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

/* 🎯 BUTTONS (existing bootstrap enhance) */
.btn {
  border-radius: 20px !important;
  padding: 6px 14px !important;
  font-size: 13px !important;
  transition: 0.3s;
}

.btn:hover {
  transform: scale(1.05);
}

/* 📊 TABLE */
.table {
  border-radius: 10px;
  overflow: hidden;
}

.table th {
  background: #f4f6fb;
  font-weight: 600;
}

.table td {
  font-size: 13px;
}

/* ✨ ANIMATIONS */
@keyframes slideDown {
  from { opacity: 0; transform: translate(-50%, -20px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

@keyframes scaleIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
`}</style>
      {isProfileIncomplete && (
        <div
          className="profile-alert"
          onClick={handleCompleteProfile} // ✅ UPDATED
        >
          Your profile is incomplete, Please complete it
        </div>
      )}

      <div className="profile-page">
        <div className="profile-wrapper">

          <h4 className="profile-title">Admin View Profile</h4>
          <hr/>

          <div className="row">

            <div className=" col-md-4">
              <div className="profile-overview-card1 p-3 text-center">

                <p className="profile-overview">Profile Overview</p>

                <img
                 src={company?.image || "https://randomuser.me/api/portraits/men/32.jpg"}
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
                  <span>{company?.isActive ? "Active" : "Inactive"}</span>
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
  <button
    className="btn btn-success mt-2"
    onClick={handleCompleteProfile}
  >
    Complete Profile
  </button>
)}

                <button
                  className="btn btn-primary mt-2"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </button>

              </div>
            </div>

            {/* ✅ RIGHT SIDE (UNCHANGED) */}
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

            <input name="username" value={formData?.username || ""} onChange={handleChange} placeholder="Username" />

            <input type="date" name="dob" value={formData?.dob || ""} onChange={handleChange} />

            <select name="gender" value={formData?.gender || ""} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>

          </div>
        </div>
      )}

    </>
  );
};

export default Profile;