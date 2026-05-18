interface FAQProps {
  title?: string;
  items: { q: string; a: string }[];
}

export function FAQ({ title = 'Frequently Asked Questions', items }: FAQProps) {
  return (
    <section className="section">
      <div className="container-page">
        <div className="eyebrow">Answers</div>
        <h2 className="mt-2 text-3xl md:text-4xl font-semibold">{title}</h2>
        <div className="mt-8 grid gap-4">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-[color:var(--color-blush)] bg-white p-5 open:shadow-sm"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                <span className="font-semibold text-[color:var(--color-ink)]">{item.q}</span>
                <span className="text-[color:var(--color-rose-dark)] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-[color:var(--color-ink-soft)]/85 leading-relaxed whitespace-pre-line">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
