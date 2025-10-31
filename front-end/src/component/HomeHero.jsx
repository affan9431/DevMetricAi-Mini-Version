import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const userToken = localStorage.getItem("auth_token");
const decoded = userToken && jwtDecode(userToken);

function HomeHero() {
  const [subsubscriptionData, setSubsubscriptionData] = useState({});
  const [toLink, setToLink] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/get-subscription-details`, {
          headers: {
            Email: decoded.email,
          },
        });

        let pyStyleString = res.data.result;

        // Fix the Python-style keys/values:
        let fixed = pyStyleString
          .replace(/None/g, "null") // Python None -> JS null
          .replace(/'/g, '"'); // Single quotes to double quotes

        let parsed = JSON.parse(fixed); // Now parse like a normal human

        setSubsubscriptionData(parsed);
      } catch (Err) {
        console.log(Err.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!subsubscriptionData) {
      setToLink("/app/pricing");
      return;
    }

    const { type, interviews_allowed, end_date } = subsubscriptionData;

    if (type === "one time payment") {
      if (interviews_allowed === 1) {
        setToLink("/app/upload-resume");
      } else {
        setToLink("/app/pricing");
      }
    } else if (type === "subscription") {
      const now = new Date();
      const endDate = new Date(end_date); // convert string to Date

      if (now > endDate) {
        setToLink("/app/pricing");
      } else {
        setToLink("/app/upload-resume");
      }
    } else {
      setToLink("/app/pricing");
    }
  }, [subsubscriptionData]);

  return (
    <section className=" min-h-screen flex justify-center items-center px-4 text-center">
      <div className="flex flex-col items-center justify-center w-full max-w-4xl gap-6">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-md">
            AI-Powered Resume Interviewer
          </h1>
          <p className="text-white text-sm md:text-lg mt-4 max-w-xl drop-shadow">
            Upload your resume & get real-time AI-driven interview questions
          </p>
        </div>
        <Link to={toLink || "/app/pricing"}>
          <button className="bg-white text-[#152F56] font-semibold w-40 py-3 rounded-full hover:bg-gray-200 transition-all duration-300 cursor-pointer">
            Upload Resume
          </button>
        </Link>
      </div>
    </section>
  );
}

export default HomeHero;
