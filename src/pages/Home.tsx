
import { ArrowRight, Play, Users, BookOpen, Award, Code2, Sparkles, Zap, Target, TrendingUp, Star, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const floatingElements = [
    { icon: Code2, delay: '0s', duration: '6s', size: 'w-8 h-8', color: 'text-blue-300' },
    { icon: Sparkles, delay: '1s', duration: '8s', size: 'w-6 h-6', color: 'text-purple-300' },
    { icon: Zap, delay: '2s', duration: '7s', size: 'w-7 h-7', color: 'text-yellow-300' },
    { icon: Target, delay: '0.5s', duration: '9s', size: 'w-6 h-6', color: 'text-green-300' },
    { icon: TrendingUp, delay: '1.5s', duration: '6.5s', size: 'w-7 h-7', color: 'text-pink-300' },
    { icon: Star, delay: '2.5s', duration: '8.5s', size: 'w-6 h-6', color: 'text-cyan-300' },
  ];

  return (
    <div className="min-h-screen bg-gradient-floating relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs with new animation */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full animate-float-orb"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-sky-400/15 rounded-full animate-float-orb-delayed"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-cyan-500/25 rounded-full animate-float-orb-slow"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-blue-400/18 rounded-full animate-float-orb-reverse"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-sky-300/20 rounded-full animate-float-orb-fast"></div>
        <div className="absolute top-1/4 right-1/3 w-12 h-12 bg-blue-300/30 rounded-full animate-float-orb-gentle"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
        
        {/* Floating code elements */}
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute animate-float-${index + 1} ${element.color} opacity-30`}
            style={{
              left: `${10 + (index * 15)}%`,
              top: `${20 + (index * 10)}%`,
              animationDelay: element.delay,
              animationDuration: element.duration,
            }}
          >
            <element.icon className={element.size} />
          </div>
        ))}
      </div>

      {/* Interactive cursor follower */}
      <div
        className="absolute w-96 h-96 bg-gradient-radial from-blue-400/20 to-transparent rounded-full pointer-events-none transition-transform duration-300 ease-out blur-xl"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transform: `translate3d(0, ${scrollY * 0.2}px, 0)`,
        }}
      ></div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20 relative">
        <div className="text-center max-w-5xl mx-auto relative z-10">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 glass-container rounded-full px-6 py-3 mb-8 animate-fade-in-up">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white/80 text-sm font-medium">🚀 Now with AI-Powered Learning</span>
          </div>

          <div className="glass-container rounded-3xl p-16 backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl relative overflow-hidden animate-fade-in-up animation-delay-200">
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl"></div>
            
            {/* Animated particles inside container */}
            <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
            <div className="absolute top-20 right-16 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping animation-delay-1000"></div>
            <div className="absolute bottom-16 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-ping animation-delay-2000"></div>
            
            <div className="relative z-10">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight animate-fade-in-up animation-delay-400">
                Learn to
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                  Code Smart.
                </span>
                <span className="text-5xl md:text-7xl text-blue-200 animate-fade-in-up animation-delay-600">
                  Build the Future.
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in-up animation-delay-800">
                Join thousands of learners mastering technology with 
                <span className="text-blue-300 font-semibold"> AI-powered tutorials</span>, 
                <span className="text-purple-300 font-semibold"> interactive challenges</span>, and 
                <span className="text-cyan-300 font-semibold"> real-world projects</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-1000">
                <Link
                  to="/tutorials"
                  className="group glass-button bg-gradient-to-r from-blue-500/30 to-purple-500/30 hover:from-blue-500/40 hover:to-purple-500/40 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-500 flex items-center space-x-3 transform hover:scale-105 hover:shadow-2xl animate-pulse-glow"
                >
                  <span>Start Learning Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </Link>
                
                <button className="group glass-button bg-transparent hover:bg-white/10 text-white px-10 py-5 rounded-full font-semibold text-lg border border-white/30 transition-all duration-500 flex items-center space-x-3 hover:shadow-xl transform hover:scale-105">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Scroll indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <ChevronDown className="w-6 h-6 text-white/60" />
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in-up animation-delay-1200">
            <div className="glass-card rounded-2xl p-6 backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">50K+</div>
              <div className="text-white/70">Active Learners</div>
            </div>
            <div className="glass-card rounded-2xl p-6 backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-white/70">Tutorials</div>
            </div>
            <div className="glass-card rounded-2xl p-6 backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">98%</div>
              <div className="text-white/70">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-32 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 glass-container rounded-full px-6 py-3 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-white/80 text-sm font-medium">Why Choose CodeNow?</span>
            </div>
            <h2 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Revolutionary Learning Experience
            </h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto leading-relaxed">
              Our platform combines cutting-edge AI technology with proven learning methods to deliver 
              an unparalleled coding education experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="glass-card rounded-3xl p-10 backdrop-blur-md bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-all duration-500 group transform hover:scale-105 hover:shadow-2xl animate-fade-in-up animation-delay-200">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                  <BookOpen className="w-10 h-10 text-blue-300 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-full animate-spin-slow"></div>
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-blue-500/10 rounded-full animate-ping"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-blue-200 transition-colors duration-300">
                AI-Powered Interactive Tutorials
              </h3>
              <p className="text-white/70 leading-relaxed">
                Learn with personalized AI guidance, adaptive content, and hands-on coding exercises 
                that adjust to your learning pace and style.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-10 backdrop-blur-md bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-all duration-500 group transform hover:scale-105 hover:shadow-2xl animate-fade-in-up animation-delay-400">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500/30 to-purple-600/30 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                  <Users className="w-10 h-10 text-purple-300 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-600/20 rounded-full animate-spin-slow animation-delay-1000"></div>
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-purple-500/10 rounded-full animate-ping animation-delay-500"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-purple-200 transition-colors duration-300">
                Global Learning Community
              </h3>
              <p className="text-white/70 leading-relaxed">
                Connect with fellow learners worldwide, participate in coding challenges, 
                and get mentorship from experienced developers.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-10 backdrop-blur-md bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-all duration-500 group transform hover:scale-105 hover:shadow-2xl animate-fade-in-up animation-delay-600">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500/30 to-green-600/30 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                  <Award className="w-10 h-10 text-green-300 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 rounded-full animate-spin-slow animation-delay-2000"></div>
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-green-500/10 rounded-full animate-ping animation-delay-1000"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-green-200 transition-colors duration-300">
                Industry-Recognized Certificates
              </h3>
              <p className="text-white/70 leading-relaxed">
                Earn verified certificates and digital badges that showcase your skills 
                to employers and advance your career in tech.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
