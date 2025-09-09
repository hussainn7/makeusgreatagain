import { useState } from 'react';
import { X, Clock, Sparkles } from 'lucide-react';

interface ComingSoonPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const ComingSoonPopup = ({ 
  isOpen, 
  onClose, 
  title = "Coming Soon!", 
  message = "This feature will be available soon. Stay tuned for updates!" 
}: ComingSoonPopupProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Popup */}
      <div className="relative glass-container rounded-3xl p-8 backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl max-w-md w-full animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors duration-300"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Content */}
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-yellow-300" />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
          
          <p className="text-white/70 text-lg mb-6 leading-relaxed">
            {message}
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-yellow-300 mb-6">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-medium">We're working hard on it!</span>
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-500/30 to-purple-500/30 hover:from-blue-500/40 hover:to-purple-500/40 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 border border-blue-400/30 hover:border-blue-300/50"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPopup; 