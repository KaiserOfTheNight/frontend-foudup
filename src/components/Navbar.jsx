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
      <nav className="w-full bg-white border-b fixed z-50 shadow-sm">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link to="/" className="font-bold text-xl text-blue-600 hover:text-blue-800 transition-colors duration-200">
            SAAS
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="hover:text-blue-600 transition-colors duration-200 hover:scale-105"
            >
              Home
            </Link>
            <Link 
              to="/test" 
              className="hover:text-blue-600 transition-colors duration-200 hover:scale-105"
            >
              Test
            </Link>
            <Link 
              to="/explore" 
              className="hover:text-blue-600 transition-colors duration-200 hover:scale-105"
            >
              Explore
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  className="hover:text-blue-600 transition-colors duration-200 hover:scale-105"
                >
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="hover:text-blue-600 transition-colors duration-200 flex items-center gap-1 hover:scale-105"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="hover:text-blue-600 transition-colors duration-200 hover:scale-105"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
                >
                  Sign Up
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
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[60] md:hidden transition-opacity duration-300 ease-in-out"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <div 
            className="fixed top-0 right-0 h-full w-64 bg-white z-[70] shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out"
            style={{ transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <span className="font-bold text-blue-600">SAAS</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow p-4 space-y-2">
              <Link 
                to="/" 
                className="block p-3 hover:bg-gray-100 rounded transition-colors duration-200 hover:translate-x-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <Home className="h-5 w-5 text-blue-500" />
                  <span>Home</span>
                </div>
              </Link>
              <Link 
                to="/test" 
                className="block p-3 hover:bg-gray-100 rounded transition-colors duration-200 hover:translate-x-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <ChevronRight className="h-5 w-5 text-blue-500" />
                  <span>Test</span>
                </div>
              </Link>

              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="block p-3 hover:bg-gray-100 rounded transition-colors duration-200 hover:translate-x-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-blue-500" />
                      <span>Profile</span>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left p-3 hover:bg-gray-100 rounded flex items-center gap-3 transition-colors duration-200 hover:translate-x-1"
                  >
                    <LogOut className="h-5 w-5 text-blue-500" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block p-3 hover:bg-gray-100 rounded transition-colors duration-200 hover:translate-x-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-blue-500" />
                      <span>Login</span>
                    </div>
                  </Link>
                  <Link 
                    to="/register" 
                    className="block p-3 bg-blue-600 text-white rounded text-center mt-4 hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
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