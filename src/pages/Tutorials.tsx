
import { Code, Clock, Users, Star, ArrowRight } from 'lucide-react';

const Tutorials = () => {
  const tutorials = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description: "Master the basics of JavaScript programming with interactive exercises",
      duration: "4 hours",
      students: 1234,
      rating: 4.8,
      level: "Beginner",
      image: "🚀"
    },
    {
      id: 2,
      title: "React Development",
      description: "Build modern web applications using React and its ecosystem",
      duration: "8 hours",
      students: 892,
      rating: 4.9,
      level: "Intermediate",
      image: "⚛️"
    },
    {
      id: 3,
      title: "Python for Data Science",
      description: "Learn Python programming for data analysis and machine learning",
      duration: "6 hours",
      students: 1567,
      rating: 4.7,
      level: "Intermediate",
      image: "🐍"
    },
    {
      id: 4,
      title: "Web Design Basics",
      description: "Create beautiful, responsive websites with HTML, CSS, and design principles",
      duration: "5 hours",
      students: 2103,
      rating: 4.6,
      level: "Beginner",
      image: "🎨"
    },
    {
      id: 5,
      title: "Node.js Backend",
      description: "Build scalable server-side applications with Node.js and Express",
      duration: "7 hours",
      students: 743,
      rating: 4.8,
      level: "Advanced",
      image: "🔧"
    },
    {
      id: 6,
      title: "Mobile App Development",
      description: "Create cross-platform mobile apps using React Native",
      duration: "10 hours",
      students: 615,
      rating: 4.5,
      level: "Advanced",
      image: "📱"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-green-300 bg-green-500/20';
      case 'Intermediate': return 'text-yellow-300 bg-yellow-500/20';
      case 'Advanced': return 'text-red-300 bg-red-500/20';
      default: return 'text-blue-300 bg-blue-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-ambient pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="glass-container rounded-3xl p-8 backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-4">Interactive Tutorials</h1>
            <p className="text-white/80 text-xl">
              Explore our comprehensive collection of coding tutorials designed for all skill levels
            </p>
          </div>
        </div>

        {/* Tutorials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className="glass-card rounded-2xl p-6 backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
            >
              <div className="text-4xl mb-4">{tutorial.image}</div>
              
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(tutorial.level)}`}>
                  {tutorial.level}
                </span>
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-white/80 text-sm">{tutorial.rating}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                {tutorial.title}
              </h3>
              
              <p className="text-white/70 mb-4 text-sm leading-relaxed">
                {tutorial.description}
              </p>

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

              <button className="w-full glass-button bg-blue-500/20 hover:bg-blue-500/30 text-white py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 group">
                <span>Start Tutorial</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
