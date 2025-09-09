import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Logout = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        await signOut();
      } finally {
        if (!isMounted) return;
        navigate('/', { replace: true });
        try { window.location.reload(); } catch {}
      }
    })();
    return () => { isMounted = false; };
  }, [signOut, navigate]);

  return (
    <div className="min-h-screen bg-gradient-floating flex items-center justify-center">
      <div className="text-white/80">Signing you out…</div>
    </div>
  );
};

export default Logout;


