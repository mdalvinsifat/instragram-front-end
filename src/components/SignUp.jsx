import React, { useState } from 'react';
import Image from '../../public/images/Instagram_icon.png';
import { Link } from 'react-router-dom';
import { LOGIN } from './Constent';
import toast from 'react-hot-toast';
import axios from 'axios';

const SignUp = () => {
  const [inputs, setInputs] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3000/auth/register', inputs, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.data.success) {
        toast.success('Account created successfully!');
        setInputs({ userName: '', email: '', password: '' });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-300 px-10 py-8 rounded-md shadow-lg">
          <div className="flex justify-center mb-6">
            <img src={Image} alt="Instagram" className="w-12" />
          </div>
          <p className="text-center text-gray-500 text-sm mb-6">
            Sign up to see photos and videos from your friends.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="userName"
              placeholder="User Name"
              value={inputs.userName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
              required
            />
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
              placeholder="Password"
              value={inputs.password}
              onChange={handleChange}
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
                  Creating...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>
          <p className="text-xs text-gray-400 text-center mt-4">
            By signing up, you agree to our Terms, Data Policy and Cookies Policy.
          </p>
        </div>

        <div className="bg-white border border-gray-300 mt-4 py-4 text-center rounded-md">
          <p className="text-sm">
            Already have an account?{' '}
            <Link to={LOGIN} className="text-blue-500 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
