import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import axios from "../axios";
import toast from "react-hot-toast";
import supabase from "../services/supabase";

const ITJobs = [
  "Full Stack Web Developer",
  "Frontend Developer",
  "Backend Developer",
  "Software Engineer",
  "Mobile App Developer",
  "DevOps Engineer",
  "Cloud Engineer",
  "Cybersecurity Analyst",
  "Data Scientist",
  "Machine Learning Engineer",
  "AI Engineer",
  "Blockchain Developer",
  "Game Developer",
  "UI/UX Designer",
  "Embedded Systems Engineer",
  "AR/VR Developer",
  "Big Data Engineer",
  "Database Administrator",
  "Network Engineer",
  "IT Support Specialist",
  "System Administrator",
  "Quality Assurance Engineer",
  "Site Reliability Engineer",
  "IoT Developer",
  "Technical Product Manager",
  "Software Architect",
  "Other",
];

const userToken = localStorage.getItem("auth_token");
const decoded = userToken && jwtDecode(userToken);

function Profile() {
  const [email, setEmail] = useState(decoded?.email || "");
  const [name, setName] = useState(decoded?.name || "");
  const [image, setImage] = useState(decoded?.picture || "");
  const [selectedRole, setSelectedRole] = useState(decoded?.role || "");
  const [otherRole, setOtherRole] = useState("");
  const [isOtherRoleDisabled, setIsOtherRoleDisabled] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [fileObj, setFileObj] = useState({});

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileObj(file);
    if (file) {
      // Check file size (e.g., max 1MB)
      if (file.size > 1024 * 1024) {
        alert("File size exceeds 1MB. Please choose a smaller file.");
        return;
      }

      // Preview the selected image
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Set the base64 encoded image
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsUpdate(true);

    try {
      let imageUrl = null;
      if (fileObj) {
        const fileName = `${Date.now()}-${fileObj.name}`;

        const { data: imageData, error } = await supabase.storage
          .from("profile-image")
          .upload(fileName, fileObj, {
            contentType: fileObj.type, // Ensure correct content type
          });

        if (error) {
          console.error("Error uploading image:", error);
          alert(`Failed to upload the image: ${fileObj.name}`);
          return; // Exit if the upload fails
        }

        const { data: publicURLData, error: urlError } = supabase.storage
          .from("profile-image")
          .getPublicUrl(fileName);

        if (urlError) {
          console.error("Error getting public URL:", urlError);
          alert(`Failed to get public URL for: ${fileObj.name}`);
          return; // Exit if URL retrieval fails
        }

        imageUrl = publicURLData.publicUrl; // Store the public URL
        setImage(imageUrl);

        if (imageUrl) {
          data.image = imageUrl;
        }
        const res = await axios.patch(`/api/update-profile`, data);
        reset();
        if (res.data.token) {
          localStorage.removeItem("auth_token");
          localStorage.setItem("auth_token", res.data.token);
        }
        toast.success("Update complete. Your profile is now up to date.");
        window.location.reload();
      }
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
    }
    setIsUpdate(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/get-data`, {
          headers: {
            "Content-Type": "application/json",
            Email: email,
          },
        });
        const result = res.data.data[0];
        setName(result.name);
        setEmail(result.email);
        setSelectedRole(result.role);
      } catch (err) {
        console.error("Fetching user data failed:", err);
      }
    };

    if (email) getData();
  }, [email]);

  return (
    <div className="mt-10 md:ml-40">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-7 mb-10">
        <img
          src={image || "/images/profile.avif"}
          alt="user profile"
          className="w-20 h-20 rounded-full"
        />

        <label
          htmlFor="profileUpload"
          className="cursor-pointer border-4 border-[#0C1A31] p-2 w-full md:w-36 rounded-[5px] text-center"
        >
          Change Profile
          <input
            type="file"
            id="profileUpload"
            className="hidden"
            onChange={handleImage} // <-- define this function
          />
        </label>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-white text-sm mb-1 font-bold">
                User Name
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent border-4 border-[#0C1A31] outline-none text-white py-2 px-2 rounded-[5px] w-full"
                autoComplete="new-name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-white text-sm mb-1 font-bold">Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                value={email}
                disabled
                onChange={(e) => setEmail(e.target.value)}
                className="border-4 border-[#0C1A31] outline-none text-white py-2 px-2 rounded-[5px] w-full bg-slate-800 cursor-not-allowed"
                autoComplete="new-email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-white text-sm mb-1 font-bold">Role</label>
              <select
                {...register("role", { required: true })}
                className="bg-transparent border-4 border-[#0C1A31] outline-none text-white py-2 px-2 rounded-[10px] w-full"
                value={selectedRole}
                onChange={(e) => {
                  setSelectedRole(e.target.value);
                  if (e.target.value === "Other") {
                    setIsOtherRoleDisabled(false);
                  } else {
                    setIsOtherRoleDisabled(true);
                    setOtherRole("");
                  }
                }}
              >
                <option value="" className="text-black" disabled>
                  Select your role
                </option>
                {ITJobs.map((item, index) => (
                  <option className="text-black" key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              {selectedRole === "Other" && (
                <input
                  type="text"
                  placeholder="Enter your role"
                  className="bg-transparent border-4 border-[#0C1A31] outline-none text-white py-2 px-2 rounded-[10px] w-full mt-2"
                  {...register("otherRole", {
                    required: !isOtherRoleDisabled,
                  })}
                  disabled={isOtherRoleDisabled}
                  value={otherRole}
                  onChange={(e) => setOtherRole(e.target.value)}
                />
              )}
            </div>
          </div>

          <div className="mt-6">
            <button
              className="border-4 border-[#0C1A31] p-2 w-full md:w-36 rounded-[5px] cursor-pointer"
              disabled={isUpdate}
            >
              {isUpdate ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
