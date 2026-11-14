import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import { FacebookIcon, InstagramIcon, XIcon } from './SocialIcons.jsx';
import { api } from '../api.js';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | done | error

  async function subscribe(e) {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    try {
      await api.subscribeNewsletter(email);
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <footer style={{ background: 'var(--gpi-ink)', color: '#b9b2aa' }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 56 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 1fr 1fr 300px', gap: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span
                style={{
                  width: 44, height: 44, background: 'var(--gpi-primary)', borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: 16,
                }}
              >
                GPI
              </span>
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>
                  Girls' Power Initiative
                </span>
                <span
                  style={{
                    fontSize: 11, fontWeight: 500, letterSpacing: 1.2,
                    textTransform: 'uppercase', color: '#ada49c', marginTop: 4,
                  }}
                >
                  Toward an empowered womanhood
                </span>
              </span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, marginTop: 24 }}>
              A feminist institution empowering children and young females to become catalysts
              for change in Nigeria.
            </p>
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a href="mailto:gpibenin@gpinigeria.org" style={{ display: 'inline-flex', gap: 12, fontSize: 13, color: '#e4ded7' }}>
                <Mail size={15} color="#ada49c" /> gpibenin@gpinigeria.org
              </a>
              <a href="tel:+2348073042499" style={{ display: 'inline-flex', gap: 12, fontSize: 13, color: '#e4ded7' }}>
                <Phone size={15} color="#ada49c" /> +234 807 304 2499
              </a>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 22 }}>
              {[
                { icon: <FacebookIcon />, label: 'Facebook' },
                { icon: <InstagramIcon />, label: 'Instagram' },
                { icon: <XIcon />, label: 'X' },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  style={{
                    width: 44, height: 44, borderRadius: 12, background: '#23252c',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e4ded7',
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <FooterLinks
            title="Organisation"
            items={[
              { label: 'About us', to: '/about' },
              { label: 'Our team', to: '/about' },
              { label: 'Annual reports', to: '/news' },
              { label: 'Work with us', to: '/contact' },
            ]}
          />
          <FooterLinks
            title="Programmes"
            items={[
              { label: 'Girl child protection', to: '/what-we-do' },
              { label: 'Sexual health and rights', to: '/what-we-do' },
              { label: 'Leadership and voice', to: '/what-we-do' },
              { label: 'Economic empowerment', to: '/what-we-do' },
            ]}
          />
          <FooterLinks
            title="Get involved"
            items={[
              { label: 'Donate', to: '/causes' },
              { label: 'Volunteer with us', to: '/contact' },
              { label: 'Partner with us', to: '/contact' },
              { label: 'Contact a centre', to: '/contact' },
            ]}
          />

          {/* Newsletter */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.4, textTransform: 'uppercase', color: '#ada49c' }}>
              Stay in touch
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, marginTop: 12 }}>
              Monthly updates from our five centres, straight to your inbox.
            </p>
            <form
              onSubmit={subscribe}
              style={{
                display: 'flex', alignItems: 'center', background: '#23252c',
                borderRadius: 999, padding: 6, marginTop: 20, height: 56,
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  color: '#e4ded7', padding: '0 14px', fontSize: 13,
                }}
              />
              <button
                type="submit"
                aria-label="Subscribe"
                style={{
                  width: 44, height: 44, borderRadius: 999, background: 'var(--gpi-primary)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ArrowRight size={17} />
              </button>
            </form>
            {status === 'done' && <p style={{ fontSize: 12, color: '#9fd8c4', marginTop: 8 }}>Thanks — you are subscribed.</p>}
            {status === 'error' && <p style={{ fontSize: 12, color: '#ffb3b3', marginTop: 8 }}>Something went wrong. Please try again.</p>}
          </div>
        </div>
      </div>

      <div className="container" style={{ borderTop: '1px solid #23252c', paddingTop: 24, paddingBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: '#ada49c' }}>
            © 2026 Girls' Power Initiative. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 24, fontSize: 12, color: '#ada49c' }}>
            <a href="#">Privacy</a>
            <a href="#">Safeguarding</a>
            <a href="#">Accessibility</a>
          </div>
          <span style={{ fontSize: 11, color: '#ada49c' }}>
            Photography courtesy of Girls' Power Initiative.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          footer .container > div { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 720px) {
          footer .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterLinks({ title, items }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.4, textTransform: 'uppercase', color: '#ada49c' }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
        {items.map((i) => (
          <Link key={i.label} to={i.to} style={{ fontSize: 13, color: '#d5cfc8' }}>
            {i.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
