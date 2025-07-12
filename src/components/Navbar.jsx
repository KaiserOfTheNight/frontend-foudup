import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Menu, X, User, LogOut, ChevronRight, Home } from "lucide-react";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed. Please try again");
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="w-full bg-white/80 border-b border-gray-100 fixed z-50 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
          <Link 
            to="/" 
            className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            FoundUp
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 hover:scale-105 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/explore" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 hover:scale-105 font-medium"
            >
              Explore
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 hover:scale-105 font-medium"
                >
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 flex items-center gap-1 hover:scale-105 font-medium"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 hover:scale-105 font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
                >
                  Join FoundUp
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-600 hover:text-blue-600 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          {/* Overlay with blur effect */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] md:hidden transition-opacity duration-300 ease-in-out"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Sidebar with glass morphism effect */}
          <div 
            className="fixed top-0 right-0 h-full w-64 bg-white/90 backdrop-blur-lg z-[70] shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-gray-200"
            style={{ transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FoundUp
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow p-4 space-y-2">
              <Link 
                to="/" 
                className="block p-3 hover:bg-gray-100/50 rounded-lg transition-all duration-200 hover:translate-x-1 group"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <Home className="h-5 w-5 text-blue-500 group-hover:text-blue-600" />
                  <span className="text-gray-700 group-hover:text-blue-600 font-medium">Home</span>
                </div>
              </Link>
              <Link 
                to="/explore" 
                className="block p-3 hover:bg-gray-100/50 rounded-lg transition-all duration-200 hover:translate-x-1 group"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <ChevronRight className="h-5 w-5 text-blue-500 group-hover:text-blue-600" />
                  <span className="text-gray-700 group-hover:text-blue-600 font-medium">Explore</span>
                </div>
              </Link>

              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="block p-3 hover:bg-gray-100/50 rounded-lg transition-all duration-200 hover:translate-x-1 group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-blue-500 group-hover:text-blue-600" />
                      <span className="text-gray-700 group-hover:text-blue-600 font-medium">Profile</span>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left p-3 hover:bg-gray-100/50 rounded-lg flex items-center gap-3 transition-all duration-200 hover:translate-x-1 group"
                  >
                    <LogOut className="h-5 w-5 text-blue-500 group-hover:text-blue-600" />
                    <span className="text-gray-700 group-hover:text-blue-600 font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block p-3 hover:bg-gray-100/50 rounded-lg transition-all duration-200 hover:translate-x-1 group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-blue-500 group-hover:text-blue-600" />
                      <span className="text-gray-700 group-hover:text-blue-600 font-medium">Login</span>
                    </div>
                  </Link>
                  <Link 
                    to="/register" 
                    className="block p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-center mt-4 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Join FoundUp
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}