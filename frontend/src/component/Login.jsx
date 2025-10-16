import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { login, register } from '../api/api';
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form)
      if (res.status) {
        localStorage.setItem("token", res.token);
        navigate("/dasbord");
      }
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-bg">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-2xl w-80">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <input type="text" name="email" placeholder="Username" onChange={handleChange} 
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2
         focus:ring-purple-400 focus:border-transparent transition duration-300" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} 
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2
         focus:ring-purple-400 focus:border-transparent transition duration-300" />
        <button className="w-full bg-purple-500 hover:bg-purple-600
         text-white py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105">Login</button>
        <div className=' text-center mt-4'>
                  <p>Create An Account?{" "}
                    <Link to="/register" className=' text-blue-950 hover:underline'>SignUp</Link>
                  </p>
                </div>
      </form>
    </div>
  );
}

export default Login