import axios from "../axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../component/Spinner";
import { jwtDecode } from "jwt-decode";

const userToken = localStorage.getItem("auth_token");
const decoded = userToken && jwtDecode(userToken);

const subscriptionTitle = localStorage.getItem("subscriptionTitle");

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const createSubscription = async () => {
      try {
        const name = decoded.name;
        const email = decoded.email;

        const finalData = {
          name,
          email,
          subscriptionTitle,
        };
        await axios.post(
          `/api/create-subscription-details`,
          finalData
        );
      } catch (error) {
        console.log(error);
      }
    };
    createSubscription();
  }, []);

  const uploadFile = async (selectedFile) => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("resume", selectedFile);
    // formData.append("email", decoded.email);

    try {
      setIsLoading(true);

      const response = await axios.post(
        `/api/upload-resume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Email: decoded.email,
          },
        }
      );

      localStorage.setItem("coding_question", response.data.question);

      setTimeout(() => {
        navigate("/app/coding-round");
      }, 1500);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
      uploadFile(files[0]);
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setFile(files[0]);
      uploadFile(files[0]);
    }
  };

  if (isLoading) return <Spinner message="Uploading..." />;

  return (
    <div className="h-[86.2vh] bg-black flex justify-center items-center">
      <div className="w-full max-w-3xl text-center">
        <h1 className="mb-8 text-3xl font-bold text-white">Upload Resume</h1>
        <div
          className={`relative rounded-lg border-2 border-dashed border-blue-500/30 p-12 h-[49vh] flex justify-center items-center transition-transform duration-300 ${
            isDragging ? "scale-105 border-blue-500 shadow-lg" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-2xl text-white">
              Drag and Drop file here or{" "}
              <span className="cursor-pointer text-blue-500 hover:text-blue-400">
                Choose file
              </span>
            </p>
            {file && <p className="text-white">Selected File: {file.name}</p>}
          </div>
          <input
            type="file"
            className="absolute inset-0 h-full md:w-full cursor-pointer opacity-0"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}
