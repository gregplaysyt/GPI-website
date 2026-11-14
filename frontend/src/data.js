// Designed content, mirrored from the Django seed. Used as a fallback so the
// site renders even when the backend is offline; the API overrides these.

export const fallbackProgrammes = [
  {
    id: 1, title: 'Protection of the girl child', icon: 'shield', accent: '#BF3654',
    summary: "Challenging the socialisation that weakens girls' protection and decision making in public and private life.",
  },
  {
    id: 2, title: 'Adolescent sexuality and SRHR', icon: 'heart-pulse', accent: '#1F6F5C',
    summary: "Accurate sexuality education that lowers vulnerability and protects girls' reproductive health.",
  },
  {
    id: 3, title: 'Leadership and civic voice', icon: 'megaphone', accent: '#A65C12',
    summary: "Girls' clubs that turn confidence into leadership, peer support and a public voice.",
  },
  {
    id: 4, title: 'Economic empowerment', icon: 'coins', accent: '#4B4184',
    summary: 'Skills, small grants and enterprise support so young women can earn on their own terms.',
  },
];

export const fallbackCauses = [
  {
    id: 1, title: 'Keep girls in school this term', category: 'education',
    summary: 'Fees, books and uniforms for girls in Cross River and Benue.',
    meta_line: '2 states, 45 partner schools',
  },
  {
    id: 2, title: 'A safe space for girls in Port Harcourt', category: 'safe-spaces',
    summary: 'Furnishing and running a drop-in centre open six days a week.',
    meta_line: 'Open six days a week',
  },
  {
    id: 3, title: 'Sexuality education in 50 schools', category: 'health',
    summary: 'Age-appropriate curriculum and trained teachers for a full school year.',
    meta_line: 'Trained teachers in every centre',
  },
  {
    id: 4, title: 'Leadership clubs in three states', category: 'livelihood',
    summary: "Seed funding for girls' clubs in Jos, Lagos and Benin City.",
    meta_line: '12 new clubs this year',
  },
  {
    id: 5, title: 'End child marriage campaign', category: 'protection',
    summary: 'Community dialogues and legal support to keep girls safe.',
    meta_line: '6 communities reached',
  },
  {
    id: 6, title: 'Menstrual health kits', category: 'health',
    summary: 'Reusable kits and education for girls who miss school every month.',
    meta_line: '5,000 kits delivered',
  },
];

export const fallbackEvents = [
  {
    id: 1, title: "Men's Health Awareness Month: bringing boys into the conversation",
    description: 'A day of workshops with boys and young men on consent, care and shared responsibility.',
    date: 'Thursday 18 June, 10:00 AM', location: 'GPI Centre, Calabar',
    tag_primary: 'Featured', tag_secondary: 'Community', featured: true,
  },
  {
    id: 2, title: "Girls' club open day",
    description: 'Open day for families and community leaders.',
    date: '24 May', location: 'GPI Centre, Jos', tag_primary: '', tag_secondary: '',
  },
  {
    id: 3, title: 'Dialogue with traditional rulers',
    description: 'A conversation on ending child marriage and keeping girls in school.',
    date: '12 July', location: 'Benin City', tag_primary: '', tag_secondary: '',
  },
  {
    id: 4, title: 'Feminist summer school',
    description: 'A week of learning, debate and organising.',
    date: '30 August', location: 'Lagos', tag_primary: '', tag_secondary: '',
  },
];

export const fallbackNews = [
  {
    id: 1, title: 'Why sexuality education belongs in every Nigerian school',
    category: 'analysis',
    excerpt: 'Girls tell us the same thing in every state: what they learn in class rarely covers the questions they actually carry.',
    author: 'Anthonia Odey', published_on: '12 May 2026',
  },
  {
    id: 2, title: "Inside our girls' clubs: what 30 years of listening taught us",
    category: 'field-notes',
    excerpt: 'The club is not a classroom. It is the one place a girl can ask a question without being told she is rude.',
    author: 'GPI Jos Centre', published_on: '28 Apr 2026',
  },
  {
    id: 3, title: 'A ₦50 million endowment fund for girls\' education',
    category: 'news',
    excerpt: 'The fund in memory of our founder, Professor Bene Madunagu, keeps her work going for the next generation.',
    author: 'GPI Secretariat', published_on: '09 Apr 2026',
  },
  {
    id: 4, title: 'Traditional rulers sign a pledge against child marriage',
    category: 'report',
    excerpt: 'Twelve communities in Edo State committed to reporting rather than settling cases quietly.',
    author: 'GPI Edo State', published_on: '22 Mar 2026',
  },
  {
    id: 5, title: 'Inside a youth-friendly clinic in Jos',
    category: 'field-notes',
    excerpt: 'A nurse, a curtain and a promise of privacy: how one room changed attendance by 40 percent.',
    author: 'GPI Jos Centre', published_on: '04 Mar 2026',
  },
];

// Category styling: label, tag tint, icon tint, text colour, avatar colour.
export const categoryStyles = {
  education: { label: 'Education', tint: '#F8E9EE', fg: '#A52A46', icon: 'graduation-cap' },
  'safe-spaces': { label: 'Safe spaces', tint: '#E7F1EE', fg: '#1F6F5C', icon: 'home' },
  health: { label: 'Health', tint: '#FDF1E0', fg: '#A65C12', icon: 'book-open' },
  livelihood: { label: 'Livelihood', tint: '#EDEAF6', fg: '#4B4184', icon: 'coins' },
  protection: { label: 'Protection', tint: '#F8E9EE', fg: '#A52A46', icon: 'shield' },
  other: { label: 'Our work', tint: '#F8E9EE', fg: '#A52A46', icon: 'sparkles' },
};

export const newsCategoryColors = {
  analysis: '#BF3654',
  'field-notes': '#1F6F5C',
  news: '#A65C12',
  report: '#4B4184',
};

export const newsCategoryLabels = {
  analysis: 'Analysis',
  'field-notes': 'Field notes',
  news: 'Press release',
  report: 'Report',
};

export const newsCategoryAvatars = {
  analysis: '#E4CDD6',
  'field-notes': '#D9E6E1',
  news: '#F5E5CB',
  report: '#E3DFF4',
};
