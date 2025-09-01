import { Link, useLocation } from "react-router-dom";
import { Menu, X, Twitter } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <nav className="bg-white border-b-4 border-[#8B5CF6] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="font-bold text-2xl text-[#8B5CF6] hover:text-[#D946EF] transition-colors flex items-center gap-2"
          >
            <img 
              src="/lovable-uploads/9487c104-e03f-47b8-8cdc-e17b0ed756b8.png" 
              alt="Snapback Logo" 
              className="h-8 w-8"
            />
            Snapback
          </Link>
          
          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-[#8B5CF6]" />
            ) : (
              <Menu className="h-6 w-6 text-[#8B5CF6]" />
            )}
          </button>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-bold transition-all transform hover:-translate-y-0.5 ${
                isActive("/")
                  ? "bg-[#8B5CF6] text-white shadow-[4px_4px_0px_0px_#6D28D9]"
                  : "bg-[#F3F4F6] text-[#8B5CF6] hover:bg-[#E5DEFF] shadow-[2px_2px_0px_0px_#8B5CF6]"
              }`}
            >
              Home
            </Link>
            <Link
              to="/submit"
              className={`px-4 py-2 rounded-lg font-bold transition-all transform hover:-translate-y-0.5 ${
                isActive("/submit")
                  ? "bg-[#F97316] text-white shadow-[4px_4px_0px_0px_#C2410C]"
                  : "bg-[#F3F4F6] text-[#F97316] hover:bg-[#FED7AA] shadow-[2px_2px_0px_0px_#F97316]"
              }`}
            >
              Submit
            </Link>
            <Link
              to="/status"
              className={`px-4 py-2 rounded-lg font-bold transition-all transform hover:-translate-y-0.5 ${
                isActive("/status")
                  ? "bg-[#0EA5E9] text-white shadow-[4px_4px_0px_0px_#0369A1]"
                  : "bg-[#F3F4F6] text-[#0EA5E9] hover:bg-[#BAE6FD] shadow-[2px_2px_0px_0px_#0EA5E9]"
              }`}
            >
              Status
            </Link>
            <Link
              to="/rewards"
              className={`px-4 py-2 rounded-lg font-bold transition-all transform hover:-translate-y-0.5 ${
                isActive("/rewards")
                  ? "bg-[#D946EF] text-white shadow-[4px_4px_0px_0px_#A21CAF]"
                  : "bg-[#F3F4F6] text-[#D946EF] hover:bg-[#F5D0FE] shadow-[2px_2px_0px_0px_#D946EF]"
              }`}
            >
              Rewards
            </Link>
            <Link
              to="/tweets"
              className={`px-4 py-2 rounded-lg font-bold transition-all transform hover:-translate-y-0.5 flex items-center gap-1 ${
                isActive("/tweets")
                  ? "bg-[#1DA1F2] text-white shadow-[4px_4px_0px_0px_#0C85D0]"
                  : "bg-[#F3F4F6] text-[#1DA1F2] hover:bg-[#E8F5FE] shadow-[2px_2px_0px_0px_#1DA1F2]"
              }`}
            >
              <Twitter className="h-4 w-4" />
              Tweets
            </Link>
          </div>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/"
              onClick={toggleMenu}
              className={`block px-4 py-2 rounded-lg font-bold transition-all ${
                isActive("/")
                  ? "bg-[#8B5CF6] text-white shadow-[4px_4px_0px_0px_#6D28D9]"
                  : "bg-[#F3F4F6] text-[#8B5CF6] hover:bg-[#E5DEFF] shadow-[2px_2px_0px_0px_#8B5CF6]"
              }`}
            >
              Home
            </Link>
            <Link
              to="/submit"
              onClick={toggleMenu}
              className={`block px-4 py-2 rounded-lg font-bold transition-all ${
                isActive("/submit")
                  ? "bg-[#F97316] text-white shadow-[4px_4px_0px_0px_#C2410C]"
                  : "bg-[#F3F4F6] text-[#F97316] hover:bg-[#FED7AA] shadow-[2px_2px_0px_0px_#F97316]"
              }`}
            >
              Submit
            </Link>
            <Link
              to="/status"
              onClick={toggleMenu}
              className={`block px-4 py-2 rounded-lg font-bold transition-all ${
                isActive("/status")
                  ? "bg-[#0EA5E9] text-white shadow-[4px_4px_0px_0px_#0369A1]"
                  : "bg-[#F3F4F6] text-[#0EA5E9] hover:bg-[#BAE6FD] shadow-[2px_2px_0px_0px_#0EA5E9]"
              }`}
            >
              Status
            </Link>
            <Link
              to="/rewards"
              onClick={toggleMenu}
              className={`block px-4 py-2 rounded-lg font-bold transition-all ${
                isActive("/rewards")
                  ? "bg-[#D946EF] text-white shadow-[4px_4px_0px_0px_#A21CAF]"
                  : "bg-[#F3F4F6] text-[#D946EF] hover:bg-[#F5D0FE] shadow-[2px_2px_0px_0px_#D946EF]"
              }`}
            >
              Rewards
            </Link>
            <Link
              to="/tweets"
              onClick={toggleMenu}
              className={`block px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-1 ${
                isActive("/tweets")
                  ? "bg-[#1DA1F2] text-white shadow-[4px_4px_0px_0px_#0C85D0]"
                  : "bg-[#F3F4F6] text-[#1DA1F2] hover:bg-[#E8F5FE] shadow-[2px_2px_0px_0px_#1DA1F2]"
              }`}
            >
              <Twitter className="h-4 w-4" />
              Tweets
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;