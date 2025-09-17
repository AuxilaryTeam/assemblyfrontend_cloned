import { useState } from "react";
import { useNavigate, Outlet, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiPrinter,
  FiFileText,
  FiMonitor,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
  FiCheckSquare,
  FiClipboard,
} from "react-icons/fi";
import { BsCardChecklist } from "react-icons/bs";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import logo from "@/assets/Logo.png";
import slogan from "@/assets/logo2.jpg";
import collapsedLogo from "@/assets/logo-collapsed.ico";

const navItems = [
  {
    name: "Attendance",
    icon: <FiClipboard />, // better for attendance tracking
    path: "/assemblynah/search",
  },
  {
    name: "Printing Search",
    icon: <FiPrinter />, // printing-related icon
    path: "/assemblynah/searchprint",
  },
  {
    name: "Report",
    icon: <FiFileText />, // keeps reporting semantic
    path: "/assemblynah/report",
  },
  {
    name: "Display",
    icon: <FiMonitor />, // monitor display
    path: "/assemblynah/display",
  },
  {
    name: "Display Print",
    icon: <BsCardChecklist />, // checklist style, represents display print better
    path: "/assemblynah/displayprint",
  },
  {
    name: "Voting Screen",
    icon: <FiCheckSquare />, // visually shows voting/selection
    path: "/assemblynah/voting",
  },
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [sidebarState, setSidebarState] = useState<
    "expanded" | "collapsed" | "hidden"
  >("expanded");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleSidebar = () => {
    if (sidebarState === "expanded") {
      setSidebarState("collapsed");
    } else if (sidebarState === "collapsed") {
      setSidebarState("hidden");
    } else {
      setSidebarState("expanded");
    }
  };

  const expandSidebar = () => {
    setSidebarState("expanded");
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarState !== "hidden" && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              width: sidebarState === "expanded" ? 288 : 72,
            }}
            exit={{ width: 0 }}
            transition={{ duration: 0.2 }}
            className="hidden md:flex flex-col bg-white shadow-xl border-r border-gray-200 print:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Sidebar header with collapse controls */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                {sidebarState === "expanded" ? (
                  <img src={logo} alt="Logo" className="h-14 w-auto" />
                ) : (
                  <div className="flex flex-col items-center w-full">
                    <img
                      src={collapsedLogo}
                      alt="Logo"
                      className="h-10 w-auto mx-auto mb-2"
                    />
                    <div className="flex gap-1">
                      {/* FiMenu to expand */}
                      <button
                        onClick={() => setSidebarState("expanded")}
                        className="text-gray-700 p-1 hover:bg-gray-200 rounded"
                        title="Expand"
                      >
                        <FiMenu size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation items */}
              <nav className="flex-1 overflow-y-auto mt-6 px-2 space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center p-4 text-base font-semibold rounded-lg transition-colors hover:bg-amber-100 hover:text-amber-700 ${
                        isActive
                          ? "bg-amber-50 text-custom-yellow shadow-inner"
                          : "text-gray-700"
                      } ${sidebarState === "collapsed" ? "justify-center" : ""}`
                    }
                    title={sidebarState === "collapsed" ? item.name : ""}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {sidebarState === "expanded" && (
                      <span className="ml-3">{item.name}</span>
                    )}
                  </NavLink>
                ))}
              </nav>

              {/* Logout button at bottom */}
              <div className="p-4 border-t border-gray-200">
                <Button
                  variant="destructive"
                  className={`flex items-center justify-center ${
                    sidebarState === "collapsed" ? "w-12 px-0" : "w-full"
                  }`}
                  onClick={handleLogout}
                  title={sidebarState === "collapsed" ? "Logout" : ""}
                >
                  <FiLogOut
                    className={sidebarState === "collapsed" ? "" : "mr-2"}
                  />
                  {sidebarState === "expanded" && "Logout"}
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Expand Button (Visible when sidebar is hidden) */}
      {sidebarState === "hidden" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 left-4 z-50 print:hidden"
        >
          <Button
            className="bg-amber-400 hover:bg-amber-500 text-black rounded-full p-3 shadow-lg"
            onClick={expandSidebar}
          >
            <FiChevronRight size={24} />
          </Button>
        </motion.div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md flex items-center justify-between p-6 print:hidden">
          {/* Left side: menu toggle + dynamic header content */}
          <div className="flex items-center gap-4">
            {/* Sidebar toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-18 " // was 8
            >
              {sidebarState === "hidden" ? (
                <FiMenu size={28} />
              ) : (
                <FiChevronLeft size={28} />
              )}
            </Button>

            {/* Dynamic header content */}
            {sidebarState === "hidden" ? (
              <div className="flex items-center gap-2">
                <img src={logo} alt="Logo" className="h-14 w-auto" />
                <span className="font-semibold text-lg text-gray-800 pl-6">
                  Assembly Dashboard
                </span>
              </div>
            ) : sidebarState === "collapsed" ? (
              <h1 className="text-xl font-bold text-gray-800 hidden md:block">
                Welcome to Assembly Dashboard
              </h1>
            ) : (
              <h1 className="text-xl font-bold text-gray-800 hidden md:block">
                Welcome to Assembly Dashboard
              </h1>
            )}
          </div>

          {/* Right side: slogan or nothing */}
          <div className="flex items-center gap-2">
            {sidebarState === "expanded" ? (
              <img src={slogan} alt="Slogan" className="h-10 w-auto" />
            ) : sidebarState === "collapsed" ? (
              <img src={logo} alt="Slogan" className="h-10 w-auto" />
            ) : (
              <img src={slogan} alt="Slogan" className="h-10 w-auto" />
            )}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Card className="p-6 shadow-lg border border-gray-100 rounded-xl">
            <CardContent>
              <Outlet />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
