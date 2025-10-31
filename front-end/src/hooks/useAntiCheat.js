import { useEffect } from "react";

const useAntiCheat = () => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        alert("❗ Tab switch detected. This will be reported.");
        // Optional: Log to backend
        // fetch("/api/cheat-log", { method: "POST", body: JSON.stringify({ type: "tab switch" }) });
      }
    };

    const handleBlur = () => {
      alert("❗ You moved away from the exam window. This is being monitored.");
      // Optional: fetch to log blur event
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        alert("❗ You exited fullscreen. Possible cheating detected.");
        // Optional: fetch to log fullscreen exit
      }
    };

    const disableRightClick = (e) => e.preventDefault();

    // Go fullscreen on mount
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }

    // Add listeners
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("contextmenu", disableRightClick);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);
};

export default useAntiCheat;
