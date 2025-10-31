import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
function AppLayout() {
  return (
    <div className="bg-[#010301] h-auto text-white">
     
      <header className="sticky top-0 bg-[#010301]">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
