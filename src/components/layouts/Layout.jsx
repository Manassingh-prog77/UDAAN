import { useState, useEffect } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  Link,
} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Home,BriefcaseBusiness, 
  CalendarCheck,
  Cable,
  Lock,
  GraduationCap,
  MessageSquare,
  BarChart2,
  Maximize2,
  Minimize2,
  MapPin,
  UsersRound
} from "lucide-react";


const MOBILE_BREAKPOINT = 1024;

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(
    window.innerWidth >= MOBILE_BREAKPOINT
  );
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < MOBILE_BREAKPOINT
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();
  const {  user } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(timeInterval);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date);
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    {
      icon: MessageSquare,
      label: "Career Path",
      path: "/dashboard/investigation",
    },
    {
      icon: UsersRound,
      label: "AI Consultant",
      path: "/dashboard/generate",
      isPro:true
    },
    {
      icon: Cable,
      label: "Industry Link",
      path: "/dashboard/analysis",
      isPro: true,
    },
    {
      icon: CalendarCheck,
      label: "Level Up",
      develop:true,
      disable:true
    },
    {
      icon: BriefcaseBusiness,
      label: "Career Simulation",
      path: "/dashboard/experince",
    },
    { icon: BarChart2, label: "Budget Buddy", path: "/dashboard/knowledge" },
  ];

  const Navbar = () => (
    <div className="sticky top-0 z-20 bg-black/90 backdrop-blur-xl border-b border-cyan-500/20">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="p-2 cursor-pointer rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors">
            {isSidebarOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {menuItems.find((item) => item.path === location.pathname)?.label ||
              "Command Center"}
          </h1>
        </div>

        <div className="flex items-center gap-6">
          {/* Time and Date Display */}
          <div className="hidden lg:flex flex-col items-end">
            <div className="text-cyan-400 text-sm font-medium">
              {formatTime(currentTime)}
            </div>
            <div className="text-gray-400 text-xs">
              {formatDate(currentTime)}
            </div>
          </div>

          {/* Location */}
          <div className="hidden lg:flex items-center gap-2 text-gray-400">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span className="text-sm">New Delhi, India</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleFullscreen}
              className="p-2 cursor-pointer rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors">
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5" />
              ) : (
                <Maximize2 className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-white">
                {user
                  ? `${user.given_name || "User"} ${user.family_name || ""}`
                  : "User"}
              </p>
              <p className="text-cyan-400/80 text-xs">
                {user?.email || "Loading..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Sidebar = () => (
    <aside
      className={`fixed top-0 left-0 z-30 h-screen bg-black/95 backdrop-blur-xl border-r border-cyan-500/20 transition-all duration-300 ${
        isSidebarOpen ? "w-72" : "w-20"
      }`}>
      <div className="p-6 flex items-center gap-3 border-b border-cyan-500/20">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        {isSidebarOpen && (
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            UDAAN AI
          </Link>
        )}
      </div>

      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/dashboard"}
              disabled={item.disable}
              className={({ isActive }) =>
                `flex items-center gap-4 cursor-pointer px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive && !item.disable
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-gray-400 hover:bg-cyan-500/10 hover:text-cyan-400"
                }`
              }>
              <item.icon className="w-5 h-5" />
              {isSidebarOpen && (
                <div className="flex items-center">
                  <span className="font-medium tracking-wide">
                    {item.label}
                  </span>
                  {item.isPro && (
                    <span className="ml-2 px-1.5 py-0.5 text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-black rounded-md">
                      PRO
                    </span>
                  )}
                  {item.develop && (
                    <span className="ml-2 px-1.5 py-0.5 text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-black rounded-md">
                      <Lock /> 
                    </span>
                  )}
                </div>
              )}
              {!isSidebarOpen && item.isPro && (
                <span className="absolute top-1 right-1 px-1 py-0.5 text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-black rounded-md">
                  PRO
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen && !isMobile ? "ml-72" : "ml-20"
        }`}>
        <Navbar />

        <main className="flex-1 p-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5" />
          <div className="relative">
            <Outlet />
          </div>
        </main>
      </div>

      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
