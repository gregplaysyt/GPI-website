import { useState } from 'react';
import { ArrowRight, Search, FileText } from 'lucide-react';
import DonateBand from '../components/DonateBand.jsx';
import { api } from '../api.js';
import { useAsync, usePageContent } from '../hooks.js';
import { fallbackNews, newsCategoryColors, newsCategoryLabels } from '../data.js';
import { photoFor } from '../images.js';
import { resources } from '../resources.js';
import { Reveal, Stagger, StaggerItem } from '../motion.jsx';

const tabs = ['Everything', 'Analysis', 'Field notes', 'Press releases', 'Reports'];
const tabToCategory = { Analysis: 'analysis', 'Field notes': 'field-notes', 'Press releases': 'news', Reports: 'report' };

export default function News() {
  const { data } = useAsync(api.getNews);
  const news = data || fallbackNews;
  const [active, setActive] = useState('Everything');
  const [query, setQuery] = useState('');

  const featured = news.find((n) => n.featured) || news[0];
  const rest = news.filter((n) => n !== featured);

  let filtered = rest;
  if (active !== 'Everything') {
    filtered = rest.filter((n) => n.category === tabToCategory[active]);
  }
  if (query.trim()) {
    const q = query.toLowerCase();
    filtered = filtered.filter((n) => (n.title + n.excerpt).toLowerCase().includes(q));
  }

  return (
    <>
      <Hero query={query} setQuery={setQuery} active={active} setActive={setActive} />
      <FeaturedStory article={featured} />
      <ArticlesGrid articles={filtered} />
      <DonateBand />
    </>
  );
}

function Hero({ query, setQuery, active, setActive }) {
  const hero = usePageContent('news', {
    headline: 'Field notes, research and press.',
    body: "What our centres are learning, written by the people doing the work, plus every report we publish.",
  });
  return (
    <section style={{ background: 'var(--gpi-cream)' }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 40 }}>
        <PageHeroWrap>
          <Reveal>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
              <span style={{ color: '#111827' }}>Home</span>
              <span style={{ color: 'var(--gpi-icon)' }}>›</span>
              <span style={{ fontWeight: 500, color: 'var(--gpi-ink)' }}>News and resources</span>
            </nav>
            <h1 className="h1" style={{ marginTop: 24, maxWidth: 720 }}>{hero.headline}</h1>
            <p className="lead" style={{ marginTop: 24, maxWidth: 640 }}>
              {hero.body}
            </p>
          </Reveal>
          <Reveal delay={0.1} style={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 999, height: 46, padding: '0 20px', width: 249 }}>
            <Search size={18} color="#8a8177" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles and reports"
              style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 13, color: '#111827', flex: 1 }}
            />
          </Reveal>
        </PageHeroWrap>

        <div style={{ display: 'flex', gap: 12, marginTop: 48, flexWrap: 'wrap' }}>
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              style={{
                height: 36, padding: '0 18px', borderRadius: 999, fontSize: 13, fontWeight: 500,
                background: active === t ? 'var(--gpi-ink)' : '#fff', color: active === t ? '#fff' : '#3a3a40',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function PageHeroWrap({ children }) {
  return <div className="r-row" style={{ display: 'flex', justifyContent: 'space-between', gap: 40, alignItems: 'flex-start' }}>{children}</div>;
}

function FeaturedStory({ article }) {
  if (!article) return null;
  return (
    <section style={{ background: '#fff', paddingTop: 56, paddingBottom: 56 }}>
      <div className="container">
        <Reveal className="r-col" style={{ background: 'var(--gpi-ink)', borderRadius: 28, boxShadow: 'var(--gpi-shadow-raised)', display: 'flex', overflow: 'hidden' }}>
          <div className="media m-full" style={{ width: 620, minHeight: 391, backgroundImage: `url(${photoFor(article.category)})` }} />
          <div style={{ flex: 1, padding: 44, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="tag" style={{ background: 'var(--gpi-primary)', color: '#fff' }}>Long read</span>
              <span style={{ fontSize: 12, color: '#ada49c' }}>{article.published_on} · 9 min read</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: 32, lineHeight: 1.25, letterSpacing: -0.4, marginTop: 16 }}>
              {article.title}
            </h2>
            <p style={{ color: 'var(--gpi-faint)', lineHeight: 1.7, marginTop: 16 }}>{article.excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
              <div className="avatar-dot" style={{ background: '#4d525c', width: 40, height: 40 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>{article.author}</div>
                <div style={{ fontSize: 12, color: '#ada49c' }}>National Coordinator</div>
              </div>
            </div>
            <button className="btn" style={{ background: '#fff', color: 'var(--gpi-ink)', height: 40, padding: '0 20px', marginTop: 24, alignSelf: 'flex-start' }}>
              Read the story <ArrowRight size={15} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ArticlesGrid({ articles }) {
  // Show the latest annual reports, linked to the real PDFs on gpinigeria.org.
  const reportCategory = resources.find((r) => r.category === 'Reports');
  const reports = (reportCategory?.items || []).slice(0, 5);
  return (
    <section className="section" style={{ background: 'var(--gpi-cream)' }}>
      <div className="container">
        <div className="r-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <h2 className="h2" style={{ fontSize: 28 }}>Latest from the centres</h2>
          <span className="link-pill" style={{ background: '#fff', fontSize: 12 }}>Newest first</span>
        </div>

        <Stagger className="r-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {articles.map((n) => {
            const color = newsCategoryColors[n.category] || '#ff0000';
            const label = newsCategoryLabels[n.category] || 'Story';
            return (
              <StaggerItem key={n.id} className="card" style={{ borderRadius: 24 }}>
                <div className="media" style={{ height: 200, backgroundImage: `url(${photoFor(n.category)})` }} />
                <div style={{ padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
                    <span style={{ fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase', color }}>{label}</span>
                    <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--gpi-dot)' }} />
                    <span style={{ color: '#111827' }}>{n.published_on}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--gpi-sans)', fontSize: 18, fontWeight: 700, lineHeight: 1.45, marginTop: 12, color: 'var(--gpi-ink)' }}>
                    {n.title}
                  </h3>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--gpi-body)', marginTop: 8 }}>{n.excerpt}</p>
                </div>
              </StaggerItem>
            );
          })}

          {/* Reports / downloads card */}
          <StaggerItem style={{ background: 'var(--gpi-ink)', borderRadius: 24, padding: 24, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.4, textTransform: 'uppercase', color: 'var(--gpi-pink-on-dark)' }}>
              Downloads
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.35, color: '#fff', marginTop: 4 }}>
              Reports you can read in full
            </div>
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {reports.map((r, i) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'block' }}
                >
                  {i > 0 && <div style={{ height: 1, background: '#2c2e36', margin: '12px 0' }} />}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontSize: 13, color: '#d5cfc8' }}>
                      <FileText size={18} color="var(--gpi-pink-on-dark)" /> {r.title}
                    </span>
                    <span style={{ fontSize: 11, color: '#b9b3ab' }}>PDF</span>
                  </div>
                </a>
              ))}
            </div>
            <a
              href="https://www.gpinigeria.org/resources/"
              target="_blank"
              rel="noreferrer"
              className="btn"
              style={{ background: '#fff', color: 'var(--gpi-ink)', height: 40, padding: '0 20px', marginTop: 24, alignSelf: 'center', width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              All publications <ArrowRight size={15} />
            </a>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
