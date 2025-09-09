
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Code, Menu, X, User, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
    } finally {
      navigate('/', { replace: true });
      // Force a full reload to reset any lingering in-memory auth state
      try {
        window.location.reload();
      } catch {}
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Tutorials', path: '/tutorials' },
    { name: 'Quizzes', path: '/quizzes' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="glass-nav rounded-2xl px-6 py-4 backdrop-blur-md bg-white/10 border border-white/20 shadow-xl max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-white font-bold text-xl">
            <Code className="w-6 h-6" />
            <span>CodeNow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-white/90 hover:text-white transition-all duration-300 font-medium ${
                  isActive(item.path) ? 'text-white border-b-2 border-white/50' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-3 ml-4">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 text-white/90 hover:text-white transition-all duration-300 font-medium group relative"
                  >
                    <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Dashboard</span>
                    <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </Link>
                  <Link
                    to="/logout"
                    className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-white px-3 py-2 rounded-lg transition-all duration-300 font-medium border border-red-400/30 text-sm whitespace-nowrap"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 text-white/90 hover:text-white transition-all duration-300 font-medium group relative"
                  >
                    <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>Login</span>
                    <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg transition-all duration-300 font-medium border border-white/20 text-sm whitespace-nowrap"
                  >
                    <User className="w-4 h-4" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-white/90 hover:text-white transition-all duration-300 font-medium ${
                    isActive(item.path) ? 'text-white' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="pt-3 border-t border-white/20">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 text-white/90 hover:text-white transition-all duration-300 font-medium py-2"
                    >
                      <User className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/logout"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-white px-3 py-2 rounded-lg transition-all duration-300 font-medium border border-red-400/30 mt-2 text-sm whitespace-nowrap w-full justify-start"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 text-white/90 hover:text-white transition-all duration-300 font-medium py-2"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg transition-all duration-300 font-medium border border-white/20 mt-2 text-sm whitespace-nowrap"
                    >
                      <User className="w-4 h-4" />
                      <span>Sign Up</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
