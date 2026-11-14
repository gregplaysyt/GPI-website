import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, ChevronRight, Heart, Landmark, Mail, MapPin, Phone, Users,
} from 'lucide-react';
import { api } from '../api.js';
import { usePageContent } from '../hooks.js';
import PageHero from '../components/PageHero.jsx';
import DonateBand from '../components/DonateBand.jsx';
import { IMG } from '../images.js';
import { Reveal, Stagger, StaggerItem } from '../motion.jsx';

// Static centre directory, mirrored from the design's "Reach us" column.
// All five centres share the one safeguarding phone line shown on this page.
const centres = [
  { city: 'Calabar', state: 'Cross River State', note: 'National secretariat', email: 'gpicalabar@gpinigeria.org' },
  { city: 'Benin City', state: 'Edo State', note: '', email: 'gpibenin@gpinigeria.org' },
  { city: 'Jos', state: 'Plateau State', note: '', email: 'gpijos@gpinigeria.org' },
  { city: 'Lagos', state: 'Lagos State', note: '', email: 'gpilagos@gpinigeria.org' },
  { city: 'Port Harcourt', state: 'Rivers State', note: '', email: 'gpiph@gpinigeria.org' },
];

export default function Contact() {
  const hero = usePageContent('contact', {
    headline: 'Give, volunteer, or partner with us.',
    body: 'Whatever you can offer, a centre in Calabar, Benin City, Jos, Lagos or Port Harcourt can use it this term.',
  });
  return (
    <>
      <PageHero
        crumb="Get involved"
        headline={hero.headline}
        lead={hero.body}
      />
      <WaysSection />
      <ContactSection />
      <DonateBand />
    </>
  );
}

/* ----------------------- Three ways to get involved ----------------------- */
const wayCta = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  alignSelf: 'flex-start',
  height: 38,
  padding: '0 18px',
  borderRadius: 999,
  fontSize: 13,
  fontWeight: 500,
  whiteSpace: 'nowrap',
};

const ways = [
  {
    key: 'give',
    icon: Heart,
    iconBg: '#C33A69',
    iconColor: '#fff',
    bg: 'var(--gpi-primary)',
    title: 'Give monthly',
    titleColor: '#fff',
    body: 'A monthly gift keeps our centres open and our clubs running all year. Cancel any time, no questions asked.',
    bodyColor: '#FBE4EA',
    cta: 'Start giving',
    ctaBg: '#fff',
    ctaColor: '#A52A46',
    to: '/causes',
  },
  {
    key: 'volunteer',
    icon: Users,
    iconBg: 'var(--gpi-primary-tint)',
    iconColor: 'var(--gpi-primary)',
    bg: '#fff',
    shadow: 'var(--gpi-shadow-card)',
    title: 'Volunteer your skill',
    titleColor: 'var(--gpi-ink)',
    body: 'Facilitators, counsellors, designers and data volunteers are needed every term.',
    bodyColor: 'var(--gpi-body)',
    cta: 'See open roles',
    ctaBg: '#F2ECE5',
    ctaColor: '#12141A',
    href: '#contact-form',
  },
  {
    key: 'partner',
    icon: Landmark,
    iconBg: '#23252C',
    iconColor: 'var(--gpi-pink-on-dark)',
    bg: 'var(--gpi-ink)',
    title: 'Partner with us',
    titleColor: '#fff',
    body: 'Fund a cause, second a staff member, or co-design a programme with a centre.',
    bodyColor: 'var(--gpi-faint)',
    cta: 'Talk to our team',
    ctaBg: '#fff',
    ctaColor: '#12141A',
    href: '#contact-form',
  },
];

