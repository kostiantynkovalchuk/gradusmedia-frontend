import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoMedium from "@assets/generated_images/logo.webp";

const navItems = [
  { title: "Головна", path: "/" },
  { title: "Новини", path: "/category/news" },
  { title: "Огляди", path: "/category/reviews" },
  { title: "Тренди", path: "/category/trends" },
  { title: "Чат з Alex", path: "/chat", highlight: true },
  { title: "Про нас", path: "/about" },
];

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 h-20 md:h-20 bg-bg-dark/95 backdrop-blur-header border-b border-amber-primary/10"
      data-testid="header"
    >
      <div className="max-w-[1400px] mx-auto h-full px-6 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0" data-testid="link-logo-home">
          <img
            src={logoMedium}
            alt="Gradus Media logo"
            className="max-w-[43px] md:max-w-[49px] h-auto aspect-square"
            style={{
              mixBlendMode: 'lighten',
              filter: 'blur(0.2px)',
              maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
            }}
            data-testid="img-logo"
          />
          <span className="text-amber-primary font-bold text-lg md:text-xl tracking-wide hidden sm:block">
            GRADUS MEDIA
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" data-testid="nav-desktop">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <Button
                variant="ghost"
                className={`text-body-sm font-medium px-4 py-2 ${
                  location === item.path
                    ? "text-amber-primary"
                    : item.highlight
                    ? "text-amber-primary/80 hover:text-amber-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
                data-testid={`nav-link-${item.title.toLowerCase()}`}
              >
                {item.title}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-text-secondary hover:text-amber-primary"
            data-testid="button-search"
          >
            <Search className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-text-secondary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="lg:hidden absolute top-full left-0 right-0 border-b border-amber-primary/10"
          style={{
            background: "rgba(26, 15, 40, 0.95)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          }}
          data-testid="nav-mobile"
        >
          <nav className="flex flex-col p-4">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-body-md font-medium py-3 ${
                    location === item.path
                      ? "text-amber-primary"
                      : "text-text-secondary"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`nav-mobile-link-${item.title.toLowerCase()}`}
                >
                  {item.title}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
