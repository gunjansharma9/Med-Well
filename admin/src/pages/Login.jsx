import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ Use navigate for redirection

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });

        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          toast.success("Admin Login Successful!", { autoClose: 2000 });

          // ✅ Redirect Admin to Dashboard
          navigate('/admin-dashboard');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password });

        if (data.success) {
          localStorage.setItem('dToken', data.token);
          setDToken(data.token);
          toast.success("Doctor Login Successful!", { autoClose: 2000 });

          // ✅ Redirect Doctor to Dashboard
          navigate('/doctor-dashboard');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form onSubmit={onSubmitHandler} className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-md p-8 space-y-6 border border-gray-100">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
              <svg 
                className="w-10 h-10 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              <span className="text-blue-600">{state}</span> Login
            </h1>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Action Section */}
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Sign In
          </button>

          {/* Toggle Link */}
          <p className="text-center text-gray-600 text-sm">
            {state === 'Admin' ? (
              <span>
                Doctor Login? {' '}
                <button
                  type="button"
                  onClick={() => setState('Doctor')}
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  Switch to Doctor
                </button>
              </span>
            ) : (
              <span>
                Admin Login? {' '}
                <button
                  type="button"
                  onClick={() => setState('Admin')}
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  Switch to Admin
                </button>
              </span>
            )}
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login