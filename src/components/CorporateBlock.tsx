import Link from 'next/link';
import { Icons } from './Icons';

export function CorporateBlock() {
  return (
    <section className="section dark" id="corporate" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="container">
        <div className="corp-grid">
          <div>
            <span className="eyebrow">05 — Corporate Brand Activation</span>
            <h2 className="display" style={{ marginTop: 24 }}>
              More than a photo booth —<br />
              <em>a branded event activation.</em>
            </h2>
            <p className="lede" style={{ marginTop: 24 }}>
              Treat your booth like a campaign. We build branded environments, capture leads, push
              to your CRM, and deliver a post-event analytics report alongside the gallery.
            </p>

            <div className="corp-feat">
              <div className="corp-feat-item">
                <div className="corp-feat-icon"><Icons.Brush /></div>
                <div className="corp-feat-name">Custom Overlays</div>
                <div className="corp-feat-desc">Brand-locked print + GIF templates, designed in-house.</div>
              </div>
              <div className="corp-feat-item">
                <div className="corp-feat-icon"><Icons.Qr /></div>
                <div className="corp-feat-name">QR + AirDrop Sharing</div>
                <div className="corp-feat-desc">Guests share directly to phone, social, or email.</div>
              </div>
              <div className="corp-feat-item">
                <div className="corp-feat-icon"><Icons.Lead /></div>
                <div className="corp-feat-name">Lead Capture</div>
                <div className="corp-feat-desc">Forms, opt-ins, and CRM pushes for marketing teams.</div>
              </div>
              <div className="corp-feat-item">
                <div className="corp-feat-icon"><Icons.Share /></div>
                <div className="corp-feat-name">Digital Gallery</div>
                <div className="corp-feat-desc">Branded landing page with full event gallery + analytics.</div>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <Link href="/corporate-photo-booth-rental-ct/" className="btn btn-ghost">
                Request a corporate brief
                <span className="arrow" />
              </Link>
            </div>
          </div>

          <div className="corp-mockup">
            <div className="mock-browser">
              <div className="mock-browser-bar">
                <div className="mock-browser-dot" />
                <div className="mock-browser-dot" />
                <div className="mock-browser-dot" />
                <div className="mock-browser-url">goldcoastevents.co/gallery/q4-launch</div>
              </div>
              <div className="mock-browser-body">
                <div className="mock-gallery">
                  <div className="mock-gallery-cell" />
                  <div className="mock-gallery-cell" />
                  <div className="mock-gallery-cell" />
                  <div className="mock-gallery-cell" />
                </div>
                <div className="mock-side">
                  <div className="mock-side-row gold" />
                  <div className="mock-side-row" />
                  <div className="mock-side-row short" />
                  <div className="mock-side-row tall" />
                  <div className="mock-side-row" />
                  <div className="mock-side-row short" />
                  <div className="mock-qr" />
                </div>
              </div>
            </div>
            <div className="mock-flash">
              <span className="mock-flash-dot" /> Live · 47 shares
            </div>
            <div className="mock-lead">
              <div className="mock-lead-label">Leads captured</div>
              <div className="mock-lead-num">312</div>
              <div className="mock-lead-sub">+ 86% opt-in rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
