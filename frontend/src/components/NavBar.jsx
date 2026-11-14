import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, HandHeart, Menu, X, ArrowRight } from 'lucide-react';
import { EASE } from '../motion.jsx';

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

  // Lock page scroll while the mobile menu is open, and close on Escape.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

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
              flexShrink: 0,
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
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{ marginLeft: 'auto', display: 'none' }}
        >
          {open ? <X size={24} color="#12141a" /> : <Menu size={24} color="#12141a" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="mobile-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: EASE }}
              aria-label="Mobile navigation"
            >
              <motion.ul
                className="mobile-menu-list"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                }}
              >
                {links.map((l) => (
                  <motion.li
                    key={l.to}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
                    }}
                  >
                    <NavLink
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) => `mobile-menu-link${isActive ? ' active' : ''}`}
                    >
                      <span>{l.label}</span>
                      <ArrowRight size={18} className="mobile-menu-arrow" />
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                className="mobile-menu-cta"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE, delay: 0.28 }}
              >
                <Link
                  to="/causes"
                  onClick={() => setOpen(false)}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <HandHeart size={17} />
                  Donate
                </Link>
                <p>Support girls across Nigeria, one gift at a time.</p>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
