import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

function Avatar({ decoded }) {
  const profileImage = decoded?.picture || "/images/profile.avif";
  const userName = decoded?.name || "Guest User";

  return (
    <>
      <Link to="/app/profile">
        <div className="flex items-center gap-3 text-white rounded-lg">
          <img
            src={profileImage}
            alt="User Avatar"
            className="w-12 h-12 rounded-full cursor-pointer"
          />
        </div>
      </Link>
    </>
  );
}

export default Avatar;
