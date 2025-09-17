import React, { useState } from "react";
import bg from "../../../public/Login-background.jpg";
import logo from "../../../public/sweetpencilbdlogo.png";
import { FaHome, FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "admin login Successfully",
        timer: 1500,
      });

      setLoading(false);
      navigate("/dashboard");
      return response.data;
    } catch (err) {
      throw new Error(
        "Login failed: " + err.response?.data?.message || err.message
      );
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true);
      const userData = await signIn(email, password);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="bg-cover bg-center min-h-screen w-full"
    >
      <div className="w-full max-w-xl p-4 rounded-xl bg-white shadow-md mx-auto">
        <Link
          to="/"
          className="bg-yellow-500 rounded-full w-12 h-12 flex justify-center items-center"
        >
          <FaHome className="text-white text-xl" />
        </Link>
        <img src={logo} alt="Login" className="flex mx-auto h-36 w-36" />
        <h1 className="text-md md:text-2xl font-bold text-center uppercase">
          Log <span className="text-[#f57224]">in</span>
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-md border-2"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md border-2"
            />
            <div className="flex justify-end text-xs text-gray-600">
              <a href="#">Forgot Password?</a>
            </div>
          </div>
          <button
            disabled={loading}
            className="w-full flex justify-center items-center px-1 rounded-md py-3 bg-[#f57224]"
          >
            {loading ? (
              <FaSpinner className="animate-spin text-xl text-white mx-auto" />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
