import { Link } from "wouter";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main 
      className="min-h-screen pt-20 flex items-center justify-center"
      data-testid="page-not-found"
    >
      <div className="max-w-md mx-auto px-6 text-center">
        <div className="text-[120px] font-bold text-amber-primary/20 leading-none mb-4">
          404
        </div>
        <h1 className="text-text-primary text-h2 font-bold mb-4">
          Сторінку не знайдено
        </h1>
        <p className="text-text-secondary text-body-md mb-8">
          На жаль, сторінка, яку ви шукаєте, не існує або була переміщена.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">
            <Button 
              className="bg-amber-primary text-bg-dark font-semibold hover:bg-amber-neon hover:amber-glow transition-all"
              data-testid="button-go-home"
            >
              <Home className="w-4 h-4 mr-2" />
              На головну
            </Button>
          </Link>
          <Button 
            variant="outline"
            className="border-border text-text-secondary hover:text-text-primary"
            onClick={() => window.history.back()}
            data-testid="button-go-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
        </div>
      </div>
    </main>
  );
}
