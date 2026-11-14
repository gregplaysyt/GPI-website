import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Check, ChevronRight, Clock, Coins, GraduationCap, Heart,
  Home as HomeIcon, BookOpen, MapPin, Shield, Sparkles, Users,
} from 'lucide-react';
import { api } from '../api.js';
import { useAsync, usePageContent } from '../hooks.js';
import { fallbackCauses, categoryStyles } from '../data.js';
import DonateBand from '../components/DonateBand.jsx';
import { photoFor } from '../images.js';
import { Reveal, Stagger, StaggerItem, CountUp } from '../motion.jsx';

// Category icon string -> lucide component, kept in step with data.js.
const causeTagIcons = {
  'graduation-cap': GraduationCap,
  home: HomeIcon,
  'book-open': BookOpen,
  coins: Coins,
  shield: Shield,
  sparkles: Sparkles,
};

// Small icon for the meta line under each cause.
const metaIcons = {
  education: MapPin,
  'safe-spaces': Clock,
  health: Users,
  livelihood: Users,
  protection: MapPin,
};

// Filter pills in the hero. `value` is the data category, `null` shows all.
const filters = [
  { label: 'All causes', value: null },
  { label: 'Health', value: 'health' },
  { label: 'Protection', value: 'protection' },
  { label: 'Education', value: 'education' },
  { label: 'Livelihoods', value: 'livelihood' },
];

const spotlightStats = [
  { value: 312, suffix: ' clubs', label: 'meeting every week' },
  { value: 12400, suffix: ' girls', label: 'in clubs this year' },
  { value: 86, suffix: '%', label: 'still attending a year on' },
];

// Accordion content, with the first question open by default.
const faqs = [
  {
    q: 'Can I choose which centre receives my gift?',
    a: "Yes. Add a note at checkout naming Calabar, Benin City, Jos, Lagos or Port Harcourt, and the funds are restricted to that centre's clubs and counselling.",
  },
  {
    q: 'How do I set up a monthly gift?',
    a: "Choose 'monthly' on the giving page and your card is charged on the same day each month. You can change or cancel the gift at any time from your confirmation email.",
  },
  {
    q: 'Can I give from outside Nigeria?',
    a: 'Yes. The giving page accepts international cards and bank transfers, and your receipt is issued automatically by email wherever you are.',
  },
  {
    q: 'Can my organisation partner on a cause?',
    a: "Yes. Write to gpibenin@gpinigeria.org with your organisation's name and the cause you want to support, and our partnerships team will reply with next steps.",
  },
  {
    q: 'Where do you publish your spending?',
    a: 'Our annual report and audited accounts are published on the website each year, and we share quarterly updates with every regular donor.',
  },
];

export default function Causes() {
  const { data } = useAsync(api.getCauses);
  const causes = data || fallbackCauses;
  const [filter, setFilter] = useState(null);

  const visible = filter ? causes.filter((c) => c.category === filter) : causes;

  return (
    <>
      <Hero filter={filter} setFilter={setFilter} total={causes.length} />
      <CausesList causes={visible} />
      <Spotlight />
      <Faq />
      <DonateBand />
    </>
  );
}

