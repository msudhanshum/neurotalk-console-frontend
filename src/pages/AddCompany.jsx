import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const AddCompany = () => {

const [form,setForm] = useState({
  companyName:"",
  contactPerson:"",
  designation:"",
  contactMobile:"",
  companyAddress:"",
  cin:"",
  gstin:"",
  panNumber:"",
  panImage:null,
  email:"",
  phoneNumber:"",
  subscriptionPlan:"Basic",
  status:"Active"
})

const [errors,setErrors] = useState({})
const [loading,setLoading] = useState(false)

/* ================= HANDLE CHANGE ================= */

const handleChange=(e)=>{
  const {name,value,files} = e.target

  if(name==="panImage"){
    setForm({...form,panImage:files[0]})
  }else{
    setForm({...form,[name]:value})
  }
}

/* ================= VALIDATION ================= */

const validate=()=>{
  let err={}

  if(!form.companyName) err.companyName="Required"
  if(!form.contactPerson) err.contactPerson="Required"
  if(!form.designation) err.designation="Required"
  if(!form.contactMobile) err.contactMobile="Required"
  if(!form.companyAddress) err.companyAddress="Required"
  if(!form.email) err.email="Required"
  if(!form.panImage) err.panImage="Required"

  setErrors(err)
  return Object.keys(err).length===0
}

/* ================= SUBMIT ================= */

const handleSubmit=async(e)=>{
  e.preventDefault()

  if(!validate()) return

  try{
    setLoading(true)

    const formData = new FormData()

    // ✅ ALL FIELDS AUTO APPEND
    Object.entries(form).forEach(([key,value])=>{
      formData.append(key,value)
    })

    const res = await axios.post(
      "http://127.0.0.1:5000/api/v1/company/create",
      formData,
      {
        headers:{
          "Content-Type":"multipart/form-data"
        }
      }
    )

    Swal.fire("Success",res.data.message,"success")

  }catch(error){
    Swal.fire(
      "Error",
      error?.response?.data?.message || "Server Error",
      "error"
    )
  }
  finally{
    setLoading(false)
  }
}

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
<input name="companyName" value={form.companyName} onChange={handleChange} className="form-control"/>
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
<input name="contactMobile" value={form.contactMobile} onChange={handleChange} className="form-control"/>
</div>

{/* Email */}
<div className="col-md-4 mb-3">
<label>Email</label>
<input name="email" value={form.email} onChange={handleChange} className="form-control"/>
</div>

{/* Phone */}
<div className="col-md-4 mb-3">
<label>Phone</label>
<input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="form-control"/>
</div>

{/* Address */}
<div className="col-md-6 mb-3">
<label>Company Address</label>
<input name="companyAddress" value={form.companyAddress} onChange={handleChange} className="form-control"/>
</div>

{/* CIN */}
<div className="col-md-3 mb-3">
<label>CIN</label>
<input name="cin" value={form.cin} onChange={handleChange} className="form-control"/>
</div>

{/* GSTIN */}
<div className="col-md-3 mb-3">
<label>GSTIN</label>
<input name="gstin" value={form.gstin} onChange={handleChange} className="form-control"/>
</div>

{/* PAN */}
<div className="col-md-4 mb-3">
<label>PAN Number</label>
<input name="panNumber" value={form.panNumber} onChange={handleChange} className="form-control"/>
</div>

{/* PAN Image */}
<div className="col-md-4 mb-3">
<label>PAN Image</label>
<input type="file" name="panImage" onChange={handleChange} className="form-control"/>
</div>

{/* Plan */}
<div className="col-md-4 mb-3">
<label>Subscription Plan</label>
<select name="subscriptionPlan" value={form.subscriptionPlan} onChange={handleChange} className="form-control">
<option>Basic</option>
<option>Standard</option>
<option>Premium</option>
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

export default AddCompany