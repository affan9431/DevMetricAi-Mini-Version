import { Link } from "react-router-dom";

function AboutStart() {
  return (
    <div className="mt-20 px-4 md:px-10 lg:pl-30 flex flex-col gap-5">
      <h1 className="text-3xl sm:text-4xl font-bold">
        Take the Next Step with DevMetricAI
      </h1>
      <p className="w-full md:w-[70%] lg:w-[30vw]">
        Ready to revolutionize your hiring process? DevMetricAI makes it
        effortless—just upload your resume, and our AI will take care of the
        rest in real time! Whether you're a candidate looking for smarter
        interview preparation or a company seeking efficient hiring, we've got
        you covered.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-7">
        <Link to="/app/upload-resume">
          <button className="bg-white text-[#152F56] font-semibold w-40 p-2 rounded-[50px] cursor-pointer">
            Start AI Interview
          </button>
        </Link>
        <Link to="/app/contact">
          <button className="bg-white text-[#152F56] font-semibold w-40 p-2 rounded-[50px] cursor-pointer">
            Contact us
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AboutStart;