/* ------------------------------- Hero ------------------------------- */
function Hero({ filter, setFilter, total }) {
  const hero = usePageContent('causes', {
    headline: 'Six causes. One girl at a time.',
    body: 'Every cause below is a live programme in our centres. Read what each one does, then give if you can.',
  });
  return (
    <section style={{ background: 'var(--gpi-cream)' }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 56 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
          <Reveal style={{ flex: '1 1 520px', maxWidth: 760 }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
              <Link to="/" style={{ color: '#111827' }}>Home</Link>
              <ChevronRight size={13} color="#8a8177" />
              <span style={{ fontWeight: 500, color: 'var(--gpi-ink)' }}>Our causes</span>
            </nav>
            <h1
              style={{
                fontFamily: 'var(--gpi-serif)', fontWeight: 700,
                fontSize: 'clamp(34px, 5vw, 58px)', lineHeight: 1.14, letterSpacing: -1,
                color: 'var(--gpi-ink)', marginTop: 28, maxWidth: 760,
              }}
            >
              {hero.headline}
            </h1>
            <p className="lead" style={{ marginTop: 24, maxWidth: 680 }}>
              {hero.body}
            </p>
          </Reveal>

          <Reveal delay={0.1} style={{ background: 'var(--gpi-ink)', borderRadius: 24, padding: 24, width: 320, flexShrink: 0 }}>
            <span style={{ display: 'block', fontSize: 11, fontWeight: 500, letterSpacing: 1.4, textTransform: 'uppercase', color: 'var(--gpi-pink-on-dark)' }}>
              Live right now
            </span>
            <div style={{ fontFamily: 'var(--gpi-serif)', fontWeight: 700, fontSize: 34, color: '#fff', marginTop: 12 }}>
              {total} causes
            </div>
            <div style={{ fontSize: 12, color: '#ADA49C', marginTop: 8 }}>
              each one open for support
            </div>
          </Reveal>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 48 }}>
          {filters.map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.label}
                type="button"
                onClick={() => setFilter(f.value)}
                style={{
                  height: 36, padding: '0 18px', borderRadius: 999,
                  background: active ? 'var(--gpi-ink)' : '#fff',
                  color: active ? '#fff' : '#3A3A40',
                  fontSize: 13, fontWeight: 500,
                  border: active ? '1px solid var(--gpi-ink)' : '1px solid var(--gpi-divider)',
                  transition: 'background 0.15s ease, color 0.15s ease',
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Cause rows ----------------------------- */
function CausesList({ causes }) {
  if (!causes.length) {
    return (
      <section style={{ background: 'var(--gpi-cream)', padding: '48px 0 96px' }}>
        <div className="container">
          <p style={{ fontSize: 15, color: 'var(--gpi-body)' }}>
            No causes match this filter yet. Choose "All causes" to see everything.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: 'var(--gpi-cream)', paddingTop: 32, paddingBottom: 96 }}>
      <div className="container">
        <Stagger style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
          {causes.map((c, i) => (
            <StaggerItem key={c.id}>
              <CauseRow cause={c} reversed={i % 2 === 1} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function CauseRow({ cause, reversed }) {
  const style = categoryStyles[cause.category] || categoryStyles.other;
  const TagIcon = causeTagIcons[style.icon] || Sparkles;
  const MI = metaIcons[cause.category] || MapPin;

  const image = (
    <div
      className="media"
      style={{
        flex: '1 1 480px', maxWidth: 560, height: 360, borderRadius: 24,
        boxShadow: 'var(--gpi-shadow-raised)', backgroundImage: `url(${photoFor(cause.category)})`,
      }}
    />
  );

  const copy = (
    <div style={{ flex: '1 1 440px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <span className="tag" style={{ background: style.tint, color: style.fg, alignSelf: 'flex-start' }}>
        <TagIcon size={13} />
        {style.label}
      </span>
      <h2
        style={{
          fontFamily: 'var(--gpi-serif)', fontWeight: 700, fontSize: 32, lineHeight: 1.25,
          letterSpacing: -0.4, color: 'var(--gpi-ink)', marginTop: 18, maxWidth: 620,
        }}
      >
        {cause.title}
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--gpi-body)', marginTop: 14, maxWidth: 600 }}>
        {cause.summary}
      </p>
      <span className="meta" style={{ marginTop: 20 }}>
        <MI size={14} /> {cause.meta_line}
      </span>
      <Link
        to="/causes"
        className="btn btn-dark"
        style={{ alignSelf: 'flex-start', marginTop: 28, height: 45, padding: '0 24px', fontSize: 14 }}
      >
        Donate <ArrowRight size={16} />
      </Link>
    </div>
  );

  return (
    <div style={{ display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
      {reversed ? <>{copy}{image}</> : <>{image}{copy}</>}
    </div>
  );
}

/* ----------------------------- Spotlight ---------------------------- */
function Spotlight() {
  return (
    <section style={{ background: 'var(--gpi-cream)', paddingBottom: 96 }}>
      <div className="container">
        <div
          style={{
            background: 'var(--gpi-ink)', borderRadius: 28, overflow: 'hidden',
            display: 'flex', flexWrap: 'wrap', boxShadow: 'var(--gpi-shadow-raised)',
          }}
        >
          <div style={{ flex: '1 1 640px', padding: 48, minWidth: 0 }}>
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, height: 25,
                padding: '0 14px', borderRadius: 999, background: '#23252C',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gpi-pink-on-dark)' }} />
              <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--gpi-pink-on-dark)' }}>
                Spotlight cause
              </span>
            </span>
            <h2
              style={{
                fontFamily: 'var(--gpi-serif)', fontWeight: 700, fontSize: 40, lineHeight: 1.2,
                letterSpacing: -0.6, color: '#fff', marginTop: 24, maxWidth: 640,
              }}
            >
              Girls' empowerment: the club that keeps a girl in school.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.73, color: 'var(--gpi-faint)', marginTop: 20, maxWidth: 640 }}>
              Our longest running programme gives a girl a room of her peers, a trained facilitator and a hot meal
              on meeting day. Gift Aid goes straight into the clubs at all five centres, with no share taken for
              administration.
            </p>
            <div style={{ display: 'flex', marginTop: 32, flexWrap: 'wrap' }}>
              {spotlightStats.map((s, i) => (
                <div
                  key={s.value}
                  style={{
                    padding: i === 0 ? '0 40px 0 0' : '0 40px',
                    borderLeft: i === 0 ? 'none' : '1px solid rgba(228, 220, 210, 0.22)',
                  }}
                >
                  <div style={{ fontFamily: 'var(--gpi-serif)', fontWeight: 700, fontSize: 28, color: '#fff', whiteSpace: 'nowrap' }}>
                    <CountUp to={s.value} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: 12, color: '#ADA49C', marginTop: 6 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="spotlight-side" style={{ flex: '0 0 420px', background: 'var(--gpi-primary)', padding: 40, display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.4, textTransform: 'uppercase', color: '#ffe5e5' }}>
              Support this cause
            </span>
            <h3 style={{ fontFamily: 'var(--gpi-serif)', fontWeight: 700, fontSize: 26, lineHeight: 1.3, color: '#fff', marginTop: 12 }}>
              Every gift goes to the clubs.
            </h3>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: '#ffe5e5', marginTop: 16 }}>
              Choose an amount on the giving page, or set up a monthly gift and cancel whenever you like.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24, marginBottom: 32 }}>
              {['One off or monthly', 'Choose a centre to support', 'Receipt by email'].map((w) => (
                <div key={w} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Check size={15} color="#fff" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#fff' }}>{w}</span>
                </div>
              ))}
            </div>
            <Link
              to="/causes"
              className="btn btn-dark"
              style={{ marginTop: 'auto', width: '100%', justifyContent: 'center', height: 45, background: 'var(--gpi-ink)' }}
            >
              <Heart size={16} /> Donate to this cause
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- FAQ -------------------------------- */
function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section style={{ background: 'var(--gpi-cream)', paddingBottom: 96 }}>
      <div className="container">
        <div style={{ display: 'flex', gap: 72, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <Reveal className="faq-side" style={{ flex: '0 0 420px', maxWidth: 420 }}>
            <span className="eyebrow">Questions</span>
            <h2
              style={{
                fontFamily: 'var(--gpi-serif)', fontWeight: 700, fontSize: 38, lineHeight: 1.21,
                letterSpacing: -0.6, color: 'var(--gpi-ink)', marginTop: 12,
              }}
            >
              How giving here works.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--gpi-body)', marginTop: 20, maxWidth: 420 }}>
              Still unsure? Write to gpibenin@gpinigeria.org and a real person will answer within three working days.
            </p>
          </Reveal>

          <Stagger style={{ flex: '1 1 560px', minWidth: 0 }}>
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <StaggerItem key={f.q} style={{ borderBottom: '1px solid var(--gpi-divider)' }}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between', gap: 16, padding: '24px 0', textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--gpi-ink)' }}>{f.q}</span>
                    {isOpen ? <MinusIcon /> : <PlusIcon />}
                  </button>
                  {isOpen && (
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--gpi-body)', paddingBottom: 24, maxWidth: 720 }}>
                      {f.a}
                    </p>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

// The accordion uses +/- glyphs, kept as inline SVG to match the design
// stroke and stay independent of the available lucide icon set.
function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M9 3v12M3 9h12" stroke="#8a8177" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M3 9h12" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
