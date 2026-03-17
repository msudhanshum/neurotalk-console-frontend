import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://127.0.0.1:5000/api/v1/company/list";
  const LIMIT = 10;

  /* ================= FETCH COMPANIES ================= */

  const fetchCompanies = async (page = 1) => {
    setLoading(true);

    try {
      const res = await axios.get(`${API_URL}?page=${page}&limit=${LIMIT}`);

      setCompanies(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Company list load failed", "error");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCompanies(currentPage);
  }, [currentPage]);

  /* ================= STATUS TOGGLE (UI ONLY) ================= */

 const toggleStatus = async (company) => {

  const newStatus =
    company.status === "Active"
      ? "Suspended"
      : "Active";

  Swal.fire({
    title: "Are you sure?",
    text: "Change company status?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes change it"
  }).then(async (result) => {

    if (result.isConfirmed) {

      try {

        await axios.patch(
          `http://127.0.0.1:5000/api/v1/company/change-status/${company._id}`,
          {
            status: newStatus   // ✅ BODY SEND HO RAHI HAI
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        // UI update
        setCompanies(prev =>
          prev.map(c =>
            c._id === company._id
              ? { ...c, status: newStatus }
              : c
          )
        );

        Swal.fire("Updated!", "Status updated", "success");

      } catch (err) {
        console.log("STATUS ERROR:", err.response);
        Swal.fire("Error", "Status update failed", "error");
      }
    }
  });
};

  /* ================= DELETE (UI ONLY) ================= */

  const deleteCompany = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this company?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://127.0.0.1:5000/api/v1/company/delete/${id}`,
          );

          Swal.fire("Deleted!", "Company removed", "success");

          // reload list
          fetchCompanies(currentPage);
        } catch (error) {
          Swal.fire("Error", "Delete failed", "error");
        }
      }
    });
  };

  /* ================= PAGINATION ================= */

  const handlePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    let pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => handlePage(i)}>
            {i}
          </button>
        </li>,
      );
    }

    return pages;
  };

  /* ================= UI ================= */

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Company List</h3>

      <div className="card shadow-sm">
        <div className="card-body">
          {/* ADD BUTTON */}
          <div className="d-flex justify-content-end mb-3">
            <Link to="/dashboard/add-company" className="btn btn-primary">
              <i className="fas fa-plus me-2"></i>
              Add Company
            </Link>
          </div>

          {/* TABLE */}
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>Contact Person</th>
                <th>Email</th>
                <th>Plan</th>
                <th>Status</th>
                <th width="180">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    Loading companies...
                  </td>
                </tr>
              ) : companies.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No Companies Found
                  </td>
                </tr>
              ) : (
                companies.map((c, index) => (
                  <tr key={c._id}>
                    {/* SERIAL NUMBER */}
                    <td>{(currentPage - 1) * LIMIT + index + 1}</td>

                    <td>{c.companyName}</td>
                    <td>{c.contactPerson}</td>
                    <td>{c.email}</td>
                    <td>{c.subscriptionPlan}</td>

                    <td>
                      <span
                        className={`badge ${
                          c.status === "Active" ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>

                    <td>
                      <div className="d-flex">
                        <Link
                          to={`/dashboard/edit-company/${c._id}`}
                          className="btn btn-sm btn-primary me-2"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>

                        <Link
                          to={`/dashboard/company-stats/${c._id}`}
                          className="btn btn-sm btn-info me-2"
                        >
                          <i className="fas fa-chart-bar"></i>
                        </Link>

                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => toggleStatus(c)}
                        >
                          <i className="fas fa-sync"></i>
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteCompany(c._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* PAGINATION RIGHT SIDE */}
          <nav className="d-flex justify-content-end mt-3">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePage(currentPage - 1)}
                >
                  Previous
                </button>
              </li>

              {renderPagination()}

              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePage(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
