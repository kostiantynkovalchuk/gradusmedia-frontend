import { Link } from "wouter";
import { CheckCircle, ArrowLeft } from "lucide-react";

export default function UnsubscribePage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "var(--bg-primary, #0a0a0a)" }}
      data-testid="unsubscribe-page"
    >
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)" }}
          >
            <CheckCircle className="w-8 h-8" style={{ color: "rgba(201,168,76,0.85)" }} />
          </div>
        </div>

        <h1
          className="font-semibold mb-3"
          style={{
            fontSize: "clamp(1.25rem, 4vw, 1.6rem)",
            color: "rgba(255,255,255,0.9)",
            lineHeight: 1.3,
          }}
        >
          Ви успішно відписались від розсилки GradusMedia
        </h1>

        <p
          className="mb-8"
          style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}
        >
          Якщо це помилка — напишіть нам:{" "}
          <a
            href="mailto:admin@gradusmedia.org"
            style={{ color: "rgba(201,168,76,0.75)", textDecoration: "underline" }}
            data-testid="link-support-email"
          >
            admin@gradusmedia.org
          </a>
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-opacity duration-200 hover:opacity-80"
          style={{
            background: "rgba(201,168,76,0.12)",
            border: "1px solid rgba(201,168,76,0.3)",
            color: "rgba(201,168,76,0.9)",
            fontSize: "0.9rem",
          }}
          data-testid="link-home"
        >
          <ArrowLeft className="w-4 h-4" />
          На головну
        </Link>
      </div>
    </main>
  );
}
