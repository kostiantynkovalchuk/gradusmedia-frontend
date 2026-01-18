import { Link } from "wouter";
import { SiFacebook, SiLinkedin, SiInstagram } from "react-icons/si";
import logoSmall from "@assets/generated_images/logo.webp";

const navigationLinks = [
  { title: "Головна", path: "/" },
  { title: "Новини", path: "/category/news" },
  { title: "Огляди", path: "/category/reviews" },
  { title: "Тренди", path: "/category/trends" },
];

const companyLinks = [
  { title: "Про нас", path: "/about" },
  { title: "Чат з Alex", path: "/chat" },
];

const socialLinks = [
  { icon: SiFacebook, label: "Facebook", href: "https://www.facebook.com/gradusmediaUA/" },
  { icon: SiLinkedin, label: "LinkedIn", href: "#" },
  { icon: SiInstagram, label: "Instagram", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-bg-darkest border-t border-amber-primary/10 mt-24" data-testid="footer">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-10">
          <div className="lg:col-span-1" data-testid="footer-brand">
            <img
              src={logoSmall}
              alt="Gradus Media logo"
              className="max-w-[51px] h-auto aspect-square mb-4"
              style={{
                mixBlendMode: 'lighten',
                opacity: 0.9,
                filter: 'blur(0.2px)',
                maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
              }}
            />
            <h3 className="text-amber-primary font-bold text-lg mb-3">
              GRADUS MEDIA
            </h3>
            <p className="text-text-secondary text-body-sm leading-relaxed">
              Автоматизована платформа новин про індустрію напоїв та HoReCa в Україні й світі
            </p>
          </div>

          <div data-testid="footer-nav">
            <h4 className="text-text-primary font-semibold mb-4">Навігація</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-text-secondary text-body-sm hover:text-amber-primary transition-colors"
                    data-testid={`footer-link-${link.title.toLowerCase()}`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-testid="footer-company">
            <h4 className="text-text-primary font-semibold mb-4">Компанія</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-text-secondary text-body-sm hover:text-amber-primary transition-colors"
                    data-testid={`link-company-${link.path.replace("/", "")}`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-text-primary font-semibold mb-3">Контакти</h4>
              <a
                href="mailto:admin@gradusmedia.org"
                className="text-text-secondary text-body-sm hover:text-amber-primary transition-colors"
                data-testid="link-email"
              >
                admin@gradusmedia.org
              </a>
            </div>
          </div>

          <div data-testid="footer-social">
            <h4 className="text-text-primary font-semibold mb-4">Слідкуйте за нами</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-amber-primary/10 border border-amber-primary/20 rounded-md text-amber-primary hover:bg-amber-primary/20 hover:border-amber-primary hover:amber-glow transition-all"
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-amber-primary/10 text-center" data-testid="footer-bottom">
          <p className="text-text-tertiary text-body-sm mb-2">
            &copy; 2026 Gradus Media. Всі права захищені.
          </p>
          <p className="text-text-tertiary text-body-xs">
            Створено з використанням AI для HoReCa індустрії України
          </p>
        </div>
      </div>
    </footer>
  );
}
