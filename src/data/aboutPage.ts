import type { IconName } from '../components/ui/Icon';

export const aboutFacts = [
  { value: 'RWA', label: 'Real-world asset finance' },
  { value: 'AI + stablecoins', label: 'Smarter operations, faster payments' },
  { value: 'Human-led', label: 'Oversight built in' },
];

export const missionVision = [
  {
    label: 'Mission',
    title: 'Make real-world assets easy to operate and finance.',
  },
  {
    label: 'Vision',
    title: 'Every asset’s money flows connected, transparent, and programmable.',
  },
];

export const keyFeatures: Array<{ icon: IconName; title: string; body: string }> = [
  { icon: 'building', title: 'Tokenized ownership', body: 'Asset records and ownership in one place.' },
  { icon: 'brain', title: 'Cash-flow intelligence', body: 'AI that reconciles, forecasts, and flags issues.' },
  { icon: 'wallet', title: 'Programmable payments', body: 'Rules-based payouts with stablecoins.' },
  { icon: 'shield', title: 'Built-in accountability', body: 'Permissions, limits, and full audit trails.' },
];

export const roadmap = [
  { number: '01', title: 'Commercial real estate', body: 'Where we start.' },
  { number: '02', title: 'Renewable energy', body: 'Projects with steady revenue.' },
  { number: '03', title: 'Equipment & receivables', body: 'More assets with clear value.' },
];
