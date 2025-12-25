import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Send, MessageCircle, BarChart2, FileText, Target, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

function getSessionId() {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem('mayaSessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('mayaSessionId', sessionId);
  }
  return sessionId;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Привіт! Я Maya від Gradus Media. Чим можу допомогти вашому HoReCa бізнесу сьогодні?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [remainingQuestions, setRemainingQuestions] = useState(5);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const starterQuestion = sessionStorage.getItem('mayaStarterQuestion');
    if (starterQuestion) {
      setInputValue(starterQuestion);
      sessionStorage.removeItem('mayaStarterQuestion');
    }

    const remaining = localStorage.getItem('mayaQuestionsRemaining') || '5';
    setRemainingQuestions(parseInt(remaining));
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    if (remainingQuestions <= 0) {
      return;
    }

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('https://gradus-ai.onrender.com/api/maya/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputValue,
          sessionId: getSessionId()
        })
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.reply || 'Дякую за питання! На жаль, я зараз недоступна. Спробуйте пізніше.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      const newRemaining = remainingQuestions - 1;
      setRemainingQuestions(newRemaining);
      localStorage.setItem('mayaQuestionsRemaining', newRemaining.toString());

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Вибачте, сталася помилка. Спробуйте ще раз пізніше.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickStartQuestions = [
    "Які коктейлі тренд цього сезону?",
    "Кращі постачальники преміум алкоголю?",
    "Як знизити витрати на бар на 20%?",
    "Що потрібно для ліцензії на алкоголь?",
    "Ідеї для літнього коктейльного меню?",
    "Топ-5 українських craft spirits?"
  ];

  const expertiseItems = [
    { icon: MessageCircle, label: "Тренди та інсайти" },
    { icon: BarChart2, label: "Дані ринку" },
    { icon: FileText, label: "Compliance" },
    { icon: Target, label: "Персоналізовано" }
  ];

  return (
    <main className="pt-20 min-h-screen" data-testid="page-chat">
      <section 
        className="py-16 md:py-20"
        style={{
          background: 'linear-gradient(180deg, hsl(263 50% 12%) 0%, hsl(var(--bg-dark)) 100%)'
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-[800px] mx-auto mb-12 rounded-2xl overflow-hidden"
            style={{
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(245, 158, 11, 0.2)'
            }}
          >
            <div 
              className="aspect-video flex items-center justify-center relative"
              style={{
                background: 'linear-gradient(135deg, hsl(263 50% 12%) 0%, hsl(263 45% 18%) 100%)'
              }}
            >
              <div className="text-center px-6 py-12">
                <div 
                  className="w-28 h-28 md:w-32 md:h-32 mx-auto mb-6 rounded-full flex items-center justify-center animate-pulse"
                  style={{
                    background: 'linear-gradient(135deg, hsl(258 90% 66%) 0%, #6366f1 100%)',
                    boxShadow: '0 8px 32px rgba(139, 92, 246, 0.4)'
                  }}
                >
                  <MessageCircle className="w-16 h-16 text-white" />
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-text-primary mb-4">
                  Привіт! Я Maya від Gradus Media
                </h1>
                <p className="text-lg md:text-xl text-text-secondary mb-6">
                  Ваш AI-консультант з HoReCa індустрії
                </p>
                <div 
                  className="inline-block px-6 py-3 rounded-lg text-sm"
                  style={{
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    color: 'hsl(var(--amber-secondary))'
                  }}
                >
                  Відео-презентація буде тут незабаром
                </div>
              </div>
            </div>
          </motion.div>

          <div className="text-center max-w-[900px] mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-text-primary mb-8" style={{ lineHeight: '1.4' }}>
              Не просто новини та тренди, а дієві поради для вашого бізнесу
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[700px] mx-auto">
              {expertiseItems.map((item, i) => (
                <div 
                  key={i}
                  className="flex flex-col items-center gap-2 p-5 rounded-xl text-sm text-text-secondary"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <item.icon className="w-8 h-8 text-amber-primary" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16" data-testid="chat-section">
        <div className="max-w-[1200px] mx-auto px-6">
          {messages.length <= 1 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-12 text-center"
            >
              <h3 className="text-lg text-text-secondary mb-6">
                Швидкий старт - оберіть питання:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-[900px] mx-auto">
                {quickStartQuestions.map((question, i) => (
                  <button
                    key={i}
                    onClick={() => setInputValue(question)}
                    className="px-5 py-4 rounded-xl text-text-primary text-sm transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(245, 158, 11, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    data-testid={`quick-question-${i}`}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <div 
            className="max-w-[900px] mx-auto rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
            data-testid="chat-container"
          >
            <div 
              className="flex justify-between items-center px-6 py-5"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="flex items-center gap-3 text-text-secondary font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Maya онлайн</span>
              </div>
              <div 
                className="px-3 py-1.5 rounded-md text-xs font-semibold"
                style={{
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  color: 'hsl(var(--amber-secondary))'
                }}
                data-testid="questions-counter"
              >
                {remainingQuestions}/5 питань сьогодні
              </div>
            </div>

            <div 
              className="h-[500px] overflow-y-auto p-6 flex flex-col gap-4"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255, 255, 255, 0.1) rgba(255, 255, 255, 0.02)'
              }}
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  data-testid={`message-${index}`}
                >
                  <div 
                    className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center"
                    style={{
                      background: message.role === 'assistant' 
                        ? 'linear-gradient(135deg, hsl(258 90% 66%) 0%, #6366f1 100%)'
                        : 'linear-gradient(135deg, hsl(var(--amber-primary)) 0%, hsl(var(--amber-secondary)) 100%)'
                    }}
                  >
                    {message.role === 'assistant' ? (
                      <MessageCircle className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-lg">&#128100;</span>
                    )}
                  </div>
                  <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : ''} max-w-[70%]`}>
                    <div 
                      className="px-4 py-3 rounded-2xl text-text-primary text-sm leading-relaxed"
                      style={{
                        background: message.role === 'assistant'
                          ? 'rgba(139, 92, 246, 0.15)'
                          : 'rgba(245, 158, 11, 0.15)',
                        border: `1px solid ${message.role === 'assistant' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`,
                        borderTopLeftRadius: message.role === 'assistant' ? '4px' : '16px',
                        borderTopRightRadius: message.role === 'user' ? '4px' : '16px'
                      }}
                    >
                      {message.content}
                    </div>
                    <span className="text-xs text-text-tertiary mt-1 px-1">
                      {message.timestamp.toLocaleTimeString('uk-UA', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div 
                    className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, hsl(258 90% 66%) 0%, #6366f1 100%)'
                    }}
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex gap-1 items-center px-4 py-3">
                    <span className="w-2 h-2 bg-purple-light/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-purple-light/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-purple-light/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form 
              onSubmit={handleSendMessage}
              className="p-5"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="flex gap-3 items-end">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  placeholder="Ваше питання про HoReCa..."
                  className="flex-1 px-4 py-3 rounded-xl resize-none text-text-primary text-sm font-sans transition-all duration-300 focus:outline-none focus:border-amber-primary/30 focus:bg-white/6"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    maxHeight: '120px'
                  }}
                  rows={1}
                  disabled={remainingQuestions <= 0}
                  data-testid="chat-input"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="w-12 h-12 rounded-xl shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--amber-primary)) 0%, hsl(var(--amber-secondary)) 100%)',
                    color: 'hsl(263 50% 12%)'
                  }}
                  disabled={!inputValue.trim() || isLoading || remainingQuestions <= 0}
                  data-testid="send-button"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>

              {remainingQuestions <= 2 && remainingQuestions > 0 && (
                <p 
                  className="mt-3 px-4 py-3 rounded-lg text-center text-sm"
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    color: '#fca5a5'
                  }}
                >
                  Залишилось {remainingQuestions} {remainingQuestions === 1 ? 'питання' : 'питання'}
                </p>
              )}

              {remainingQuestions === 0 && (
                <div 
                  className="mt-3 px-4 py-4 rounded-xl text-center"
                  style={{
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.2)'
                  }}
                >
                  <p className="text-amber-secondary font-medium mb-2">
                    Ви досягли ліміту безкоштовних питань
                  </p>
                  <Link href="#pricing" className="text-amber-primary font-semibold hover:underline">
                    Підписатись для безлімітного доступу
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <section 
        className="py-16"
        style={{
          background: 'linear-gradient(180deg, hsl(var(--bg-dark)) 0%, hsl(263 50% 12%) 100%)'
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-[600px] mx-auto p-10 md:p-12 rounded-2xl text-center"
            style={{
              background: 'linear-gradient(135deg, hsl(263 50% 12%) 0%, hsl(263 45% 18%) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.2)'
            }}
            data-testid="premium-cta"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
              Готові до більшого?
            </h2>
            <p className="text-text-secondary text-lg mb-6">
              Преміум підписка Gradus Media:
            </p>
            <ul className="text-left max-w-[400px] mx-auto mb-6">
              {[
                'Безлімітні питання Maya',
                'Щотижневі звіти з трендів',
                'База постачальників',
                'Особиста консультація щомісяця'
              ].map((feature, i) => (
                <li 
                  key={i}
                  className="flex items-center gap-3 py-3 text-text-secondary"
                  style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <p 
              className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-amber-primary to-amber-secondary bg-clip-text text-transparent"
            >
              Від $7/місяць
            </p>
            <Button
              className="px-10 py-6 text-lg font-semibold rounded-xl"
              style={{
                background: 'linear-gradient(90deg, hsl(var(--amber-primary)) 0%, hsl(var(--amber-secondary)) 100%)',
                color: 'hsl(263 50% 12%)'
              }}
            >
              Дізнатись більше
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
