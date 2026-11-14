import { Link } from 'react-router-dom';
import {
  ArrowRight, Check, ChevronRight, GraduationCap, HandCoins, HeartPulse,
  Landmark, Megaphone, Scale, Shield, ShieldCheck, Users,
} from 'lucide-react';
import { fallbackProgrammes } from '../data.js';
import { usePageContent } from '../hooks.js';
import SectionHeader from '../components/SectionHeader.jsx';
import DonateBand from '../components/DonateBand.jsx';
import { IMG } from '../images.js';
import { Reveal, Stagger, StaggerItem, CountUp } from '../motion.jsx';

// Programme icon + tint accents, kept in step with the design and data.js.
const programmeIcons = {
  shield: ShieldCheck,
  'heart-pulse': HeartPulse,
  megaphone: Megaphone,
  coins: HandCoins,
};
const programmeTints = {
  '#B4285A': '#F8E9EE',
  '#1F6F5C': '#E7F1EE',
  '#A65C12': '#FDF1E0',
  '#4B4184': '#EDEAF6',
};

// Photo for each programme block, keyed by its accent colour.
const programmePhotos = {
  '#B4285A': IMG.protection,
  '#1F6F5C': IMG.health,
  '#A65C12': IMG.leadership,
  '#4B4184': IMG.livelihood,
};

// Static designed copy for the four detailed programme blocks.
const programmes = [
  {
    id: 1,
    label: 'Programme 01',
    eyebrow: 'Protection',
    accent: '#B4285A',
    headline: 'Protection of the girl child and young females.',
    body: "The socialisation of girls weakens their protection and their decision making in public and private spheres. We work with girls, their families and local authorities so that protection becomes a shared duty rather than a private hope.",
    outcomes: [
      'Safeguarding training for 1,200 teachers and community volunteers',
      'Case referrals with police, health and social welfare units in five states',
      'Community watch groups that report violations without shame',
    ],
  },
  {
    id: 2,
    label: 'Programme 02',
    eyebrow: 'Sexual and reproductive health',
    accent: '#1F6F5C',
    headline: 'Adolescent sexuality and SRHR education.',
    body: 'Young people want to learn about their reproductive health, and too often nobody tells them the truth. Accurate, age-appropriate knowledge lowers vulnerability, prevents unintended pregnancy and reduces reproductive health problems among girls.',
    outcomes: [
      'A curriculum taught in 45 partner schools across five states',
      'Youth-friendly clinics where a girl can ask without being judged',
      'Peer educators who answer questions in language girls actually use',
    ],
  },
  {
    id: 3,
    label: 'Programme 03',
    eyebrow: 'Leadership',
    accent: '#A65C12',
    headline: "Girls' empowerment, leadership and civic voice.",
    body: 'A girl child is first vulnerable as a child, then again as a girl. Our clubs give her a room where she sets the agenda, chairs the meeting and learns that her opinion can change a decision at home or in her community.',
    outcomes: [
      "312 girls' clubs run by trained peer facilitators",
      "Annual girls' parliament with state ministries",
      'Alumni network of former club members now mentoring girls',
    ],
  },
  {
    id: 4,
    label: 'Programme 04',
    eyebrow: 'Economic empowerment',
    accent: '#4B4184',
    headline: 'Skills, enterprise and an income of her own.',
    body: 'Knowledge without an income is fragile. We pair vocational training with financial literacy and small start-up grants, so a young woman can leave a bad situation without losing her livelihood.',
    outcomes: [
      'Tailoring, catering, digital and craft tracks for 2,000 young women',
      'Savings groups and start-up grants for young women',
      'Market linkages with 60 women-owned cooperatives',
    ],
  },
];

const barriers = [
  {
    label: 'Barrier 01',
    icon: Scale,
    color: '#B4285A',
    tint: '#F8E9EE',
    title: 'Patriarchal values and gender stereotypes',
    body: 'Girls are taught to defer before they are taught to read. The message arrives from family, school, worship and media at once.',
  },
  {
    label: 'Barrier 02',
    icon: Shield,
    color: '#A65C12',
    tint: '#FDF1E0',
    title: 'Harmful practices against girls',
    body: 'Female genital mutilation, child marriage and denial of inheritance persist, often defended as culture rather than questioned as harm.',
  },
  {
    label: 'Barrier 03',
    icon: Users,
    color: '#1F6F5C',
    tint: '#E7F1EE',
    title: 'Community apathy and negative social norms',
    body: 'When a violation is treated as normal, no one reports it. Silence is the barrier that protects every other barrier.',
  },
  {
    label: 'Barrier 04',
    icon: Landmark,
    color: '#4B4184',
    tint: '#EDEAF6',
    title: 'Limited political will at every level',
    body: 'Laws protecting girls exist. Budgets, enforcement and trained officials often do not, so rights stay on paper.',
  },
];

