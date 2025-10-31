import { useForm } from "react-hook-form";
import axios from "../axios";
import toast from "react-hot-toast";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await axios.post(
      `/api/contact`,
      data
    );
    toast.success("Thanks for reaching out! We'll get back to you shortly.");
    reset();
  };

  return (
    <div className="min-h-[calc(100vh-88px)] flex flex-col lg:flex-row">
      {/* Left Side - Background Image with Text */}
      <div className="w-full lg:w-1/2 bg-[url('/images/contact.avif')] bg-cover bg-center flex justify-center items-center flex-col text-white gap-5 px-8 py-10">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          We’d love to hear from you
        </h1>
        <p className="w-full sm:w-[80%] md:w-[70%] lg:w-[30vw] text-center text-sm md:text-base">
          Have questions, feedback, or partnership opportunities? Whether you’re
          looking to collaborate, explore our AI solutions, or just say hello,
          we’re here to help!
        </p>
      </div>

      {/* Right Side - Contact Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-20 py-10 bg-[#0A172A]">
        <h1 className="text-2xl md:text-4xl text-white font-bold mb-8">
          Contact Us
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-white text-sm mb-1">First Name</label>
              <input
                {...register("firstName", { required: true })}
                placeholder="Enter your first name"
                className="bg-transparent border-b border-[#0C1A31] outline-none text-white py-2"
              />
              {errors.firstName && (
                <span className="text-red-500 text-xs">
                  First name is required
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-white text-sm mb-1">Last Name</label>
              <input
                {...register("lastName", { required: true })}
                placeholder="Enter your last name"
                className="bg-transparent border-b border-[#0C1A31] outline-none text-white py-2"
              />
              {errors.lastName && (
                <span className="text-red-500 text-xs">
                  Last name is required
                </span>
              )}
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-white text-sm mb-1">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your email"
                className="bg-transparent border-b border-[#0C1A31] outline-none text-white py-2"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-white text-sm mb-1">Phone</label>
              <input
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Invalid phone number",
                  },
                })}
                placeholder="Enter your phone number"
                className="bg-transparent border-b border-[#0C1A31] outline-none text-white py-2"
              />
              {errors.phone && (
                <span className="text-red-500 text-xs">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label className="text-white text-sm mb-1">Message</label>
            <textarea
              {...register("message", { required: true })}
              placeholder="Enter your message"
              className="bg-transparent border-b border-[#0C1A31] outline-none text-white py-2 resize-none"
            />
            {errors.message && (
              <span className="text-red-500 text-xs">Message is required</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-white text-black font-semibold py-3 px-10 sm:px-14 rounded-full hover:bg-gray-300 transition cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
