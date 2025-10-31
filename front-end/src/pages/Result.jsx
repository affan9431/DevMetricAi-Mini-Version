import axios from "../axios";
import React, { useEffect, useState } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { jwtDecode } from "jwt-decode";
import Spinner from "../component/Spinner";
import { Link } from "react-router-dom";

const userToken = localStorage.getItem("auth_token");
const decoded = userToken && jwtDecode(userToken);

function Result() {
  const [openAnswer, setOpenAnswer] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [codingScore, setCodingScore] = useState(0);
  const [interviewScore, setInterviewScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [domain, setDomain] = useState("");
  const [codeEvaluations, setCodeEvaluations] = useState([]); // Holds parsed evaluations

  useEffect(() => {
    const data = localStorage.getItem("coding_question");
    if (data) {
      try {
        const splitedQuestions = data.split("```");
        const finalQuestions = JSON.parse(splitedQuestions[1].split("json")[1]);
        setQuestions(finalQuestions);
        setSelectedQuestion(finalQuestions[0]);
      } catch (e) {
        console.error("Error parsing questions data:", e);
      }
    }
  }, []);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setIsLoading(true);
        const codeEvaluationID = JSON.parse(
          localStorage.getItem("codeEvaluationID")
        );
        const res = await axios.get(
          `/api/get-interview-result`,
          {
            headers: {
              "Content-Type": "application/json",
              Email: decoded.email,
              CodeEvaluationID: codeEvaluationID,
            },
          }
        );

        const result = res.data.result[0];

        // Parse code review JSON safely
        const codeReviewStr = result.code_review
          ?.split("```")[1]
          ?.split("json")[1]
          ?.trim();

        let codeReviewObject = { evaluations: [] };
        if (codeReviewStr) {
          try {
            codeReviewObject = JSON.parse(codeReviewStr);
          } catch {
            codeReviewObject = eval("(" + codeReviewStr + ")");
          }
        }

        setCodeEvaluations(codeReviewObject.evaluations || []);

        // Calculate total coding score
        const totalCodingScore = (codeReviewObject.evaluations || []).reduce(
          (acc, item) => acc + (item.score || 0),
          0
        );
        setCodingScore(totalCodingScore);

        // Parse interview score
        const interviewStr = result.interview_review
          ?.split("```")[1]
          ?.split("json")[1]
          ?.trim();

        let interviewReviewObject = null;
        if (interviewStr) {
          interviewReviewObject = JSON.parse(interviewStr);
        }
        setInterviewScore(interviewReviewObject?.TotalMarks || 0);

        setDomain(result.role);
        setIsLoading(false);
      } catch (error) {
        console.log(" ERROR : " + error.message);
        setIsLoading(false);
      }
    };

    fetchResult();
  }, []);

  const percentage = ((codingScore + interviewScore) / 100) * 100;

  if (isLoading) return <Spinner message="Evaluating..." />;

  const selectedEvaluation =
    selectedQuestion &&
    codeEvaluations.find(
      (evalItem) => evalItem.questionId === selectedQuestion.id
    );

  return (
    <div className="h-screen relative px-2 md:px-6">
      {" "}
      {/* Add horizontal padding for small screens */}
      {/* Hamburger icon */}
      <div className="flex justify-end p-4" onClick={() => setOpenAnswer(true)}>
        <HiBars3BottomRight className="text-3xl cursor-pointer" />
      </div>
      {/* Score summary */}
      <div className="border-2 border-[#152F56] rounded-[100px] flex flex-col items-center justify-center gap-4 w-full md:w-1/2 m-auto mt-10 p-5">
        {/* w-full on mobile, half on medium and up */}
        <h1 className="text-3xl md:text-4xl font-semibold text-center">
          You scored {codingScore + interviewScore}/100 ({percentage.toFixed(2)}
          %)
        </h1>
        <div className="flex flex-wrap justify-center gap-3">
          <div className="text-center border-2 border-[#152F56] rounded-[50px] w-40 md:w-44 flex justify-center items-center flex-col p-3">
            <h1 className="font-semibold">Domain</h1>
            <p>{domain}</p>
          </div>
          <div className="text-center border-2 border-[#152F56] rounded-[50px] w-40 md:w-44 flex justify-center items-center flex-col p-3">
            <h1 className="font-semibold">Coding Score</h1>
            <p>{codingScore}/50</p>
          </div>
          <div className="text-center border-2 border-[#152F56] rounded-[50px] w-40 md:w-44 flex justify-center items-center flex-col p-3">
            <h1 className="font-semibold">Interview Score</h1>
            <p>{interviewScore}/50</p>
          </div>
        </div>
      </div>
      {/* Profile Button */}
      <div className="flex justify-center items-center mt-10">
        <Link to="/app/profile/previous-interview">
          <button className="border-2 border-[#152F56] rounded-[50px] p-3 md:p-4 w-40 md:w-44 hover:cursor-pointer hover:bg-[#152F56] text-white transition-all">
            View Profile
          </button>
        </Link>
      </div>
      {/* Sidebar */}
      {openAnswer && (
        <div className="fixed md:absolute top-0 right-0 h-full md:w-1/2 w-full bg-slate-900 z-50">
          <div
            className="flex justify-end p-4"
            onClick={() => setOpenAnswer(false)}
          >
            <RxCross1 className="text-3xl cursor-pointer" />
          </div>

          <div className="p-3 h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              Detailed Review Of Your Answers
            </h2>
            <div className="space-y-4">
              {questions?.map((q) => (
                <div
                  key={q.id}
                  className={`p-4 rounded-lg cursor-pointer transition hover:bg-slate-800 ${
                    selectedQuestion?.id === q.id &&
                    "border-[#0C1A31] bg-slate-800"
                  }`}
                  onClick={() => setSelectedQuestion(q)}
                >
                  <h3 className="text-lg font-semibold">{q.title}</h3>
                  <p className="text-sm text-gray-300">{q.description}</p>
                  <button
                    className="mt-2 text-[#2d7af5] hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(true);
                      setSelectedQuestion(q);
                    }}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Modal */}
      {isModalOpen && selectedQuestion && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4 overflow-auto">
          <div className="bg-gray-900 p-4 md:p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold">
                {selectedQuestion.title} - Review Details
              </h2>
              <button
                className="text-white text-3xl md:text-2xl font-bold leading-none"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {/* User Code */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Your Code:</h3>
              <pre className="bg-black p-4 rounded text-xs md:text-sm overflow-x-auto whitespace-pre-wrap max-w-full">
                {selectedEvaluation?.userCode || "No code available"}
              </pre>
            </div>

            {/* Score & Feedback */}
            <div className="mb-4">
              <h3 className="font-semibold">Score:</h3>
              <p>{selectedEvaluation?.score ?? "N/A"}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Capability:</h3>
              <p className="font-semibold">
                {selectedEvaluation?.capability ?? "N/A"}
              </p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Potential Errors:</h3>
              <p className="font-semibold">
                {selectedEvaluation?.potentialErrors ?? "N/A"}
              </p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Feedback:</h3>
              <p>{selectedEvaluation?.feedback || "No comments provided."}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Improvement:</h3>
              <p>
                {selectedEvaluation?.improvements ||
                  "No improvements provided."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Result;
