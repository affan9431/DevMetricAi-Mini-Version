import React, { useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import * as events from "@uiw/codemirror-extensions-events";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Spinner from "../component/Spinner";
import useAntiCheat from "../hooks/useAntiCheat";

import * as tf from "@tensorflow/tfjs";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import "@tensorflow/tfjs-backend-webgl";

const userToken = localStorage.getItem("auth_token");
const decoded = userToken && jwtDecode(userToken);

// <RiChat3Fill className="w-14 h-14 rounded-[50%] text-blue-500 fixed right-12 bottom-10" />

const languages = [
  { value: "javascript", label: "JavaScript", extension: javascript },
  { value: "cpp", label: "C++", extension: cpp },
  { value: "python", label: "Python", extension: python },
  { value: "java", label: "Java", extension: java },
];

export default function CodingRound() {
  const [codes, setCodes] = useState({}); // store code for each question
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [allCode, setAllCode] = useState([]);
  const [isCheating, setIsCheating] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const videoRef = useRef();

  const extension = events.content({
    paste: (event) => {
      event.preventDefault();
    },
  });

  useEffect(() => {
    const data = localStorage.getItem("coding_question");
    const splitedQuestions = data && data.split("```");
    const finalQuestions =
      splitedQuestions && JSON.parse(splitedQuestions[1].split("json")[1]);

    setQuestions(finalQuestions);
    setSelectedQuestion(finalQuestions[0]);
  }, []);

  useEffect(() => {
    const preventCopy = (e) => e.preventDefault();
    const preventKeyCombos = (e) => {
      if (
        (e.ctrlKey && ["c", "v", "x", "u"].includes(e.key.toLowerCase())) || // ctrl+c, ctrl+v, ctrl+u
        (e.metaKey && ["c", "v", "x", "u"].includes(e.key.toLowerCase())) || // ⌘ versions
        e.key === "F12" || // dev tools
        (e.ctrlKey &&
          e.shiftKey &&
          ["i", "j", "c"].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventCopy);
    document.addEventListener("copy", preventCopy);
    document.addEventListener("paste", preventCopy);
    document.addEventListener("keydown", preventKeyCombos);

    return () => {
      document.removeEventListener("contextmenu", preventCopy);
      document.removeEventListener("copy", preventCopy);
      document.removeEventListener("paste", preventCopy);
      document.removeEventListener("keydown", preventKeyCombos);
    };
  }, []);

  function handleCodeChange(value) {
    setCodes((prevCodes) => ({ ...prevCodes, [selectedQuestion.id]: value }));
  }

  function handleSaveCode() {
    const requiredData = {
      question: selectedQuestion.title,
      code: codes[selectedQuestion.id],
      description: selectedQuestion.description,
      example: selectedQuestion.examples,
    };

    let eachData = [...allCode]; // Create a copy of the allCode array

    if (!eachData.find((data) => data.question === requiredData.question)) {
      eachData.push(requiredData);
    } else {
      const matchData = eachData.find(
        (data) => data.question === requiredData.question
      );

      let index = eachData.indexOf(matchData);

      eachData[index] = requiredData;
    }

    setAllCode(eachData);
  }

  async function handleSubmitCode() {
    if (questions.length === allCode.length) {
      setIsLoading(true);
      const res = await axios.post(
        `/api/review-codes`,
        allCode,
        {
          headers: {
            "Content-Type": "application/json",
            Email: decoded.email,
            Role: decoded.role,
          },
        }
      );

      // 67ea5e2886e4c5fa8da2a75f
      // 67ea6098e1d3d94a269e7b21

      localStorage.setItem("codeEvaluationID", JSON.stringify(res.data.cuurID));

      setIsLoading(false);

      navigate("/app/interview-round");
    }
  }

  if (isLoading) return <Spinner message="Ai Review Your Code..." />;

  return (
    <>
      {isCheating && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg">
          ⚠️ {warning}
        </div>
      )}

      <div
        className={`min-h-screen bg-black text-white p-8 flex flex-col md:flex-row gap-8 ${
          isModalOpen ? "opacity-70" : ""
        }`}
      >
        {/* Left Section - Code Editor */}
        <div className="flex-1 bg-[#0A0A0A] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Code Editor</h2>
          <select
            className="w-[10vw] p-2 bg-[#181818] text-white rounded-lg mb-4 focus:ring-2"
            value={selectedLanguage.value}
            onChange={(e) =>
              setSelectedLanguage(
                languages.find((lang) => lang.value === e.target.value) ||
                  languages[0]
              )
            }
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          <div className="border border-black bg-black rounded-lg overflow-hidden">
            <CodeMirror
              value={codes[selectedQuestion?.id] || ""}
              height="400px"
              theme="dark"
              extensions={[selectedLanguage.extension(), extension]}
              placeholder={`# Enter the code here.`}
              onChange={handleCodeChange}
            />
          </div>
          <div className="flex gap-3">
            <button
              className="w-[20vw] mt-4 bg-black border border-[#0C1A31] text-white py-2 rounded-lg transition cursor-pointer"
              onClick={handleSaveCode}
            >
              Save Code
            </button>
            <button
              className={`w-[20vw] mt-4 bg-black border border-[#0C1A31] text-white py-2 rounded-lg transition ${
                questions?.length === allCode?.length
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              } disabled:bg-gray-700`}
              onClick={handleSubmitCode}
              disabled={questions?.length !== allCode.length}
            >
              Submit Code
            </button>
          </div>
        </div>

        {/* Right Section - Questions */}
        <div className="w-full md:w-1/3 bg-[#0A0A0A] p-6 rounded-lg shadow-lg h-[80vh] overflow-scroll ">
          <video ref={videoRef} autoPlay muted playsInline className="hidden" />

          <div className="flex justify-between">
            <h2 className="md:text-2xl font-bold mb-4">
              {questions?.length} Questions
            </h2>
            <h2 className="md:text-2xl font-bold mb-4">
              Total: {questions?.length * 10} marks
            </h2>
          </div>
          <div className="space-y-4">
            {questions?.map((q) => (
              <div
                key={q.id}
                className={`p-4 border border-[#0C1A31] rounded-lg cursor-pointer transition hover:bg-slate-800 ${
                  selectedQuestion.id === q.id &&
                  "border-[#0C1A31] bg-slate-800"
                }`}
                onClick={() => setSelectedQuestion(q)}
              >
                <h3 className="text-lg font-semibold">{q.title}</h3>
                <p className="text-sm text-gray-300">{q.description}</p>
                <h3 className="text-lg font-semibold">
                  {(questions?.length * 10) / questions.length} mark each
                </h3>
                <button
                  className="mt-2 text-[#2d7af5] hover:underline"
                  onClick={() => setIsModalOpen(true)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Detailed View */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold">{selectedQuestion.title}</h2>
              <p className="mt-2 text-gray-300">
                {selectedQuestion.detailedDescription}
              </p>
              <h3 className="mt-4 text-lg font-semibold">Examples:</h3>
              <ul className="mt-2 space-y-2">
                {selectedQuestion.examples.map((ex, index) => (
                  <li key={index} className="bg-gray-700 p-2 rounded text-sm">
                    <strong>Input:</strong> {ex.input} <br />
                    <strong>Output:</strong> {ex.output}
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 w-full bg-black border border-[#0C1A31] text-white py-2 rounded-lg transition"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
