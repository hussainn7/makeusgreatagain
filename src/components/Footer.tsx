import { Heart, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center space-x-2">
              {/* <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CN</span>
              </div> */}
              <span className="text-white font-semibold text-lg">CodeNow</span>
            </div>
            <p className="text-white/60 text-sm">
              © {currentYear} CodeNow. Made with <Heart className="inline w-4 h-4 text-red-400" /> for learners worldwide.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className="text-white/60 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-white/60 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-white/60 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:hello@codenow.com" 
              className="text-white/60 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <a href="/about" className="text-white/60 hover:text-white transition-colors duration-200">
                About
              </a>
              <a href="/tutorials" className="text-white/60 hover:text-white transition-colors duration-200">
                Tutorials
              </a>
              <a href="/quizzes" className="text-white/60 hover:text-white transition-colors duration-200">
                Quizzes
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-200">
                Privacy
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-200">
                Terms
              </a>
            </div>
            <div className="text-white/40 text-xs">
              Empowering learners worldwide
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 