import React, { useState, useRef } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { API_URLS } from "../api/apiConstants";

const AddCompany = () => {

const fileRef = useRef(); // ✅ for file reset

const [form,setForm] = useState({
  name:"",
  contactPerson:"",
  designation:"",
  mobile:"",
  address:"",
  CIN:"",
  GSTIN:"",
  PANNumber:"",
  PANImage:null,
  email:"",
  phone:"",
  subscriptionPlan:"",
  status:"Active"
})

const [errors,setErrors] = useState({})
const [loading,setLoading] = useState(false)

/* ================= HANDLE CHANGE ================= */

const handleChange=(e)=>{
  const {name,value,files} = e.target

  if(name==="PANImage"){
    setForm({...form,PANImage:files[0]})
  }else{
    setForm({...form,[name]:value})
  }
}

/* ================= VALIDATION ================= */

const validate = () => {
  let err = {};

  if (!form.name) err.name = "Required";
  if (!form.contactPerson) err.contactPerson = "Required";
  if (!form.designation) err.designation = "Required";
  if (!form.mobile) err.mobile = "Required";
  if (!form.address) err.address = "Required";
  if (!form.email) err.email = "Required";
  if (!form.phone) err.phone = "Required";
  if (!form.CIN) err.CIN = "Required";
  if (!form.GSTIN) err.GSTIN = "Required";
  if (!form.PANNumber) err.PANNumber = "Required";
  if (!form.subscriptionPlan) err.subscriptionPlan = "Required";

  setErrors(err);
  return Object.keys(err).length === 0;
};

/* ================= SUBMIT ================= */

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    setLoading(true);

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    const res = await axios.post(
      API_URLS.COMPANY.CREATE_COMPANY,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // ✅ SUCCESS MESSAGE
    Swal.fire({
      icon: "success",
      title: "Company Created",
      text: res.data.message,
      timer: 1500,
      showConfirmButton: false
    });

    // ✅ RESET FORM
    setForm({
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

    // ✅ RESET FILE INPUT
    if (fileRef.current) {
      fileRef.current.value = "";
    }

  } catch (error) {
    console.log("ADD ERROR:", error.response);

    Swal.fire(
      "Error",
      error?.response?.data?.message || "Server Error",
      "error"
    );
  } finally {
    setLoading(false);
  }
};

/* ================= UI ================= */

return (
<div className="container mt-4">

<h3>Add Company</h3>

<div className="card shadow">
<div className="card-body">

<form onSubmit={handleSubmit}>
<div className="row">

{/* Company */}
<div className="col-md-4 mb-3">
<label>Company Name</label>
<input name="name" value={form.name} onChange={handleChange} className="form-control"/>
</div>

{/* Contact Person */}
<div className="col-md-4 mb-3">
<label>Contact Person</label>
<input name="contactPerson" value={form.contactPerson} onChange={handleChange} className="form-control"/>
</div>

{/* Designation */}
<div className="col-md-4 mb-3">
<label>Designation</label>
<input name="designation" value={form.designation} onChange={handleChange} className="form-control"/>
</div>

{/* Mobile */}
<div className="col-md-4 mb-3">
<label>Mobile</label>
<input name="mobile" value={form.mobile} onChange={handleChange} className="form-control"/>
</div>

{/* Email */}
<div className="col-md-4 mb-3">
<label>Email</label>
<input name="email" value={form.email} onChange={handleChange} className="form-control"/>
</div>

{/* Phone */}
<div className="col-md-4 mb-3">
<label>Phone</label>
<input name="phone" value={form.phone} onChange={handleChange} className="form-control"/>
</div>

{/* Address */}
<div className="col-md-6 mb-3">
<label>Company Address</label>
<input name="address" value={form.address} onChange={handleChange} className="form-control"/>
</div>

{/* CIN */}
<div className="col-md-3 mb-3">
<label>CIN</label>
<input name="CIN" value={form.CIN} onChange={handleChange} className="form-control"/>
</div>

{/* GSTIN */}
<div className="col-md-3 mb-3">
<label>GSTIN</label>
<input name="GSTIN" value={form.GSTIN} onChange={handleChange} className="form-control"/>
</div>

{/* PAN */}
<div className="col-md-4 mb-3">
<label>PAN Number</label>
<input name="PANNumber" value={form.PANNumber} onChange={handleChange} className="form-control"/>
</div>

{/* PAN Image */}
<div className="col-md-4 mb-3">
<label>PAN Image</label>
<input
  type="file"
  name="PANImage"
  ref={fileRef}
  onChange={handleChange}
  className="form-control"
/>
</div>

{/* Plan */}
<div className="col-md-4 mb-3">
<label>Subscription Plan</label>
<select name="subscriptionPlan" value={form.subscriptionPlan} onChange={handleChange} className="form-control">
<option value="">Select Plan</option>
<option value="Basic">Basic</option>
<option value="Standard">Standard</option>
<option value="Premium">Premium</option>
</select>
</div>

{/* Status */}
<div className="col-md-4 mb-3">
<label>Status</label>
<select name="status" value={form.status} onChange={handleChange} className="form-control">
<option>Active</option>
<option>Suspended</option>
</select>
</div>

</div>

<button className="btn btn-success" disabled={loading}>
{loading ? "Creating..." : "Create Company"}
</button>

</form>

</div>
</div>
</div>
)
}

export default AddCompany;