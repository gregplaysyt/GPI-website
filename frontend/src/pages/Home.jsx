import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, BadgeCheck, MapPin, ShieldCheck, HeartPulse,
  Megaphone, HandCoins, GraduationCap, Home as HomeIcon, BookOpen, Users,
  Clock, Eye, Target, Quote, CalendarDays, ChevronRight, Coins, Shield, Sparkles,
} from 'lucide-react';

const causeTagIcons = {
  'graduation-cap': GraduationCap, home: HomeIcon, 'book-open': BookOpen,
  coins: Coins, shield: Shield, sparkles: Sparkles,
};
import { api } from '../api.js';
import { useAsync, usePageContent } from '../hooks.js';
import {
  fallbackProgrammes, fallbackCauses, fallbackEvents, fallbackNews,
  categoryStyles, newsCategoryColors, newsCategoryAvatars,
} from '../data.js';
import SectionHeader from '../components/SectionHeader.jsx';
import DonateBand from '../components/DonateBand.jsx';
import Funders from '../components/Funders.jsx';
import { IMG, photoFor } from '../images.js';
import { Reveal, Stagger, StaggerItem } from '../motion.jsx';

const programmeIcons = {
  shield: ShieldCheck, 'heart-pulse': HeartPulse, megaphone: Megaphone, coins: HandCoins,
};
const programmeTints = { '#B4285A': '#F8E9EE', '#1F6F5C': '#E7F1EE', '#A65C12': '#FDF1E0', '#4B4184': '#EDEAF6' };

function metaIcon(cat) {
  const map = { education: MapPin, 'safe-spaces': Clock, health: Users, livelihood: Users, protection: MapPin };
  return map[cat] || MapPin;
}

export default function Home() {
  const programmes = useAsync(api.getProgrammes);
  const causes = useAsync(api.getCauses);
  const events = useAsync(api.getEvents);
  const news = useAsync(api.getNews);

  const progs = programmes.data || fallbackProgrammes;
  const causeList = causes.data || fallbackCauses;
  const eventList = events.data || fallbackEvents;
  const newsList = news.data || fallbackNews;

  const featuredEvent = eventList.find((e) => e.featured) || eventList[0];
  const otherEvents = eventList.filter((e) => e !== featuredEvent).slice(0, 3);
  const shownCauses = causeList.slice(0, 3);

  return (
    <>
      <Hero />
      <StatsBand />
      <ProgrammesSection programmes={progs} />
      <CausesSection causes={shownCauses} />
      <Mission />
      <QuoteBand />
      <EventsSection featured={featuredEvent} events={otherEvents} />
      <BlogSection news={newsList} />
      <Funders />
      <DonateBand />
    </>
  );
}

