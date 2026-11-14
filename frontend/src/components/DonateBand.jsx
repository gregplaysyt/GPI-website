import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

export default function DonateBand() {
  return (
    <section style={{ background: 'var(--gpi-primary)', color: '#fff' }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 48, flexWrap: 'wrap',
          }}
        >
          <div style={{ maxWidth: 780 }}>
            <span
              style={{
                fontSize: 11, fontWeight: 500, letterSpacing: 1.6, textTransform: 'uppercase',
              }}
            >
              Support our work
            </span>
            <h2 style={{ color: '#fff', fontSize: 42, lineHeight: 1.2, letterSpacing: -0.8, marginTop: 12 }}>
              Stand with a girl for the whole year.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: '#fbe4ea', marginTop: 16, maxWidth: 680 }}>
              A gift keeps our centres open, our clubs running and our counselling line answered,
              whatever the month brings.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16 }}>
            <Link
              to="/causes"
              className="btn btn-dark"
              style={{ height: 54, padding: '0 28px' }}
            >
              <Heart size={18} />
              Donate
              <ArrowRight size={17} />
            </Link>
            <div style={{ display: 'flex', gap: 12 }}>
              <span
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, height: 31,
                  padding: '0 16px', borderRadius: 999, background: '#c33a69', fontSize: 12, fontWeight: 500,
                }}
              >
                <ShieldCheck size={14} /> Secure giving
              </span>
              <span
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, height: 31,
                  padding: '0 16px', borderRadius: 999, background: '#c33a69', fontSize: 12, fontWeight: 500,
                }}
              >
                <MapPin size={14} /> Choose a centre
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