const steps = [
  {
    title: 'Listen in the community',
    body: 'We start with households, schools and market women, not with a proposal document.',
  },
  {
    title: 'Train girls and allies',
    body: 'Peer facilitators, teachers and parents learn the same accurate curriculum.',
  },
  {
    title: 'Open a safe space',
    body: 'Clubs, counselling and referrals run weekly, free, with a known adult present.',
  },
  {
    title: 'Change the system',
    body: 'We take what girls report to rulers, ministries and the United Nations.',
  },
];

export default function WhatWeDo() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <ProgrammesIntro />
      <ProgrammeBlocks />
      <HowWeWork />
      <DonateBand />
    </>
  );
}

/* ------------------------------- Hero ------------------------------- */
function Hero() {
  const hero = usePageContent('what-we-do', {
    headline: "All we want is the consciousness, the will and the act to uphold girls' and women's rights.",
    body: "Four programme areas, one theory of change: give a girl accurate information, a safe room of peers, and an adult who keeps her word.",
  });
  const stats = [
    { value: 12400, suffix: '', label: 'girls in clubs' },
    { value: 45, suffix: '', label: 'partner schools' },
    { value: 160, suffix: '+', label: 'volunteers' },
    { value: 5, suffix: '', label: 'states reached' },
  ];

  return (
    <section style={{ background: 'var(--gpi-ink)' }}>
      <div className="container" style={{ paddingTop: 88, paddingBottom: 72 }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
          <Link to="/" style={{ color: '#ADA49C' }}>Home</Link>
          <ChevronRight size={13} color="#ADA49C" />
          <span style={{ fontWeight: 500, color: 'var(--gpi-pink-on-dark)' }}>What we do</span>
        </nav>

        <Reveal>
          <h1
            style={{
              fontFamily: 'var(--gpi-serif)', fontWeight: 700,
              fontSize: 'clamp(34px, 5vw, 58px)', lineHeight: 1.14, letterSpacing: -1,
              color: '#fff', marginTop: 32, maxWidth: 1080,
            }}
          >
            {hero.headline}
          </h1>
        </Reveal>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap', marginTop: 40 }}>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--gpi-faint)', maxWidth: 640, margin: 0 }}>
            {hero.body}
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <HeroPill icon={<Users size={16} color="#F2B8CD" />} label="5 centres" />
            <HeroPill icon={<GraduationCap size={16} color="#F2B8CD" />} label="45 schools" />
          </div>
        </div>

        <Stagger
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 32, marginTop: 56, paddingTop: 40, borderTop: '1px solid #23252C',
          }}
        >
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div style={{ fontFamily: 'var(--gpi-serif)', fontWeight: 700, fontSize: 30, color: '#fff' }}>
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: 12, color: '#ADA49C', marginTop: 6 }}>{s.label}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function HeroPill({ icon, label }) {
  return (
    <div
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, height: 40,
        padding: '0 16px', borderRadius: 999, background: '#23252C',
      }}
    >
      {icon}
      <span style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>{label}</span>
    </div>
  );
}

