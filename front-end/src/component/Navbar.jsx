import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { jwtDecode } from "jwt-decode";
import { motion, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";

const listItem = [
  { path: "/", name: "Home" },
  { path: "/app/about", name: "About" },
  { path: "/app/startInterview", name: "Start Interview" },
  { path: "/app/contact", name: "Contact" },
];

function Navbar() {
  const { scrollYProgress } = useScroll();
  const [userData, setUserData] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUser = () => {
      const userToken = localStorage.getItem("auth_token");
      if (userToken) {
        const decoded = jwtDecode(userToken);
        setUserData(decoded);
      } else {
        setUserData(null);
      }
    };

    fetchUser();

    // Listen for storage changes and custom logout event
    window.addEventListener("storage", fetchUser);
    window.addEventListener("userLoggedOut", fetchUser);

    return () => {
      window.removeEventListener("storage", fetchUser);
      window.removeEventListener("userLoggedOut", fetchUser);
    };
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="bg-[#505050] h-1 w-full origin-left"
      />

      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 md:p-6">
        {/* Logo */}
        <div>
          <Link to="/app/home">
            <img
              src="/images/logo (3).png"
              alt="DevMetricAI Logo"
              className="w-24"
            />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-10 items-center font-medium">
          {listItem.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className="hover:underline">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Avatar / Button */}
        <div className="hidden md:block">
          {userData ? (
            <Avatar decoded={userData} />
          ) : (
            <Link to="/signin">
              <button className="bg-white text-[#152F56] font-semibold w-32 py-2 rounded-full">
                Get Started
              </button>
            </Link>
          )}
        </div>

        {/* Hamburger - Mobile Only */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden w-full px-6 pb-6 space-y-4 shadow-md z-50">
          <ul className="flex flex-col gap-4 font-medium">
            {listItem.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block py-1 border-b border-gray-200"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div>
            {userData ? (
              <Avatar decoded={userData} />
            ) : (
              <Link to="/signin">
                <button className="bg-[#152F56] text-white font-semibold w-full py-2 rounded-full mt-4 cursor-pointer">
                  Get Started
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
