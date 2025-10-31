import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { jwtDecode } from "jwt-decode";
import formatDate from "../utility/Helper";
import axios from "../axios";
import Spinner from "./Spinner";

const userToken = localStorage.getItem("auth_token");
const decoded = userToken && jwtDecode(userToken);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [interviewScores, setInterviewScores] = useState([]);
  const [interviewDates, setInterviewDates] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/get-interview-result`, {
          headers: {
            "Content-Type": "application/json",
            Email: decoded.email,
          },
        });

        const interviewData = res.data.results;

        const filterData =
          interviewData &&
          interviewData.map((interview) => {
            return {
              codeReview: eval(
                "(" +
                  interview.code_review.split("```")[1].split("json")[1] +
                  ")"
              ),
              interviewReview: interview.interview_review
                ? eval(
                    "(" +
                      interview.interview_review
                        .split("```")[1]
                        .split("json")[1] +
                      ")"
                  )
                : null,
              role: interview.role,
              interviewDate: interview.created_at || null,
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

        const scores = finalInterviewData.map((items) => {
          return {
            score: items.score,
            date: items.date,
          };
        });

        setInterviewScores(scores.map((i) => i.score));
        setInterviewDates(scores.map((i) => i.date));
        setIsLoading(false);
      } catch (error) {
        console.log(" ERROR : " + error.message);
      }
    };

    fetchResult();
  }, []);

  const getColor = (value) => {
    if (value <= 50) return "rgba(255, 100, 100, 0.5)";
    if (value <= 80) return "rgba(255, 210, 100, 0.5)";
    return "rgba(100, 200, 100, 0.5)";
  };

  const chartData = {
    labels: interviewDates,
    datasets: [
      {
        label: "Performance Score",
        data: interviewScores,
        borderColor: (ctx) => getColor(ctx.raw),
        backgroundColor: (ctx) => getColor(ctx.raw),
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: (ctx) => getColor(ctx.raw),
        pointBorderColor: "#fff",
        pointRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#fff",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  if (isLoading) return <Spinner message={"Loading Interview Data..."} />;

  return (
    <div className="p-4">
      <div className="w-full h-[300px] md:h-[400px] lg:h-[450px] mb-6">
        <Line data={chartData} options={chartOptions} />
      </div>

      <h2 className="text-white text-xl mt-6 mb-4">Interview Performance</h2>

      <div className="w-full h-[300px] md:h-[400px] lg:h-[450px]">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Charts;
