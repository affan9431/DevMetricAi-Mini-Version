import { Link } from "react-router-dom";

function HomeTrial() {
  return (
    <section className="bg-[url('/images/hero3.avif')] bg-cover bg-center min-h-screen flex justify-center items-center mt-8 px-4 sm:px-6 lg:px-20">
      <div className="flex flex-col items-center justify-center w-full max-w-4xl gap-5 text-center">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Try DevMetricAI in Action!
          </h1>
          <p className="mt-3 text-sm sm:text-base font-semibold text-gray-100">
            Experience AI-powered interviews before signing up.
          </p>
        </div>
        <Link to="/app/upload-resume">
          <button className="bg-white text-[#152F56] font-semibold w-36 sm:w-40 p-2 rounded-full cursor-pointer hover:bg-gray-100 transition">
            Start Demo
          </button>
        </Link>
      </div>
    </section>
  );
}

export default HomeTrial;
