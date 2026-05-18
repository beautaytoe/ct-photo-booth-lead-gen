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
            <div className="brand-text">
              <div className="brand-name">
                Gold Coast<span style={{ fontStyle: 'italic', color: 'var(--gold-bright)' }}> Photo Booth Co.</span>
              </div>
              <div className="brand-sub">Photo Booth Rental CT</div>
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
            <Link href={NAV.cta.href} className="btn btn-primary nav-cta-btn">
              <span className="nav-cta-label-full">{NAV.cta.label}</span>
              <span className="nav-cta-label-short">Book</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
