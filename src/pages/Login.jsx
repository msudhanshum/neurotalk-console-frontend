import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:5000/api/v1/auth/login";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  });

  const [loading, setLoading] = useState(false);
  const [lockTime, setLockTime] = useState(0);

  /*
  INPUT CHANGE
  */

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

  };

  /*
  SWEET ALERT TOAST
  */

  const showToast = (type, message) => {

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 3000
    });

  };

  /*
  LOGIN FUNCTION
  */

  const handleLogin = async (e) => {

    e.preventDefault();

    if (lockTime > 0) return;

    setLoading(true);

    try {

      const res = await axios.post(API_URL, {
        email: formData.email,
        password: formData.password
      });

      const data = res.data;

      showToast("success", data.message || "Login successful");

      /*
      STORE TOKEN
      */

      const storage = formData.remember ? localStorage : sessionStorage;

      storage.setItem("token", data.token);
      storage.setItem("refreshToken", data.refreshToken);
      storage.setItem("user", JSON.stringify(data.user));

      /*
      REDIRECT
      */

      navigate("/dashboard", { replace: true });

    } catch (error) {

      if (error.response) {

        const message = error.response.data.message;

        showToast("error", message);

        /*
        ACCOUNT BLOCK CHECK
        */

        if (error.response.data.retryAfter) {

          setLockTime(error.response.data.retryAfter);

        } else {

          /*
          fallback: message se seconds extract
          */

          const match = message.match(/\d+/);

          if (match && message.toLowerCase().includes("block")) {

            setLockTime(parseInt(match[0]));

          }

        }

      } else {

        showToast("error", "Server not responding");

      }

    }

    setLoading(false);

  };

  /*
  LOCK COUNTDOWN
  */

  useEffect(() => {

    if (lockTime <= 0) return;

    const timer = setInterval(() => {

      setLockTime((prev) => {

        if (prev <= 1) {

          clearInterval(timer);
          return 0;

        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, [lockTime]);


  return (
    <>
<style>{`

.login-wrapper{
height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:#f4f6f9;
font-family:Arial;
}

.login-card{
width:100%;
max-width:420px;
background:white;
padding:40px;
border-radius:10px;
box-shadow:0 10px 25px rgba(0,0,0,0.1);
}

.login-card h2{
text-align:center;
margin-bottom:25px;
font-weight:600;
}

.login-card input{
width:100%;
padding:12px;
margin-bottom:15px;
border:1px solid #ddd;
border-radius:6px;
font-size:14px;
}

.login-card input:focus{
outline:none;
border-color:#4a6cf7;
}

.login-card button{
width:100%;
padding:12px;
background:#4a6cf7;
border:none;
color:white;
border-radius:6px;
font-weight:600;
cursor:pointer;
}

.login-card button:disabled{
background:#999;
cursor:not-allowed;
}

.remember-row{
display:flex;
align-items:center;
margin-bottom:15px;
font-size:14px;
}

.remember-row input{
width:auto;
margin-right:8px;
}

.lock-warning{
background:#fff3cd;
padding:10px;
border-radius:5px;
margin-bottom:10px;
font-size:14px;
text-align:center;
}

@media(max-width:500px){

.login-card{
margin:20px;
padding:25px;
}

}

`}</style>

<div className="login-wrapper">

<div className="login-card">

<h2>Admin Login</h2>

<form onSubmit={handleLogin}>

<input
type="email"
name="email"
placeholder="Email address"
value={formData.email}
onChange={handleChange}
required
/>

<input
type="password"
name="password"
placeholder="Password"
value={formData.password}
onChange={handleChange}
required
/>

<div className="remember-row">

<input
type="checkbox"
name="remember"
checked={formData.remember}
onChange={handleChange}
/>

<label>Remember Me</label>

</div>

{lockTime > 0 && (
<div className="lock-warning">
Too many failed attempts. Try again in <b>{lockTime}</b> seconds
</div>
)}

<button
type="submit"
disabled={loading || lockTime > 0}
>

{lockTime > 0
? `Locked (${lockTime}s)`
: loading
? "Logging in..."
: "Login"}

</button>

</form>

</div>

</div>

</>
  );

};

export default Login;