import { useEffect } from "react";
import { useLocation } from "wouter";

const EXCLUDED_PREFIXES = ["/chat"];
const EXCLUDED_EXACT = ["/"];

function isExcluded(path: string): boolean {
  const normalized = path.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  if (EXCLUDED_EXACT.includes(normalized)) return true;
  return EXCLUDED_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(prefix + "/")
  );
}

export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if (!isExcluded(location)) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}
