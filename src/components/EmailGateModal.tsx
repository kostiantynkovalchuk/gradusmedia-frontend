import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, User, Briefcase, Check, AlertCircle } from "lucide-react";

interface EmailGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; position: string }) => void;
}

export function EmailGateModal({ isOpen, onSubmit }: EmailGateModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await onSubmit({ name, email, position });
    } catch (err) {
      setError("Не вдалося зареєструватися. Спробуйте ще раз.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-md rounded-2xl p-8 relative"
        style={{
          background: 'linear-gradient(135deg, hsl(263 50% 12%) 0%, hsl(263 45% 18%) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)'
        }}
        data-testid="email-gate-modal"
      >
        <div className="flex justify-center mb-6">
          <img
            src="/images/alex.jpg"
            alt="Alex Gradus"
            className="w-24 h-24 rounded-full object-cover"
            style={{
              border: '3px solid rgba(245, 158, 11, 0.4)',
              objectPosition: 'center 40%'
            }}
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-text-primary mb-2">
          Привіт! Я Alex
        </h2>
        <p className="text-text-secondary text-center mb-6">
          Щоб почати, представтесь — це займе 10 секунд
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Ваше ім'я
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Олександр"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text-primary focus:outline-none focus:border-amber-primary/50 disabled:opacity-50"
              data-testid="input-name"
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="oleksandr@restaurant.ua"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text-primary focus:outline-none focus:border-amber-primary/50 disabled:opacity-50"
              data-testid="input-email"
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">
              <Briefcase className="w-4 h-4 inline mr-2" />
              Посада
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text-primary focus:outline-none focus:border-amber-primary/50 disabled:opacity-50"
              data-testid="select-position"
            >
              <option value="">Оберіть посаду</option>
              <option value="owner">Власник закладу</option>
              <option value="manager">Менеджер / Адміністратор</option>
              <option value="bartender">Бармен / Сомельє</option>
              <option value="chef">Шеф-кухар</option>
              <option value="other">Інше</option>
            </select>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 space-y-2">
            <p className="text-sm text-green-400 flex items-center gap-2">
              <Check className="w-4 h-4" /> 5 безкоштовних питань
            </p>
            <p className="text-sm text-green-400 flex items-center gap-2">
              <Check className="w-4 h-4" /> Без картки
            </p>
            <p className="text-sm text-green-400 flex items-center gap-2">
              <Check className="w-4 h-4" /> Скасувати будь-коли
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 text-base font-semibold rounded-xl disabled:opacity-50"
            style={{
              background: 'linear-gradient(90deg, hsl(var(--amber-primary)) 0%, hsl(var(--amber-secondary)) 100%)',
              color: 'hsl(263 50% 12%)'
            }}
            data-testid="button-register"
          >
            {isSubmitting ? "Реєстрація..." : "Почати безкоштовно"}
          </Button>

          <p className="text-xs text-text-tertiary text-center">
            Реєструючись, ви погоджуєтесь з{" "}
            <a href="/privacy" className="text-amber-primary hover:underline">
              політикою конфіденційності
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
