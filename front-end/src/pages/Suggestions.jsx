import { useEffect } from "react";
import Filter from "../component/Filter";
import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "../axios";

const userToken = localStorage.getItem("auth_token");
const decoded = userToken && jwtDecode(userToken);

const strengthLists = [
  "✔️  Great at problem-solving questions",
  "✔️  Strong logical reasoning skills",
  "✔️  Confident in data structures & algorithms",
];

const weaknessLists = [
  "❌  Struggles with system design questions",
  "❌  Needs improvement in behavioral answers",
  "❌  Sometimes lacks structured responses",
];

const improveData = [
  {
    question: "🤖 Struggling with Coding Questions?",
    answer:
      "Practice more Leetcode problems to improve problem-solving skills.",
  },
  {
    question: "😰 Nervous During Interviews?",
    answer:
      "Try mock interviews to build confidence and improve communication.",
  },
  {
    question: "📍 Lacking Structured Answers?",
    answer: "Use the STAR method to give clear and well-structured responses.",
  },
  {
    question: "🐌 Slow in problem-solving?",
    answer: "Work on speed by setting time limits for each coding question.",
  },
];

const ImproveCard = ({ question, answer }) => {
  useEffect(() => {
    async function fetchStrengthAndWeeknees() {
      try {
        await axios.get(
          `/api/get-user-strength-and-weekness`
        );
      } catch (error) {
        console.log("ERROR: ", error);
      }
    }

    fetchStrengthAndWeeknees();
  }, []);

  return (
    <div className="border-2 border-[#173460] p-6 flex flex-col items-center justify-center rounded-lg shadow-md bg-white dark:bg-[#0C1A31]">
      <h1 className="text-lg font-semibold text-center text-[#0C1A31] dark:text-white">
        {question}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
        {answer}
      </p>
    </div>
  );
};

function Suggestions() {
  return (
    <div className="p-4 sm:p-6 md:p-10 lg:p-16">
      {/* Header */}
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0C1A31] dark:text-white">
          Personalized Suggestions to Improve Your Interview Skills
        </h1>
        <p className="italic font-light text-gray-600 dark:text-gray-300">
          Based on your performance, here are tailored recommendations to help
          you improve.
        </p>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="space-y-6 mb-12">
        <h1 className="text-2xl font-bold text-[#0C1A31] dark:text-white">
          What You're Doing Well & Where to Improve
        </h1>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Strengths */}
          <div className="w-full md:w-1/2">
            <h2 className="mb-4 text-xl font-bold text-green-600">
              🔥 Strengths
            </h2>
            <ul className="space-y-2">
              {strengthLists.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="w-full md:w-1/2">
            <h2 className="mb-4 text-xl font-bold text-red-500">
              ⚠️ Weaknesses
            </h2>
            <ul className="space-y-2">
              {weaknessLists.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Improvement Cards */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold mb-6 text-[#0C1A31] dark:text-white">
          How to Improve?
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {improveData.map((item, index) => (
            <ImproveCard
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>

      {/* Resources */}
      <div>
        <h1 className="text-2xl font-bold mb-4 text-[#0C1A31] dark:text-white">
          Resources for Better Preparation
        </h1>
        <Filter />
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Suggestions;
