'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { NAV } from '@/lib/site-data';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-inner">
          <Link href="/" className="brand">
            <div className="brand-mark">G</div>
            <div>
              <div className="brand-name">
                Gold Coast<span style={{ fontStyle: 'italic', color: 'var(--gold-bright)' }}> Photo Booth Co.</span>
              </div>
              <div className="brand-sub">CT · Fairfield County First</div>
            </div>
          </Link>

          <ul className="nav-links">
            {NAV.main.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>

          <div className="nav-cta">
            <Link href={NAV.cta.href} className="btn btn-primary">
              {NAV.cta.label}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
