import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Package, DollarSign, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const quickStartQuestions = [
  {
    id: 1,
    icon: MessageCircle,
    text: "Які коктейлі тренд цього сезону?",
    prompt: "Розкажи про найпопулярніші коктейльні тренди цього сезону в українському HoReCa"
  },
  {
    id: 2,
    icon: Package,
    text: "Де купити преміум алкоголь?",
    prompt: "Які найкращі постачальники преміум алкоголю в Україні?"
  },
  {
    id: 3,
    icon: DollarSign,
    text: "Як знизити витрати на бар на 20%?",
    prompt: "Дай практичні поради як оптимізувати витрати на бар та збільшити рентабельність"
  }
];

export function MayaChatBanner() {
  const handleQuestionClick = (prompt: string) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('mayaStarterQuestion', prompt);
    }
  };

  return (
    <section
      className="w-full py-12 md:py-16 relative overflow-visible"
      data-testid="maya-chat-banner"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0) 70%)'
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
          className="p-8 md:p-10 rounded-2xl relative overflow-visible"
          style={{
            background: 'rgba(25, 15, 35, 0.4)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 2px 16px rgba(245, 158, 11, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(245, 158, 11, 0.08) 100%)',
              mixBlendMode: 'soft-light'
            }}
          />

          <div className="relative z-10">
            <div className="text-center mb-8 md:mb-10">
              {/* Maya Avatar */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(245, 158, 11, 0.3))',
                      filter: 'blur(20px)',
                      transform: 'scale(1.1)'
                    }}
                  />
                  <img
                    src="/images/maya-avatar.png"
                    alt="Maya - AI експертка HoReCa"
                    className="relative w-[124px] h-[124px] md:w-32 md:h-32 rounded-full object-cover"
                    style={{
                      border: '3px solid rgba(245, 158, 11, 0.4)',
                      boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)'
                    }}
                  />
                </div>
              </div>

              <h2
                className="text-xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-amber-primary to-amber-secondary bg-clip-text text-transparent"
                style={{ lineHeight: '1.2' }}
                data-testid="maya-banner-title"
              >
                Запитайте Maya Gradus - ваша HoReCa експертка
              </h2>
            </div>

            <div className="mb-8">
              <p className="text-center text-text-tertiary text-sm font-medium mb-4">
                Швидкий старт - оберіть питання:
              </p>
              <div className="flex flex-wrap justify-center gap-3 max-w-[900px] mx-auto">
                {quickStartQuestions.map((question) => (
                  <Link
                    key={question.id}
                    href="/chat"
                    onClick={() => handleQuestionClick(question.prompt)}
                    data-testid={`maya-question-${question.id}`}
                  >
                    <button
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full cursor-pointer transition-all duration-300 group hover:scale-105"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(245, 158, 11, 0.2)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(245, 158, 11, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.2)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <question.icon className="w-4 h-4 text-amber-primary shrink-0" />
                      <span className="text-text-primary text-sm font-medium whitespace-nowrap">
                        {question.text}
                      </span>
                    </button>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Link href="/chat" data-testid="maya-cta-button">
                <Button
                  className="px-8 py-3.5 text-base font-semibold rounded-full hover:scale-105 transition-transform duration-200"
                  style={{
                    background: 'linear-gradient(90deg, hsl(var(--amber-primary)) 0%, hsl(var(--amber-secondary)) 100%)',
                    color: 'hsl(263 50% 12%)',
                    boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  }}
                >
                  Почати діалог з Maya
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <p className="flex items-center gap-2 text-xs text-text-secondary font-medium">
                <span className="text-green-500">&#10003;</span>
                Безкоштовно 5 питань на день
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
