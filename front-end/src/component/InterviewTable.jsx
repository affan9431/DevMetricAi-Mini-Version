import axios from "../axios";
import { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";
import formatDate from "../utility/Helper";
import Spinner from "./Spinner";

const userToken = localStorage.getItem("auth_token");
const decoded = userToken && jwtDecode(userToken);

const InterviewTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `/api/get-interview-result`,

          {
            headers: {
              "Content-Type": "application/json",
              Email: decoded.email,
            },
          }
        );

        const interviewData = res.data.results;

        const filterData =
          interviewData &&
          interviewData?.map((interview) => {
            return {
              codeReview: eval(
                "(" +
                  interview.code_review.split("```")[1].split("json")[1] +
                  ")"
              ),
              interviewReview: interview.interview_review
                ? eval(
                    "(" +
                      interview?.interview_review
                        ?.split("```")[1]
                        ?.split("json")[1] +
                      ")"
                  )
                : null,
              role: interview.role,
              interviewDate: interview.created_at ? interview.created_at : null,
            };
          });

        const codeScore = filterData.map((items) => {
          return {
            codeScore: items.codeReview.evaluations.map((item) => item.score),
            interviewScore: items.interviewReview
              ? items.interviewReview.TotalMarks
              : null,
            created_at: formatDate(items.interviewDate),
            interviewType: items.role,
          };
        });

        const finalInterviewData = codeScore.map((items) => {
          return {
            type: items.interviewType,
            date: items.created_at,
            status: "Completed ✅",
            score: items.interviewScore
              ? items.codeScore.reduce((prev, curr) => prev + curr) +
                items.interviewScore
              : items.codeScore.reduce((prev, curr) => prev + curr),
            action: "Download Report 📄",
          };
        });

        setInterviews(finalInterviewData);
        setIsLoading(false);
      } catch (error) {
        console.log(" ERROR : " + error.message);
      }
    };

    fetchResult();
  }, []);

  if (isLoading) return <Spinner message={"Loading..."} />;

  return (
    <div className="p-4 sm:p-8 max-w-full">
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-[600px] border border-gray-700 text-white">
          {/* Table Head */}
          <thead className="bg-black">
            <tr>
              {[
                "Interview Type",
                "Interview Dates",
                "Status",
                "Score",
                "Action",
              ].map((heading, index) => (
                <th
                  key={index}
                  className="border-3 border-[#0C1A31] px-4 sm:px-6 py-3 text-left font-bold whitespace-nowrap"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {interviews?.map((interview, index) => (
              <tr key={index} className="bg-black">
                <td className="border-3 border-[#0C1A31] px-4 sm:px-6 py-4 whitespace-nowrap">
                  {interview.type}
                </td>
                <td className="border-3 border-[#0C1A31] px-4 sm:px-6 py-4 whitespace-nowrap">
                  {interview.date}
                </td>
                <td className="border-3 border-[#0C1A31] px-4 sm:px-6 py-4 whitespace-nowrap">
                  {interview.status}
                </td>
                <td className="border-3 border-[#0C1A31] px-4 sm:px-6 py-4 whitespace-nowrap">
                  {interview.score}/100
                </td>
                <td
                  className="border-3 border-[#0C1A31] px-4 sm:px-6 py-4 text-[#1509F6] cursor-pointer whitespace-nowrap"
                  onClick={() => alert("We are working now!")}
                >
                  {interview.action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterviewTable;
