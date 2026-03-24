import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URLS } from "../api/apiConstants";

const CreateLogin = () => {

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const API_URL = API_URLS.COMPANY.LIST;
  const LIMIT = 10;
  const page = 1;

  const getToken = () =>
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  // ✅ Fetch companies
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get(
        `${API_URL}?page=${page}&limit=${LIMIT}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const companyData =
        res.data.companies || res.data.data || [];

      setCompanies(companyData);

    } catch (err) {
      console.error("Error fetching companies:", err);
      setCompanies([]);
    }
  };

  // ✅ Password validation
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;

    return regex.test(password);
  };

  // ✅ Handle company select
  const handleSelect = (e) => {
    const id = e.target.value;
    const company = companies.find((c) => c._id === id);
    setSelectedCompany(company);
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!selectedCompany) {
      newErrors.company = "Please select company";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      newErrors.password =
        "Password must be 8-10 chars, include uppercase, lowercase, number & special char";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);

      await axios.post(
  API_URLS.COMPANY.CREATE_LOGIN,
  {
    companyId: selectedCompany._id,
    password: password,
  },
  {
    headers: {
      Authorization: `Bearer ${getToken()}`, // if backend uses auth
    },
  }
);

      alert("Login created successfully");

      setPassword("");
      setConfirmPassword("");
      setSelectedCompany(null);
      setErrors({});

    } catch (err) {
      console.error(err);
      alert("Error creating login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="main-content d-flex justify-content-center align-items-center"
      style={{ minHeight: "70vh" }}
    >
      <div
        className="card shadow-lg border-0"
        style={{ width: "500px", borderRadius: "12px" }}
      >
        <div className="card-header bg-white border-0 text-center d-flex justify-content-center align-items-center">
          <h4 className="fw-bold">Create Company Login</h4>
        </div>

        <div className="card-body px-4 py-4">
          <form onSubmit={handleSubmit}>

            {/* Company Dropdown */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Company</label>
              <select
                className="form-control"
                onChange={handleSelect}
                value={selectedCompany?._id || ""}
              >
                <option value="">Select Company</option>
                {Array.isArray(companies) &&
                  companies.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="text"
                className="form-control bg-light"
                value={selectedCompany?.email || ""}
                disabled
              />
            </div>

            {/* Status */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Status</label>
              <input
                type="text"
                className="form-control bg-light"
                value={selectedCompany?.status || ""}
                disabled
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!selectedCompany}
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>

              {errors.password && (
                <small className="text-danger">
                  {errors.password}
                </small>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Confirm Password
              </label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={!selectedCompany}
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </span>
              </div>

              {errors.confirmPassword && (
                <small className="text-danger">
                  {errors.confirmPassword}
                </small>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={
                loading ||
                !selectedCompany ||
                !password ||
                !confirmPassword
              }
            >
              {loading ? "Creating..." : "Create Login"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateLogin;