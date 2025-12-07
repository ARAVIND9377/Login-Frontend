// App.jsx (Rewritten for Vite/Modern Build Tools)

import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

// --- API Configuration ---

// **FIXED:** Use import.meta.env (Vite standard) instead of process.env 
// The environment variable MUST be prefixed with VITE_ (e.g., VITE_API_URL) 
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// --- Main Component ---

function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMsg("Please enter both username and password.");
      return;
    }
    
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.post(`${API_URL}/login`, {
        username: username,
        password: password
      });

      if (response.data === true) {
        navigate("/success");
      } else {
        setErrorMsg("Login failed: Invalid credentials.");
        navigate("/fail");
      }
    } catch (error) {
      console.error("Login request failed:", error);
      
      if (error.request) {
        // Most likely cause of failure: Backend URL is wrong or CORS is blocking
        setErrorMsg(`Connection error. Is the backend running at ${API_URL}?`);
      } else {
        setErrorMsg("An unexpected error occurred during login.");
      }
      navigate("/fail");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // ... (rest of your JSX code)
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          🔐 Log In
        </h2>
        
        <div className="space-y-4">
          
          {/* Username Input */}
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            name="username"
            type="text"
            placeholder="Username"
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
          />

          {/* Password Input */}
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            type="password"
            placeholder="Password"
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
          />
          
          {/* Error Message Display */}
          {errorMsg && (
            <p className="text-sm text-red-600 font-medium">{errorMsg}</p>
          )}

          {/* Login Button */}
          <button 
            onClick={handleLogin}
            disabled={isLoading}
            className={`w-full text-white py-2 mt-4 rounded-lg font-semibold transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-opacity-50
              ${isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`
            }
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;