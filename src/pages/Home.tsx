
import { ArrowRight, Play, Users, BookOpen, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-ambient">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="glass-container rounded-3xl p-12 backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Learn to Code.
              <br />
              <span className="text-blue-200">Build the Future.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto">
              CodeNow empowers learners worldwide with interactive coding tutorials, 
              hands-on projects, and a supportive community to master technology skills.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/tutorials"
                className="glass-button bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center space-x-2 group"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="glass-button bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/30 transition-all duration-300 flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose CodeNow?</h2>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with proven learning methods
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card rounded-2xl p-8 backdrop-blur-md bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Interactive Tutorials</h3>
              <p className="text-white/70">
                Learn by doing with hands-on coding exercises and real-world projects
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 backdrop-blur-md bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-purple-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Community Support</h3>
              <p className="text-white/70">
                Connect with fellow learners and experienced mentors in our vibrant community
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 backdrop-blur-md bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-green-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Skill Certification</h3>
              <p className="text-white/70">
                Earn recognized certificates to showcase your coding achievements
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
