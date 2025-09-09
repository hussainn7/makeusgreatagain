import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, Mail, Calendar, Award, Settings, Activity, BookOpen, Sparkles, Copy } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

const Label = ({ icon: Icon, label, children }: { icon: any; label: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-3">
    <span className="inline-grid place-items-center rounded-xl bg-white/10 border border-white/10 p-1.5">
      <Icon className="w-4 h-4 text-cyan-300" />
    </span>
    <span className="text-white/70 text-sm w-28 shrink-0">{label}</span>
    <span className="text-white font-medium truncate">{children}</span>
  </div>
);

export default function Dashboard() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const name = useMemo(
    () => profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'New member',
    [profile?.full_name, user?.user_metadata, user?.email]
  );

  const memberSince = useMemo(() => {
    const raw = (user?.created_at as unknown as string) || profile?.created_at;
    try { return raw ? new Date(raw).toLocaleDateString() : 'Recently'; } catch { return 'Recently'; }
  }, [user?.created_at, profile?.created_at]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/', { replace: true });
    try { window.location.reload(); } catch {}
  };

  const copyEmail = async () => {
    if (!user?.email) return;
    try { await navigator.clipboard.writeText(user.email); } catch {}
  };

  // Decorative background (shared visual language with Course page)
  const Background = () => (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '22px 22px',
      }} />
      <div className="absolute -top-28 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/40 via-cyan-400/30 to-emerald-400/30 blur-3xl" />
    </div>
  );

  return (
    <div className="relative min-h-screen px-4 pb-20">
      <Background />

      {/* Header */}
      <header className="mx-auto max-w-5xl pt-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <Card className="rounded-3xl bg-white/5 backdrop-blur-xl border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 grid place-items-center">
                    <User className="w-8 h-8 text-cyan-300" />
                  </div>
                  <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">Welcome back, {name}</h1>
                  <p className="text-white/70">Manage your account, track progress, and jump into learning.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button asChild variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  <Link to="/settings"><Settings className="w-4 h-4 mr-2" /> Settings</Link>
                </Button>
                <Button onClick={handleSignOut} className="bg-rose-600/80 hover:bg-rose-600 text-white">
                  <LogOut className="w-4 h-4 mr-2" /> Sign out
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </header>

      {/* Content Grid */}
      <main className="mx-auto max-w-5xl mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account Info */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }} className="lg:col-span-2">
          <Card className="rounded-3xl bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Account Information</CardTitle>
              <CardDescription className="text-white/70">Your basic profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label icon={User} label="Name">{name}</Label>
              <div className="flex items-center gap-3">
                <span className="inline-grid place-items-center rounded-xl bg-white/10 border border-white/10 p-1.5">
                  <Mail className="w-4 h-4 text-cyan-300" />
                </span>
                <span className="text-white/70 text-sm w-28 shrink-0">Email</span>
                <span className="text-white font-medium truncate">{user?.email}</span>
                <Button size="icon" variant="ghost" onClick={copyEmail} className="ml-auto hover:bg-white/10 text-white">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Label icon={Calendar} label="Member since">{memberSince}</Label>
            </CardContent>
          </Card>
        </motion.section>

        {/* Quick Actions */}
        <motion.aside initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}>
          <Card className="rounded-3xl bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-white/70">Jump right in</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3">
              <Button asChild className="justify-start gap-2 bg-cyan-600/80 hover:bg-cyan-600 text-white">
                <Link to="/tutorials"><BookOpen className="w-4 h-4" /> Start learning</Link>
              </Button>
              <Button asChild variant="secondary" className="justify-start gap-2 bg-white/10 text-white border-white/20 hover:bg-white/20">
                <Link to="/quizzes"><Activity className="w-4 h-4" /> Take a quiz</Link>
              </Button>
              <Button asChild variant="secondary" className="justify-start gap-2 bg-white/10 text-white border-white/20 hover:bg-white/20">
                <Link to="/achievements"><Award className="w-4 h-4" /> View achievements</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.aside>


      </main>
    </div>
  );
}
