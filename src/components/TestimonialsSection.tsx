// TODO: Replace placeholder testimonials with real ones when collected from users

const GOLD = "rgba(201,168,76,";

const testimonials = [
  {
    id: 1,
    quote: "Скоротили витрати на бар на 18% за перший місяць",
    author: "Олексій М.",
    role: "Bar manager, Київ",
  },
  {
    id: 2,
    quote:
      "Alex відповів на питання про ліцензію за 2 хвилини. Юрист коштував би 500 грн за консультацію",
    author: "Вікторія С.",
    role: "Власниця кафе, Львів",
  },
  {
    id: 3,
    quote:
      "Нарешті розумію що відбувається на світовому ринку. Читаю дайджест щотижня",
    author: "Роман В.",
    role: "Ресторатор, Дніпро",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill={`${GOLD}0.9)`}
        >
          <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.4l-3.71 2.15.71-4.13L2 5.5l4.15-.75z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-16 px-6" data-testid="testimonials-section">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-10">
          <p
            className="mb-2 uppercase tracking-widest"
            style={{ fontSize: "0.7rem", color: `${GOLD}0.7)` }}
          >
            Відгуки
          </p>
          <h2
            className="font-semibold"
            style={{
              fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
              color: "rgba(255,255,255,0.9)",
              lineHeight: 1.3,
            }}
          >
            Що кажуть власники барів та ресторанів
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col p-7 rounded-2xl"
              style={{
                background: `${GOLD}0.05)`,
                border: `1px solid ${GOLD}0.15)`,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
              data-testid={`testimonial-card-${t.id}`}
            >
              <Stars />
              <p
                className="flex-1 mb-6"
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.75)",
                  fontStyle: "italic",
                  fontWeight: 300,
                }}
              >
                "{t.quote}"
              </p>
              <div>
                <p
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.88)",
                  }}
                >
                  — {t.author}
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: `${GOLD}0.7)`,
                    marginTop: "2px",
                  }}
                >
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
