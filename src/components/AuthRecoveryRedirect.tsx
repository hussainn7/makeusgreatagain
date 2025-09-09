import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const AuthRecoveryRedirect = () => {
  const { isPasswordRecovery } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const processRecovery = async () => {
      const hash = window.location.hash || '';
      const params = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash);
      const type = params.get('type');
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      const hasRecoveryHash = type === 'recovery';

      if ((isPasswordRecovery || hasRecoveryHash) && location.pathname !== '/update-password') {
        try {
          if (hasRecoveryHash && accessToken && refreshToken) {
            await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Error establishing recovery session:', err);
        } finally {
          // Remove the hash so we don't re-process the recovery params
          try {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          } catch {}
          navigate('/update-password', { replace: true });
        }
      }
    };

    processRecovery();
  }, [isPasswordRecovery, navigate, location.pathname]);

  return null;
};

export default AuthRecoveryRedirect;


