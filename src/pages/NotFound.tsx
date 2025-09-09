import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-center bg-gradient-ambient bg-grid-pattern pt-24 pb-8 px-4">
      <div className="text-center glass-container rounded-3xl p-8 backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-white/80 mb-6">Oops! Page not found</p>
        <a href="/" className="glass-button bg-blue-500/20 hover:bg-blue-500/30 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 inline-flex items-center space-x-2">
          <span>Return to Home</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
