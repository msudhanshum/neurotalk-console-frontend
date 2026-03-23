import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URLS } from "../api/apiConstants";

const CompanyStats = () => {

  const { id } = useParams();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = API_URLS.COMPANY.DETAILS;

  // ✅ GET TOKEN
  const getToken = () =>
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  /* ================= FETCH COMPANY ================= */

  const fetchCompany = async () => {
    try {

      const res = await axios.get(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      console.log("API RESPONSE:", res.data);

      // ✅ FIXED RESPONSE
      setCompany(res.data.company);

    } catch (error) {
      console.log("ERROR:", error.response);
      Swal.fire("Error", "Company not found", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [id]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h5>Loading company data...</h5>
      </div>
    );
  }

  if (!company) {
    return <h4 className="text-center mt-5">Company Not Found</h4>;
  }

  return (
    <div className="container-fluid mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h3>
          <i className="fas fa-chart-line me-2 text-primary"></i>
          Company Usage Statistics
        </h3>

        <Link
          to="/dashboard/company-list"
          className="btn btn-secondary btn-sm"
        >
          <i className="fas fa-arrow-left me-2"></i>
          Back
        </Link>
      </div>

      {/* Company Info */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">

          <h5 className="text-primary mb-3">
            <i className="fas fa-building me-2"></i>
            {company.name}
          </h5>

          <div className="row">

            <div className="col-md-4 mb-2">
              <strong>Contact :</strong> {company.contactPerson}
            </div>

            <div className="col-md-4 mb-2">
              <strong>Email :</strong> {company.email}
            </div>

            <div className="col-md-4 mb-2">
              <strong>Plan :</strong> {company.subscriptionPlan}
            </div>

            <div className="col-md-4 mb-2">
              <strong>Mobile :</strong> {company.mobile}
            </div>

            <div className="col-md-4 mb-2">
              <strong>Phone :</strong> {company.phone}
            </div>

            <div className="col-md-4 mb-2">
              <strong>Status :</strong>
              <span
                className={`badge ms-2 ${
                  company.status === "Active"
                    ? "bg-success"
                    : "bg-danger"
                }`}
              >
                {company.status}
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* Stats Cards */}
      <div className="row">

        <StatCard
          icon="fa-bullhorn"
          title="Total Campaigns"
          value={company.totalCampaigns || 0}
          color="primary"
        />

        <StatCard
          icon="fa-play-circle"
          title="Running Campaigns"
          value={company.runningCampaigns || 0}
          color="success"
        />

        <StatCard
          icon="fa-phone"
          title="Pending Calls"
          value={company.pendingCalls || 0}
          color="danger"
        />

      </div>

      {/* Details Table */}
      <div className="card shadow-sm mt-4">
        <div className="card-header">
          Company Details
        </div>

        <div className="table-responsive">
          <table className="table table-bordered mb-0">
            <tbody>

              <Row label="Company Name" value={company.name}/>
              <Row label="Contact Person" value={company.contactPerson}/>
              <Row label="Email" value={company.email}/>
              <Row label="Mobile" value={company.mobile}/>
              <Row label="Phone" value={company.phone}/>
              <Row label="Plan" value={company.subscriptionPlan}/>
              <Row
                label="Status"
                value={
                  <span className={`badge ${
                    company.status === "Active"
                      ? "bg-success"
                      : "bg-danger"
                  }`}>
                    {company.status}
                  </span>
                }
              />

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const StatCard = ({ icon, title, value, color }) => (
  <div className="col-lg-4 col-md-6 col-12 mb-3">
    <div className="card shadow border-0 text-center h-100">
      <div className="card-body">
        <i className={`fas ${icon} fa-2x text-${color} mb-2`}></i>
        <h6>{title}</h6>
        <h2 className={`text-${color}`}>{value}</h2>
      </div>
    </div>
  </div>
);

const Row = ({ label, value }) => (
  <tr>
    <th width="220">{label}</th>
    <td>{value}</td>
  </tr>
);

export default CompanyStats;