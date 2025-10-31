import axios from "../axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const error = query.get("error");

    if (error === "no_account") {
      toast.error("No account found. Please sign up first.");
    }
  }, [location]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (error === "no-account") {
      toast.error("No account found. Please sign up first.");
    } else if (error === "github-email") {
      toast.error("Email not accessible from GitHub. Please verify it.");
    }
  }, []);

  const googleLogin = () => {
    window.location.href = `${import.meta.env.VITE_PRODUCTION_BACKEND_URL}/login/google`;
  };
  const githubLogin = () => {
    window.location.href = `${import.meta.env.VITE_PRODUCTION_BACKEND_URL}/login/github`;
  };

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `/api/users/login`,
        data
      );

      if (res.data.success === true) {
        localStorage.setItem("auth_token", JSON.stringify(res.data.token));
        toast.success("Welcome back! Ready to dive in? Let's go!");
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Oops! Something went wrong. Double-check your credentials and try again!"
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side Image */}
      <div className="w-full md:w-1/2 h-64 md:h-auto bg-[url('/images/signin.avif')] bg-cover bg-center flex justify-center items-center flex-col text-white gap-5 px-8" />

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 md:px-20 py-10">
        <h1 className="text-4xl text-white font-bold mb-6">
          Register to Your Account
        </h1>
        <p className="text-white mb-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#1509F6] font-semibold">
            Sign Up
          </Link>
        </p>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-white text-sm mb-1 font-bold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              autoFocus
              className="bg-transparent border-4 border-[#0C1A31] outline-none text-white py-2 px-3 rounded-[10px] w-full"
              autoComplete="new-email"
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label className="text-white text-sm mb-1 font-bold">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="bg-transparent border-4 border-[#0C1A31] outline-none text-white py-2 px-3 rounded-[10px] pr-10 w-full"
              autoComplete="new-password"
              {...register("password", {
                required: true,
                min: 8,
                max: 20,
              })}
            />
            {showPassword ? (
              <FiEye
                className="absolute right-3 top-10 text-white cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FiEyeOff
                className="absolute right-3 top-10 text-white cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {/* Forgot Password */}
          <div>
            <p className="text-[#1509F6] text-sm font-bold cursor-pointer">
              Forget your password?
            </p>
          </div>

          {/* Sign In Button */}
          <div className="mt-6">
            <button className="bg-white text-black font-semibold py-3 px-14 rounded-full hover:bg-gray-300 transition cursor-pointer w-full sm:w-auto">
              Sign In
            </button>
          </div>
        </form>

        {/* Social Logins */}
        <div className="mt-10 flex flex-col sm:flex-row gap-5">
          <button
            className="flex gap-3 text-white items-center border-4 border-[#0C1A31] px-4 py-2 rounded-[10px] w-full sm:w-40 justify-center cursor-pointer"
            onClick={googleLogin}
          >
            <img
              src="/images/google.png"
              alt="Google Logo"
              className="w-6 h-6"
            />
            <span className="font-bold">Google</span>
          </button>
          <button
            className="flex gap-3 text-white items-center border-4 border-[#0C1A31] px-4 py-2 rounded-[10px] w-full sm:w-40 justify-center cursor-pointer"
            onClick={githubLogin}
          >
            <img
              src="/images/github.png"
              alt="GitHub Logo"
              className="w-6 h-6"
            />
            <span className="font-bold">GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
