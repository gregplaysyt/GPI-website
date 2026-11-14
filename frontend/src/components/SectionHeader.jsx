import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../motion.jsx';

// Standard section header: eyebrow + headline on the left,
// optional body and an optional "all" pill on the right.
export default function SectionHeader({ eyebrow, title, body, linkTo, linkLabel, tone = 'cream' }) {
  return (
    <Reveal className="section-head">
      <div className="section-head-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="h2">{title}</h2>
      </div>
      {body && <p className="section-head-body">{body}</p>}
      {linkTo && linkLabel && (
        <Link
          to={linkTo}
          className="link-pill"
          style={{ background: tone === 'white' ? 'var(--gpi-cream)' : 'var(--gpi-white)' }}
        >
          {linkLabel}
          <ArrowRight />
        </Link>
      )}
    </Reveal>
  );
}
