import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { register } from '../api/api';
const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", contact: "" });
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
      const data = await register(form);
      
      if (data.status) {
        navigate("/");
      }
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-bg">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow  w-80 rounded-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} 
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2
         focus:ring-purple-400 focus:border-transparent transition duration-300" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} 
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 
        focus:ring-purple-400 focus:border-transparent transition duration-300" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} 
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2
         focus:ring-purple-400 focus:border-transparent transition duration-300" />
         <p className=' text-sm text-gray-500 mt-1'>Password should be more then 6 charecter</p>
        <input type="text" name="contact" placeholder="Contact" onChange={handleChange} 
        className="w-full border border-gray-300 mt-1 p-3 rounded-lg focus:outline-none focus:ring-2
         focus:ring-purple-400 focus:border-transparent transition duration-300" />
        <button 
        className="w-full bg-purple-500 hover:bg-purple-600
         text-white py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105">Register</button>
      </form>
    </div>
  );
}

export default Register