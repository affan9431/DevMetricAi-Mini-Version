import SideNavigation from "../component/SideNavigation";
import { Outlet } from "react-router-dom";

function UserProfile() {
  return (
    <div className="h-screen flex">
      {/* Fixed Sidebar (always visible on desktop, conditionally on mobile) */}
      <SideNavigation />

      {/* Scrollable Content Area */}
      <div className="w-full md:ml-64 h-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default UserProfile;
