import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Eye, EyeOff, KeyRound } from 'lucide-react';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      // eslint-disable-next-line no-console
      console.log('[UpdatePassword] Checking session...');
      const { data, error } = await supabase.auth.getSession();
      if (!mounted) return;
      if (error) {
        // eslint-disable-next-line no-console
        console.error('[UpdatePassword] Session check error:', error);
        setError(error.message || 'Failed to check recovery session.');
        setReady(false);
        return;
      }
      if (!data.session) {
        // eslint-disable-next-line no-console
        console.warn('[UpdatePassword] No session found');
        setError('No valid recovery session. Please use the reset link from your email.');
        setReady(false);
        return;
      }
      // eslint-disable-next-line no-console
      console.log('[UpdatePassword] Valid session found');
      setNotice('Please enter a new password.');
      setReady(true);
    })();
    return () => { mounted = false; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setNotice('');

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    // eslint-disable-next-line no-console
    console.log('[UpdatePassword] Starting password update...');
    setLoading(true);

    // Verify we still have a session before trying update
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      // eslint-disable-next-line no-console
      console.error('[UpdatePassword] No session found before update');
      setError('Session expired. Please use the reset link again.');
      setLoading(false);
      return;
    }

    try {
      // eslint-disable-next-line no-console
      console.log('[UpdatePassword] Calling updateUser...');
      
      // Wrap updateUser in a timeout promise
      const updateWithTimeout = Promise.race([
        supabase.auth.updateUser({ password }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Update timed out')), 5000)
        )
      ]);

      // Start a fast redirect timeout - if update takes too long, redirect anyway
      const redirectTimeout = setTimeout(() => {
        // eslint-disable-next-line no-console
        console.warn('[UpdatePassword] Update taking too long, redirecting...');
        window.location.assign('/login');
      }, 2000);

      try {
        const { error } = await updateWithTimeout;
        if (error) throw error;
        
        // Clear timeout since we got a response
        clearTimeout(redirectTimeout);

        // eslint-disable-next-line no-console
        console.log('[UpdatePassword] Password updated successfully');
        
        // Immediate redirect on success
        window.location.assign('/login');
      } catch (err) {
        clearTimeout(redirectTimeout);
        throw err;
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[UpdatePassword] Update error:', err);
      setError(err.message || 'Failed to update password. Try again.');
    } finally {

      setLoading(false);
      // eslint-disable-next-line no-console
      console.log('[UpdatePassword] Loading state cleared');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-floating flex items-center justify-center px-4">
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-container rounded-3xl p-8 backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <KeyRound className="w-8 h-8 text-yellow-300" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Update Password</h1>
            <p className="text-white/70">Enter and confirm your new password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!ready && (
              <div className="text-white/70 text-sm bg-white/5 border border-white/10 rounded-lg p-3">
                {error || notice || 'Checking your recovery session…'}
              </div>
            )}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 pr-12"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-300"
                >
                  {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-white/80 mb-2">
                Confirm Password
              </label>
              <input
                type={show ? 'text' : 'password'}
                id="confirm"
                name="confirm"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                placeholder="Re-enter new password"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                {error}
              </div>
            )}
            {!error && notice && (
              <div className="text-green-300 text-sm text-center bg-green-400/10 border border-green-400/20 rounded-lg p-3">
                {notice}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !ready}
              className="w-full glass-button bg-gradient-to-r from-yellow-500/30 to-orange-500/30 hover:from-yellow-500/40 hover:to-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold text-base transition-all duration-500 flex items-center justify-center space-x-2 transform hover:scale-105 hover:shadow-2xl border border-yellow-400/30 hover:border-yellow-300/50"
            >
              <span>{loading ? 'Updating…' : 'Update Password'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;


