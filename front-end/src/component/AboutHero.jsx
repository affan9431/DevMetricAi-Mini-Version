import { Link } from "react-router-dom";

function AboutHero() {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-4 lg:px-16 py-10 gap-8">
      <div className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left max-w-xl">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Revolutionizing Hiring with AI-Powered Precision
        </h1>
        <p className="text-base sm:text-lg text-gray-700">
          At DevMetricAI, we leverage cutting-edge AI to streamline the hiring
          process, making it faster, fairer, and smarter. Our intelligent
          interview system ensures unbiased assessments, helping companies
          discover top talent effortlessly.
        </p>
        <Link to="/app/upload-resume">
          <button className="bg-white text-[#152F56] font-semibold px-6 py-2 rounded-full shadow hover:shadow-md transition duration-200">
            Start AI Interview
          </button>
        </Link>
      </div>

      <div className="w-full max-w-md">
        <img
          src="/images/abouthero.avif"
          className="w-full h-auto"
          alt="Futuristic AI robot"
        />
      </div>
    </div>
  );
}

export default AboutHero;
