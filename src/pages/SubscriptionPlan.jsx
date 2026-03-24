import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URLS } from "../api/apiConstants";

const SubscriptionPlan = () => {

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    plan_name: "",
    description: "",
    short_description: "",
    price: "",
    price_per_min: "",
  });

  const [editId, setEditId] = useState(null);

  const getToken = () =>
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  /* ================= FETCH ================= */

  const fetchPlans = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_URLS.SUBSCRIPTION.LIST, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });

      setPlans(res.data.plans || []);

    } catch {
      Swal.fire("Error", "Failed to load plans", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editId) {
        await axios.put(
          `${API_URLS.SUBSCRIPTION.UPDATE}/${editId}`,
          form,
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );

        Swal.fire("Success", "Plan updated", "success");

      } else {
        await axios.post(
          API_URLS.SUBSCRIPTION.CREATE,
          form,
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );

        Swal.fire("Success", "Plan created", "success");
      }

      resetForm();
      fetchPlans();

    } catch (error) {
      Swal.fire("Error", error?.response?.data?.message || "Error", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */

  const handleEdit = (plan) => {
    setForm({
      plan_name: plan.plan_name,
      description: plan.description,
      short_description: plan.short_description,
      price: plan.price,
      price_per_min: plan.price_per_min,
    });

    setEditId(plan._id);
    window.scrollTo(0, 0);
  };

  /* ================= DELETE ================= */

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Plan?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (r) => {
      if (r.isConfirmed) {
        await axios.delete(`${API_URLS.SUBSCRIPTION.DELETE}/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        fetchPlans();
      }
    });
  };

  /* ================= STATUS ================= */

  const toggleStatus = async (plan) => {
    await axios.patch(
      `${API_URLS.SUBSCRIPTION.STATUS}/${plan._id}/status`,
      { status: !plan.status },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    fetchPlans();
  };

  /* ================= RESET ================= */

  const resetForm = () => {
    setForm({
      plan_name: "",
      description: "",
      short_description: "",
      price: "",
      price_per_min: "",
    });
    setEditId(null);
  };

  /* ================= UI ================= */

  return (
    <div className="container mt-4">

      <h3>{editId ? "Edit Plan" : "Create Plan"}</h3>

      {/* FORM */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">

          <form onSubmit={handleSubmit}>
            <div className="row">

              {/* PLAN NAME DROPDOWN */}
              <div className="col-md-4 mb-3">
                <label>Plan Name</label>
                <select
                  name="plan_name"
                  value={form.plan_name}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Select Plan</option>
                  <option value="Basic">Basic</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>

              <Input label="Price" name="price" value={form.price} onChange={handleChange}/>
              <Input label="Price / Min" name="price_per_min" value={form.price_per_min} onChange={handleChange}/>

              <div className="col-md-6 mb-3">
                <label>Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Short Description</label>
                <textarea
                  name="short_description"
                  value={form.short_description}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

            </div>

            {/* BUTTONS */}
            <div className="d-flex gap-3">
              <button className="btn btn-success px-4" disabled={loading}>
                {editId ? "Update" : "Create"}
              </button>

              {editId && (
                <button
                  type="button"
                  className="btn btn-secondary px-4"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>

          </form>

        </div>
      </div>

      {/* TABLE */}
      <div className="card shadow-sm">
        <div className="card-body">

          <table className="table table-bordered text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Status</th>
                <th className="text-center" style={{ width: "140px" }}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {plans.map((p, i) => (
                <tr key={p._id}>
                  <td>{i + 1}</td>
                  <td>{p.plan_name}</td>
                  <td>₹ {p.price}</td>

                  <td>
                    <span className={`badge ${p.status ? "bg-success" : "bg-danger"}`}>
                      {p.status ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* ✅ FIXED ACTION BUTTONS */}
                  <td className="text-center">
                    <div className="d-flex justify-content-center align-items-center gap-2">

                      <button
                        className="btn btn-sm btn-primary rounded-circle"
                        style={{ width: "34px", height: "34px" }}
                        onClick={() => handleEdit(p)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>

                      <button
                        className="btn btn-sm btn-warning rounded-circle"
                        style={{ width: "34px", height: "34px" }}
                        onClick={() => toggleStatus(p)}
                      >
                        <i className="fas fa-sync"></i>
                      </button>

                      <button
                        className="btn btn-sm btn-danger rounded-circle"
                        style={{ width: "34px", height: "34px" }}
                        onClick={() => handleDelete(p._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
};

/* ================= INPUT ================= */

const Input = ({ label, name, value, onChange }) => {

  const isNumber = name === "price" || name === "price_per_min";

  return (
    <div className="col-md-4 mb-3">
      <label>{label}</label>

      <input
        type={isNumber ? "number" : "text"}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
        onKeyDown={(e) => {
          if (isNumber && ["e", "E", "+", "-"].includes(e.key)) {
            e.preventDefault();
          }
        }}
      />
    </div>
  );
};

export default SubscriptionPlan;