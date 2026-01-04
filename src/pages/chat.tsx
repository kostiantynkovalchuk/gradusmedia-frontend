import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Send,
  MessageCircle,
  BarChart2,
  FileText,
  Target,
  CheckCircle2,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

function getSessionId() {
  if (typeof window === "undefined") return "";

  let sessionId = sessionStorage.getItem("mayaSessionId");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    sessionStorage.setItem("mayaSessionId", sessionId);
  }
  return sessionId;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Привіт! Я Maya від Gradus Media. Чим можу допомогти вашому HoReCa бізнесу сьогодні?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remainingQuestions, setRemainingQuestions] = useState(5);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Only auto-scroll if there are multiple messages (user is chatting)
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const starterQuestion = sessionStorage.getItem("mayaStarterQuestion");
    if (starterQuestion) {
      setInputValue(starterQuestion);
      sessionStorage.removeItem("mayaStarterQuestion");
    }

    const remaining = localStorage.getItem("mayaQuestionsRemaining") || "5";
    setRemainingQuestions(parseInt(remaining));
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    if (remainingQuestions <= 0) {
      return;
    }

    const userMessage: ChatMessage = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://gradus-ai.onrender.com/api/maya/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: inputValue,
            session_id: getSessionId(),
          }),
        }
      );

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content:
          data.reply ||
          "Дякую за питання! На жаль, я зараз недоступна. Спробуйте пізніше.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Use backend's remaining count
      if (data.remaining_questions !== undefined) {
        setRemainingQuestions(data.remaining_questions);
        localStorage.setItem(
          "mayaQuestionsRemaining",
          data.remaining_questions.toString()
        );
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "Вибачте, сталася помилка. Спробуйте ще раз пізніше.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickStartQuestions = [
    "Які коктейлі тренд цього сезону?",
    "Кращі постачальники преміум алкоголю?",
    "Як знизити витрати на бар на 20%?",
    "Що потрібно для ліцензії на алкоголь?",
    "Ідеї для зимового коктейльного меню?",
    "Топ-5 українських craft spirits?",
  ];

  const expertiseItems = [
    { icon: MessageCircle, label: "Тренди та інсайти" },
    { icon: FileText, label: "Відповідність нормам законодавства" },
    { icon: BarChart2, label: "Ринкова аналітика" },
    { icon: Target, label: "Консалтінг" },
  ];

  return (
    <main className="pt-20 min-h-screen" data-testid="page-chat">
      <section
        className="py-16 md:py-20"
        style={{
          background:
            "linear-gradient(180deg, hsl(263 50% 12%) 0%, hsl(var(--bg-dark)) 100%)",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Mobile: Stacked Layout */}
          <div className="md:hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="max-w-[400px] mx-auto mb-8"
            >
              <video
                controls
                playsInline
                preload="auto"
                muted
                className="w-full rounded-2xl"
                style={{
                  boxShadow: "0 16px 48px rgba(0, 0, 0, 0.6)",
                  border: "1px solid rgba(245, 158, 11, 0.2)",
                  aspectRatio: "9/16",
                }}
                onClick={(e) => {
                  const video = e.currentTarget;
                  video.muted = false;
                  if (video.requestFullscreen) {
                    video.requestFullscreen();
                  } else if ((video as any).webkitRequestFullscreen) {
                    (video as any).webkitRequestFullscreen();
                  }
                }}
                onLoadedData={(e) => {
                  const video = e.currentTarget;
                  video.currentTime = 0.1;
                }}
              >
                <source src="/video/Maya Intro_com.mp4" type="video/mp4" />
                Ваш браузер не підтримує відео.
              </video>
            </motion.div>

            <div className="text-center">
              <h2
                className="text-2xl font-semibold text-text-primary mb-6"
                style={{ lineHeight: "1.4" }}
              >
                "Gradus AI - це не просто новини та тренди, а дієві поради для
                вашого бізнесу"
              </h2>
              <div className="grid grid-cols-2 gap-4 max-w-[400px] mx-auto">
                {expertiseItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 p-5 rounded-xl text-sm"
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <item.icon className="w-8 h-8 text-amber-primary" />
                    <span className="text-amber-primary">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: Two-column Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="hidden md:flex gap-8 justify-center items-center"
          >
            {/* Left: Video */}
            <div className="flex-shrink-0">
              <video
                controls
                playsInline
                preload="metadata"
                className="rounded-2xl h-[600px]"
                style={{
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.7)",
                  border: "3px solid rgba(245, 158, 11, 0.3)",
                  aspectRatio: "9/16",
                }}
              >
                <source src="/video/Maya Intro_com.mp4" type="video/mp4" />
                Ваш браузер не підтримує відео.
              </video>
            </div>

            {/* Right: Content */}
            <div className="flex flex-col justify-center h-[600px] w-[500px] gap-6">
              {/* Header: 40% of content height (240px) */}
              <div className="h-[240px] flex items-center">
                <h2
                  className="text-5xl font-bold text-text-primary"
                  style={{
                    lineHeight: "1.15",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  "Gradus AI - це не просто новини та тренди, а дієві поради для вашого бізнесу"
                </h2>
              </div>

              {/* Feature icons: Minimal bar with hover labels */}
              <div className="flex gap-6">
                {expertiseItems.map((item, i) => (
                  <div key={i} className="group relative">
                    <div
                      className="flex items-center justify-center w-20 h-20 rounded-xl transition-all duration-300 group-hover:scale-110 cursor-pointer"
                      style={{
                        background: "rgba(245, 158, 11, 0.1)",
                        border: "1px solid rgba(245, 158, 11, 0.3)",
                      }}
                    >
                      <item.icon className="w-9 h-9 text-amber-primary" />
                    </div>

                    {/* Hover label */}
                    <div
                      className="absolute top-full mt-3 left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap pointer-events-none"
                      style={{
                        background: "rgba(245, 158, 11, 0.15)",
                        border: "1px solid rgba(245, 158, 11, 0.4)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <span className="text-amber-primary text-xs font-medium">
                        {item.label}
                      </span>
                      {/* Arrow pointing up */}
                      <div
                        className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0"
                        style={{
                          borderLeft: "4px solid transparent",
                          borderRight: "4px solid transparent",
                          borderBottom: "4px solid rgba(245, 158, 11, 0.4)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
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
              <h3 className="text-base md:text-lg text-text-primary font-semibold mb-6">
                💡 Швидкий старт — оберіть питання або напишіть своє:
              </h3>
              <div className="flex flex-wrap justify-center gap-3 max-w-[900px] mx-auto">
                {quickStartQuestions.map((question, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInputValue(question);
                      setTimeout(() => {
                        chatContainerRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }, 100);
                    }}
                    className="px-4 py-2.5 rounded-full text-text-primary text-sm font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(245, 158, 11, 0.2)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(245, 158, 11, 0.1)";
                      e.currentTarget.style.borderColor =
                        "rgba(245, 158, 11, 0.4)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(245, 158, 11, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.borderColor =
                        "rgba(245, 158, 11, 0.2)";
                      e.currentTarget.style.boxShadow = "none";
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
            ref={chatContainerRef}
            className="max-w-[900px] mx-auto rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
            data-testid="chat-container"
          >
            <div
              className="flex justify-between items-center px-3 py-3 md:px-6 md:py-5"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="flex items-center gap-3 text-text-secondary font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Maya онлайн</span>
              </div>
              <div
                className="px-3 py-1.5 rounded-md text-xs font-semibold"
                style={{
                  background: "rgba(245, 158, 11, 0.1)",
                  border: "1px solid rgba(245, 158, 11, 0.2)",
                  color: "hsl(var(--amber-secondary))",
                }}
                data-testid="questions-counter"
              >
                {remainingQuestions}/5 питань сьогодні
              </div>
            </div>

            <div
              className="h-[400px] md:h-[500px] overflow-y-auto p-3 md:p-6 flex flex-col gap-4"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor:
                  "rgba(255, 255, 255, 0.1) rgba(255, 255, 255, 0.02)",
              }}
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 md:gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                  data-testid={`message-${index}`}
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full">
                    {message.role === "assistant" ? (
                      <img
                        src="/images/maya-avatar.png"
                        alt="Maya"
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                        style={{
                          border: "2px solid rgba(139, 92, 246, 0.4)",
                          boxShadow: "0 2px 8px rgba(139, 92, 246, 0.3)",
                        }}
                      />
                    ) : (
                      <div
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, hsl(var(--amber-primary)) 0%, hsl(var(--amber-secondary)) 100%)",
                        }}
                      >
                        <User
                          className="w-4 h-4 md:w-5 md:h-5"
                          style={{ color: "hsl(263 50% 12%)" }}
                        />
                      </div>
                    )}
                  </div>
                  <div
                    className={`flex flex-col ${
                      message.role === "user" ? "items-end" : ""
                    } max-w-[85%] md:max-w-[70%]`}
                  >
                    <div
                      className="px-3 py-2.5 md:px-4 md:py-3 rounded-2xl text-text-primary text-sm leading-relaxed prose prose-invert max-w-none"
                      style={{
                        background:
                          message.role === "assistant"
                            ? "rgba(139, 92, 246, 0.15)"
                            : "rgba(245, 158, 11, 0.15)",
                        border: `1px solid ${
                          message.role === "assistant"
                            ? "rgba(139, 92, 246, 0.2)"
                            : "rgba(245, 158, 11, 0.2)"
                        }`,
                        borderTopLeftRadius:
                          message.role === "assistant" ? "4px" : "16px",
                        borderTopRightRadius:
                          message.role === "user" ? "4px" : "16px",
                      }}
                    >
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                    <span className="text-xs text-text-tertiary mt-1 px-1">
                      {message.timestamp.toLocaleTimeString("uk-UA", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex gap-2 md:gap-3">
                  <img
                    src="/images/maya-avatar.png"
                    alt="Maya"
                    className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full object-cover"
                    style={{
                      border: "2px solid rgba(139, 92, 246, 0.4)",
                      boxShadow: "0 2px 8px rgba(139, 92, 246, 0.3)",
                    }}
                  />
                  <div
                    className="flex gap-1.5 items-center px-5 py-3 rounded-2xl"
                    style={{
                      background: "rgba(139, 92, 246, 0.15)",
                      border: "1px solid rgba(139, 92, 246, 0.2)",
                      borderTopLeftRadius: "4px",
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{
                        animationDelay: "0ms",
                        backgroundColor: "rgb(167, 139, 250)",
                      }}
                    />
                    <span
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{
                        animationDelay: "150ms",
                        backgroundColor: "rgb(167, 139, 250)",
                      }}
                    />
                    <span
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{
                        animationDelay: "300ms",
                        backgroundColor: "rgb(167, 139, 250)",
                      }}
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSendMessage}
              className="p-3 md:p-5"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="flex gap-2 md:gap-3 items-end">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  placeholder="Ваше питання про HoReCa..."
                  className="flex-1 px-3 py-2.5 md:px-4 md:py-3 rounded-xl resize-none text-text-primary text-sm font-sans transition-all duration-300 focus:outline-none focus:border-amber-primary/30 focus:bg-white/6"
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    maxHeight: "100px",
                  }}
                  rows={1}
                  disabled={remainingQuestions <= 0}
                  data-testid="chat-input"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="w-11 h-11 md:w-12 md:h-12 rounded-xl shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--amber-primary)) 0%, hsl(var(--amber-secondary)) 100%)",
                    color: "hsl(263 50% 12%)",
                  }}
                  disabled={
                    !inputValue.trim() || isLoading || remainingQuestions <= 0
                  }
                  data-testid="send-button"
                >
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </div>

              {remainingQuestions <= 2 && remainingQuestions > 0 && (
                <p
                  className="mt-3 px-4 py-3 rounded-lg text-center text-sm"
                  style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                    color: "#fca5a5",
                  }}
                >
                  Залишилось {remainingQuestions}{" "}
                  {remainingQuestions === 1 ? "питання" : "питання"}
                </p>
              )}

              {remainingQuestions === 0 && (
                <div
                  className="mt-3 px-4 py-4 rounded-xl text-center"
                  style={{
                    background: "rgba(245, 158, 11, 0.1)",
                    border: "1px solid rgba(245, 158, 11, 0.2)",
                  }}
                >
                  <p className="text-amber-secondary font-medium mb-2">
                    Ви досягли ліміту безкоштовних питань
                  </p>
                  <Link
                    href="#pricing"
                    className="text-amber-primary font-semibold hover:underline"
                  >
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
          background:
            "linear-gradient(180deg, hsl(var(--bg-dark)) 0%, hsl(263 50% 12%) 100%)",
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
              background:
                "linear-gradient(135deg, hsl(263 50% 12%) 0%, hsl(263 45% 18%) 100%)",
              border: "1px solid rgba(245, 158, 11, 0.2)",
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
                "Безлімітні питання Maya",
                "Щотижневі звіти з трендів",
                "База постачальників",
                "Особиста консультація щомісяця",
              ].map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 py-3 text-text-secondary"
                  style={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <p className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-amber-primary to-amber-secondary bg-clip-text text-transparent">
              Від $7/місяць
            </p>
            <Button
              className="px-10 py-6 text-lg font-semibold rounded-xl"
              style={{
                background:
                  "linear-gradient(90deg, hsl(var(--amber-primary)) 0%, hsl(var(--amber-secondary)) 100%)",
                color: "hsl(263 50% 12%)",
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
