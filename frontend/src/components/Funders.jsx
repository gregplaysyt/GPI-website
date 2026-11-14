import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';
import { funders } from '../funders.js';
import { Stagger, StaggerItem } from '../motion.jsx';

const AUTOPLAY_MS = 4000;

// "Our funders and partners" band, mirroring the funders wall on gpinigeria.org.
// On desktop the logos sit in a neat grid. On mobile they become a carousel
// that auto-advances after a few seconds, but always stays under the visitor's
// control: touching it, swiping, or using the arrows pauses the autoplay, and a
// play/pause button lets them stop or resume at any time.
function FunderTile({ f }) {
  return (
    <div
      className="funder-tile"
      title={f.name}
      style={{
        background: 'var(--gpi-cream)',
        borderRadius: 16,
        height: 96,
        padding: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={f.logo}
        alt={f.name}
        loading="lazy"
        style={{
          maxWidth: '100%',
          maxHeight: 64,
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  );
}

export default function Funders() {
  const trackRef = useRef(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  // Start paused for visitors who ask for reduced motion; otherwise autoplay.
  const [paused, setPaused] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  // Recompute which "page" (a viewport-width) is in view after any scroll or resize.
  const measure = () => {
    const el = trackRef.current;
    if (!el) return;
    const width = el.clientWidth;
    if (width <= 0) return;
    const count = Math.max(1, Math.ceil(el.scrollWidth / width));
    const current = Math.min(count - 1, Math.round(el.scrollLeft / width));
    setPageCount(count);
    setPage(current);
  };

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Autoplay: advance one page at a time and loop back to the start. Pausing
  // simply stops this interval, leaving the carousel wherever the user left it.
  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const width = el.clientWidth;
      const count = Math.max(1, Math.ceil(el.scrollWidth / width));
      if (count <= 1) return;
      const current = Math.round(el.scrollLeft / width);
      const next = (current + 1) % count;
      el.scrollTo({ left: next * width, behavior: 'smooth' });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  // Manual navigation takes over from autoplay so the two never fight.
  const shift = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
    setPaused(true);
  };

  return (
    <section className="section" style={{ background: '#fff', overflow: 'hidden' }}>
      <div className="container">
        <SectionHeader
          eyebrow="Our funders"
          title="Supported by partners who share our vision."
          body="More than fifty funders and partners have stood with GPI over three decades, making our work with girls, families and communities possible."
        />
      </div>

      {/* Desktop: logo grid */}
      <div className="container funders-grid">
        <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 20 }}>
          {funders.map((f) => (
            <StaggerItem key={f.name}>
              <FunderTile f={f} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Mobile: auto-playing carousel with manual controls. */}
      <div className="funders-carousel">
        <div
          className="funders-track"
          ref={trackRef}
          onScroll={measure}
          onPointerDown={() => setPaused(true)}
        >
          {funders.map((f) => (
            <FunderTile key={f.name} f={f} />
          ))}
        </div>
        <div className="funders-controls">
          <button
            type="button"
            className="funder-arrow"
            onClick={() => shift(-1)}
            disabled={page === 0}
            aria-label="Previous funders"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="funder-play"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play funders slideshow' : 'Pause funders slideshow'}
            aria-pressed={!paused}
          >
            {paused ? <Play size={16} /> : <Pause size={16} />}
          </button>
          <span className="funder-counter">
            {page + 1} / {pageCount}
          </span>
          <button
            type="button"
            className="funder-arrow"
            onClick={() => shift(1)}
            disabled={page >= pageCount - 1}
            aria-label="Next funders"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
