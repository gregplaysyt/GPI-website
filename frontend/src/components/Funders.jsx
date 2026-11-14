import SectionHeader from './SectionHeader.jsx';
import { funders } from '../funders.js';
import { Stagger, StaggerItem } from '../motion.jsx';

// "Our funders and partners" band, mirroring the funders wall on gpinigeria.org.
// Logos sit on a neutral tile and scale to fit, so mixed aspect ratios line up.
export default function Funders() {
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <SectionHeader
          eyebrow="Our funders"
          title="Supported by partners who share our vision."
          body="More than fifty funders and partners have stood with GPI over three decades, making our work with girls, families and communities possible."
        />
        <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 20 }}>
          {funders.map((f) => (
            <StaggerItem
              key={f.name}
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
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
