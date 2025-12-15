import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav 
      className="flex items-center flex-wrap gap-2 text-body-sm text-text-secondary mb-6"
      aria-label="Breadcrumb"
      data-testid="breadcrumbs"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-text-tertiary" />
          )}
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-amber-primary transition-colors"
              data-testid={`breadcrumb-link-${index}`}
            >
              {item.label}
            </Link>
          ) : (
            <span 
              className="text-text-tertiary"
              data-testid={`breadcrumb-current-${index}`}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
