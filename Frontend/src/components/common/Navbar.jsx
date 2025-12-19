import { useState,useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/clerk-react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";

const BladeNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  //PWA
 const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Prevent auto popup
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("User accepted PWA install");
    }
    setDeferredPrompt(null);
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
  };

  const getActiveLink = () => {
    const path = location.pathname;
    if (path === "/") return "Home";
    if (path === "/about") return "About";
    if (path === "/blog") return "Blog";
    if (path === "/contact") return "Contact";
    if (path === "/playlists") return "Martial Playlists";
    return "";
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
    { name: "Martial Playlists", path: "/playlists" },
  ];

  const getBladeTabClass = (active) =>
    `${isDarkMode ? "blade-tab-dark" : "blade-tab"}${active ? " active" : ""}`;

  const getMobileBladeTabClass = (active) =>
    `${isDarkMode ? "mobile-blade-tab-dark" : "mobile-blade-tab"}${active ? " active" : ""}`;

  return (
    <div className="font-sans">
      <nav
        className={`backdrop-blur-xl ${isDarkMode ? "bg-black/30 drop " : "bg-white/10"} fixed top-0 left-0 right-0 z-40 px-6 py-3 h-16 flex items-center justify-between transition-colors duration-500`}
        style={{ borderColor: isDarkMode ? "#2A2A2A" : "#E5E7EB" }}
      >
        <button onClick={handleHomeClick} className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-[#ffffff] to-[#444444] rounded-lg flex items-center justify-center transform rotate-45">
              <span className="transform -rotate-45 font-bold text-white text-lg">
                <img src="/logo.png" alt="Logo" />
              </span>
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#E63946] to-[#FF4B3E] bg-clip-text text-transparent tracking-wider">
            MartialVerse
          </div>
        </button>

        <div className="hidden md:flex items-center h-12">
   {navLinks.map((link) => {
  const isActive = getActiveLink() === link.name;

  const linkProps = {
    className:
      getBladeTabClass(isActive) +
      " h-full px-5 flex items-center justify-center relative rounded-md transition-colors duration-300 mx-[1px]",
    "aria-current": isActive ? "page" : undefined,
  };

  return link.name === "Home" ? (
    <button key={link.name} onClick={handleHomeClick} {...linkProps}>
      <span className="blade-label font-medium text-sm uppercase tracking-wider">
        {link.name}
      </span>
    </button>
  ) : (
    <Link key={link.name} to={link.path} {...linkProps}>
      <span className="blade-label font-medium text-sm uppercase tracking-wider">
        {link.name}
      </span>
    </Link>
  );
})}

        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`w-8 h-8 rounded-md border flex items-center justify-center transition-colors duration-300 ${isDarkMode ? "bg-[#1F1F1F] border-[#2A2A2A] text-[#E0E0E0] blade-tab-dark" : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 blade-tab"}`}
            aria-label="Toggle theme"
          >
            <span className="blade-label font-medium text-sm uppercase tracking-wider">
              {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
            </span>
          </button>

          <SignedIn>
            <Link
              to="/admin"
              className={
                getBladeTabClass(false) +
                " hidden sm:flex px-4 py-2 rounded-md border text-sm font-medium transition-colors"
              }
            >
              <span className="blade-label">Admin Panel</span>
            </Link>
          </SignedIn>

          <div className="flex items-center gap-3">
            <SignedIn className={`border ${isDarkMode ? "border-red-600" : "border-gray-300"}`}>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <button
                  className={`sm:hidden hidden md:flex px-4 py-2 blade-tab rounded-md border text-sm font-medium transition-colors ${isDarkMode ? "blade-tab-dark bg-[#1F1F1F] border-[#2A2A2A] text-[#E0E0E0] hover:bg-[#2A2A2A]" : "blade-tab bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"}`}
                >
                  <span className="blade-label">Sign In</span>
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden ${isDarkMode ? "text-[#E0E0E0]" : "text-gray-700"}`}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

   {mobileMenuOpen && (
  <div
    className={`md:hidden backdrop-blur-md fixed top-24 left-0 right-0 z-50 p-4 transition-colors ${
      isDarkMode
        ? "bg-[#1F1F1F]/40 text-[#E0E0E0]"
        : "bg-white/50 text-gray-700"
    }`}
  >
    <div className="flex flex-col gap-3">
      {navLinks.map((link) => {
        const isActive = getActiveLink() === link.name;
        return (
          <Link
            key={link.name} // ✅ key applied directly, no props spread
            to={link.path}
            className={
              getMobileBladeTabClass(isActive) +
              " py-3 px-4 rounded-md transition-colors"
            }
            aria-current={isActive ? "page" : undefined}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="blade-label font-medium text-sm uppercase tracking-wider">
              {link.name}
            </span>
          </Link>
        );
      })}

      <SignedIn>
        <Link
          key="admin-link" 
          to="/admin"
          onClick={() => setMobileMenuOpen(false)}
          className={
            getMobileBladeTabClass(false) + " py-3 px-4 rounded-md mt-2"
          }
        >
          <span className="blade-label">Admin Panel</span>
        </Link>
      </SignedIn>

      {/* Install App Button — only shows if available */}
      {!isInstalled && deferredPrompt && (
        <button
          onClick={handleInstallClick}
          className={`w-full flex justify-center items-center py-3 px-4 rounded-md mt-2 font-semibold text-white transition-colors ${
            isDarkMode
              ? "bg-green-700 hover:bg-green-800"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Install App
        </button>
      )}
    </div>
  </div>
)}

    </div>
  );
};

export default BladeNavbar;
