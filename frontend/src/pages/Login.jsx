import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [mode, setMode] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = mode === 'Sign Up' ? '/api/user/register' : '/api/user/login';
      const payload = mode === 'Sign Up' ? { name, email, password } : { email, password };

      const { data } = await axios.post(`${backendUrl}${endpoint}`, payload);

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        toast.success(`${mode} successful!`);
      } else {
        toast.error(data.message || `${mode} failed`);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Something went wrong';
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    if (token) navigate('/');
  }, [token]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center justify-center">
        <div className="p-8 border rounded-xl shadow-lg w-[90%] max-w-md text-zinc-700 space-y-4">
          <h2 className="text-2xl font-bold">
            {mode === 'Sign Up' ? 'Create Account' : 'Login'}
          </h2>
          <p className="text-sm">
            Please {mode === 'Sign Up' ? 'register' : 'log in'} to continue
          </p>

          {mode === 'Sign Up' && (
            <div>
              <label className="block mb-1 text-sm">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-md text-base"
          >
            {mode === 'Sign Up' ? 'Register' : 'Login'}
          </button>

          <p className="text-sm">
            {mode === 'Sign Up' ? (
              <>
                Already have an account?{' '}
                <span
                  className="text-primary underline cursor-pointer"
                  onClick={() => setMode('Login')}
                >
                  Log in
                </span>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <span
                  className="text-primary underline cursor-pointer"
                  onClick={() => setMode('Sign Up')}
                >
                  Sign up
                </span>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
