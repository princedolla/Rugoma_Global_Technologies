import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!form.username) {
      newErrors.username = "Username is required";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // LOGIN FUNCTION
  const login = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const res = await API.post("/auth/login", form);

    localStorage.setItem("token", res.data.token);

    navigate("/dashboard");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={login}
        className="bg-white p-8 rounded-xl shadow-lg w-[400px]"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Login
        </h1>

        {/* USERNAME */}
        <input
          name="username"
          type="text"
          placeholder="Username"
          className="w-full border p-3 rounded-lg mb-1"
          onChange={handleChange}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mb-3">{errors.username}</p>
        )}

        {/* PASSWORD */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-1"
          onChange={handleChange}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-3">{errors.password}</p>
        )}

        {/* BUTTON */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white w-full p-3 rounded-lg">
          Login
        </button>

        {/* LINK */}
        <p className="mt-4 text-center">
          No account?
          <Link to="/register" className="text-blue-600 ml-2">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
