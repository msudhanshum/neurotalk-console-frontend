import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URLS } from "../api/apiConstants";

const EditCompany = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading,setLoading] = useState(false);

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
  });

  /* ================= FETCH DATA ================= */

  const fetchCompany = async () => {
    try {

      const res = await axios.get(
  `${API_URLS.COMPANY.DETAILS}/${id}`
);

      setForm(res.data.data);

    } catch {
      Swal.fire("Error","Company load failed","error");
    }
  };

  useEffect(()=>{
    fetchCompany();
  },[]);

  /* ================= CHANGE ================= */

  const handleChange = (e) => {

    const { name,value,files } = e.target;

    if(name==="panImage"){
      setForm({...form,panImage:files[0]});
    }else{
      setForm({...form,[name]:value});
    }
  };

  /* ================= UPDATE ================= */

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{

      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach(key=>{
        if(form[key]!==null){
          formData.append(key,form[key]);
        }
      });

      const res = await axios.put(
        `${API_URLS.COMPANY.UPDATE}/${id}`, 
        formData,
        {
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }
      );

      Swal.fire("Success",res.data.message,"success");

      navigate("/dashboard/company-list");

    }catch(error){

      Swal.fire(
        "Error",
        error.response?.data?.message || "Update failed",
        "error"
      );
    }
    finally{
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="container mt-4">

      <h3 className="mb-3">Edit Company</h3>

      <div className="card shadow-sm">
        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

              <Input label="Company Name" name="companyName" form={form} handleChange={handleChange}/>
              <Input label="Contact Person" name="contactPerson" form={form} handleChange={handleChange}/>
              <Input label="Designation" name="designation" form={form} handleChange={handleChange}/>
              <Input label="Mobile" name="contactMobile" form={form} handleChange={handleChange}/>
              <Input label="Email" name="email" form={form} handleChange={handleChange}/>
              <Input label="Phone" name="phoneNumber" form={form} handleChange={handleChange}/>
              <Input label="Address" name="companyAddress" form={form} handleChange={handleChange}/>
              <Input label="CIN" name="cin" form={form} handleChange={handleChange}/>
              <Input label="GSTIN" name="gstin" form={form} handleChange={handleChange}/>
              <Input label="PAN Number" name="panNumber" form={form} handleChange={handleChange}/>

              {/* IMAGE */}
              <div className="col-md-4 mb-3">
                <label>PAN Image</label>
                <input
                  type="file"
                  name="panImage"
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

/* ================= REUSABLE INPUT ================= */

const Input = ({ label,name,form,handleChange }) => (
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