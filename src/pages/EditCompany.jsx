import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URLS } from "../api/apiConstants";

const EditCompany = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    contactPerson: "",
    designation: "",
    mobile: "",
    address: "",
    CIN: "",
    GSTIN: "",
    PANNumber: "",
    PANImage: null,
    email: "",
    phone: "",
    subscriptionPlan: "",
    status: "Active"
  });

  /* ================= FETCH COMPANY ================= */

  const fetchCompany = async () => {
    try {
      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

      const res = await axios.get(
        `${API_URLS.COMPANY.DETAILS}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // ✅ IMPORTANT FIX
      setForm(res.data.company);

    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Company load failed", "error");
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "PANImage") {
      setForm({ ...form, PANImage: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  /* ================= UPDATE ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value);
        }
      });

      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

      const res = await axios.put(
        `${API_URLS.COMPANY.UPDATE}/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      Swal.fire("Success", res.data.message, "success");

      navigate("/dashboard/company-list");

    } catch (error) {
      console.log(error);

      Swal.fire(
        "Error",
        error.response?.data?.message || "Update failed",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="container mt-4">

      <h3>Edit Company</h3>

      <div className="card shadow">
        <div className="card-body">

          <form onSubmit={handleSubmit}>
            <div className="row">

              <Input label="Company Name" name="name" form={form} handleChange={handleChange}/>
              <Input label="Contact Person" name="contactPerson" form={form} handleChange={handleChange}/>
              <Input label="Designation" name="designation" form={form} handleChange={handleChange}/>
              <Input label="Mobile" name="mobile" form={form} handleChange={handleChange}/>
              <Input label="Email" name="email" form={form} handleChange={handleChange}/>
              <Input label="Phone" name="phone" form={form} handleChange={handleChange}/>
              <Input label="Address" name="address" form={form} handleChange={handleChange}/>
              <Input label="CIN" name="CIN" form={form} handleChange={handleChange}/>
              <Input label="GSTIN" name="GSTIN" form={form} handleChange={handleChange}/>
              <Input label="PAN Number" name="PANNumber" form={form} handleChange={handleChange}/>

              {/* IMAGE */}
              <div className="col-md-4 mb-3">
  <label>PAN Image</label>

  {/* ✅ SHOW EXISTING IMAGE */}
  {form.PANImage && typeof form.PANImage === "string" && (
    <div className="mb-2">
      <img
        src={`http://localhost:5000/${form.PANImage}`}
        alt="PAN"
        style={{ width: "100%", height: "120px", objectFit: "cover" }}
      />
    </div>
  )}

  {/* ✅ UPLOAD NEW IMAGE */}
  <input
    type="file"
    name="PANImage"
    onChange={handleChange}
    className="form-control"
  />
</div>

              {/* PLAN */}
              <div className="col-md-4 mb-3">
                <label>Plan</label>
                <select
                  name="subscriptionPlan"
                  value={form.subscriptionPlan}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Select</option>
                  <option>Basic</option>
                  <option>Standard</option>
                  <option>Premium</option>
                </select>
              </div>

              {/* STATUS */}
              <div className="col-md-4 mb-3">
                <label>Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option>Active</option>
                  <option>Suspended</option>
                </select>
              </div>

            </div>

            <button className="btn btn-success" disabled={loading}>
              {loading ? "Updating..." : "Update Company"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

/* ================= INPUT ================= */

const Input = ({ label, name, form, handleChange }) => (
  <div className="col-md-4 mb-3">
    <label>{label}</label>
    <input
      name={name}
      value={form[name] || ""}
      onChange={handleChange}
      className="form-control"
    />
  </div>
);

export default EditCompany;