 import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

type FormDataType = {
  email: string;
  password: string;
  remember: boolean;
};

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [lockTime, setLockTime] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const showToast = (
    type: "success" | "error" | "info" | "warning",
    message: string
  ) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (lockTime > 0) return;

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      showToast("success", res.data.message);

      const storage = formData.remember ? localStorage : sessionStorage;

      storage.setItem("token", res.data.token);
      storage.setItem("user", JSON.stringify(res.data.user));
      storage.setItem("company", JSON.stringify(res.data.company));

      navigate("/dashboard");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      const message =
        err.response?.data?.message || "Login failed";

      showToast("error", message);

      setLockTime(5);
    }

    setLoading(false);
  };

  // lock timer
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
        }

        .login-card input{
          width:100%;
          padding:12px;
          margin-bottom:15px;
          border:1px solid #ddd;
          border-radius:6px;
        }

        .login-card button{
          width:100%;
          padding:12px;
          background:#4a6cf7;
          border:none;
          color:white;
          border-radius:6px;
          cursor:pointer;
        }

        .login-card button:disabled{
          background:#999;
        }

        .remember-row{
          display:flex;
          align-items:center;
          margin-bottom:15px;
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
          text-align:center;
        }
      `}</style>

      <div className="login-wrapper">
        <div className="login-card">
          <h2>Admin Login</h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
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
                Try again in {lockTime}s
              </div>
            )}

            <button type="submit" disabled={loading || lockTime > 0}>
              {loading ? "Logging..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;