import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, HandHeart, Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/what-we-do', label: 'What we do' },
  { to: '/causes', label: 'Our causes' },
  { to: '/news', label: 'News' },
  { to: '/contact', label: 'Contact' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        background: 'var(--gpi-nav)',
        borderBottom: '1px solid #e8e0d6',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="container header-bar"
        style={{ display: 'flex', alignItems: 'center', height: 88, gap: 24 }}
      >
        {/* Brand */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <span
            style={{
              width: 44,
              height: 44,
              background: 'var(--gpi-primary)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: 0.5,
            }}
          >
            GPI
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2, minWidth: 0 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#6b655d' }}>
              Girls' Power Initiative
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: 1.2,
                textTransform: 'uppercase',
                color: '#111827',
                marginTop: 4,
              }}
            >
              Toward an empowered womanhood
            </span>
          </span>
        </Link>

        {/* Nav links */}
        <nav
          style={{
            display: 'flex',
            gap: 32,
            marginLeft: 'auto',
            marginRight: 24,
          }}
          className="desktop-nav"
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="desktop-nav">
          <button
            aria-label="Search"
            className="header-icon-btn"
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: '#f2ece5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Search size={18} color="#12141a" />
          </button>
          <Link
            to="/causes"
            className="header-donate"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              height: 41,
              padding: '0 18px',
              borderRadius: 999,
              background: 'var(--gpi-primary)',
              color: '#fff',
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            <HandHeart size={17} />
            Donate
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="mobile-toggle"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          style={{ marginLeft: 'auto', display: 'none' }}
        >
          {open ? <X size={24} color="#12141a" /> : <Menu size={24} color="#12141a" />}
        </button>
      </div>

      {open && (
        <nav
          className="mobile-menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: 4,
            padding: '0 20px 20px',
            background: 'var(--gpi-nav)',
          }}
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={{ padding: '10px 0', fontSize: 15, fontWeight: 500, color: '#3a3a40' }}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: inline-flex !important; }
          .mobile-menu { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
