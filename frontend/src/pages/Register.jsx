import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({...form, [name]: value,
    });
  };
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

  const register = async (e) => {
    e.preventDefault();

    if (!validate()) return;
    await API.post("/auth/register", form);
    alert("Registered Successfully");
    navigate("/");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form  onSubmit={register}  className="bg-white p-8 rounded-xl shadow-lg w-[400px]" >
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600"> Register
        </h1>
        <input name="username" type="text" placeholder="Username" className="w-full border p-3 rounded-lg mb-1" value={form.username} onChange={handleChange}/>
        <p className="text-red-500 text-sm mb-3">{errors.username}</p>
        <input name="password" type="password" placeholder="Password" className="w-full border p-3 rounded-lg mb-1" value={form.password}onChange={handleChange}/>
              <p className="text-red-500 text-sm mb-3">{errors.password}</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white w-full p-3 rounded-lg"> Register</button>
        <p className="mt-4 text-center">
          Already have an account?
          <Link to="/" className="text-blue-600 ml-2">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
