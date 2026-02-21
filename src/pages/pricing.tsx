import { useState, useEffect } from "react";
import { Check, Star, ArrowRight, Shield, RefreshCcw, Building2, Ban, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Wayforpay: new () => {
      run: (
        params: Record<string, unknown>,
        onApproved: (response: unknown) => void,
        onDeclined: (response: unknown) => void,
        onPending: (response: unknown) => void
      ) => void;
    };
  }
}

const API_BASE = "https://gradus-ai.onrender.com";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [paymentLoading, setPaymentLoading] = useState<string | null>(null);
  const [uahRate, setUahRate] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetch(`${API_BASE}/api/payments/uah-rate`)
      .then(res => res.json())
      .then(data => {
        if (data.rate) setUahRate(data.rate);
      })
      .catch(() => {});
  }, []);

  const handlePayment = async (tier: string) => {
    const userEmail = localStorage.getItem("maya_user_email");
    if (!userEmail) {
      toast({
        title: "Потрібна авторизація",
        description: "Будь ласка, спочатку зареєструйтесь у чаті Alex.",
        variant: "destructive",
      });
      window.location.href = "/chat";
      return;
    }

    if (!window.Wayforpay) {
      toast({
        title: "Помилка платіжної системи",
        description: "Не вдалося завантажити WayForPay. Перезавантажте сторінку.",
        variant: "destructive",
      });
      return;
    }

    setPaymentLoading(tier);
    try {
      const response = await fetch(`${API_BASE}/api/payments/create-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, tier }),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const params = await response.json();

      if (!params.merchantAccount || !params.merchantSignature || !params.orderReference) {
        throw new Error("Invalid payment params");
      }

      const wayforpay = new window.Wayforpay();
      wayforpay.run(
        {
          merchantAccount: params.merchantAccount,
          merchantDomainName: params.merchantDomainName,
          authorizationType: "SimpleSignature",
          merchantSignature: params.merchantSignature,
          orderReference: params.orderReference,
          orderDate: params.orderDate,
          amount: params.amount,
          currency: "UAH",
          productName: params.productName,
          productPrice: params.productPrice,
          productCount: params.productCount,
          language: "UA",
          straightWidget: true,
        },
        function () {
          setPaymentLoading(null);
          localStorage.setItem("maya_user_tier", tier);
          toast({
            title: "Підписку активовано!",
            description: "Дякуємо за оплату. Ваш план оновлено.",
          });
        },
        function () {
          setPaymentLoading(null);
          toast({
            title: "Оплата відхилена",
            description: "Спробуйте ще раз або оберіть інший спосіб оплати.",
            variant: "destructive",
          });
        },
        function () {
          setPaymentLoading(null);
          toast({
            title: "Платіж обробляється",
            description: "Зачекайте, будь ласка. Ми повідомимо про результат.",
          });
        }
      );
    } catch {
      setPaymentLoading(null);
      toast({
        title: "Помилка оплати",
        description: "Спробуйте пізніше або зверніться до підтримки.",
        variant: "destructive",
      });
    }
  };

  const formatUah = (usd: number) => {
    if (!uahRate || usd === 0) return null;
    const uah = Math.round(usd * uahRate);
    return `≈ ${uah} ₴ за курсом НБУ`;
  };

  const tiers = [
    {
      id: "free",
      name: "Безкоштовний",
      price: 0,
      priceAnnual: 0,
      period: "",
      description: "Спробуйте Alex",
      features: [
        "5 питань на день",
        "Базові відповіді",
        "Доступ до новин Gradus Media",
      ],
      limitations: [
        "Без звітів з трендів",
        "Без бази постачальників",
        "Немає консультацій",
      ],
      cta: "Почати безкоштовно",
      ctaLink: "/chat",
      popular: false,
    },
    {
      id: "standard",
      name: "Стандарт",
      price: 7,
      priceAnnual: 70,
      period: billingCycle === "monthly" ? "місяць" : "рік",
      description: "Для професіоналів HoReCa",
      features: [
        "Безлімітні питання Alex",
        "Щотижневі тренд-звіти (email)",
        "База постачальників AVTD",
        "Відповіді з джерелами",
        "Підтримка протягом 24 годин",
      ],
      cta: "Спробувати 7 днів безкоштовно",
      ctaLink: "#",
      popular: true,
      savings: billingCycle === "annual" ? "Економія $14/рік" : null,
    },
    {
      id: "premium",
      name: "Преміум",
      price: 10,
      priceAnnual: 100,
      period: billingCycle === "monthly" ? "місяць" : "рік",
      description: "Максимум для вашого бізнесу",
      features: [
        "Все зі Стандарт +",
        "Відеоконсультація 1x/міс (30 хв)",
        "Ексклюзивні знижки AVTD (10-15%)",
        "Custom аналіз меню",
        "Пріоритетна підтримка",
        "Доступ до закритих вебінарів",
      ],
      cta: "Спробувати 7 днів безкоштовно",
      ctaLink: "#",
      popular: false,
      savings: billingCycle === "annual" ? "Економія $20/рік" : null,
    },
  ];

  const handleSubscribe = (tierId: string) => {
    if (tierId === "free") {
      window.location.href = "/chat";
      return;
    }
    handlePayment(tierId);
  };

  return (
    <main className="pt-20 min-h-screen pb-20" data-testid="page-pricing">
      <section className="py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
          Оберіть ваш тарифний план
        </h1>
        <p className="text-xl text-text-secondary mb-8">
          Інвестуйте у знання. Заощаджуйте на помилках.
        </p>

        <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-white/5 border border-white/10">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              billingCycle === "monthly"
                ? "bg-amber-primary text-bg-dark"
                : "text-text-secondary hover:text-text-primary"
            }`}
            data-testid="button-monthly"
          >
            Щомісяця
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              billingCycle === "annual"
                ? "bg-amber-primary text-bg-dark"
                : "text-text-secondary hover:text-text-primary"
            }`}
            data-testid="button-annual"
          >
            Щороку
            <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
              -20%
            </span>
          </button>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => {
            const displayPrice =
              billingCycle === "annual" ? tier.priceAnnual : tier.price;
            const uahDisplay = formatUah(displayPrice);

            return (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-8 transition-all ${
                  tier.popular
                    ? "border-2 border-amber-primary shadow-2xl md:scale-105"
                    : "border border-white/10"
                }`}
                style={{
                  background: tier.popular
                    ? "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(245, 158, 11, 0.1))"
                    : "rgba(255, 255, 255, 0.02)",
                }}
                data-testid={`pricing-tier-${tier.id}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-primary text-bg-dark text-sm font-bold rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    Найпопулярніший
                  </div>
                )}

                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  {tier.name}
                </h3>
                <p className="text-text-tertiary text-sm mb-6">
                  {tier.description}
                </p>

                <div className="mb-6">
                  <span className="text-5xl font-bold text-text-primary">
                    ${displayPrice}
                  </span>
                  {tier.period && <span className="text-text-secondary">/{tier.period}</span>}
                  {uahDisplay && (
                    <p className="text-amber-400/80 text-sm mt-1">
                      {uahDisplay}
                    </p>
                  )}
                  {tier.savings && (
                    <p className="text-green-400 text-sm mt-2 font-semibold">
                      {tier.savings}
                    </p>
                  )}
                </div>

                <Button
                  onClick={() => handleSubscribe(tier.id)}
                  disabled={paymentLoading !== null && tier.id !== "free"}
                  className={`w-full py-3 rounded-xl font-semibold mb-6 transition-all ${
                    tier.popular ? "" : "bg-white/10 text-text-primary"
                  }`}
                  style={
                    tier.popular
                      ? {
                          background:
                            "linear-gradient(90deg, hsl(var(--amber-primary)), hsl(var(--amber-secondary)))",
                          color: "hsl(263 50% 12%)",
                        }
                      : undefined
                  }
                  data-testid={`button-subscribe-${tier.id}`}
                >
                  {paymentLoading === tier.id ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  {tier.cta}
                  {paymentLoading !== tier.id && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span className="text-text-secondary text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {tier.limitations && tier.limitations.length > 0 && (
                  <ul className="space-y-2 pt-4 border-t border-white/10">
                    {tier.limitations.map((limit, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-text-tertiary text-xs"
                      >
                        <Ban className="w-3 h-3 text-red-400 shrink-0" />
                        {limit}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-[800px] mx-auto px-6 mt-16">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <Shield className="w-8 h-8 text-amber-primary mx-auto mb-2" />
            <p className="text-sm text-text-secondary font-semibold">
              Захищені платежі
            </p>
            <p className="text-xs text-text-tertiary">через WayForPay</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <RefreshCcw className="w-8 h-8 text-amber-primary mx-auto mb-2" />
            <p className="text-sm text-text-secondary font-semibold">
              7 днів гарантія
            </p>
            <p className="text-xs text-text-tertiary">повернення коштів</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <Building2 className="w-8 h-8 text-amber-primary mx-auto mb-2" />
            <p className="text-sm text-text-secondary font-semibold">
              Підтримка AVTD
            </p>
            <p className="text-xs text-text-tertiary">25+ років на ринку</p>
          </div>
        </div>
      </section>

      <section className="max-w-[800px] mx-auto px-6 mt-16">
        <h2 className="text-3xl font-bold text-text-primary text-center mb-8">
          Поширені питання
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "Чи можу я змінити план пізніше?",
              a: "Так, ви можете в будь-який момент перейти на вищий план або повернутися до безкоштовного.",
            },
            {
              q: "Що станеться після закінчення пробного періоду?",
              a: "Після 7 днів безкоштовного періоду автоматично почнеться платна підписка. Ви отримаєте сповіщення за 2 дні до закінчення пробного періоду.",
            },
            {
              q: "Як я можу скасувати підписку?",
              a: "Ви можете скасувати підписку в будь-який момент у вашому особистому кабінеті. Доступ збережеться до кінця оплаченого періоду.",
            },
            {
              q: "Які способи оплати підтримуються?",
              a: "Ми приймаємо оплату через WayForPay: картки Visa/Mastercard, Google Pay, Apple Pay, Приват24.",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-white/5 border border-white/10"
              data-testid={`faq-${i}`}
            >
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {faq.q}
              </h3>
              <p className="text-text-secondary">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
