import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShieldCheck, RotateCcw, Mail, Zap } from "lucide-react";

const breadcrumbs = [
  { label: "Головна", href: "/" },
  { label: "Політика повернення" },
];

const sections = [
  {
    icon: ShieldCheck,
    title: "Гарантія повернення",
    text: "ФОП Черток Фелікс Борисович гарантує повернення коштів протягом 7 днів з моменту оплати, якщо послуга не була використана або якість послуги не відповідає заявленій.",
  },
  {
    icon: RotateCcw,
    title: "Умови повернення",
    items: [
      "Заявка на повернення приймається протягом 7 днів з дати оплати",
      "Повернення здійснюється на ту саму картку, з якої було здійснено оплату",
      "Термін повернення: 3–5 робочих днів після підтвердження заявки",
    ],
  },
  {
    icon: Mail,
    title: "Як подати заявку",
    text: "Надішліть запит на повернення коштів на email: admin@gradusmedia.org із зазначенням:",
    items: [
      "Вашого email, вказаного при реєстрації",
      "Дати та суми оплати",
      "Причини повернення",
    ],
    email: true,
  },
  {
    icon: Zap,
    title: "Скасування транзакції",
    text: "Якщо оплата пройшла помилково, зверніться до нас протягом 24 годин — транзакція буде скасована повністю без комісії.",
  },
];

export default function RefundPage() {
  return (
    <main className="pt-20 min-h-screen" data-testid="page-refund">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(245,185,113,0.05),transparent_50%)] pointer-events-none" />

      <div className="max-w-[860px] mx-auto px-6 py-12">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-10">
          <div className="w-16 h-1 bg-amber-primary mb-5" />
          <h1 className="text-text-primary text-h1 font-bold mb-3" data-testid="refund-title">
            Політика повернення
          </h1>
          <p className="text-text-secondary text-body-md">
            Ми цінуємо вашу довіру та прагнемо забезпечити прозорі та чесні умови використання платформи.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-bg-darker border border-border rounded-xl p-7"
              data-testid={`refund-section-${index}`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-amber-primary/10 flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-4 h-4 text-amber-primary" />
                </div>
                <h2 className="text-text-primary font-semibold text-h3">
                  {section.title}
                </h2>
              </div>

              {section.text && (
                <p className="text-text-secondary text-body-md leading-relaxed mb-4">
                  {section.email ? (
                    <>
                      Надішліть запит на повернення коштів на email:{" "}
                      <a
                        href="mailto:admin@gradusmedia.org"
                        className="text-amber-primary hover:underline"
                        data-testid="link-refund-email"
                      >
                        admin@gradusmedia.org
                      </a>{" "}
                      із зазначенням:
                    </>
                  ) : (
                    section.text
                  )}
                </p>
              )}

              {section.items && (
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-secondary text-body-md">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 text-text-tertiary text-body-sm">
          Питання щодо повернення:{" "}
          <a href="mailto:admin@gradusmedia.org" className="text-amber-primary hover:underline">
            admin@gradusmedia.org
          </a>
        </p>
      </div>
    </main>
  );
}
