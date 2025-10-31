import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import StartInterview from "./pages/StartInterview";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import Profile from "./pages/Profile";
import PreviousInterview from "./pages/PreviousInterview";
import UserPerformance from "./pages/UserPerformance";
import Suggestions from "./pages/Suggestions";
import Notifications from "./pages/Notifications";
import Article from "./pages/Article";
import Course from "./pages/Course";
import Video from "./pages/Video";
import { Toaster } from "react-hot-toast";
import UploadResume from "./pages/UploadResume";
import CodingRound from "./pages/CodingRound";
import InterviewRound from "./pages/InterviewRound";
import ProtectedRoute from "./protected/ProtectedRoute";
import Result from "./pages/Result";
import Pricing from "./pages/Pricing";
import OAuthCallback from "./pages/OAuthCallback";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/app/home" />} />{" "}
          {/* Redirect root to /app/home */}
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="startInterview" element={<StartInterview />} />
            <Route path="upload-resume" element={<ProtectedRoute />}>
              <Route index element={<UploadResume />} />
            </Route>
            <Route path="coding-round" element={<ProtectedRoute />}>
              <Route index element={<CodingRound />} />
            </Route>
            <Route path="interview-round" element={<ProtectedRoute />}>
              <Route index element={<InterviewRound />} />
            </Route>
            <Route path="result" element={<ProtectedRoute />}>
              <Route index element={<Result />} />
            </Route>
            <Route path="contact" element={<ProtectedRoute />}>
              <Route index element={<Contact />} />
            </Route>
            <Route path="pricing" element={<Pricing />} />
            <Route path="profile" element={<ProtectedRoute />}>
              <Route path="" element={<UserProfile />}>
                <Route
                  index
                  element={<Navigate replace to="profile-details" />}
                />
                <Route path="profile-details" element={<Profile />} />
                <Route
                  path="previous-interview"
                  element={<PreviousInterview />}
                />
                <Route path="performance" element={<UserPerformance />} />
                <Route path="suggestions" element={<Suggestions />}>
                  <Route index element={<Navigate replace to="article" />} />
                  <Route path="article" element={<Article />} />
                  <Route path="course" element={<Course />} />
                  <Route path="video" element={<Video />} />
                </Route>
                <Route path="notifications" element={<Notifications />} />
              </Route>
            </Route>
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/oauth-callback" element={<OAuthCallback />} />
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "black",
            color: "white",
          },
        }}
      />
    </>
  );
}

export default App;
