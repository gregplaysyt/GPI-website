import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import DonateBand from '../components/DonateBand.jsx';
import { usePageContent } from '../hooks.js';
import { IMG } from '../images.js';
import { Reveal, Stagger, StaggerItem, CountUp } from '../motion.jsx';

export default function About() {
  return (
    <>
      <Hero />
      <OriginStory />
      <Timeline />
      <ValuesLeadership />
      <Centres />
      <DonateBand />
    </>
  );
}

/* ------------------------------ Hero ------------------------------ */
function Hero() {
  const hero = usePageContent('about', {
    headline: "Thirty-two years of building girls' power.",
    body: "Girls' Power Initiative (GPI) is a feminist non-governmental organisation working in Nigeria since 1994, so that every girl can decide her own life and defend the rights she was born with.",
  });
  const facts = [
    ['Founded', '1994, Calabar'],
    ['Centres', '5 states'],
    ['United Nations', 'ECOSOC status'],
    ['Volunteers', '160 active'],
  ];
  return (
    <PageHero
      crumb="About us"
      headline={hero.headline}
      lead={hero.body}
    >
      <Reveal delay={0.1}
        className="m-full"
        style={{
          width: 380, background: 'var(--gpi-white)', borderRadius: 20,
          boxShadow: 'var(--gpi-shadow-raised)', padding: 28, flexShrink: 0,
        }}
      >
        <div className="eyebrow">At a glance</div>
        <div style={{ marginTop: 16 }}>
          {facts.map(([k, v], i) => (
            <div key={k}>
              {i > 0 && <div style={{ height: 1, background: 'var(--gpi-divider)', margin: '18px 0' }} />}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ color: 'var(--gpi-muted)' }}>{k}</span>
                <span style={{ fontWeight: 500, color: 'var(--gpi-ink)' }}>{v}</span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </PageHero>
  );
}

/* --------------------------- Origin story -------------------------- */
function OriginStory() {
  const stats = [
    { value: 32, suffix: ' yrs', label: 'of continuous work' },
    { value: 160, suffix: '+', label: 'volunteers and staff' },
    { value: 45, suffix: '', label: 'partner schools' },
  ];
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div className="r-grid" style={{ display: 'grid', gridTemplateColumns: '560px 1fr', gap: 72, alignItems: 'center' }}>
          <Reveal>
            <div className="media" style={{ borderRadius: 28, height: 600, boxShadow: 'var(--gpi-shadow-raised)', position: 'relative', backgroundImage: `url(${IMG.origin})` }}>
              <div style={{ position: 'absolute', left: 24, bottom: 24, background: '#fff', borderRadius: 999, padding: '12px 16px', display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: '0 12px 28px rgba(30,41,59,0.12)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gpi-green)' }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--gpi-ink)' }}>Founded in Calabar, 1994</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="eyebrow">Our story</span>
            <h2 className="h3" style={{ marginTop: 12 }}>It started with a question girls kept asking.</h2>
            <p className="body-text" style={{ marginTop: 20 }}>
              In 1994, Professor Bene Madunagu and a small circle of Nigerian feminists began meeting
              with teenage girls in Calabar. The girls asked the same things again and again: about
              their bodies, their safety, their futures. Nobody was answering.
            </p>
            <p className="body-text" style={{ marginTop: 16 }}>
              Those meetings became Girls' Power Initiative. Three decades on, the method is
              unchanged: start with what girls already know, add accurate information, and let them lead.
            </p>

            <div style={{ display: 'flex', gap: 0, marginTop: 32, flexWrap: 'wrap', rowGap: 20 }}>
              {stats.map((s, i) => (
                <div key={s.label} style={{ display: 'flex', gap: 0, alignItems: 'center' }}>
                  {i > 0 && <div style={{ width: 1, height: 48, background: 'var(--gpi-image)', margin: '0 32px' }} />}
                  <div>
                    <div style={{ fontFamily: 'var(--gpi-serif)', fontWeight: 700, fontSize: 32, color: 'var(--gpi-ink)', lineHeight: 1 }}>
                      <CountUp to={s.value} suffix={s.suffix} />
                    </div>
                    <div style={{ fontSize: 12, color: '#111827', marginTop: 10, maxWidth: 110 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/news" className="btn btn-dark btn-sm" style={{ marginTop: 32, height: 45 }}>
              Read our 2025 report <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Timeline ---------------------------- */
function Timeline() {
  const items = [
    { year: '1994', active: true, title: 'Founded in Calabar', body: 'Prof. Bene Madunagu and a circle of feminists begin meeting teenage girls.' },
    { year: '2001', title: 'First centre outside Cross River', body: "The Benin City centre opens, taking the girls' club model into Edo State." },
    { year: '2008', title: 'UN consultative status', body: "GPI is accredited with ECOSOC, carrying girls' voices into global policy." },
    { year: '2016', title: 'Five centres nationwide', body: 'Jos, Lagos and Port Harcourt join, reaching girls in five states.' },
    { year: '2026', title: 'A ₦50m endowment fund', body: 'Launched in memory of our founder to keep the work going for good.' },
  ];
  return (
    <section style={{ background: 'var(--gpi-ink)' }}>
      <div className="container" style={{ paddingTop: 96, paddingBottom: 96 }}>
        <Reveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40 }}>
          <div>
            <span className="eyebrow" style={{ color: 'var(--gpi-pink-on-dark)' }}>Milestones</span>
            <h2 className="h2" style={{ color: '#fff', marginTop: 12 }}>Three decades, one direction.</h2>
          </div>
          <p style={{ maxWidth: 440, fontSize: 15, lineHeight: 1.7, color: 'var(--gpi-faint)' }}>
            Each step widened who we could reach, from a single room in Calabar to five centres and
            a seat at the United Nations.
          </p>
        </Reveal>

        <Stagger className="r-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 32, marginTop: 48 }}>
          {items.map((it) => (
            <StaggerItem key={it.year}>
              <span
                style={{
                  display: 'inline-flex', height: 27, padding: '0 14px', borderRadius: 999,
                  background: it.active ? 'var(--gpi-primary)' : 'var(--gpi-ink-soft)',
                  color: it.active ? '#fff' : 'var(--gpi-pink-on-dark)',
                  fontSize: 12, fontWeight: 500, alignItems: 'center',
                }}
              >
                {it.year}
              </span>
              <div style={{ height: 1, background: '#2c2e36', marginTop: 16, marginBottom: 16 }} />
              <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.45, color: '#fff' }}>{it.title}</div>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: '#b9b3ab', marginTop: 8 }}>{it.body}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------ Values & leadership ---------------------- */
function ValuesLeadership() {
  const values = [
    { n: '01', title: 'Feminism', body: 'We name patriarchy as the problem, not girls as the failure.', tint: '#F8E9EE', fg: '#A52A46', accent: false },
    { n: '02', title: 'Integrity', body: 'What we tell a girl in a club is what we tell a donor in a report.', tint: '#E7F1EE', fg: '#1F6F5C', accent: false },
    { n: '03', title: 'Accountability', body: 'Every programme is measured with the people it is meant to serve.', tint: '#FDF1E0', fg: '#A65C12', accent: false },
    { n: '04', title: 'Solidarity', body: 'We work with boys, families, schools and rulers, not against them.', tint: '#EDEAF6', fg: '#4B4184', accent: false },
    { n: '05', title: 'Girl-led', body: 'Our clubs are led by the girls themselves, with adults in support.', tint: '#C33A69', fg: '#fff', accent: true },
  ];
  const leaders = [
    { initials: 'AO', name: 'Anthonia Odey', role: 'National Coordinator', city: 'Calabar', tint: '#F8E9EE' },
    { initials: 'GI', name: 'Grace Ibekwe', role: 'Head of Programmes', city: 'Benin City', tint: '#E7F1EE' },
    { initials: 'HB', name: 'Hauwa Baba', role: 'SRHR Lead', city: 'Jos', tint: '#FDF1E0' },
    { initials: 'CA', name: 'Chidi Amadi', role: 'M&E Lead', city: 'Lagos', tint: '#EDEAF6' },
  ];
  return (
    <section className="section" style={{ background: 'var(--gpi-cream)' }}>
      <div className="container">
        {/* Values */}
        <div className="r-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40 }}>
          <div style={{ maxWidth: 560 }}>
            <span className="eyebrow">What we hold</span>
            <h2 className="h2" style={{ marginTop: 12 }}>Five commitments we do not trade.</h2>
          </div>
          <p style={{ maxWidth: 420, fontSize: 15, lineHeight: 1.7, color: 'var(--gpi-body)' }}>
            These principles were written with the girls in our clubs, and they still decide how we
            spend every naira.
          </p>
        </div>

        <Stagger className="r-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 24, marginTop: 48 }}>
          {values.map((v) => (
            <StaggerItem
              key={v.n}
              style={{
                background: v.accent ? 'var(--gpi-primary)' : 'var(--gpi-white)',
                borderRadius: 20, padding: 24, boxShadow: v.accent ? 'none' : 'var(--gpi-shadow-card)',
              }}
            >
              <span
                style={{
                  display: 'inline-flex', height: 23, padding: '0 12px', borderRadius: 999,
                  background: v.tint, color: v.fg, fontSize: 11, fontWeight: 700, alignItems: 'center',
                }}
              >
                {v.n}
              </span>
              <div style={{ fontSize: 17, fontWeight: 700, color: v.accent ? '#fff' : 'var(--gpi-ink)', marginTop: 16, lineHeight: 1.4 }}>
                {v.title}
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: v.accent ? '#fbe4ea' : 'var(--gpi-muted)', marginTop: 10 }}>
                {v.body}
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Leadership */}
        <div className="r-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40, marginTop: 80 }}>
          <div style={{ maxWidth: 620 }}>
            <span className="eyebrow">Leadership</span>
            <h2 className="h2" style={{ marginTop: 12, fontSize: 40, lineHeight: 1.2 }}>Nigerian feminists, all the way up.</h2>
          </div>
          <Link to="/contact" className="link-pill" style={{ background: 'var(--gpi-white)' }}>
            Meet the whole team <ArrowRight size={16} />
          </Link>
        </div>

        <Stagger className="r-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 48 }}>
          {leaders.map((l) => (
            <StaggerItem key={l.name}>
              <div
                style={{
                  background: l.tint, borderRadius: 20, height: 280, boxShadow: 'var(--gpi-shadow-card)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <span style={{ fontFamily: 'var(--gpi-serif)', fontWeight: 700, fontSize: 76, color: '#111827' }}>
                  {l.initials}
                </span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--gpi-ink)', marginTop: 12 }}>{l.name}</div>
              <div style={{ fontSize: 13, color: 'var(--gpi-muted)', marginTop: 2 }}>{l.role}</div>
              <span className="value-pill" style={{ marginTop: 8 }}>{l.city}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ----------------------------- Centres ----------------------------- */
function Centres() {
  const centres = [
    { n: '01', name: 'Calabar', detail: 'Cross River State, national secretariat', contact: 'gpibenin@gpinigeria.org' },
    { n: '02', name: 'Benin City', detail: 'Edo State', contact: '+234 807 304 2499' },
    { n: '03', name: 'Jos', detail: 'Plateau State', contact: 'Mon to Fri, 9am to 5pm' },
    { n: '04', name: 'Lagos', detail: 'Lagos State', contact: 'Youth drop-in centre' },
    { n: '05', name: 'Port Harcourt', detail: 'Rivers State', contact: 'Counselling and referrals' },
  ];
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div className="r-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40 }}>
          <div style={{ maxWidth: 560 }}>
            <span className="eyebrow">Where we are</span>
            <h2 className="h2" style={{ marginTop: 12, fontSize: 40, lineHeight: 1.2 }}>Five centres, one network.</h2>
          </div>
          <p style={{ maxWidth: 440, fontSize: 15, lineHeight: 1.7, color: 'var(--gpi-body)' }}>
            Each centre runs its own clubs, counselling and school partnerships, and shares one
            safeguarding standard.
          </p>
        </div>

        <Stagger style={{ marginTop: 40 }}>
          {centres.map((c, i) => (
            <StaggerItem key={c.name}>
              {i > 0 && <div style={{ height: 1, background: 'var(--gpi-divider)' }} />}
              <div
                className="r-grid"
                style={{
                  display: 'grid', gridTemplateColumns: '48px 280px 260px 1fr auto', gap: 16,
                  alignItems: 'center', padding: '24px 0',
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--gpi-primary)' }}>{c.n}</span>
                <span style={{ fontSize: 20, fontFamily: 'var(--gpi-serif)', fontWeight: 700, color: 'var(--gpi-ink)' }}>{c.name}</span>
                <span style={{ fontSize: 13, color: 'var(--gpi-muted)' }}>{c.detail}</span>
                <span style={{ fontSize: 13, color: 'var(--gpi-muted)' }}>{c.contact}</span>
                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500, color: 'var(--gpi-ink)' }}>
                  Visit centre <ArrowUpRight size={15} />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
