import { Link } from "react-router-dom";

function StartInterview() {
  return (
    <div
      className="bg-[url('/images/hero3.avif')] bg-cover bg-center h-[calc(100vh-88px)] flex justify-center items-center px-4 text-center"
      style={{ overflow: "hidden" }}
    >
      <div className="flex flex-col items-center gap-6 max-w-3xl">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-bold leading-tight">
            Start Your AI-Powered Interview Now!
          </h1>
          <p className="font-semibold text-sm sm:text-base mt-4 px-2 sm:px-10">
            Upload your resume and let AI take your interview in real time. Get
            instant feedback and improve your responses effortlessly.
          </p>
        </div>
        <Link to="/app/upload-resume">
          <button className="bg-white text-[#152F56] font-semibold w-40 p-2 rounded-[50px] cursor-pointer">
            Upload Resume
          </button>
        </Link>
      </div>
    </div>
  );
}

export default StartInterview;
