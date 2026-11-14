// Real GPI photos pulled from gpinigeria.org and stored locally under
// public/images/content/. The design carried no image assets, so each slot is
// given a thematically relevant photo from GPI's own library.
// BASE_URL is "/" locally and "/GPI-website/" on GitHub Pages, so image URLs
// work in both places (a bare "/images/..." would 404 on Pages).
const BASE = import.meta.env.BASE_URL;
const C = (name) => `${BASE}images/content/${name}`;

export const IMG = {
  // Hero and large editorial images
  hero: C('about-us.jpg'), // GPI team / community
  mission: C('who-we-are.jpg'), // girls and young women together
  origin: C('history.jpg'), // archive photo of GPI's early work
  girls: C('who-we-are.jpg'), // girls in a session
  community: C('wwf-projects.jpg'), // community programme photo
  protection: C('vawg.jpg'), // safety and protection work
  health: C('srhr-education.jpg'), // sexuality and health education
  leadership: C('services.jpg'), // programmes and leadership
  livelihood: C('sewing-skills.jpg'), // skills and livelihood training
  education: C('srhr-education.jpg'), // education sessions
};

// Map a cause / news category to a photo, with a sensible fallback.
export function photoFor(category) {
  const map = {
    education: IMG.girls,
    health: IMG.health,
    protection: IMG.protection,
    livelihood: IMG.livelihood,
    'safe-spaces': IMG.community,
    other: IMG.community,
  };
  return map[category] || IMG.community;
}
