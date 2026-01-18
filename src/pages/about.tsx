import { ArrowRight, Zap, Globe, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import logoLarge from "@assets/generated_images/logo.webp";

const features = [
  {
    icon: Zap,
    title: "AI-Powered Content",
    description: "Автоматична генерація контенту за допомогою штучного інтелекту для швидкого та якісного покриття новин.",
  },
  {
    icon: Globe,
    title: "HoReCa Focus",
    description: "Спеціалізація на індустрії гостинності, ресторанів та кейтерингу України.",
  },
  {
    icon: TrendingUp,
    title: "Trend Analysis",
    description: "Аналіз трендів та прогнозування розвитку ринку напоїв в Україні.",
  },
  {
    icon: Users,
    title: "Industry Network",
    description: "Зв'язок між виробниками, дистриб'юторами та закладами HoReCa.",
  },
];

export default function About() {
  return (
    <main className="pt-20" data-testid="page-about">
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darkest" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,185,113,0.08),transparent_50%)]" />
        
        <div className="relative max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 text-center lg:text-left">
              <div className="w-16 h-1 bg-amber-primary mb-6 mx-auto lg:mx-0" />
              <h1 className="text-text-primary text-h1 font-bold mb-6" data-testid="about-title">
                Про Gradus Media
              </h1>
              <p className="text-text-secondary text-body-lg mb-8 max-w-xl mx-auto lg:mx-0">
                Gradus Media — це інноваційна AI-платформа для автоматизованого створення новин
                про індустрію напоїв та HoReCa на українському та глобальному ринках. Ми поєднуємо штучний інтелект
                з глибоким розумінням ринку для доставки актуальної та цінної інформації.
              </p>
              <Button 
                className="bg-amber-primary text-bg-dark font-semibold hover:bg-amber-neon hover:amber-glow transition-all"
                data-testid="button-about-cta"
              >
                Дізнатись більше
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="flex-shrink-0">
              <div className="relative w-60 h-60 md:w-80 md:h-80 aspect-square">
                <div className="absolute inset-0 bg-amber-primary/20 rounded-full blur-3xl" />
                <img
                  src={logoLarge}
                  alt="Gradus Media logo"
                  className="relative w-full h-auto aspect-square object-contain logo-pulse-glow"
                  style={{
                    mixBlendMode: 'lighten',
                    maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                  }}
                  data-testid="about-logo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-bg-darker" data-testid="about-features">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-text-primary text-h2 font-bold mb-4">
              Наші переваги
            </h2>
            <p className="text-text-secondary text-body-lg max-w-2xl mx-auto">
              Ми використовуємо передові технології для надання найкращого контенту
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="bg-bg-dark border-border hover:border-amber-primary/30 transition-colors"
                data-testid={`feature-card-${index}`}
              >
                <CardContent className="p-6 flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-amber-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-amber-primary" />
                  </div>
                  <div>
                    <h3 className="text-text-primary font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary text-body-sm">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" data-testid="about-mission">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-text-primary text-h2 font-bold mb-6">
            Наша місія
          </h2>
          <div className="w-16 h-1 bg-amber-primary mb-8 mx-auto" />
          <p className="text-text-secondary text-body-lg leading-relaxed mb-6">
            Ми прагнемо революціонізувати спосіб, яким індустрія HoReCa отримує та 
            споживає новини. Наша AI-платформа дозволяє автоматично генерувати 
            високоякісний контент, який допомагає бізнесам приймати інформовані рішення.
          </p>
          <p className="text-text-secondary text-body-lg leading-relaxed">
            Gradus Media — це більше, ніж просто новинний портал. Це інструмент для 
            розвитку індустрії напоїв в Україні, який об'єднує виробників, дистриб'юторів 
            та заклади гостинності в єдину екосистему знань та можливостей.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-amber-primary/10 via-amber-primary/5 to-transparent" data-testid="about-cta-section">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-text-primary text-h3 font-bold mb-4">
            Хочете співпрацювати?
          </h2>
          <p className="text-text-secondary text-body-md mb-8">
            Ми завжди відкриті для партнерства та нових можливостей
          </p>
          <a href="mailto:admin@gradusmedia.org">
            <Button
              variant="outline"
              className="border-amber-primary/50 text-amber-primary hover:bg-amber-primary/10"
              data-testid="button-contact-cta"
            >
              Зв'язатись з нами
            </Button>
          </a>
        </div>
      </section>
    </main>
  );
}
