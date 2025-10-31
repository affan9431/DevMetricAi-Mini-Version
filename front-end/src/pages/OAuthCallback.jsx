// pages/OAuthCallback.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // store token in localStorage or cookies
      localStorage.setItem("auth_token", token);
      // redirect to homepage or dashboard
      navigate("/"); // or wherever you want
    } else {
      // handle error
      console.error("No token received from backend");
      navigate("/login");
    }
  }, [location, navigate]);

  return <div>Redirecting...</div>;
};

export default OAuthCallback;
