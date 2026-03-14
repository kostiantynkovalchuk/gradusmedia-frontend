import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Store, BarChart2, Wine, TrendingUp, FileText, Lightbulb, ArrowRight } from "lucide-react";
import logoLarge from "../../attached_assets/generated_images/logo.webp";

const GOLD = "rgba(201,168,76,";

const glassCard = {
  background: `${GOLD}0.06)`,
  border: `1px solid ${GOLD}0.15)`,
  borderRadius: "16px",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
} as React.CSSProperties;

const stats = [
  { num: 500, suffix: "+", label: "SKU в портфелі AVTD" },
  { num: 40000, suffix: "+", label: "торгових точок України", format: (n: number) => n >= 1000 ? `${Math.round(n / 1000) * 1000}`.replace(/(\d)(?=(\d{3})+$)/g, "$1 ") : String(n) },
  { num: 25, suffix: "+", label: "років досвіду на ринку" },
  { num: 5, suffix: "", label: "безкоштовних запитів щодня" },
];

const brands = ["GREENDAY", "HELSINKI", "UKRAINKA", "DOVBUSH", "VILLA UA", "FUNJU", "KRISTI VALLEY", "ADJARI"];

const features = [
  { icon: Store, title: "Постачальники", desc: "Перевірені постачальники алкоголю з офіційними ліцензіями" },
  { icon: BarChart2, title: "Прибутковість", desc: "Розрахунок pour cost, маржі та середнього чеку" },
  { icon: Wine, title: "Барне меню", desc: "Сезонні коктейлі з маржею 75-85%" },
  { icon: TrendingUp, title: "Тренди 2026", desc: "Актуальні тренди HoReCa ринку України та світу" },
  { icon: FileText, title: "Ліцензування", desc: "Покроковий план відкриття закладу та ліцензій" },
  { icon: Lightbulb, title: "Upsell стратегії", desc: "Скрипти для персоналу та пакетні пропозиції" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function CountUp({ target, suffix, format }: { target: number; suffix: string; format?: (n: number) => string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  const display = format ? format(count) : String(count);
  return <span ref={ref}>{display}{suffix}</span>;
}

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsSection = useInView(0.1);
  const aboutSection = useInView(0.1);
  const brandsSection = useInView(0.1);
  const featuresSection = useInView(0.05);
  const ctaSection = useInView(0.2);

  return (
    <main className="pt-20 min-h-screen overflow-x-hidden" data-testid="page-about">
      <title>Про Gradus Media — AI-консультант для HoReCa України</title>
      <meta name="description" content="Перша україномовна AI-платформа для барів та ресторанів. Поради щодо постачальників, меню та прибутковості від AI-консультанта Alex." />

      <style>{`
        @keyframes gradientPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.65; }
        }
        @keyframes gradientShift {
          0% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.05) translate(2%, -2%); }
          66% { transform: scale(0.98) translate(-1%, 1%); }
          100% { transform: scale(1) translate(0, 0); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-text { animation: heroFadeUp 0.7s ease-out both; }
        .hero-text-delay { animation: heroFadeUp 0.7s ease-out 0.2s both; }
        .fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        .fade-in-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .stagger-1 { transition-delay: 0.05s; }
        .stagger-2 { transition-delay: 0.12s; }
        .stagger-3 { transition-delay: 0.19s; }
        .stagger-4 { transition-delay: 0.26s; }
        .stagger-5 { transition-delay: 0.33s; }
        .stagger-6 { transition-delay: 0.40s; }
        .stagger-7 { transition-delay: 0.47s; }
        .stagger-8 { transition-delay: 0.54s; }
        .feature-card {
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
          cursor: default;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          border-color: rgba(201,168,76,0.35) !important;
          background: rgba(201,168,76,0.10) !important;
        }
        .brand-pill {
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .brand-pill:hover {
          background: rgba(201,168,76,0.15) !important;
          border-color: rgba(201,168,76,0.4) !important;
        }
      `}</style>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "60vh" }}
        data-testid="about-hero"
      >
        {/* Animated mesh */}
        <div className="absolute inset-0" style={{ background: "hsl(30 20% 5%)" }} />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(201,168,76,0.09) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(201,168,76,0.06) 0%, transparent 60%)",
            animation: "gradientPulse 20s ease-in-out infinite, gradientShift 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 50% 40% at 60% 20%, rgba(201,168,76,0.04) 0%, transparent 55%)",
            animation: "gradientPulse 20s ease-in-out 10s infinite",
          }}
        />

        <div className="relative max-w-[900px] mx-auto px-6 py-24 text-center">
          <div className="w-12 h-px mx-auto mb-8 hero-text" style={{ background: `${GOLD}0.6)` }} />
          <h1
            className="font-bold tracking-tight hero-text mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15, color: "rgba(255,255,255,0.95)", letterSpacing: "-0.02em" }}
            data-testid="about-title"
          >
            Перша україномовна<br />AI-платформа для HoReCa бізнесу
          </h1>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-14 px-6" data-testid="about-stats">
        <div ref={statsSection.ref} className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
            {stats.map((s, i) => (
              <div
                key={i}
                className="text-center"
                data-testid={`stat-card-${i}`}
              >
                <p style={{ fontSize: "2.75rem", fontWeight: 700, color: `${GOLD}0.95)`, letterSpacing: "-0.02em", lineHeight: 1 }}>
                  <CountUp target={s.num} suffix={s.suffix} format={s.format} />
                </p>
                <div className="mt-3 mx-auto w-8 h-px" style={{ background: `${GOLD}0.3)` }} />
                <p className="mt-3" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.5, fontWeight: 400 }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT TEXT ── */}
      <section className="py-16 px-6" data-testid="about-description">
        <div ref={aboutSection.ref} className="max-w-[1100px] mx-auto">
          <div className={`fade-in-up ${aboutSection.inView ? "visible" : ""} grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-start`}>
            <div>
              <p className="mb-2 uppercase tracking-widest" style={{ fontSize: "0.7rem", color: `${GOLD}0.7)` }}>Про платформу</p>
              <h2 className="mb-6 font-semibold" style={{ fontSize: "1.6rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.3 }}>
                Створено разом з лідером ринку
              </h2>
              <div style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.75, fontWeight: 300, fontSize: "1rem" }} className="space-y-4">
                <p>
                  Платформу створено командою Gradus Media спільно з Торговим Домом АВ (AVTD) — найбільшим дистриб'ютором алкоголю в Україні з 25+ роками досвіду та портфелем 500+ SKU.
                </p>
                <p>
                  На відміну від загальних пошукових систем, Gradus Media розуміє специфіку українського ринку напоїв: локальних виробників, регуляторні вимоги, сезонні тренди та реальні ціни від перевірених постачальників.
                </p>
                <p>
                  Понад 40 000 торгових точок в Україні вже працюють з брендами з портфеля AVTD — GREENDAY, HELSINKI, UKRAINKA, DOVBUSH, VILLA UA, FUNJU та іншими.
                </p>
              </div>
            </div>

            {/* Logo */}
            <div className="flex items-center justify-center">
              <img
                src={logoLarge}
                alt="Gradus Media"
                style={{
                  maxWidth: "280px",
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section className="py-14 px-6" data-testid="about-brands">
        <div ref={brandsSection.ref} className="max-w-[1100px] mx-auto text-center">
          <p className={`fade-in-up ${brandsSection.inView ? "visible" : ""} mb-6`} style={{ fontSize: "0.7rem", color: `${GOLD}0.7)`, textTransform: "uppercase", letterSpacing: "0.12em" }}>
            Портфель AVTD доступний через Gradus Media
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {brands.map((brand, i) => (
              <span
                key={brand}
                className={`brand-pill fade-in-up stagger-${Math.min(i + 1, 8)} ${brandsSection.inView ? "visible" : ""} px-5 py-2`}
                style={{
                  background: `${GOLD}0.05)`,
                  border: `1px solid ${GOLD}0.2)`,
                  borderRadius: "100px",
                  color: `${GOLD}0.9)`,
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                }}
                data-testid={`brand-pill-${brand.toLowerCase().replace(" ", "-")}`}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE CARDS ── */}
      <section className="py-16 px-6" data-testid="about-features">
        <div ref={featuresSection.ref} className="max-w-[1100px] mx-auto">
          <div className={`fade-in-up ${featuresSection.inView ? "visible" : ""} text-center mb-10`}>
            <p className="mb-2 uppercase tracking-widest" style={{ fontSize: "0.7rem", color: `${GOLD}0.7)` }}>Чим допомагає Alex</p>
            <h2 className="font-semibold" style={{ fontSize: "1.6rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.3 }}>
              Конкретні відповіді для HoReCa бізнесу
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className={`feature-card fade-in-up stagger-${Math.min(i + 1, 6)} ${featuresSection.inView ? "visible" : ""} p-7`}
                style={glassCard}
                data-testid={`feature-card-${i}`}
              >
                <div
                  className="mb-4 w-10 h-10 flex items-center justify-center rounded-xl"
                  style={{ background: `${GOLD}0.1)`, border: `1px solid ${GOLD}0.15)` }}
                >
                  <f.icon style={{ width: "18px", height: "18px", color: `${GOLD}0.9)` }} />
                </div>
                <h3 className="mb-2 font-semibold" style={{ fontSize: "1rem", color: "rgba(255,255,255,0.88)" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.65, fontWeight: 300 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6" data-testid="about-cta">
        <div ref={ctaSection.ref} className={`fade-in-up ${ctaSection.inView ? "visible" : ""} max-w-[640px] mx-auto text-center`}>
          <div
            className="p-12 rounded-2xl"
            style={{
              background: `${GOLD}0.05)`,
              border: `1px solid ${GOLD}0.18)`,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <h2 className="font-bold mb-4" style={{ fontSize: "1.9rem", color: "rgba(255,255,255,0.92)", letterSpacing: "-0.02em" }}>
              Спробуйте безкоштовно
            </h2>
            <p className="mb-8" style={{ fontSize: "1rem", color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>
              5 запитів щодня. Без картки. Без реєстрації.
            </p>
            <Link href="/chat">
              <button
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold transition-all"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}0.9), rgba(180,140,50,0.9))`,
                  color: "hsl(30 20% 5%)",
                  fontSize: "0.95rem",
                  boxShadow: "0 0 0 0 rgba(201,168,76,0)",
                  transition: "filter 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.1)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 24px ${GOLD}0.3)`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.filter = "";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 0 0 ${GOLD}0)`;
                }}
                data-testid="button-about-cta"
              >
                Відкрити чат з Alex
                <ArrowRight style={{ width: "16px", height: "16px" }} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
