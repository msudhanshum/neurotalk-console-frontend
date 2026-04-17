import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import "../assets/css/Login.css";
import { API_ENDPOINTS } from "../api/apiConstants";
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
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
      const res = await axios.post(API_ENDPOINTS.AUTH.LOGIN, {
        email: formData.email,
        password: formData.password,
      });

      showToast("success", res.data.message);

      const storage = formData.remember ? localStorage : sessionStorage;

      storage.setItem("token", res.data.token);
      storage.setItem("user", JSON.stringify(res.data.user));
      storage.setItem("company", JSON.stringify(res.data.company));

      navigate("/dashboard");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      const message = err.response?.data?.message || "Login failed";

      showToast("error", message);

      setLockTime(5);
    }

    setLoading(false);
  };

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
    <div className="login-page">
      <div className="login-shell">
        <aside className="login-brand">
          <div>
            <div className="brand-chip">Neurotalk Console</div>
            <h1 className="brand-title">Welcome to Neurotalk Console.</h1>
            <p className="brand-copy">
              Access your control center for user management, campaign insights,
              and conversation intelligence in one place.
            </p>
          </div>

          <ul className="brand-points">
            <li>
              <i className="fas fa-check-circle" aria-hidden="true" />
              Role-based access and secure sessions
            </li>
            <li>
              <i className="fas fa-check-circle" aria-hidden="true" />
              Real-time performance visibility
            </li>
            <li>
              <i className="fas fa-check-circle" aria-hidden="true" />
              Faster day-to-day admin operations
            </li>
          </ul>
        </aside>

        <section className="login-panel">
          <div className="panel-inner">
            <h2 className="login-heading">Sign in</h2>
            <p className="login-subheading">Use your admin credentials to continue.</p>

            <form onSubmit={handleLogin}>
              <div className="field">
                <label htmlFor="email" className="field-label">
                  Email Address
                </label>
                <input
                  id="email"
                  className="field-input"
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="password" className="field-label">
                  Password
                </label>
                <div className="password-wrap">
                  <input
                    id="password"
                    className="field-input"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-pass"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <i
                      className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>

              <div className="remember-row">
                <input
                  id="remember"
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <label htmlFor="remember">Remember this device</label>
              </div>

              {lockTime > 0 && (
                <div className="lock-warning">Too many attempts. Try again in {lockTime}s.</div>
              )}

              <button className="login-button" type="submit" disabled={loading || lockTime > 0}>
                {loading ? "Signing in..." : "Access Dashboard"}
              </button>
            </form>

            <p className="tiny-note">Protected by secure authentication and session controls.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
