// Frontend (e.g., App.js)

import { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

// --- DEPLOYMENT CHANGES START HERE ---

// 1. Production URL: Use an environment variable for the backend API URL.
// When deployed (e.g., on Vercel/Render Static Site), you will set REACT_APP_API_URL to your LIVE Backend URL (e.g., https://my-backend-app.onrender.com).
// For local testing, it defaults to localhost.
// NOTE: If using Vite, this variable should be named `VITE_REACT_APP_API_URL`.
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Changed to 5000 to match the backend default

// --- DEPLOYMENT CHANGES END HERE ---


function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  function handleUser(evt) {
    setUser(evt.target.value);
  }

  function handlePass(evt) {
    setPass(evt.target.value);
  }

  function check(){
    // Use the API_URL constant here
    var loginDetails = axios.post(`${API_URL}/login`, { // <--- Changed API endpoint
      "username": user,
      "password": pass
    });
    
    loginDetails.then(function(data){
      if(data.data === true){
        navigate("/success");
      } else {
        navigate("/fail");
      }
    }).catch(function(error) {
         // Added error handling for better debugging
         console.error("Login request failed:", error);
         navigate("/fail");
     });
  }

  return (
    // ... (rest of your component remains the same)
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      {/* Login Card Container */}
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          🔐 Log In
        </h2>
        
        <div className="space-y-4">
          
          {/* Username Input */}
          <input
            onChange={handleUser}
            value={user}
            name="username"
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
          />

          {/* Password Input */}
          <input
            onChange={handlePass}
            value={pass}
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
          />
          
          {/* Login Button */}
          <button 
            onClick={check}
            className="w-full bg-indigo-600 text-white py-2 mt-4 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;