
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { getAttend, giveattendance } from "../api/api";
const Dasboard = () => {
 const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const getStatus = async () => {
    try {
      const data = await getAttend();
      console.log(data)
      setStatus(data);
    } catch (error) {
      alert("Session expired, please login again");
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  const handlePunch = async (type) => {
    try {
      console.log("hiiiii")
        const res = await giveattendance(type);
        alert(res.message || `${type} successful`);
        getStatus();
      
    } catch (error) {
      alert("Punch failed");
    }
  };
    const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    navigate("/"); // redirect to login
  };


   if (!status) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex flex-col items-center pt-10 animate-bg-fade">
      <div className=" w-full flex justify-around  ">
        <h1 className="text-3xl font-bold mb-5">Dashboard</h1>
        <div className=" flex gap-3"> 
          <button onClick={handleLogout} className=" border p-2 rounded-4xl bg-blue-600 text-black ">
          LogOut
        </button>
         <button className=" border p-2 rounded-4xl bg-blue-600 text-black "> <Link to="/profile">Profile</Link> </button>
        </div>
      </div>

      <div className="bg-white shadow-2xl p-8 w-96 text-center rounded-2xl transform transition duration-700 animate-fade-in">
        <p><b>Name: </b>{status.name}</p>
        
        <p><b>Punched In:</b> {status?.in_time || "N/A"}</p>
        <p><b>Punched Out:</b> {status?.out_time || "N/A"}</p>
        <p><b>Worked Hours:</b> {status?.worked_hours || "N/A"}</p>

        <div className="mt-4 flex gap-3 justify-center">
          <button
            onClick={() => handlePunch("punch-in")}
            disabled={status.punched_in}
            className={`px-4 py-2 rounded ${status.punched_in ? "bg-gray-400" : "bg-green-500 text-white"}`}
          >
            Punch In
          </button>
          <button
            onClick={() => handlePunch("punch-out")}
            disabled={status.punched_out}
            className={`px-4 py-2 rounded ${status.punched_out ? "bg-gray-400" : "bg-red-500 text-white"}`}
          >
            Punch Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dasboard