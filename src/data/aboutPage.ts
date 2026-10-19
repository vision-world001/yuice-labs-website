import type { IconName } from '../components/ui/Icon';

export const teamTraits: Array<{ icon: IconName; title: string; body: string }> = [
  { icon: 'globe', title: 'Global & Remote', body: 'We work across time zones and cultures, bringing fresh perspectives and new ideas.' },
  { icon: 'people', title: 'Cross-Functional', body: 'Our team combines technical, financial, product, and operational expertise.' },
  { icon: 'limit', title: 'Mission-Driven', body: 'We build solutions that connect real-world assets with global capital and opportunity.' },
  { icon: 'badge', title: 'Long-Term Focus', body: 'We think beyond short-term gains, building sustainable infrastructure for the future.' },
];

export interface Leader {
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  /** Headshot in /public; without one the card shows the leader's initials. */
  photo?: string;
}

export const leaders: Leader[] = [
  {
    name: 'Alex Carter',
    role: 'CEO & Founder',
    bio: 'Serial entrepreneur with 10+ years in blockchain and fintech. Previously built and scaled products at leading Web3 companies.',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    name: 'Emily Zhang',
    role: 'CTO',
    bio: 'Full-stack engineer and blockchain architect. Expert in smart contracts, scalability, and distributed systems.',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    name: 'Daniel Brooks',
    role: 'CFO',
    bio: 'Finance executive with 12+ years in fintech and digital assets. Focuses on capital strategy, financial operations, and growth.',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    name: 'Sophia Martinez',
    role: 'Head of Talent',
    bio: 'Senior talent leader with experience in building high-performing teams in Web3, fintech, and tech startups.',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    name: 'Olivia Bennett',
    role: 'Chief Financial Officer',
    bio: 'Finance and strategy executive with expertise in treasury, financial planning, and risk management in digital assets.',
    linkedin: 'https://www.linkedin.com/',
  },
];

export interface Office {
  city: string;
  country: string;
  /** Map position in degrees. */
  lat: number;
  lon: number;
  /** Which side of the pin its map label sits on. */
  labelSide: 'left' | 'right' | 'top';
}

export const offices: Office[] = [
  { city: 'New York', country: 'USA', lat: 40.7, lon: -74, labelSide: 'left' },
  { city: 'Singapore', country: 'SG', lat: 1.35, lon: 103.8, labelSide: 'right' },
  { city: 'Hong Kong', country: 'HK', lat: 22.3, lon: 114.2, labelSide: 'right' },
  { city: 'Germany', country: 'DE', lat: 52.5, lon: 13.4, labelSide: 'top' },
  { city: 'United Kingdom', country: 'UK', lat: 51.5, lon: -0.1, labelSide: 'left' },
];

export const cultureValues: Array<{ icon: IconName; title: string; body: string }> = [
  { icon: 'globe', title: 'Global Team', body: 'Work from anywhere, across time zones.' },
  { icon: 'bolt', title: 'Flexible Work', body: 'Choose what works best for you and your life.' },
  { icon: 'sprout', title: 'Learning & Growth', body: 'Access to resources, mentorship, and career development.' },
  { icon: 'people', title: 'Meaningful Impact', body: 'Build technology that creates real-world value.' },
];
