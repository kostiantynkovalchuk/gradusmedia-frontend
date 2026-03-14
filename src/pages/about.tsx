import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, MapPin, Clock, MessageCircle } from "lucide-react";

const stats = [
  { value: "500+ SKU", label: "портфель постачальника", icon: Package },
  { value: "40 000+", label: "точок по Україні", icon: MapPin },
  { value: "25+ років", label: "досвід AVTD на ринку", icon: Clock },
  { value: "5 запитів", label: "безкоштовно щодня", icon: MessageCircle },
];

const brands = [
  "GREENDAY", "HELSINKI", "UKRAINKA", "DOVBUSH",
  "VILLA UA", "FUNJU", "KRISTI VALLEY", "ADJARI",
];

const alexTopics = [
  "вибору постачальників алкоголю в Україні",
  "складання барного меню з високою маржею",
  "актуальних трендів HoReCa ринку 2026",
  "ліцензування та відкриття закладу",
  "зниження витрат і підвищення середнього чеку",
];

export default function About() {
  return (
    <main className="pt-20 min-h-screen" data-testid="page-about">
      <title>Про Gradus Media — AI-консультант для HoReCa України</title>
      <meta
        name="description"
        content="Перша україномовна AI-платформа для барів та ресторанів. Поради щодо постачальників, меню та прибутковості від AI-консультанта Alex."
      />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" data-testid="about-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darkest" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,185,113,0.08),transparent_50%)]" />
        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <div className="w-16 h-1 bg-amber-primary mb-6 mx-auto" />
          <h1 className="text-text-primary text-h1 font-bold mb-6 leading-tight" data-testid="about-title">
            Про Gradus Media
          </h1>
          <p className="text-text-secondary text-body-lg max-w-2xl mx-auto leading-relaxed">
            Gradus Media — це перша україномовна AI-платформа для власників і керівників барів та ресторанів.
          </p>
        </div>
      </section>

      {/* About section */}
      <section className="py-16 bg-bg-darker" data-testid="about-description">
        <div className="max-w-[860px] mx-auto px-6">
          <div className="bg-bg-dark border border-border rounded-xl p-8 space-y-5">
            <p className="text-text-secondary text-body-lg leading-relaxed">
              Платформу створено командою Gradus Media спільно з Торговим Домом АВ (AVTD) — найбільшим дистриб'ютором
              алкоголю в Україні з 25+ роками досвіду та портфелем 500+ SKU.
            </p>
            <p className="text-text-secondary text-body-lg leading-relaxed">
              В основі платформи — AI-консультант Alex, якого користувачі називають <span className="text-text-primary font-medium">"особистим експертом з прибутковості бару"</span>. Alex надає конкретні поради щодо:
            </p>
            <ul className="space-y-2 pl-2">
              {alexTopics.map((topic, i) => (
                <li key={i} className="flex items-start gap-3 text-text-secondary text-body-md">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-primary flex-shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
            <p className="text-text-secondary text-body-lg leading-relaxed">
              На відміну від загальних пошукових систем, Gradus Media розуміє специфіку українського ринку напоїв:
              локальних виробників, регуляторні вимоги, сезонні тренди та реальні ціни від перевірених постачальників.
            </p>
            <p className="text-text-secondary text-body-lg leading-relaxed">
              Понад 40 000 торгових точок в Україні вже працюють з брендами з портфеля AVTD —
              GREENDAY, HELSINKI, UKRAINKA, DOVBUSH, VILLA UA, FUNJU та іншими.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16" data-testid="about-stats">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-bg-darker border border-border rounded-xl p-6 text-center hover:border-amber-primary/30 transition-colors"
                data-testid={`stat-card-${i}`}
              >
                <div className="w-10 h-10 rounded-lg bg-amber-primary/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-5 h-5 text-amber-primary" />
                </div>
                <p className="text-amber-primary font-bold text-xl mb-1">{stat.value}</p>
                <p className="text-text-secondary text-body-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand pills */}
      <section className="py-12 bg-bg-darker" data-testid="about-brands">
        <div className="max-w-[860px] mx-auto px-6">
          <p className="text-text-secondary text-body-sm uppercase tracking-widest mb-5 text-center">
            Бренди портфеля AVTD
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {brands.map((brand) => (
              <span
                key={brand}
                className="px-4 py-2 bg-amber-primary/10 border border-amber-primary/20 rounded-full text-amber-primary text-body-sm font-medium"
                data-testid={`brand-pill-${brand.toLowerCase()}`}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" data-testid="about-cta">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <div className="w-16 h-1 bg-amber-primary mb-6 mx-auto" />
          <p className="text-text-secondary text-body-lg mb-8 leading-relaxed">
            Gradus Media доступна безкоштовно — 5 запитів на день без реєстрації картки.
          </p>
          <Link href="/chat">
            <Button
              className="bg-amber-primary text-bg-dark font-semibold hover:bg-amber-neon transition-all"
              data-testid="button-about-cta"
            >
              Спробувати безкоштовно
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