/* --------------------------- The problem ---------------------------- */
function ProblemSection() {
  return (
    <section className="section" style={{ background: 'var(--gpi-cream)' }}>
      <div className="container">
        <SectionHeader
          eyebrow="The situation"
          title="What girls here are up against."
          body="Our work begins from what girls tell us. The same four barriers come up in every state, and they set our programme priorities."
        />
        <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
          {barriers.map((b) => (
            <StaggerItem key={b.label}>
              <BarrierCard b={b} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function BarrierCard({ b }) {
  const Icon = b.icon;
  return (
    <div className="card" style={{ borderRadius: 24, padding: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div
          style={{
            width: 48, height: 48, borderRadius: 14, background: b.tint,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Icon size={21} color={b.color} />
        </div>
        <span
          style={{
            display: 'inline-flex', alignItems: 'center', height: 23, padding: '0 12px',
            borderRadius: 999, background: 'var(--gpi-cream)', fontSize: 11, fontWeight: 500, color: '#111827',
          }}
        >
          {b.label}
        </span>
      </div>
      <h3 style={{ fontFamily: 'var(--gpi-sans)', fontSize: 20, fontWeight: 700, lineHeight: 1.35, color: 'var(--gpi-ink)', marginTop: 20 }}>
        {b.title}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.64, color: 'var(--gpi-body)', marginTop: 10 }}>{b.body}</p>
    </div>
  );
}

/* ------------------------ Programmes overview ----------------------- */
function ProgrammesIntro() {
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <SectionHeader
          eyebrow="Our programmes"
          title="Four programmes, one movement."
          body="Each programme answers one of the barriers girls face. Together they build the full arc from protection to independence."
        />
        <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {fallbackProgrammes.map((p) => {
            const Icon = programmeIcons[p.icon] || ShieldCheck;
            const tint = programmeTints[p.accent] || '#F8E9EE';
            return (
              <StaggerItem key={p.id} className="card" style={{ background: 'var(--gpi-cream)', borderRadius: 20, padding: 28 }}>
                <div
                  style={{
                    width: 52, height: 52, borderRadius: 14, background: tint,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Icon size={22} color={p.accent} />
                </div>
                <h3 style={{ fontFamily: 'var(--gpi-sans)', fontSize: 19, fontWeight: 700, lineHeight: 1.35, marginTop: 24, color: 'var(--gpi-ink)' }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--gpi-body)', marginTop: 12 }}>{p.summary}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* ----------------------- Programme detail blocks -------------------- */
function ProgrammeBlocks() {
  return (
    <section style={{ background: '#fff', paddingBottom: 96 }}>
      <div className="container">
        {programmes.map((p, i) => (
          <Reveal key={p.id} style={{ marginTop: i === 0 ? 0 : 96 }}>
            <ProgrammeBlock p={p} reversed={i % 2 === 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProgrammeBlock({ p, reversed }) {
  const visual = (
    <div
      className="media"
      style={{
        flex: '1 1 480px', maxWidth: 560, height: 520, borderRadius: 28,
        boxShadow: 'var(--gpi-shadow-raised)', position: 'relative',
        backgroundImage: `url(${programmePhotos[p.accent] || IMG.girls})`,
      }}
    >
      <div
        style={{
          position: 'absolute', left: 24, bottom: 24, display: 'inline-flex', alignItems: 'center',
          gap: 8, height: 35, padding: '0 16px', borderRadius: 999, background: '#fff',
          boxShadow: '0 10px 24px rgba(30, 41, 59, 0.1)',
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.accent }} />
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--gpi-ink)' }}>{p.label}</span>
      </div>
    </div>
  );

  const copy = (
    <div style={{ flex: '1 1 440px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.6, textTransform: 'uppercase', color: p.accent }}>
        {p.eyebrow}
      </span>
      <h2 style={{ fontFamily: 'var(--gpi-serif)', fontWeight: 700, fontSize: 38, lineHeight: 1.21, letterSpacing: -0.6, color: 'var(--gpi-ink)', marginTop: 14, maxWidth: 680 }}>
        {p.headline}
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.73, color: 'var(--gpi-body)', marginTop: 20, maxWidth: 680 }}>{p.body}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
        {p.outcomes.map((o) => (
          <div key={o} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <Check size={18} strokeWidth={1.5} color="#1F6F5C" style={{ flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: 14, lineHeight: 1.57, color: '#3A3A40' }}>{o}</span>
          </div>
        ))}
      </div>
      <Link to="/causes" className="btn btn-dark" style={{ alignSelf: 'flex-start', marginTop: 28, height: 45, padding: '0 22px', fontSize: 14 }}>
        Support this programme <ArrowRight size={16} />
      </Link>
    </div>
  );

  return (
    <div style={{ display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
      {reversed ? <>{copy}{visual}</> : <>{visual}{copy}</>}
    </div>
  );
}

/* ---------------------------- How we work --------------------------- */
function HowWeWork() {
  const impactStats = [
    { value: 86, suffix: '%', label: 'club retention' },
    { value: 4900, suffix: '', label: 'girls counselled' },
    { value: 1200, suffix: '', label: 'teachers trained' },
  ];

  return (
    <section className="section" style={{ background: 'var(--gpi-cream)' }}>
      <div className="container">
        <SectionHeader
          eyebrow="How we work"
          title="From first meeting to lasting change."
          body="The same four steps run in every centre, which is why a girl in Jos gets the same quality of support as a girl in Calabar."
        />

        <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {steps.map((s, i) => {
            const highlight = i === steps.length - 1;
            return (
              <StaggerItem
                key={s.title}
                className="card"
                style={{ borderRadius: 24, padding: 24, background: highlight ? 'var(--gpi-primary)' : '#fff' }}
              >
                <span
                  style={{
                    display: 'inline-flex', alignItems: 'center', height: 23, padding: '0 12px',
                    borderRadius: 999, background: highlight ? '#C33A69' : 'var(--gpi-ink)',
                    fontSize: 11, fontWeight: 700, color: '#fff',
                  }}
                >
                  Step 0{i + 1}
                </span>
                <h3 style={{ fontFamily: 'var(--gpi-sans)', fontSize: 18, fontWeight: 700, lineHeight: 1.39, color: highlight ? '#fff' : 'var(--gpi-ink)', marginTop: 16 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.62, color: highlight ? '#FBE4EA' : 'var(--gpi-muted)', marginTop: 8 }}>
                  {s.body}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div
          className="card"
          style={{
            borderRadius: 24, marginTop: 48, padding: 32,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32, flexWrap: 'wrap',
          }}
        >
          <div style={{ maxWidth: 420 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--gpi-ink)' }}>Verified in our latest audit</div>
            <div style={{ fontSize: 13, lineHeight: 1.62, color: 'var(--gpi-muted)', marginTop: 4 }}>
              Independent monitoring, published every year in our annual report.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            {impactStats.map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--gpi-serif)', fontWeight: 700, fontSize: 26, color: 'var(--gpi-ink)' }}>
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 12, color: '#111827', marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
