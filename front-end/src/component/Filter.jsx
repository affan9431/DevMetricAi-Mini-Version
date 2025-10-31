import { NavLink } from "react-router-dom";

function Filter() {
  return (
    <div className="flex flex-wrap justify-center md:justify-between items-center border border-[#173460] rounded-lg mx-auto mt-10 max-w-3xl">
      <NavButton link="article">Articles 📖</NavButton>
      <NavButton link="course">Courses 🎓</NavButton>
      <NavButton link="video">Videos 🎥</NavButton>
    </div>
  );
}

function NavButton({ link, children }) {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `px-5 py-2 text-sm sm:text-base w-full sm:w-auto text-center ${
          isActive
            ? "bg-[#173460] text-white"
            : "hover:bg-[#173460] hover:text-white text-[#173460]"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default Filter;
