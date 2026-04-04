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
        .profile-page {
          padding: 20px;
          min-height: 100%;
          background: hsl(202, 27%, 77%);
          margin-top:-5.5vh;
          margin-left:-3vw;
          width:100vw;
        }

        .profile-wrapper {
          padding: 25px;
          border-radius: 12px;
          background: hsl(202, 27%, 77%);
        }

        .profile-title {
          margin-bottom: 20px;
          font-weight: 600;
          color: black;
          margin-top:-3vh;
          margin-bottom:1vh;
        }

        .card {
          border: none;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-top:1vh;
        }

        .profile-overview {
          text-align: left;
          font-weight: 600;
          margin-bottom: 10px;
          color:black;
        }

        hr {
          margin: 8px 0;
        }

        .info-row {
          display: grid;
          grid-template-columns: 200px 1fr;
          padding: 10px 0;
          border-bottom: 1px solid #ddd;
        }

        .profile-alert {
          position: fixed;
          top: 15px;
          left: 50%;
          transform: translateX(-50%);
          background: #ff4d4f;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 500;
          z-index: 1000;
          cursor: pointer;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }

        .modal-box {
          background: white;
          padding: 20px;
          border-radius: 10px;
          width: 400px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .modal-box input, .modal-box select {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
        }

        .modal-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }

        .profile-img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #ddd;
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

            <div className="col-md-4">
              <div className="card p-3 text-center">

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