import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/RightSidebar";
import ToastContainer from "../components/ToastContainer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 transition-colors duration-300">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto flex items-start gap-6 xl:gap-8 px-4 sm:px-6 lg:px-8 py-6">
        {/* Left Sidebar — fixed, comfortable width instead of a cramped grid column */}
        <aside className="hidden lg:block w-72 xl:w-80 shrink-0">
          <Sidebar />
        </aside>

        {/* Center Content — takes up whatever space is left, no wasted margin */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-80 shrink-0">
          <RightSidebar />
        </aside>
      </div>

      <ToastContainer />
    </div>
  );
}
