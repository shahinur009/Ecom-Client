import React, { useState } from "react";
import bg from "../../../public/Login-background.jpg";
import logo from "../../../public/logo.png";
import { FaSpinner } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

function Register() {
  const { loading, setLoading } = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  // Register handler
  const onSubmit = (data) => {
    // console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      // console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          // create user entry in the database
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axios.post("http://localhost:5000/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              // console.log("user added to database");

              reset();
              Swal.fire({
                position: "top",
                icon: "success",
                title: "Sign up Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  return (
    <>
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="bg-cover bg-center min-h-screen w-full "
      >
        <div className="ww-full max-w-xl p-4 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800 shadow-md mx-auto">
          <img
            src={logo}
            alt="Login image"
            className="flex mx-auto h-36 w-36 md:h-44 md:w-44"
          />
          <h1 className="text-md md:text-2xl font-bold text-center uppercase">
            Regis<span className="text-[#f57224] ">Ter</span>
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate=""
            action=""
            className="space-y-3 md:space-y-6"
          >
            <div className="md:flex justify-center md:gap-5 gap-2">
              <div className="w-full">
                <div className="space-y-1 text-sm w-full">
                  <label
                    htmlFor="username"
                    className="block dark:text-gray-600"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    defaultValue=""
                    {...register("name", { required: true })}
                    name="name"
                    id="username"
                    placeholder="Username"
                    className="w-full p-2 md:px-4 md:py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 border-2 focus:dark:border-violet-600"
                  />
                  {errors.name && (
                    <span className="text-red-600">Name is required</span>
                  )}
                </div>
                <div className="space-y-1 text-sm w-full">
                  <label htmlFor="mobile" className="block dark:text-gray-600">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    pattern="[0-9]{11}"
                    defaultValue=""
                    {...register("mobile", { required: true })}
                    name="mobile"
                    id="mobile"
                    placeholder="Your Mobile"
                    className="w-full p-2 md:px-4 md:py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 border-2 focus:dark:border-violet-600"
                  />
                  {errors.mobile && (
                    <span className="text-red-600">
                      Phone Number is required
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full">
                <div className="space-y-1 text-sm w-full">
                  <label htmlFor="email" className="block dark:text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue=""
                    {...register("email", { required: true })}
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    className="w-full p-2 md:px-4 md:py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 border-2 focus:dark:border-violet-600"
                  />
                  {errors.email && (
                    <span className="text-red-600">
                      Phone Number is required
                    </span>
                  )}
                </div>
                <div className="space-y-1 text-sm w-full">
                  <label
                    htmlFor="password"
                    className="block dark:text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    defaultValue=""
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                    })}
                    id="password"
                    placeholder="Password"
                    className="w-full p-2 md:px-4 md:py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 border-2 focus:dark:border-violet-600"
                  />
                  <div className="flex justify-end text-xs dark:text-gray-600">
                    <a rel="noopener noreferrer" href="#">
                      Forgot Password?
                    </a>
                  </div>
                  {errors.password && (
                    <span className="text-red-600">
                      Password must be 6 characters
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button className="flex mx-auto items-center justify-center w-1/2 md:w-full px-1 rounded-md py-2 md:py-3 bg-[#f57224]">
              {loading ? (
                <FaSpinner className="animate-spin text-xl text-white mx-auto" />
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
