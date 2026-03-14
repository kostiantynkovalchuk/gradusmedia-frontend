import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Building2, Mail, Phone, MapPin, CreditCard } from "lucide-react";

const breadcrumbs = [
  { label: "Головна", href: "/" },
  { label: "Контакти" },
];

const contactCards = [
  {
    icon: Building2,
    title: "Юридична інформація",
    lines: [
      "Повне найменування: ФОП Черток Фелікс Борисович",
      "ІПН: 2726914972",
    ],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["admin@gradusmedia.org"],
    email: "admin@gradusmedia.org",
  },
  {
    icon: Phone,
    title: "Телефон",
    lines: ["+380683830579"],
    tel: "+380683830579",
  },
  {
    icon: MapPin,
    title: "Адреса",
    lines: ["м. Київ, Україна"],
  },
  {
    icon: CreditCard,
    title: "Платіжний сервіс",
    lines: ["Платежі обробляються через WayForPay"],
    link: { href: "https://www.wayforpay.com", label: "www.wayforpay.com" },
  },
];

export default function ContactsPage() {
  return (
    <main className="pt-20 min-h-screen" data-testid="page-contacts">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(245,185,113,0.05),transparent_50%)] pointer-events-none" />

      <div className="max-w-[860px] mx-auto px-6 py-12">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-10">
          <div className="w-16 h-1 bg-amber-primary mb-5" />
          <h1 className="text-text-primary text-h1 font-bold mb-3" data-testid="contacts-title">
            Контакти
          </h1>
          <p className="text-text-secondary text-body-md">
            Зв'яжіться з нами зручним для вас способом.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {contactCards.map((card, index) => (
            <div
              key={index}
              className="bg-bg-darker border border-border rounded-xl p-6 hover:border-amber-primary/30 transition-colors"
              data-testid={`contact-card-${index}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-amber-primary/10 flex items-center justify-center flex-shrink-0">
                  <card.icon className="w-4 h-4 text-amber-primary" />
                </div>
                <h2 className="text-text-primary font-semibold">
                  {card.title}
                </h2>
              </div>

              <div className="space-y-1 pl-12">
                {card.lines.map((line, i) => (
                  <p key={i} className="text-text-secondary text-body-md">
                    {line}
                  </p>
                ))}
                {card.email && (
                  <a
                    href={`mailto:${card.email}`}
                    className="text-amber-primary text-body-md hover:underline block"
                    data-testid="link-contacts-email"
                  >
                    {card.email}
                  </a>
                )}
                {card.tel && (
                  <a
                    href={`tel:${card.tel}`}
                    className="text-amber-primary text-body-md hover:underline block"
                    data-testid="link-contacts-phone"
                  >
                    {card.tel}
                  </a>
                )}
                {card.link && (
                  <a
                    href={card.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-primary text-body-md hover:underline block"
                    data-testid="link-contacts-wayforpay"
                  >
                    {card.link.label}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
