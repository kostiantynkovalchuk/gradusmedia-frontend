import { useState, useEffect } from "react";
import { Link } from "wouter";
import { MessageCircle } from "lucide-react";

export function FloatingChatBubble() {
  const [isVisible, setIsVisible] = useState(false);
  const [freeQuestions, setFreeQuestions] = useState(5);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsVisible(scrolled > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const remaining = localStorage.getItem('mayaQuestionsRemaining') || '5';
      setFreeQuestions(parseInt(remaining));
    }
  }, []);

  if (!isVisible) return null;

  return (
    <Link 
      href="/chat" 
      className="fixed bottom-8 right-8 z-[999] no-underline group"
      data-testid="floating-chat-bubble"
    >
      <div 
        className="relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:-translate-y-1"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--amber-primary)) 0%, hsl(var(--amber-secondary)) 100%)',
          boxShadow: '0 4px 24px rgba(245, 158, 11, 0.4), 0 0 0 0 rgba(245, 158, 11, 0.4)'
        }}
      >
        <div 
          className="absolute inset-[-4px] rounded-full -z-10 animate-ripple"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--amber-primary)) 0%, hsl(var(--amber-secondary)) 100%)',
            opacity: 0.3
          }}
        />
        
        <MessageCircle 
          className="w-7 h-7 relative z-10" 
          style={{ color: 'hsl(263 50% 12%)' }}
        />

        {freeQuestions > 0 && (
          <div 
            className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white z-20"
            style={{
              background: '#ef4444',
              border: '2px solid hsl(var(--bg-dark))'
            }}
            data-testid="questions-badge"
          >
            {freeQuestions}
          </div>
        )}
      </div>

      <div 
        className="absolute bottom-1/2 right-full mr-3 translate-y-1/2 px-4 py-2 rounded-lg whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'rgba(26, 15, 46, 0.95)',
          backdropFilter: 'blur(10px)',
          color: '#fafafa',
          fontSize: '14px',
          fontWeight: 500,
          border: '1px solid rgba(245, 158, 11, 0.2)'
        }}
      >
        Чат з Alex
        <div 
          className="absolute top-1/2 left-full -translate-y-1/2"
          style={{
            borderWidth: '6px',
            borderStyle: 'solid',
            borderColor: 'transparent transparent transparent rgba(26, 15, 46, 0.95)'
          }}
        />
      </div>

      <style>{`
        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 2s ease-out infinite;
        }
      `}</style>
    </Link>
  );
}
