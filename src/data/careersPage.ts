import type { IconName } from '../components/ui/Icon';

export type Department = 'Engineering' | 'Design' | 'Business';

export interface Role {
  id: string;
  title: string;
  department: Department;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  tags: string[];
}

export const teamFacts = [
  { value: 'Remote-first', label: 'Across 3 time zones' },
  { value: 'Founding team', label: 'Shape the product from day one' },
  { value: 'Equity', label: 'Ownership for every hire' },
];

export const values: Array<{ icon: IconName; title: string; body: string }> = [
  {
    icon: 'building',
    title: 'Real assets, real impact',
    body: 'Work on infrastructure that moves money for buildings, energy projects, and the businesses behind them.',
  },
  {
    icon: 'shield',
    title: 'Trust is the product',
    body: 'We design for accountability first: permissions, audit trails, and human oversight are never an afterthought.',
  },
  {
    icon: 'brain',
    title: 'Small team, big ownership',
    body: 'Every person owns meaningful problems end to end and has a direct line to customers and decisions.',
  },
  {
    icon: 'people',
    title: 'Clear, kind collaboration',
    body: 'We write things down, give direct feedback, and make room for focused, uninterrupted work.',
  },
];

export const benefits: Array<{ icon: IconName; title: string; body: string }> = [
  { icon: 'wallet', title: 'Competitive salary + equity', body: 'Meaningful ownership in what we build together.' },
  { icon: 'network', title: 'Remote-first', body: 'Work from where you do your best work, with async-friendly rituals.' },
  { icon: 'stack', title: '$2,000 learning budget', body: 'Courses, books, and conferences, every year.' },
  { icon: 'user', title: 'Health & wellbeing', body: 'Comprehensive health cover and a monthly wellness stipend.' },
  { icon: 'eye', title: 'Flexible time off', body: 'A 25-day minimum, plus local public holidays.' },
  { icon: 'partners', title: 'Team offsites', body: 'Meet in person twice a year to plan, build, and celebrate.' },
];

export const roles: Role[] = [
  {
    id: 'smart-contract-engineer',
    title: 'Senior Smart Contract Engineer',
    department: 'Engineering',
    location: 'Remote · Europe / Americas',
    type: 'Full-time',
    summary:
      'Design and ship the on-chain core of Yuice Protocol: asset tokens, programmable payment rules, and stablecoin settlement.',
    responsibilities: [
      'Architect and implement secure, upgradeable smart contracts for tokenized assets and payment policies',
      'Lead internal reviews and work with external auditors through every release',
      'Define testing, formal-verification, and incident-response practices for on-chain code',
    ],
    requirements: [
      '5+ years of software engineering, including 3+ years shipping production Solidity',
      'Deep understanding of EVM security patterns and common vulnerability classes',
      'Experience with stablecoins, payment flows, or regulated financial products is a plus',
    ],
    tags: ['Solidity', 'EVM', 'Security'],
  },
  {
    id: 'full-stack-engineer',
    title: 'Full-Stack Engineer, Financial Platform',
    department: 'Engineering',
    location: 'Remote · Global',
    type: 'Full-time',
    summary:
      'Build the operator platform that turns asset data into reconciled cash flows, approvals, and payments.',
    responsibilities: [
      'Build product features across a TypeScript front end and a Node.js / PostgreSQL back end',
      'Design reliable integrations with accounting, banking, and property-management systems',
      'Ship AI-assisted workflows for reconciliation, forecasting, and anomaly detection',
    ],
    requirements: [
      '4+ years building production web applications in TypeScript',
      'Comfort with relational data modelling and correctness-critical financial logic',
      'Product sense and enjoyment of working directly with customers',
    ],
    tags: ['TypeScript', 'React', 'PostgreSQL'],
  },
  {
    id: 'product-designer',
    title: 'Senior Product Designer',
    department: 'Design',
    location: 'Remote · Europe',
    type: 'Full-time',
    summary:
      'Make complex financial operations feel calm and clear, from dashboards to approval flows and investor reporting.',
    responsibilities: [
      'Own end-to-end design for core operator and investor experiences',
      'Evolve our design system and visual language across product and brand',
      'Run research with asset operators and turn insights into shipped improvements',
    ],
    requirements: [
      '5+ years of product design, ideally on data-dense B2B or fintech products',
      'A portfolio showing strong interaction design and systems thinking',
      'Comfortable prototyping and collaborating closely with engineers',
    ],
    tags: ['Figma', 'Design systems', 'Fintech'],
  },
  {
    id: 'partnerships-lead',
    title: 'Head of RWA Partnerships',
    department: 'Business',
    location: 'Hybrid · London or New York',
    type: 'Full-time',
    summary:
      'Build relationships with asset operators, fund managers, and financial institutions to bring real assets on-chain.',
    responsibilities: [
      'Source, structure, and close pilot partnerships, starting with commercial real estate',
      'Translate partner needs into clear product requirements with the founding team',
      'Represent Yuice at industry events and in conversations with regulators',
    ],
    requirements: [
      '7+ years in real estate finance, asset management, or institutional partnerships',
      'A strong network across operators, lenders, or digital-asset firms',
      'Excellent written communication and comfort with ambiguity',
    ],
    tags: ['Real estate', 'Partnerships', 'Strategy'],
  },
];

export const hiringSteps = [
  { number: '01', title: 'Apply', body: 'Send your details and a short note. A real person reads every application.' },
  { number: '02', title: 'Intro call', body: 'A 30-minute conversation about your experience, goals, and the role.' },
  { number: '03', title: 'Deep dive', body: 'A practical, paid exercise or portfolio review that reflects the real work.' },
  { number: '04', title: 'Meet the team', body: 'Talk with founders and future teammates, then receive a decision within a week.' },
];
