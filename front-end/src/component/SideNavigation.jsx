import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";
import { GrDocumentPerformance } from "react-icons/gr";
import { HiSparkles } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { Menu, X } from "lucide-react";

const sideLink = [
  {
    icon: <FaRegUser />,
    text: "Profile",
    link: "/app/profile/profile-details",
  },
  {
    icon: <VscPreview />,
    text: "Previous Interview",
    link: "/app/profile/previous-interview",
  },
  {
    icon: <GrDocumentPerformance />,
    text: "Performance",
    link: "/app/profile/performance",
  },
  {
    icon: <HiSparkles />,
    text: "Suggestions",
    link: "/app/profile/suggestions",
  },
  {
    icon: <IoIosNotificationsOutline />,
    text: "Notifications",
    link: "/app/profile/notifications",
  },
  { icon: <BiLogOut />, text: "Logout", link: "/app" },
];

function handleLogout() {
  localStorage.removeItem("auth_token");
  window.dispatchEvent(new Event("userLoggedOut"));
}

function SideNavigation() {
  const [showHamburger, setShowHamburger] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div
        className="md:hidden fixed top-12 left-3 z-50 cursor-pointer "
        onClick={() => setShowHamburger(!showHamburger)}
      >
        {showHamburger ? (
          <X size={32} className="text-black bg-white rounded p-1" />
        ) : (
          <Menu size={32} className="text-white bg-black rounded p-1" />
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed h-full border-r border-[#152F56] w-64
          transform transition-transform duration-300 ease-in-out
          ${showHamburger ? "translate-x-0 bg-white text-black" : "-translate-x-full"} 
          md:translate-x-0
          z-40
        `}
      >
        <h1 className="text-3xl font-semibold p-4">Settings</h1>
        <div className="bg-[#152F56] w-full h-[0.5px]"></div>
        <div className="overflow-y-auto h-[calc(100vh-156.5px)]">
          <ul className="p-4">
            {sideLink.map((item, index) => (
              <NavLink
                to={item.link}
                key={index}
                onClick={() => {
                  if (item.text === "Logout") {
                    handleLogout();
                    setShowHamburger(false);
                  } else {
                    setShowHamburger(false);
                  }
                }}
                className={({ isActive }) =>
                  `p-2 m-2 flex items-center gap-4 cursor-pointer rounded-md transition-all ${
                    isActive
                      ? "bg-[#152F56] text-white"
                      : "hover:bg-[#152F56] hover:text-white"
                  }`
                }
              >
                {item.icon}
                {item.text}
              </NavLink>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Overlay */}
      {showHamburger && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          onClick={() => setShowHamburger(false)}
        />
      )}
    </>
  );
}

export default SideNavigation;
