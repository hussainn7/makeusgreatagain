
import { Heart, Users, Globe, Lightbulb, Target, Star } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-300" />,
      title: "Accessibility",
      description: "We believe coding education should be accessible to everyone, regardless of background or financial situation."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-300" />,
      title: "Community",
      description: "Learning is better together. We foster a supportive community where everyone can grow and succeed."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-300" />,
      title: "Innovation",
      description: "We continuously evolve our teaching methods to provide the most effective and engaging learning experience."
    },
    {
      icon: <Globe className="w-8 h-8 text-green-300" />,
      title: "Impact",
      description: "Our goal is to empower individuals worldwide to build technology solutions that make a positive difference."
    }
  ];

  const stats = [
    { number: "50K+", label: "Students Worldwide" },
    { number: "200+", label: "Interactive Tutorials" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Community Support" }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      description: "Former Google engineer passionate about democratizing tech education",
      emoji: "👩‍💻"
    },
    {
      name: "Marcus Johnson",
      role: "Head of Curriculum",
      description: "20+ years experience in computer science education and curriculum design",
      emoji: "👨‍🏫"
    },
    {
      name: "Elena Rodriguez",
      role: "Community Manager",
      description: "Building bridges between learners and creating inclusive learning environments",
      emoji: "👩‍🤝‍👨"
    }
  ];

  return (
    <div className="bg-gradient-ambient bg-grid-pattern pt-24 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="glass-container rounded-3xl p-8 backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-6">About CodeNow</h1>
            <p className="text-white/80 text-xl leading-relaxed">
              We're on a mission to make coding education accessible, engaging, and effective for learners worldwide. 
              Founded in 2020, CodeNow has grown into a global community of passionate learners and educators 
              united by the belief that everyone deserves the opportunity to learn technology skills.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mb-20">
          <div className="glass-card rounded-3xl p-8 backdrop-blur-md bg-white/5 border border-white/10 text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-purple-300" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
              To empower individuals from all walks of life with the coding skills and technological literacy 
              needed to participate in and shape our digital future. We create pathways for career transformation, 
              innovation, and personal growth through accessible, high-quality coding education.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-8 backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-white/70 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-20">
          <div className="glass-card rounded-3xl p-8 backdrop-blur-md bg-white/5 border border-white/10">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/70 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-8 backdrop-blur-md bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-5xl mb-6">{member.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <div className="text-blue-300 font-medium mb-4">{member.role}</div>
                <p className="text-white/70 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-12">
          <div className="glass-container rounded-3xl p-8 backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
            <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
              Ready to start your coding journey? Join thousands of learners who are already 
              building their future with CodeNow.
            </p>
            <button className="glass-button bg-blue-500/20 hover:bg-blue-500/30 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center space-x-2 mx-auto group">
              <span>Get Started Today</span>
              <Star className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
