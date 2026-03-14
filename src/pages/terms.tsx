import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FileText, CreditCard, Clock, RefreshCw } from "lucide-react";

const breadcrumbs = [
  { label: "Головна", href: "/" },
  { label: "Правила та умови" },
];

const sections = [
  {
    icon: FileText,
    title: "Послуги",
    items: [
      "Консультації AI-помічника Alex щодо управління барами та ресторанами",
      "Щотижневі звіти з трендів алкогольного ринку",
      "Доступ до бази постачальників AVTD",
      "Відеоконсультації (тариф Преміум)",
    ],
  },
  {
    icon: CreditCard,
    title: "Тарифи та оплата",
    text: "Оплата здійснюється через платіжний сервіс WayForPay. Підтримувані способи оплати: картки Visa, Mastercard, Google Pay, Apple Pay. Підписка активується одразу після успішної оплати. Доступ до послуг надається на 30 календарних днів з моменту оплати.",
    items: [
      "Безкоштовний: 5 запитів на день, без оплати",
      "Стандарт: $7/місяць (еквівалент у гривнях за курсом НБУ)",
      "Преміум: $10/місяць (еквівалент у гривнях за курсом НБУ)",
    ],
  },
  {
    icon: Clock,
    title: "Пробний період",
    text: "Платні тарифи включають 7 днів безкоштовного доступу. Після закінчення пробного періоду підписка автоматично переходить на платний режим. Користувач отримує сповіщення за 2 дні до завершення пробного періоду.",
  },
  {
    icon: RefreshCw,
    title: "Зміна тарифу",
    text: "Користувач може змінити або скасувати тариф у будь-який момент в особистому кабінеті. Доступ зберігається до кінця оплаченого періоду.",
  },
];

export default function TermsPage() {
  return (
    <main className="pt-20 min-h-screen" data-testid="page-terms">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(245,185,113,0.05),transparent_50%)] pointer-events-none" />

      <div className="max-w-[860px] mx-auto px-6 py-12">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-10">
          <div className="w-16 h-1 bg-amber-primary mb-5" />
          <h1 className="text-text-primary text-h1 font-bold mb-3" data-testid="terms-title">
            Правила та умови
          </h1>
          <p className="text-text-secondary text-body-md">
            ФОП Черток Фелікс Борисович (ІПН: 2726914972) надає доступ до платформи Gradus Media (gradusmedia.org) на наступних умовах.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-bg-darker border border-border rounded-xl p-7"
              data-testid={`terms-section-${index}`}
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
                  {section.text}
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
          Остання редакція: 2026 рік. З питань: <a href="mailto:admin@gradusmedia.org" className="text-amber-primary hover:underline">admin@gradusmedia.org</a>
        </p>
      </div>
    </main>
  );
}
