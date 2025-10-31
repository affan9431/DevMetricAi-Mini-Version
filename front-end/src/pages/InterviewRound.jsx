import React, { useCallback, useEffect, useState } from "react";
import SpeechToText from "../component/SpeechToText";
import axios from "../axios";
import { jwtDecode } from "jwt-decode";
import { CiWarning } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const userToken = localStorage.getItem("auth_token");
const decoded = userToken && jwtDecode(userToken);

function InterviewRound() {
  const [text, setText] = useState([]);
  const [userResponse, setUserResponse] = useState("");
  const [conversationLog, setConversationLog] = useState([]);
  const [stopInterview, setStopInterview] = useState(false);
  const navigate = useNavigate();

  async function handleSpeechSubmition(text) {
    try {
      const res = await axios.post(
        `/api/generate-interview-question`,
        text,
        {
          headers: {
            "Content-Type": "application/json",
            Email: decoded.email,
            StopInterview: "true",
          },
        }
      );
      setText(res.data.question);
      setConversationLog((prevLog) => [
        ...prevLog,
        { question: res.data.question, answer: userResponse },
      ]);
    } catch (error) {
      console.log(" ERROR : " + error);
    }
  }

  const textToSpeech = useCallback((t) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = t;
    speech.lang = "en-US";
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  }, []);

  useEffect(() => {
    if (text.length > 0) {
      textToSpeech(text);
    }
  }, [text, textToSpeech]);

  async function handleStopInterview() {
    let userResponse =
      prompt("Do you really want to stop interview? Yes/No") || "";
    let bool = userResponse?.trim().toLowerCase() === "yes" ? "false" : "true";

    setStopInterview(bool);

    try {
      await axios.post(
        `/api/generate-interview-question`,
        text,
        {
          headers: {
            "Content-Type": "application/json",
            Email: decoded.email,
            StopInterview: bool,
          },
        }
      );

      navigate("/app/result");
    } catch (error) {
      console.log(" ERROR : " + error);
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 w-full lg:h-[86.5vh]">
      {/* Left: Title + Video */}
      <div className="w-full lg:w-1/2 flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center lg:text-left">
          Interview Session
        </h1>
        <div className="w-full max-w-md h-64 md:h-[28rem] rounded-lg overflow-hidden shadow-md">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover opacity-90"
          >
            <source src="/video/interview.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Right: Instructions + Controls */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center gap-4">
        <h2 className="text-lg text-center lg:text-left">
          Say "Hello" to begin the interview.
        </h2>
        <SpeechToText
          handleSpeechSubmition={handleSpeechSubmition}
          setUserResponse={setUserResponse}
        />
        <button
          onClick={handleStopInterview}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded transition w-full max-w-xs cursor-pointer"
        >
          <CiWarning className="text-lg " />
          End Interview
        </button>
      </div>

      {/* Conversation Log */}
      <div className="border-l-2 border-[#173460] lg:h-[86vh] mt-8 lg:mt-0 lg:w-[38.5vw]">
        <div className="border border-[#173460] p-3 h-[28rem] md:h-[86vh] overflow-scroll">
          <h1 className="font-bold text-xl mb-4">Conversation Log</h1>
          {conversationLog.map((log, index) => (
            <div key={index}>
              {/* AI Response (Left Side) */}
              <div className="p-2 ai-reply flex items-center gap-3">
                <img
                  src="/images/chatbot.webp"
                  alt="Chatbot"
                  className="w-14 h-14 bg-[wheat] rounded-full"
                />
                <p className="font-bold text-sm p-2 rounded-lg">
                  {log.question}
                </p>
              </div>

              {/* User Response (Right Side) */}
              <div className="p-2 user-reply flex items-center gap-3 justify-end">
                <p className="font-bold text-sm  p-2 rounded-lg">
                  {log.answer}
                </p>
                <img
                  src="/images/profile.avif"
                  alt="User"
                  className="w-14 h-14  rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InterviewRound;