/* ------------------------------ Hero ------------------------------ */
function Hero() {
  const hero = usePageContent('home', {
    eyebrow: 'A feminist institution since 1994',
    headline: 'Empowering girls to become catalysts for change.',
    body: "Girls' Power Initiative works with children and young females across Nigeria, building the knowledge, confidence and solidarity they need to claim their rights and shape their own futures.",
  });
  return (
    <section style={{ background: 'var(--gpi-cream)' }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div style={{ display: 'flex', gap: 64, alignItems: 'center' }}>
          <Reveal style={{ flex: '1 1 640px', maxWidth: 640 }}>
            <span
              className="eyebrow"
              style={{
                background: 'var(--gpi-primary-tint)', color: 'var(--gpi-primary-dark)',
                borderRadius: 999, padding: '7px 16px', letterSpacing: 1.4,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gpi-primary)' }} />
              {hero.eyebrow}
            </span>
            <h1 className="h1" style={{ marginTop: 24 }}>
              {hero.headline}
            </h1>
            <p className="lead" style={{ marginTop: 24, maxWidth: 540 }}>
              {hero.body}
            </p>
            <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
              <Link to="/causes" className="btn btn-primary">Support our work <ArrowRight /></Link>
              <Link to="/what-we-do" className="btn btn-outline">Explore what we do <ArrowUpRight /></Link>
            </div>
            <div style={{ display: 'flex', gap: 28, marginTop: 28, fontSize: 12, color: 'var(--gpi-muted)' }}>
              <span className="meta" style={{ color: 'var(--gpi-muted)' }}><BadgeCheck size={16} /> UN ECOSOC consultative status</span>
              <span className="meta" style={{ color: 'var(--gpi-muted)' }}><MapPin size={16} /> 5 centres across Nigeria</span>
            </div>
          </Reveal>

          <div style={{ flex: '0 0 608px' }}>
            <div
              className="media"
              style={{ borderRadius: 24, height: 560, boxShadow: 'var(--gpi-shadow-raised)', position: 'relative', backgroundImage: `url(${IMG.hero})` }}
            >
              <div
                style={{
                  position: 'absolute', left: 24, bottom: 24, background: '#fff', borderRadius: 16,
                  padding: 20, boxShadow: '0 12px 32px rgba(30,41,59,0.12)', width: 261,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.2, textTransform: 'uppercase', color: '#111827' }}>
                  Since 1994
                </div>
                <div style={{ fontFamily: 'var(--gpi-serif)', fontWeight: 700, fontSize: 26, color: 'var(--gpi-ink)', marginTop: 2 }}>
                  300,000+ girls
                </div>
                <div style={{ fontSize: 12, color: 'var(--gpi-muted)', marginTop: 4 }}>
                  reached through our centres and clubs
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Stats band --------------------------- */
function StatsBand() {
  const stats = [
    { value: '1994', label: 'Founded by Prof. Bene Madunagu and a circle of feminists' },
    { value: '300,000+', label: 'Girls and young women reached with information and support' },
    { value: '5', label: 'Centres in Calabar, Benin City, Jos, Lagos and Port Harcourt' },
    { value: 'ECOSOC', label: 'Consultative status with the United Nations' },
  ];
  return (
    <section style={{ background: 'var(--gpi-ink)' }}>
      <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 40 }}>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--gpi-faint)', maxWidth: 520, margin: 0 }}>
            A movement built over three decades of feminist organising with girls, families and communities.
          </p>
          <Link to="/about" style={{ display: 'inline-flex', gap: 8, fontSize: 13, fontWeight: 500, color: 'var(--gpi-pink-on-dark)', alignItems: 'center', whiteSpace: 'nowrap' }}>
            Read our story <ArrowRight size={16} />
          </Link>
        </div>
        <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, marginTop: 40 }}>
          {stats.map((s, i) => (
            <StaggerItem
              key={s.value}
              style={{
                padding: i === 0 ? '0 40px 0 0' : '0 40px',
                borderLeft: i === 0 ? 'none' : '1px solid var(--gpi-image)',
              }}
            >
              <div style={{ fontFamily: 'var(--gpi-serif)', fontWeight: 700, fontSize: 44, color: '#fff', lineHeight: 1.1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--gpi-faint)', marginTop: 8 }}>{s.label}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* --------------------------- Programmes ---------------------------- */
function ProgrammesSection({ programmes }) {
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <SectionHeader
          eyebrow="What we do"
          title="Four ways we build girls' power."
          body="Our work starts with the reality girls live in, then builds the knowledge, safety and solidarity that let them decide for themselves."
        />
        <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {programmes.map((p) => {
            const Icon = programmeIcons[p.icon] || ShieldCheck;
            const tint = programmeTints[p.accent] || '#F8E9EE';
            return (
              <StaggerItem key={p.id} className="card" style={{ background: 'var(--gpi-cream)', borderRadius: 20, padding: 28 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: tint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={22} color={p.accent} />
                </div>
                <h3 style={{ fontFamily: 'var(--gpi-sans)', fontSize: 19, fontWeight: 700, lineHeight: 1.35, marginTop: 24, color: 'var(--gpi-ink)' }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--gpi-body)', marginTop: 12 }}>
                  {p.summary}
                </p>
                <Link to="/what-we-do" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500, color: 'var(--gpi-ink)', marginTop: 20 }}>
                  Learn more <ArrowRight size={15} />
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* ----------------------------- Causes ------------------------------ */
function CausesSection({ causes }) {
  return (
    <section className="section" style={{ background: 'var(--gpi-cream)' }}>
      <div className="container">
        <SectionHeader eyebrow="Our causes" title="Where your support goes." linkTo="/causes" linkLabel="All causes" tone="cream" />
        <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {causes.map((c) => {
            const style = categoryStyles[c.category] || categoryStyles.other;
            const MI = metaIcon(c.category);
            const TagIcon = causeTagIcons[style.icon] || Sparkles;
            return (
              <StaggerItem key={c.id} className="card" style={{ borderRadius: 24 }}>
                <div className="media" style={{ height: 220, backgroundImage: `url(${photoFor(c.category)})` }} />
                <div style={{ padding: 24, display: 'flex', flexDirection: 'column', minHeight: 262 }}>
                  <span className="tag" style={{ background: style.tint, color: style.fg, alignSelf: 'flex-start' }}>
                    <TagIcon size={13} />
                    {style.label}
                  </span>
                  <h3 style={{ fontFamily: 'var(--gpi-sans)', fontSize: 19, fontWeight: 700, lineHeight: 1.35, marginTop: 16, color: 'var(--gpi-ink)' }}>
                    {c.title}
                  </h3>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--gpi-body)', marginTop: 8 }}>{c.summary}</p>
                  <span className="meta" style={{ marginTop: 16 }}>
                    <MI size={14} /> {c.meta_line}
                  </span>
                  <Link to="/causes" className="btn btn-dark btn-sm" style={{ marginTop: 20, alignSelf: 'flex-start' }}>
                    Donate <ArrowRight size={15} />
                  </Link>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* ----------------------------- Mission ----------------------------- */
function Mission() {
  const values = ['Feminism', 'Integrity', 'Accountability', 'Solidarity'];
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '560px 1fr', gap: 72, alignItems: 'center' }}>
          <Reveal>
            <div className="media" style={{ borderRadius: 24, height: 600, boxShadow: 'var(--gpi-shadow-raised)', position: 'relative', backgroundImage: `url(${IMG.mission})` }}>
              <div style={{ position: 'absolute', left: 24, bottom: 24, background: 'var(--gpi-ink)', borderRadius: 16, padding: 18, width: 192 }}>
                <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--gpi-pink-on-dark)' }}>
                  Three decades
                </div>
                <div style={{ fontSize: 15, fontWeight: 500, color: '#fff', marginTop: 2 }}>of feminist organising</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="eyebrow">Who we are</span>
            <h2 className="h3" style={{ marginTop: 12, maxWidth: 680 }}>A feminist institution, led by girls for girls.</h2>
            <p className="body-text" style={{ marginTop: 24, maxWidth: 680 }}>
              Girls' Power Initiative was founded in 1994 by Professor Bene Madunagu and a group of
              Nigerian feminists. Today we work from five centres, with parents, schools, traditional
              leaders and government, to make gender equality real in everyday life.
            </p>

            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <MissionItem icon={<Eye size={20} color="#B4285A" />} tint="#F8E9EE" title="Our vision" text="A society where girls and women live free of discrimination, violence and poverty." />
              <div style={{ height: 1, background: 'var(--gpi-divider)' }} />
              <MissionItem icon={<Target size={20} color="#1F6F5C" />} tint="#E7F1EE" title="Our mission" text="To equip children and young females with information, skills and support so they can make their own decisions and claim their rights." />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 28, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: 1.2, textTransform: 'uppercase', color: '#111827', marginRight: 4 }}>
                We value
              </span>
              {values.map((v) => (
                <span key={v} className="value-pill">{v}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MissionItem({ icon, tint, title, text }) {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: tint, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--gpi-ink)' }}>{title}</div>
        <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--gpi-body)', marginTop: 2 }}>{text}</div>
      </div>
    </div>
  );
}

/* ---------------------------- Quote band --------------------------- */
function QuoteBand() {
  return (
    <section style={{ background: 'var(--gpi-primary-tint)' }}>
      <div className="container" style={{ paddingTop: 80, paddingBottom: 80, textAlign: 'center' }}>
        <Reveal>
        <Quote size={40} color="#B4285A" />
        <blockquote
          style={{
            fontFamily: 'var(--gpi-serif)', fontWeight: 700, fontSize: 34, lineHeight: 1.35,
            letterSpacing: -0.4, color: 'var(--gpi-quote)', maxWidth: 900, margin: '24px auto 0',
          }}
        >
          When a girl knows her rights, she does not need permission to use them.
        </blockquote>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginTop: 28 }}>
          <div className="avatar-dot" />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: 700, color: 'var(--gpi-quote)' }}>Prof. Bene Madunagu</div>
            <div style={{ fontSize: 13, color: 'var(--gpi-primary-dark)' }}>Founder, Girls' Power Initiative</div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ Events ----------------------------- */
function EventsSection({ featured, events }) {
  if (!featured) return null;
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <SectionHeader eyebrow="Events" title="Meet us in the field." linkTo="/news" linkLabel="All events" />
        <div style={{ display: 'grid', gridTemplateColumns: '848px 1fr', gap: 24 }}>
          {/* Featured */}
          <div className="card" style={{ borderRadius: 20, background: 'var(--gpi-cream)', display: 'flex' }}>
            <div className="media" style={{ width: 340, height: 420, flexShrink: 0, backgroundImage: `url(${IMG.community})` }} />
            <div style={{ padding: '52px 32px', flex: 1 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {featured.tag_primary && <span className="tag" style={{ background: 'var(--gpi-primary)', color: '#fff' }}>{featured.tag_primary}</span>}
                {featured.tag_secondary && <span className="tag" style={{ background: '#fff', color: 'var(--gpi-ink)' }}>{featured.tag_secondary}</span>}
              </div>
              <h3 style={{ fontSize: 26, lineHeight: 1.3, marginTop: 16 }}>{featured.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--gpi-body)', marginTop: 12 }}>{featured.description}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 20 }}>
                <span className="meta"><CalendarDays size={16} /> {featured.date || 'Date to be announced'}</span>
                <span className="meta"><MapPin size={16} /> {featured.location}</span>
              </div>
              <Link to="/contact" className="btn btn-dark btn-sm" style={{ marginTop: 24 }}>Reserve a place <ArrowRight size={16} /></Link>
            </div>
          </div>

          {/* Upcoming list */}
          <Stagger style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {events.map((e) => (
              <StaggerItem key={e.id}>
                <EventRow event={e} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function EventRow({ event }) {
  const [month, day] = event.date ? event.date.split(' ') : ['', ''];
  return (
    <Link
      to="/contact"
      className="card"
      style={{ borderRadius: 16, background: 'var(--gpi-cream)', display: 'flex', alignItems: 'center', padding: '16px 24px', gap: 16 }}
    >
      <div style={{ width: 56, height: 56, borderRadius: 12, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: 0.8, textTransform: 'uppercase', color: 'var(--gpi-primary)' }}>
          {month || event.date}
        </span>
        {day && <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--gpi-ink)' }}>{day}</span>}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 500, color: 'var(--gpi-ink)', fontSize: 15 }}>{event.title}</div>
        <div style={{ fontSize: 12, color: '#111827', marginTop: 2 }}>{event.location}</div>
      </div>
      <ChevronRight size={18} color="#8a8177" />
    </Link>
  );
}

/* ------------------------------- Blog ------------------------------ */
function BlogSection({ news }) {
  return (
    <section className="section" style={{ background: 'var(--gpi-cream)' }}>
      <div className="container">
        <SectionHeader eyebrow="From the field" title="Writing from the work." linkTo="/news" linkLabel="All stories" tone="cream" />
        <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {news.slice(0, 3).map((n) => {
            const color = newsCategoryColors[n.category] || '#B4285A';
            const avatar = newsCategoryAvatars[n.category] || '#E4CDD6';
            const catLabel = n.category === 'field-notes' ? 'Field notes' : n.category === 'news' ? 'News' : 'Analysis';
            return (
              <StaggerItem key={n.id} style={{ display: 'flex' }}>
                <Link to="/news" className="card" style={{ borderRadius: 20, display: 'block', width: '100%' }}>
                  <div className="media" style={{ height: 200, backgroundImage: `url(${photoFor(n.category)})` }} />
                <div style={{ padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
                    <span style={{ fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase', color }}>{catLabel}</span>
                    <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--gpi-dot)' }} />
                    <span style={{ color: '#111827' }}>{n.published_on}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--gpi-sans)', fontSize: 19, fontWeight: 700, lineHeight: 1.4, marginTop: 12, color: 'var(--gpi-ink)' }}>
                    {n.title}
                  </h3>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--gpi-body)', marginTop: 8 }}>{n.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
                    <div className="avatar-dot" style={{ background: avatar }} />
                    <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--gpi-muted)' }}>{n.author}</span>
                  </div>
                </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
