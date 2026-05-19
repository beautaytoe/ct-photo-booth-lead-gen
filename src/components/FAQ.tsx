'use client';

import { useState } from 'react';
import { SITE } from '@/lib/site-data';

interface FAQProps {
  title?: string;
  eyebrow?: string;
  items: { q: string; a: string }[];
  headline?: React.ReactNode;
  lede?: string;
}

export function FAQ({
  title,
  eyebrow = '08 — Frequently Asked',
  items,
  headline,
  lede = `Still curious? Reach out anytime — ${SITE.responseTime.toLowerCase()}.`,
}: FAQProps) {
  const [open, setOpen] = useState(0);

  return (
    <section className="section dark" id="faq">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="display" style={{ marginTop: 24 }}>
              {headline ?? (
                <>
                  The questions<br />
                  <em>we love to answer.</em>
                </>
              )}
            </h2>
            {title && <div className="sr-only">{title}</div>}
          </div>
          <div className="section-head-right">
            <p className="lede">{lede}</p>
          </div>
        </div>

        <div className="faq">
          {items.map((f, i) => (
            <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
              <button
                className="faq-q"
                onClick={() => setOpen(open === i ? -1 : i)}
                type="button"
                aria-expanded={open === i}
              >
                <span>{f.q}</span>
                <span className="faq-q-plus" />
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
