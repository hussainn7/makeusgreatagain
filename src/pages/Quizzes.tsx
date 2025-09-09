
import { Brain, Trophy, Clock, CheckCircle, Target, ArrowRight } from 'lucide-react';

const Quizzes = () => {
  const quizzes = [
    {
      id: 1,
      title: "JavaScript Basics Quiz",
      description: "Test your knowledge of JavaScript fundamentals and core concepts",
      questions: 20,
      duration: "15 min",
      difficulty: "Beginner",
      completed: true,
      score: 85,
      icon: "💻"
    },
    {
      id: 2,
      title: "React Components Challenge",
      description: "Advanced quiz covering React hooks, state management, and components",
      questions: 25,
      duration: "20 min",
      difficulty: "Intermediate",
      completed: false,
      score: null,
      icon: "⚛️"
    },
    {
      id: 3,
      title: "CSS Flexbox & Grid",
      description: "Master modern CSS layout techniques with practical questions",
      questions: 15,
      duration: "12 min",
      difficulty: "Beginner",
      completed: true,
      score: 92,
      icon: "🎨"
    },
    {
      id: 4,
      title: "Python Data Structures",
      description: "Challenge yourself with Python lists, dictionaries, and algorithms",
      questions: 30,
      duration: "25 min",
      difficulty: "Intermediate",
      completed: false,
      score: null,
      icon: "🐍"
    },
    {
      id: 5,
      title: "Advanced Node.js",
      description: "Deep dive into server-side JavaScript and backend development",
      questions: 35,
      duration: "30 min",
      difficulty: "Advanced",
      completed: false,
      score: null,
      icon: "🔧"
    },
    {
      id: 6,
      title: "Database Design Quiz",
      description: "Test your understanding of SQL, database design, and optimization",
      questions: 22,
      duration: "18 min",
      difficulty: "Intermediate",
      completed: true,
      score: 78,
      icon: "🗄️"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-300 bg-green-500/20';
      case 'Intermediate': return 'text-yellow-300 bg-yellow-500/20';
      case 'Advanced': return 'text-red-300 bg-red-500/20';
      default: return 'text-blue-300 bg-blue-500/20';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-300';
    if (score >= 70) return 'text-yellow-300';
    return 'text-red-300';
  };

  return (
    <div className="bg-gradient-ambient bg-grid-pattern pt-24 pb-8 px-4 relative overflow-hidden">
      {/* Coming Soon Overlay */}
      <div className="absolute inset-0 z-20 flex items-start justify-center">
        <div className="absolute inset-0 backdrop-blur-2xl bg-black/40" />
        <div className="relative z-10 text-center pt-28 md:pt-40">
          <div className="inline-flex items-center gap-2 glass-container rounded-full px-6 py-3 mb-4">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-white/80 text-sm font-medium">Coming Soon</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">Arriving on 8/18</h2>
          <p className="text-white/70">Get ready for interactive quizzes</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="glass-container rounded-3xl p-8 backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-4">Coding Quizzes</h1>
            <p className="text-white/80 text-xl">
              Challenge yourself with interactive quizzes and track your learning progress
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card rounded-2xl p-6 backdrop-blur-md bg-white/5 border border-white/10 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-blue-300" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">3</h3>
            <p className="text-white/70">Quizzes Completed</p>
          </div>

          <div className="glass-card rounded-2xl p-6 backdrop-blur-md bg-white/5 border border-white/10 text-center">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-6 h-6 text-yellow-300" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">85%</h3>
            <p className="text-white/70">Average Score</p>
          </div>

          <div className="glass-card rounded-2xl p-6 backdrop-blur-md bg-white/5 border border-white/10 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-green-300" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">12</h3>
            <p className="text-white/70">Skill Points</p>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="glass-card rounded-2xl p-6 backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{quiz.icon}</div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                  {quiz.completed && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                {quiz.title}
              </h3>

              <p className="text-white/70 mb-4 text-sm leading-relaxed">
                {quiz.description}
              </p>

              <div className="flex items-center justify-between text-white/60 text-sm mb-4">
                <span>{quiz.questions} questions</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{quiz.duration}</span>
                </div>
              </div>

              {quiz.completed && quiz.score && (
                <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">Your Score:</span>
                    <span className={`font-bold ${getScoreColor(quiz.score)}`}>
                      {quiz.score}%
                    </span>
                  </div>
                </div>
              )}

              <button className="w-full glass-button bg-purple-500/20 hover:bg-purple-500/30 text-white py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 group">
                <span>{quiz.completed ? 'Retake Quiz' : 'Start Quiz'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
