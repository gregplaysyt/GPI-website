import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Reveal } from '../motion.jsx';

// Inner-page hero: cream band with a breadcrumb, headline and lead.
// `children` renders an optional right-side card (quick facts, totals, etc).
export default function PageHero({ crumb, headline, lead, children }) {
  return (
    <section style={{ background: 'var(--gpi-cream)' }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 48, alignItems: 'flex-start' }}>
          <Reveal style={{ maxWidth: 820, flex: 1 }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
              <Link to="/" style={{ color: '#111827' }}>Home</Link>
              <ChevronRight size={13} color="#8a8177" />
              <span style={{ fontWeight: 500, color: 'var(--gpi-ink)' }}>{crumb}</span>
            </nav>
            <h1 className="h1" style={{ marginTop: 24, maxWidth: 820 }}>{headline}</h1>
            {lead && <p className="lead" style={{ marginTop: 24, maxWidth: 760 }}>{lead}</p>}
          </Reveal>
          {children}
        </div>
      </div>
    </section>
  );
}
