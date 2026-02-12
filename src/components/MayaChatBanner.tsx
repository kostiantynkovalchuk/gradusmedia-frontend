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
    text: "Що потрібно для ліцензії на алкоголь?",
    prompt: "Розкажи про процес отримання ліцензії на продаж алкоголю в Україні"
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
            {/* Mobile: Centered Layout */}
            <div className="md:hidden text-center">
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
                    src="/images/alex.jpg"
                    alt="Alex - HoReCa експерт"
                    className="relative w-[160px] h-[160px] rounded-full object-cover"
                    style={{
                      border: '3px solid rgba(245, 158, 11, 0.4)',
                      boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)',
                      objectPosition: 'center 40%'
                    }}
                  />
                </div>
              </div>

              <div className="mb-6">
                <h2
                  className="text-xl font-bold mb-2 bg-gradient-to-r from-amber-primary to-amber-secondary bg-clip-text text-transparent"
                  style={{ lineHeight: '1.2' }}
                  data-testid="maya-banner-title"
                >
                  Alex Gradus — ваш особистий HoReCa консультант
                </h2>
                <p className="text-text-secondary text-sm">
                  Світові тренди + українське право + перевірені постачальники
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6 max-w-[300px] mx-auto">
                <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-xl font-bold text-amber-primary">800+</div>
                  <div className="text-xs text-text-tertiary">Закладів</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-xl font-bold text-amber-primary">25+</div>
                  <div className="text-xs text-text-tertiary">Років AVTD</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-xl font-bold text-amber-primary">&lt;2 хв</div>
                  <div className="text-xs text-text-tertiary">Відповідь</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-xl font-bold text-amber-primary">24/7</div>
                  <div className="text-xs text-text-tertiary">Онлайн</div>
                </div>
              </div>

              <p className="text-text-tertiary text-sm font-medium mb-4">
                Швидкий старт - оберіть питання:
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {quickStartQuestions.slice(0, 3).map((question) => (
                  <Link
                    key={question.id}
                    href="/chat"
                    onClick={() => handleQuestionClick(question.prompt)}
                    data-testid={`maya-question-${question.id}`}
                  >
                    <button
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full cursor-pointer transition-colors duration-300 hover-elevate"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(245, 158, 11, 0.2)',
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

            {/* Desktop: Two-Column Layout */}
            <div className="hidden md:flex md:gap-12">
              {/* Left Side: Content */}
              <div className="flex-1">
                <div className="mb-6">
                  <h2
                    className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-primary to-amber-secondary bg-clip-text text-transparent"
                    style={{ lineHeight: '1.2' }}
                    data-testid="maya-banner-title-desktop"
                  >
                    Alex Gradus — ваш особистий HoReCa консультант
                  </h2>
                  <p className="text-text-secondary text-sm">
                    Світові тренди + українське право + перевірені постачальники
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-3 mb-6">
                  <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-xl font-bold text-amber-primary">800+</div>
                    <div className="text-xs text-text-tertiary">Закладів</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-xl font-bold text-amber-primary">25+</div>
                    <div className="text-xs text-text-tertiary">Років AVTD</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-xl font-bold text-amber-primary">&lt;2 хв</div>
                    <div className="text-xs text-text-tertiary">Відповідь</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-xl font-bold text-amber-primary">24/7</div>
                    <div className="text-xs text-text-tertiary">Онлайн</div>
                  </div>
                </div>

                <p className="text-text-tertiary text-sm font-medium mb-4">
                  Швидкий старт - оберіть питання:
                </p>
                <div className="flex flex-col gap-3 items-start">
                  <div className="flex gap-3">
                    {quickStartQuestions.slice(0, 2).map((question) => (
                      <Link
                        key={question.id}
                        href="/chat"
                        onClick={() => handleQuestionClick(question.prompt)}
                        data-testid={`maya-question-${question.id}`}
                      >
                        <button
                          className="flex items-center gap-2 px-4 py-2.5 rounded-full cursor-pointer transition-colors duration-300 hover-elevate"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(245, 158, 11, 0.2)',
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
                  <div className="flex gap-3">
                    {quickStartQuestions.slice(2, 4).map((question) => (
                      <Link
                        key={question.id}
                        href="/chat"
                        onClick={() => handleQuestionClick(question.prompt)}
                        data-testid={`maya-question-${question.id}`}
                      >
                        <button
                          className="flex items-center gap-2 px-4 py-2.5 rounded-full cursor-pointer transition-colors duration-300 hover-elevate"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(245, 158, 11, 0.2)',
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
              </div>

              {/* Right Side: Large Avatar */}
              <div className="flex items-center mt-6">
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(245, 158, 11, 0.3))',
                      filter: 'blur(30px)',
                      transform: 'scale(1.2)'
                    }}
                  />
                  <img
                    src="/images/alex.jpg"
                    alt="Alex - HoReCa експерт"
                    className="relative w-[250px] h-[250px] rounded-full object-cover"
                    style={{
                      border: '4px solid rgba(245, 158, 11, 0.4)',
                      boxShadow: '0 12px 32px rgba(139, 92, 246, 0.4)',
                      objectPosition: 'center 40%'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Centered CTA (Both Mobile & Desktop) */}
            <div className="flex flex-col items-center gap-3 mt-4">
              <Link href="/chat" data-testid="maya-cta-button">
                <Button
                  className="px-8 py-3.5 text-base font-semibold rounded-full transition-transform duration-200"
                  style={{
                    background: 'linear-gradient(90deg, hsl(var(--amber-primary)) 0%, hsl(var(--amber-secondary)) 100%)',
                    color: 'hsl(263 50% 12%)',
                    boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  }}
                >
                  Почати діалог з Alex
                </Button>
              </Link>
              <p className="text-xs text-text-secondary">
                Потім від <span className="text-amber-primary font-semibold">$7/міс</span> для безлімітного доступу
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
