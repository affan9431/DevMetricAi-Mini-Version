import { useState } from "react";
import { BiMicrophone } from "react-icons/bi";

const SpeechToText = ({ handleSpeechSubmition, setUserResponse }) => {
  const [status, setStatus] = useState("idle"); // idle, listening, processing
  const [error, setError] = useState(null);

  const startListening = () => {
    setError(null);

    if (!window.webkitSpeechRecognition) {
      setError("Speech recognition not supported in this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false; // give result after user stop

    recognition.onstart = () => {
      setStatus("listening");
      setTimeout(() => {
        if (status === "listening") {
          recognition.stop();
          setError("No speech detected. Please try again.");
          setStatus("idle");
        }
      }, 5000); // Timeout after 5 seconds
    };

    recognition.onresult = (event) => {
      setStatus("processing");
      const speechText = event.results[0][0].transcript;
      setUserResponse(speechText);
      handleSpeechSubmition(speechText);
      setStatus("idle");
    };

    recognition.onerror = (event) => {
      setStatus("idle");
      setError("Error occurred in recognition: " + event.error);
    };

    recognition.onsoundend = () => {
      setStatus("idle");
    };

    try {
      recognition.start();
    } catch (err) {
      setError("Failed to start microphone. Check permissions");
      setStatus("idle");
    }
  };

  return (
    <div className="speech-container">
      <button
        onClick={startListening}
        disabled={status !== "idle"}
        className={`border p-3 w-56 cursor-pointer rounded transition-all
          ${status === "listening" ? "border-blue-500" : "border-[#173460]"}
          ${status === "processing" && "opacity-50 cursor-not-allowed"}`}
      >
        {status === "listening" ? (
          "🎤 Listening... Speak now"
        ) : status === "processing" ? (
          "⏳ Processing..."
        ) : (
          <div className="flex items-center gap-2">
            <BiMicrophone className="font-bold" />
            <span>Speak your answer</span>
          </div>
        )}
      </button>

      {error && (
        <p className="text-red-500 mt-2">
          ⚠️ {error}. {status === "idle" && "Please try again."}
        </p>
      )}

      <div className="mt-4 text-sm text-gray-600">
        Need inspiration? Try saying:
        <ul className="list-disc pl-5 mt-1">
          <li>"The solution should optimize for performance"</li>
          <li>"We can implement this using a hash map"</li>
          <li>"Time complexity would be O(n log n)"</li>
        </ul>
      </div>
    </div>
  );
};

export default SpeechToText;