function WaysSection() {
  return (
    <section style={{ background: 'var(--gpi-cream)', paddingBottom: 96 }}>
      <div className="container">
        <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
          {ways.map((w) => (
            <StaggerItem key={w.key}>
              <WayCard w={w} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function WayCard({ w }) {
  const Icon = w.icon;
  return (
    <div
      className="card"
      style={{
        borderRadius: 24,
        padding: 28,
        background: w.bg,
        boxShadow: w.shadow,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: 48, height: 48, borderRadius: 14, background: w.iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Icon size={21} color={w.iconColor} strokeWidth={1.75} />
      </div>
      <h3 style={{ fontFamily: 'var(--gpi-sans)', fontSize: 20, fontWeight: 700, lineHeight: 1.35, color: w.titleColor, marginTop: 16 }}>
        {w.title}
      </h3>
      <p style={{ fontSize: 13, lineHeight: 1.69, color: w.bodyColor, marginTop: 12, flex: 1 }}>{w.body}</p>
      {w.to ? (
        <Link to={w.to} style={{ ...wayCta, background: w.ctaBg, color: w.ctaColor, marginTop: 20 }}>
          {w.cta}
          <ArrowRight size={15} color={w.ctaColor} />
        </Link>
      ) : (
        <a href={w.href} style={{ ...wayCta, background: w.ctaBg, color: w.ctaColor, marginTop: 20 }}>
          {w.cta}
          <ArrowRight size={15} color={w.ctaColor} />
        </a>
      )}
    </div>
  );
}

/* ------------------------- Contact form + centres ------------------------- */
const labelStyle = { display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--gpi-ink)', marginBottom: 8 };
const inputStyle = {
  width: '100%',
  height: 44,
  padding: '0 16px',
  background: '#fff',
  border: '1px solid var(--gpi-divider)',
  borderRadius: 999,
  fontSize: 13,
  color: '#111827',
  fontFamily: 'inherit',
};

function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'I would like to volunteer',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError] = useState('');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      await api.sendContact({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });
      setStatus('success');
      setForm({ name: '', email: '', subject: 'I would like to volunteer', message: '' });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  return (
    <section id="contact-form" style={{ background: '#fff', paddingTop: 96, paddingBottom: 96 }}>
      <div className="container">
        <div style={{ display: 'flex', gap: 72, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Form card */}
          <Reveal
            className="card"
            style={{
              flex: '1 1 480px', maxWidth: 640, borderRadius: 28,
              background: 'var(--gpi-cream)', boxShadow: 'var(--gpi-shadow-raised)', padding: 40,
            }}
          >
            <h2 style={{ fontFamily: 'var(--gpi-serif)', fontWeight: 700, fontSize: 28, lineHeight: 1.2, color: 'var(--gpi-ink)' }}>
              Send us a message
            </h2>
            <p style={{ fontSize: 13, lineHeight: 1.62, color: 'var(--gpi-muted)', marginTop: 10, maxWidth: 560 }}>
              We answer every message within three working days. If a girl is in danger, call our line directly.
            </p>

            <form onSubmit={handleSubmit} noValidate style={{ marginTop: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                <div>
                  <label htmlFor="contact-name" style={labelStyle}>Full name</label>
                  <input
                    id="contact-name"
                    style={inputStyle}
                    placeholder="Amara Okon"
                    value={form.name}
                    onChange={update('name')}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" style={labelStyle}>Email address</label>
                  <input
                    id="contact-email"
                    type="email"
                    style={inputStyle}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={update('email')}
                    required
                  />
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <label htmlFor="contact-subject" style={labelStyle}>What is this about?</label>
                <div style={{ position: 'relative' }}>
                  <select
                    id="contact-subject"
                    style={{ ...inputStyle, appearance: 'none', paddingRight: 40 }}
                    value={form.subject}
                    onChange={update('subject')}
                  >
                    <option>I would like to volunteer</option>
                    <option>I want to give</option>
                    <option>I want to partner with GPI</option>
                    <option>Something else</option>
                  </select>
                  <ChevronRight
                    size={16}
                    color="#8a8177"
                    style={{
                      position: 'absolute', right: 16, top: '50%',
                      transform: 'translateY(-50%) rotate(90deg)', pointerEvents: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <label htmlFor="contact-message" style={labelStyle}>Your message</label>
                <textarea
                  id="contact-message"
                  style={{ ...inputStyle, height: 120, borderRadius: 20, padding: '14px 16px', lineHeight: 1.62, resize: 'vertical' }}
                  placeholder="Tell us a little about your experience and which centre is closest to you."
                  value={form.message}
                  onChange={update('message')}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%', height: 47, borderRadius: 999, border: 'none', cursor: 'pointer',
                  background: 'var(--gpi-primary)', color: '#fff', fontSize: 15, fontWeight: 500,
                  marginTop: 24, opacity: status === 'submitting' ? 0.7 : 1,
                }}
              >
                {status === 'submitting' ? (
                  'Sending...'
                ) : (
                  <>
                    <ArrowRight size={16} color="#fff" />
                    Send message
                  </>
                )}
              </button>

              {status === 'success' && (
                <div
                  style={{
                    marginTop: 16, padding: '12px 16px', borderRadius: 12,
                    background: 'var(--gpi-green-tint)', color: 'var(--gpi-green)', fontSize: 13, fontWeight: 500,
                  }}
                >
                  Thank you — we have received your message.
                </div>
              )}
              {status === 'error' && (
                <div
                  style={{
                    marginTop: 16, padding: '12px 16px', borderRadius: 12,
                    background: 'var(--gpi-amber-tint)', color: 'var(--gpi-amber)', fontSize: 13, fontWeight: 500,
                  }}
                >
                  {error}
                </div>
              )}

              <p style={{ fontSize: 11, lineHeight: 1.64, color: '#111827', marginTop: 16 }}>
                By sending this form you agree to our safeguarding and privacy policy.
              </p>
            </form>
          </Reveal>

          {/* Centres column */}
          <Reveal delay={0.1} style={{ flex: '1 1 480px', maxWidth: 600 }}>
            <span className="eyebrow">Reach us</span>
            <h2
              style={{
                fontFamily: 'var(--gpi-serif)', fontWeight: 700, fontSize: 34, lineHeight: 1.24,
                letterSpacing: -0.6, color: 'var(--gpi-ink)', marginTop: 16, maxWidth: 600,
              }}
            >
              Five centres, one phone line.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 32 }}>
              <ContactRow icon={Mail} label="Email" value="gpibenin@gpinigeria.org" href="mailto:gpibenin@gpinigeria.org" />
              <ContactRow icon={Phone} label="Safeguarding line" value="+234 807 304 2499" href="tel:+2348073042499" />
            </div>

            <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: 1.2, textTransform: 'uppercase', color: '#111827', marginTop: 32, marginBottom: 12 }}>
              Our centres
            </div>
            <Stagger style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {centres.map((c) => (
                <StaggerItem key={c.city}>
                  <CentreRow c={c} />
                </StaggerItem>
              ))}
            </Stagger>

            <div
              className="media"
              style={{ height: 221, borderRadius: 24, marginTop: 32, position: 'relative', backgroundColor: '#E7E3DC', backgroundImage: `url(${IMG.community})` }}
            >
              <div
                style={{
                  position: 'absolute', left: 20, bottom: 20, display: 'inline-flex', alignItems: 'center',
                  gap: 8, height: 35, padding: '0 16px', borderRadius: 999, background: 'var(--gpi-ink)',
                }}
              >
                <MapPin size={14} color="#F2B8CD" />
                <span style={{ fontSize: 12, fontWeight: 500, color: '#fff' }}>National secretariat, Calabar</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, label, value, href }) {
  return (
    <a
      href={href}
      style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--gpi-cream)', borderRadius: 20, padding: '16px 20px' }}
    >
      <div
        style={{
          width: 44, height: 44, borderRadius: 12, background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}
      >
        <Icon size={18} color="var(--gpi-primary)" strokeWidth={1.5} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, color: '#111827' }}>{label}</div>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--gpi-ink)', marginTop: 2 }}>{value}</div>
      </div>
      <ArrowUpRight size={16} color="#8a8177" />
    </a>
  );
}

function CentreRow({ c }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--gpi-cream)', borderRadius: 16, padding: '14px 16px' }}>
      <div
        style={{
          width: 40, height: 40, borderRadius: 12, background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}
      >
        <MapPin size={16} color="var(--gpi-primary)" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--gpi-ink)' }}>{c.city}</span>
          {c.note && (
            <span className="tag" style={{ background: 'var(--gpi-primary-tint)', color: 'var(--gpi-primary-dark)' }}>
              {c.note}
            </span>
          )}
        </div>
        <div style={{ fontSize: 12, color: 'var(--gpi-body)', marginTop: 2 }}>{c.state}</div>
        <a href={`mailto:${c.email}`} style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--gpi-primary-dark)', marginTop: 2 }}>
          {c.email}
        </a>
      </div>
    </div>
  );
}
