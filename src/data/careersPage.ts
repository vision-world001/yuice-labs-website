import type { IconName } from '../components/ui/Icon';

export type Department = 'Engineering' | 'Product' | 'Design' | 'Operations' | 'Business';

export interface Role {
  /** Also the URL slug: /careers/<id>. */
  id: string;
  title: string;
  department: Department;
  /** Shown under the title; defaults to the department. */
  team?: string;
  location: string;
  type: string;
  salary: string;
  region: string;
  experience: string;
  /** Short pitch under the title on the job page. */
  intro: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
}

export const companyHighlights: Array<{ icon: IconName; title: string; body: string }> = [
  { icon: 'hub', title: 'Meaningful Impact', body: 'Work on products that connect real-world value with global capital.' },
  { icon: 'bulb', title: 'Cutting-Edge Technology', body: 'Build with blockchain, AI, and modern infrastructure.' },
  { icon: 'people', title: 'Global Team', body: 'Collaborate with talented people from around the world.' },
  { icon: 'sprout', title: 'Long-Term Vision', body: 'Help shape a more open, efficient, and inclusive financial future.' },
];

export const departments: Department[] = ['Engineering', 'Product', 'Design', 'Operations', 'Business'];

export const roles: Role[] = [
  {
    id: 'blockchain-engineer',
    title: 'Senior Blockchain Engineer (Solana)',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-Time',
    salary: '$120k – $160k (USD)',
    region: 'Worldwide',
    experience: 'Senior (3+ years)',
    intro:
      'Join our engineering team to build the next generation of financial infrastructure for real-world assets. You’ll work on core blockchain infrastructure, smart contracts, and on-chain systems that power our RWA tokenization and payment solutions.',
    about:
      'As a Senior Blockchain Engineer at Yuice Labs, you will be responsible for designing, implementing, and maintaining blockchain-based systems, with a focus on the Solana ecosystem. You’ll work closely with our product and engineering teams to build secure, scalable, and efficient smart contracts and on-chain infrastructure that support real-world asset tokenization, programmable payments, and AI-driven financial operations.',
    responsibilities: [
      'Design and develop Solana smart contracts using Rust and Anchor.',
      'Build and maintain on-chain infrastructure and integrations.',
      'Work on tokenization logic, asset management, and payment flows.',
      'Collaborate with product and engineering teams to define technical architecture.',
      'Ensure security, performance, and reliability of blockchain systems.',
      'Participate in code reviews, testing, and deployment processes.',
    ],
    requirements: [
      '3+ years of experience in blockchain development, preferably on Solana.',
      'Strong proficiency in Rust and smart contract development (Anchor preferred).',
      'Experience with Web3 libraries, wallets, and decentralized applications.',
      'Understanding of token standards (SPL, fungible and non-fungible tokens).',
      'Solid problem-solving skills and ability to work in a fast-paced environment.',
      'Good communication skills and a team-oriented mindset.',
    ],
    niceToHave: [
      'Experience with zero-knowledge proofs, cross-chain protocols, or DeFi.',
      'Background in financial systems, tokenization, or real-world asset platforms.',
      'Open source contributions or active presence in the Solana ecosystem.',
    ],
  },
  {
    id: 'full-stack-engineer',
    title: 'Senior Full-Stack Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-Time',
    salary: '$110k – $150k (USD)',
    region: 'Worldwide',
    experience: 'Senior (5+ years)',
    intro:
      'Build the operator platform that turns asset data into reconciled cash flows, approvals, and payments. You’ll own features end to end, from the interface operators use every day to the services and data models behind it.',
    about:
      'As a Senior Full-Stack Engineer at Yuice Labs, you will design and ship product features across our TypeScript front end and Node.js / PostgreSQL back end. You’ll connect the platform to accounting, banking, and property-management systems, and bring AI-assisted workflows for reconciliation and forecasting into the hands of asset operators.',
    responsibilities: [
      'Build product features across a React / TypeScript front end and a Node.js back end.',
      'Design reliable integrations with accounting, banking, and property-management systems.',
      'Model financial data in PostgreSQL with correctness and auditability in mind.',
      'Ship AI-assisted workflows for reconciliation, forecasting, and anomaly detection.',
      'Work with design and product to turn customer problems into clear solutions.',
      'Raise the bar on testing, observability, and code quality across the stack.',
    ],
    requirements: [
      '5+ years building production web applications in TypeScript.',
      'Strong experience with React and a Node.js back end.',
      'Comfort with relational data modelling and correctness-critical financial logic.',
      'Experience designing and consuming third-party APIs and webhooks.',
      'Product sense and enjoyment of working directly with customers.',
      'Clear written communication in a remote, async team.',
    ],
    niceToHave: [
      'Experience in fintech, payments, or accounting software.',
      'Familiarity with blockchain integrations or stablecoin payments.',
      'Experience shipping LLM-powered features to production.',
    ],
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    department: 'Product',
    location: 'Remote',
    type: 'Full-Time',
    salary: '$100k – $140k (USD)',
    region: 'Worldwide',
    experience: 'Mid–Senior (4+ years)',
    intro:
      'Turn the needs of asset operators and investors into a clear, focused product roadmap. You’ll shape how real-world assets are tokenized, operated, and paid out on Yuice.',
    about:
      'As a Product Manager at Yuice Labs, you will own discovery, prioritisation, and delivery for core platform workflows. You’ll spend time with asset operators and partners, translate complex financial processes into simple product decisions, and work side by side with engineering and design from problem framing to launch.',
    responsibilities: [
      'Own discovery, prioritisation, and delivery for core platform workflows.',
      'Run regular conversations with asset operators, investors, and partners.',
      'Write clear product specs and define success metrics for each release.',
      'Work closely with engineering and design from problem framing to launch.',
      'Balance customer needs, technical constraints, and compliance requirements.',
      'Measure outcomes and keep the team focused on what matters most.',
    ],
    requirements: [
      '4+ years of product management on B2B, fintech, or infrastructure products.',
      'Ability to reason about financial flows and data-heavy systems.',
      'Track record of shipping products customers rely on.',
      'Comfortable with data analysis and making decisions with incomplete information.',
      'Clear written communication and strong stakeholder skills.',
      'A collaborative, low-ego working style.',
    ],
    niceToHave: [
      'Experience with tokenization, digital assets, or stablecoins.',
      'Background in real estate, energy, or asset management.',
      'Technical background or prior engineering experience.',
    ],
  },
  {
    id: 'product-designer',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-Time',
    salary: '$90k – $130k (USD)',
    region: 'Worldwide',
    experience: 'Mid–Senior (4+ years)',
    intro:
      'Make complex financial operations feel calm and clear. You’ll design the dashboards, approval flows, and reports that operators and investors use to run real-world assets.',
    about:
      'As a UI/UX Designer at Yuice Labs, you will own end-to-end design for core operator and investor experiences. You’ll turn data-dense financial workflows into interfaces that feel simple and trustworthy, evolve our design system, and work closely with engineers to ship polished, accessible product.',
    responsibilities: [
      'Own end-to-end design for core operator and investor experiences.',
      'Design dashboards, approval flows, and reporting for data-dense workflows.',
      'Evolve our design system and visual language across product and brand.',
      'Run research with asset operators and turn insights into shipped improvements.',
      'Prototype interactions and validate them quickly with users.',
      'Partner closely with engineers through build and QA.',
    ],
    requirements: [
      '4+ years of product design, ideally on data-dense B2B or fintech products.',
      'A portfolio showing strong interaction design and systems thinking.',
      'Expert use of Figma, including components and auto layout.',
      'Experience running user research and usability tests.',
      'Solid understanding of accessibility and responsive design.',
      'Comfortable presenting and defending design decisions.',
    ],
    niceToHave: [
      'Experience designing for Web3 wallets or financial dashboards.',
      'Motion design or front-end prototyping skills.',
      'Experience building a design system from the ground up.',
    ],
  },
  {
    id: 'head-of-talent',
    title: 'Head of Talent',
    department: 'Operations',
    team: 'People & Operations',
    location: 'Remote',
    type: 'Full-Time',
    salary: '$100k – $140k (USD)',
    region: 'Worldwide',
    experience: 'Senior (6+ years)',
    intro:
      'Build the team that builds Yuice. You’ll own hiring, onboarding, and the people programmes that help a global, remote team do the best work of their careers.',
    about:
      'As Head of Talent at Yuice Labs, you will own recruiting end to end across every function, from sourcing to offer. You’ll design onboarding, feedback, and growth programmes for a distributed team, and partner with the founders on org design, compensation, and culture as we scale.',
    responsibilities: [
      'Own recruiting end to end, from sourcing to offer, across every function.',
      'Build a fair, structured, and candidate-friendly interview process.',
      'Design onboarding, feedback, and growth programmes for a remote team.',
      'Partner with founders on org design, compensation, and hiring plans.',
      'Strengthen our employer brand across communities and events.',
      'Track hiring metrics and continuously improve the process.',
    ],
    requirements: [
      '6+ years in talent or people roles, ideally at early-stage startups.',
      'Experience hiring senior engineers for distributed teams.',
      'Strong sourcing skills and a genuine network in tech.',
      'Knowledge of global hiring, contractor, and EOR models.',
      'A thoughtful, candidate-first approach to hiring.',
      'Excellent communication and organisation skills.',
    ],
    niceToHave: [
      'Experience hiring in Web3, fintech, or AI.',
      'Background in people operations or HR systems.',
      'Experience scaling a team from 10 to 50+ people.',
    ],
  },
  {
    id: 'business-development',
    title: 'Business Development Manager',
    department: 'Business',
    location: 'Remote',
    type: 'Full-Time',
    salary: '$90k – $130k + commission (USD)',
    region: 'Worldwide',
    experience: 'Mid–Senior (5+ years)',
    intro:
      'Build relationships with asset operators, fund managers, and institutions to bring real-world assets on-chain. You’ll open new markets and turn early conversations into lasting partnerships.',
    about:
      'As a Business Development Manager at Yuice Labs, you will source, structure, and close partnerships that bring real-world assets onto our platform, starting with commercial real estate and renewable energy. You’ll be the voice of the market inside the company, feeding partner needs back into the product roadmap.',
    responsibilities: [
      'Source, structure, and close pilot partnerships with asset operators and funds.',
      'Build and manage a qualified pipeline across target markets.',
      'Translate partner needs into clear product requirements with the founding team.',
      'Prepare proposals, commercial terms, and partnership agreements.',
      'Represent Yuice at industry events and partner meetings.',
      'Track market trends in tokenization and stablecoin payments.',
    ],
    requirements: [
      '5+ years in business development across real estate finance, asset management, or digital assets.',
      'A strong network across operators, lenders, or fintech firms.',
      'Proven record of closing complex B2B deals.',
      'Ability to explain technical products to non-technical audiences.',
      'Excellent written communication and comfort with ambiguity.',
      'Self-starter who thrives in an early-stage environment.',
    ],
    niceToHave: [
      'Experience with RWA tokenization or stablecoin products.',
      'Relationships with institutional investors or family offices.',
      'Additional languages for international markets.',
    ],
  },
];

