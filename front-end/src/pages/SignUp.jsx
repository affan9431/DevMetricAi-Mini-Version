import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../axios";
import toast from "react-hot-toast";

const ITJobs = [
  "Full Stack Web Developer",
  "Frontend Developer",
  "Backend Developer",
  "Software Engineer",
  "Mobile App Developer",
  "DevOps Engineer",
  "Cloud Engineer",
  "Cybersecurity Analyst",
  "Data Scientist",
  "Machine Learning Engineer",
  "AI Engineer",
  "Blockchain Developer",
  "Game Developer",
  "UI/UX Designer",
  "Embedded Systems Engineer",
  "AR/VR Developer",
  "Big Data Engineer",
  "Database Administrator",
  "Network Engineer",
  "IT Support Specialist",
  "System Administrator",
  "Quality Assurance Engineer",
  "Site Reliability Engineer",
  "IoT Developer",
  "Technical Product Manager",
  "Software Architect",
  "Other",
];

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [otherRole, setOtherRole] = useState("");
  const [isOtherRoleDisabled, setIsOtherRoleDisabled] = useState(true);

  const { register, handleSubmit, reset, getFieldState, getValues } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const finalData = {
        ...data,
        role: data.role === "Other" ? data.otherRole : data.role,
      };

      delete finalData.otherRole;

      await axios.post(
        `/api/users/signup`,
        finalData
      );
      toast.success(
        "Welcome aboard! Your account is ready. Sign in and start exploring."
      );
      navigate("/signin");
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  }

  console.log("BACKEND ->", import.meta.env.VITE_PRODUCTION_BACKEND_URL);

  const googleLogin = () => {
    window.location.href = `${import.meta.env.VITE_PRODUCTION_BACKEND_URL}/signup/google`;
  };

  const githubLogin = () => {
    window.location.href = `${import.meta.env.VITE_PRODUCTION_BACKEND_URL}/signup/github`;
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 h-64 md:h-auto bg-[url('/images/signin.avif')] bg-cover bg-center flex justify-center items-center flex-col text-white gap-5 px-8" />

      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 md:px-20 py-10">
        <h1 className="text-4xl text-white font-bold mb-8">
          Create Your Account
        </h1>
        <p className="text-white">
          Already have a account{" "}
          <Link to="/signin" className="text-[#1509F6]">
            {" "}
            Sign in
          </Link>
        </p>

        <form className="space-y-6 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="text-white text-sm mb-1 font-bold mt-6">
              Name
            </label>
            <input
              type="name"
              placeholder="Enter your name"
              autoFocus
              className="bg-transparent border-4 border-[#0C1A31] outline-none text-white py-2 px-2 rounded-[10px] w-full"
              autoComplete="new-name"
              {...register("name", {
                required: true,
              })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white text-sm mb-1 font-bold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border-4 border-[#0C1A31] outline-none text-white py-2 px-2 rounded-[10px] w-full"
              autoComplete="new-email"
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white text-sm mb-1 font-bold">Role</label>
            <select
              {...register("role", { required: true })}
              className="bg-transparent border-4 border-[#0C1A31] outline-none text-white py-2 px-2 rounded-[10px] w-full"
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                if (e.target.value === "Other") {
                  setIsOtherRoleDisabled(false);
                } else {
                  setIsOtherRoleDisabled(true);
                  setOtherRole("");
                }
              }}
            >
              <option value="" className="text-black" disabled>
                Select your role
              </option>
              {ITJobs.map((item, index) => (
                <option className="text-black" key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {selectedRole === "Other" && (
              <input
                type="text"
                placeholder="Enter your role"
                className="bg-transparent border-4 border-[#0C1A31] outline-none text-white py-2 px-2 rounded-[10px] w-full mt-2"
                {...register("otherRole", {
                  required: !isOtherRoleDisabled,
                })}
                disabled={isOtherRoleDisabled}
                value={otherRole}
                onChange={(e) => setOtherRole(e.target.value)}
              />
            )}
          </div>

          <div className="flex flex-col relative">
            <label className="text-white text-sm mb-1 font-bold">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="bg-transparent border-4 border-[#0C1A31] outline-none text-white py-2 px-2 rounded-[10px] pr-8 w-full"
              autoComplete="new-password"
              {...register("password", {
                required: true,
                min: 8,
                max: 20,
              })}
            />
            {!showPassword ? (
              <FiEyeOff
                className="absolute right-4 top-10 cursor-pointer text-white"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FiEye
                className="absolute right-4 top-10 cursor-pointer text-white"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>

          <div className="mt-6">
            <button className="bg-white text-black font-semibold py-3 px-14 rounded-full hover:bg-gray-300 transition cursor-pointer w-full sm:w-auto">
              Sign Up
            </button>
          </div>
        </form>
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

export default SignUp;
