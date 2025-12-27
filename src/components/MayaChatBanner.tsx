import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Package, DollarSign, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  },
  {
    id: 4,
    icon: FileText,
    text: "Що треба для ліцензії на алкоголь?",
    prompt: "Поясни процес отримання ліцензії на продаж алкоголю в Україні"
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
      className="w-full py-16 md:py-20 relative overflow-visible"
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
          className="p-10 md:p-14 rounded-2xl relative overflow-visible"
          style={{
            background: 'linear-gradient(135deg, hsl(263 50% 12%) 0%, hsl(263 45% 18%) 50%, hsl(263 50% 12%) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(245, 158, 11, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <div 
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(10px)'
            }}
          />

          <div className="relative z-10">
            <div className="text-center mb-10 md:mb-12">
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
                    className="relative w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
                    style={{
                      border: '3px solid rgba(245, 158, 11, 0.4)',
                      boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)'
                    }}
                  />
                </div>
              </div>

              <h2
                className="text-2xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-primary to-amber-secondary bg-clip-text text-transparent"
                style={{ lineHeight: '1.2' }}
                data-testid="maya-banner-title"
              >
                Запитайте Maya - ваша HoReCa експертка
              </h2>
              <p
                className="text-base md:text-lg text-text-secondary max-w-[700px] mx-auto"
                style={{ lineHeight: '1.6' }}
              >
                Отримайте професійні поради про тренди, постачальників,
                меню та compliance для вашого бізнесу
              </p>
            </div>

            <div className="mb-10 md:mb-12">
              <p className="text-center text-text-tertiary font-medium mb-6">
                Швидкий старт - оберіть питання:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px] mx-auto">
                {quickStartQuestions.map((question) => (
                  <Link
                    key={question.id}
                    href="/chat"
                    onClick={() => handleQuestionClick(question.prompt)}
                    data-testid={`maya-question-${question.id}`}
                  >
                    <div 
                      className="flex items-center gap-4 p-5 rounded-xl cursor-pointer transition-all duration-300 group"
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(245, 158, 11, 0.08)';
                        e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <question.icon className="w-7 h-7 text-amber-primary shrink-0" />
                      <span className="text-text-primary font-medium flex-1">
                        {question.text}
                      </span>
                      <ArrowRight className="w-5 h-5 text-amber-primary/60 group-hover:text-amber-primary group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <Link href="/chat" data-testid="maya-cta-button">
                <Button
                  className="px-10 py-6 text-lg font-semibold rounded-xl"
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
              <p className="flex items-center gap-2 text-sm text-text-secondary font-medium">
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