/** Looks up a role by the id used in its URL (/careers/<id>). */
export function findRole(id: string) {
  return roles.find((role) => role.id === id);
}

export const jobCulture: Array<{ icon: IconName; title: string; body: string }> = [
  { icon: 'people', title: 'Global Team', body: 'Work from anywhere' },
  { icon: 'file', title: 'Flexible', body: 'Your time, your way' },
  { icon: 'book', title: 'Learning & Growth', body: 'Build your future' },
  { icon: 'send', title: 'Meaningful Impact', body: 'Real-world value' },
];

export const perks: Array<{ icon: IconName; title: string; body: string }> = [
  { icon: 'coins', title: 'Competitive Salary & Equity', body: 'Be rewarded for your impact and growth.' },
  { icon: 'laptop', title: 'Flexible & Remote Work', body: 'Work from anywhere, with a balanced lifestyle.' },
  { icon: 'heart', title: 'Health & Wellness', body: 'Comprehensive health coverage and wellness support.' },
  { icon: 'book', title: 'Learning & Growth', body: 'Access to courses, mentorship, and career development.' },
  { icon: 'people', title: 'Global Team Events', body: 'Meet your team, build connections, and share ideas.' },
  { icon: 'rocket', title: 'Meaningful Work', body: 'Be part of a mission that matters.' },
];

export const culturePhotos = [
  { image: '/careers-collab.webp', title: 'Collaborative', body: 'We solve problems together across teams and time zones.' },
  { image: '/careers-flexible.webp', title: 'Flexible', body: 'Work from where you do your best work.' },
  { image: '/careers-social.webp', title: 'Social', body: 'We come together — online and in person.' },
];
