import { Code, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Reusable layered background with aurora blobs, dot grid, and vignette
type BgVariant = 'halo' | 'mesh' | 'aurora-lite';
function Background({ variant = 'halo' }: { variant?: BgVariant }) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* Base */}
      <div className="absolute inset-0 bg-[#0B1120]" />

      {/* Shared soft radial highlight at top to pull focus */}
      <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_50%_-200px,rgba(56,189,248,0.10),transparent)]" />

      {/* Variants */}
      {variant === 'halo' && (
        <>
          {/* Subtle center ring built with a conic gradient, masked to a thin band */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'conic-gradient(from 0deg at 50% 40%, rgba(59,130,246,0.12), rgba(34,197,94,0.06), rgba(59,130,246,0.12))',
              maskImage:
                'radial-gradient(50% 35% at 50% 40%, transparent 28%, black 32%, black 60%, transparent 66%)',
              WebkitMaskImage:
                'radial-gradient(50% 35% at 50% 40%, transparent 28%, black 32%, black 60%, transparent 66%)',
            }}
          />
          {/* Faint grid only in the center (heavily masked) */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(60% 60% at 50% 40%, black 0%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(60% 60% at 50% 40%, black 0%, transparent 100%)',
            }}
          />
        </>
      )}

      {variant === 'mesh' && (
        <>
          {/* Minimal mesh gradient made of two soft radials */}
          <div className="absolute inset-0 bg-[radial-gradient(700px_500px_at_20%_80%,rgba(139,92,246,0.10),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(700px_500px_at_85%_50%,rgba(34,197,94,0.08),transparent)]" />
        </>
      )}

      {variant === 'aurora-lite' && (
        <>
          {/* No animation; just two low-contrast blobs for a hint of color */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[30rem] w-[30rem] rounded-full blur-3xl bg-gradient-to-r from-cyan-400/15 via-indigo-400/10 to-emerald-400/15" />
          <div className="absolute bottom-[-10%] right-[-5%] h-[26rem] w-[26rem] rounded-full blur-3xl bg-gradient-to-tr from-emerald-400/10 via-cyan-400/10 to-blue-400/10" />
        </>
      )}
    </div>
  );
}

const tutorials = [
  {
    id: 2,
    slug: 'linux-essentials',
    title: 'Linux Essentials',
    description: 'Master Linux fundamentals from terminal basics to system administration',
    duration: '8 hours',
    students: 892,
    rating: 4.9,
    level: 'Beginner',
    image: '🐧',
  },
  {
    id: 7,
    slug: 'python-beginner',
    title: 'Python (Beginner → Intermediate)',
    description: 'Structured 7-unit path covering Python basics to projects',
    duration: '~12 hours',
    students: 0,
    rating: 4.9,
    level: 'Beginner',
    image: '🐍',
  },
  {
    id: 5,
    title: 'Node.js Backend',
    description: 'Build scalable server-side applications with Node.js and Express',
    duration: '7 hours',
    students: 743,
    rating: 4.8,
    level: 'Advanced',
    image: '🔧',
  },
  {
    id: 6,
    title: 'Mobile App Development',
    description: 'Create cross-platform mobile apps using React Native',
    duration: '10 hours',
    students: 615,
    rating: 4.5,
    level: 'Advanced',
    image: '📱',
  },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner':
      return 'text-green-300 bg-green-500/20';
    case 'Intermediate':
      return 'text-yellow-300 bg-yellow-500/20';
    case 'Advanced':
      return 'text-red-300 bg-red-500/20';
    default:
      return 'text-blue-300 bg-blue-500/20';
  }
};

export default function Tutorials() {
  return (
    <div className="relative min-h-screen pt-24 pb-10 px-4">
      <Background variant="halo" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="rounded-3xl p-8 backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)] max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-4">Interactive Tutorials</h1>
            <p className="text-white/80 text-xl">Explore our comprehensive collection of coding tutorials designed for all skill levels</p>
          </div>
        </div>

        {/* Tutorials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className="rounded-2xl p-6 backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
            >
              <div className="text-4xl mb-4">{tutorial.image}</div>

              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(tutorial.level)}`}>{tutorial.level}</span>
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-white/80 text-sm">{tutorial.rating}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">{tutorial.title}</h3>

              <p className="text-white/70 mb-4 text-sm leading-relaxed">{tutorial.description}</p>

              <div className="flex items-center justify-between text-white/60 text-sm mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{tutorial.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{tutorial.students.toLocaleString()}</span>
                </div>
              </div>

              {'slug' in tutorial ? (
                <Link to={`/tutorials/${(tutorial as any).slug}`}>
                  <button className="w-full bg-cyan-600/80 hover:bg-cyan-600 text-white py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 group">
                    <span>Start Tutorial</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              ) : (
                <button disabled className="w-full bg-white/10 text-white/60 py-3 rounded-xl font-medium transition-all duration-300">Coming Soon</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
