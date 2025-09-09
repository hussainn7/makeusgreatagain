import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Eye, EyeOff, LogIn, ArrowLeft } from 'lucide-react';
import ComingSoonPopup from '../components/ComingSoonPopup';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetNotice, setResetNotice] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error when user types
    setResetNotice('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) throw error;

      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setError('');
    setResetNotice('');
    const email = formData.email.trim().toLowerCase();
    if (!email) {
      setError('Enter your email above, then click Reset Password');
      return;
    }
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setIsResetting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
      if (error) throw error;
      setResetNotice('Password reset email sent. Check your inbox.');
    } catch (err) {
      console.error('Reset password error:', err);
      setError(err.message || 'Failed to send reset email. Try again.');
    } finally {
      setIsResetting(false);
    }
  };

  const handleGoogleLogin = () => {
    setShowComingSoon(true);
  };

  return (
    <div className="min-h-screen bg-gradient-floating flex items-center justify-center px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full animate-float-orb"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-500/15 rounded-full animate-float-orb-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-cyan-500/25 rounded-full animate-float-orb-slow"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Login Form */}
        <div className="glass-container rounded-3xl p-8 backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-blue-300" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/70">Sign in to continue your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */
            }
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  disabled={isResetting}
                  className="text-sm text-blue-300 hover:text-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResetting ? 'Sending reset…' : 'Forgot password? Reset'}
                </button>
              </div>
            </div>

            {/* Error / Notice */}
            {error && (
              <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                {error}
              </div>
            )}
            {!error && resetNotice && (
              <div className="text-green-300 text-sm text-center bg-green-400/10 border border-green-400/20 rounded-lg p-3">
                {resetNotice}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full glass-button bg-gradient-to-r from-blue-500/30 to-purple-500/30 hover:from-blue-500/40 hover:to-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold text-base transition-all duration-500 flex items-center justify-center space-x-2 transform hover:scale-105 hover:shadow-2xl border border-blue-400/30 hover:border-blue-300/50"
            >
              <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
              {!isLoading && <LogIn className="w-4 h-4" />}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-white/50">Or continue with</span>
              </div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold text-base transition-all duration-500 flex items-center justify-center space-x-2 border border-white/20 hover:border-white/40"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-white/70 text-sm">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-300 hover:text-blue-200 font-medium transition-colors duration-300">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      
      {/* Coming Soon Popup */}
      <ComingSoonPopup
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        title="Google Sign-In Coming Soon!"
        message="We're working on integrating Google authentication. For now, please use email and password to sign in."
      />
    </div>
  );
};

export default Login; 