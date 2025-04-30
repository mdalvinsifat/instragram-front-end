import React, { useState } from 'react';
import Image from '../../public/images/Instagram_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { SIGNUP, URL } from './Constent';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmite = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${URL}/auth/login`, inputs, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.data.success) {
        toast.success('User login successful');
        // Optionally reset form or redirect
      }
      navigate("/")

      setInputs({
          email: '',
    password: ''
      })
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white border border-gray-300 px-10 py-8 rounded-md shadow-lg">
          <div className="flex justify-center mb-6">
            <img src={Image} alt="Instagram" className="w-12" />
          </div>
          <p className="text-center text-gray-500 text-sm mb-6">
            Login to see photos and videos from your friends.
          </p>
          <form className="space-y-4" onSubmit={handleSubmite}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={inputs.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
              required
            />
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 bg-blue-500 text-white font-semibold py-2 rounded transition text-sm ${
                loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
          <p className="text-xs text-gray-400 text-center mt-4">
            By logging in, you agree to our Terms, Data Policy and Cookies Policy.
          </p>
        </div>

        {/* Signup Prompt */}
        <div className="bg-white border border-gray-300 mt-4 py-4 text-center rounded-md">
          <p className="text-sm">
            Don’t have an account?{' '}
            <Link to={SIGNUP} className="text-blue-500 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
