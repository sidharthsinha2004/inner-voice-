import { Outlet } from "react-router-dom";
import SideMenu from "../ui/SideMenu";
import TopBar from "../ui/TopBar";

export default function AppShell() {
  return (
    <div className="bg-[#F6F7F5] min-h-screen">

      {/* Sidebar */}
      <SideMenu />

      {/* Main Area */}
      <div className="ml-72">

        <TopBar />

        <main className="px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>

    </div>
  );
}