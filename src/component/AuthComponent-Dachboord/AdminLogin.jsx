import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./Login.css";
import axios from "axios";
import axiosInstance from "../../util/interceptor";
import Swal from "sweetalert2";

function AdminLogin() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const response = await axiosInstance.post(
        "dashboard/login",
        {
          mobile: phone,
          password:password,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const token = response.data?.token;
      if (token) {
        localStorage.setItem("authToken", token); // 🔐 Store token for interceptor use
      } else {
        console.warn("No token received from response");
      }
      Swal.fire({
        title: "تم تسجيل الدخول بنجاح",
        icon: "success",
        confirmButtonText: "موافق",
      });
      localStorage.setItem("isAuthenticated", "true");
  setTimeout(() => {
    navigate("/admin-dashboard");
  }, 900);

    } catch (error) {
      console.error("Login Error:", error);
        Swal.fire("خطأ!", "حدث خطأ . يرجى المحاولة مرة أخرى", "error");
      
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-4 login_header">
          تسجيل الدخول للوحة التحكم
        </h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">رقم الجوال السعودي</label>
            <input
              type="tel"
              className="form-control"
              placeholder="9665xxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">كلمة المرور</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button  className="btn btn-primary w-100">
            دخول
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
