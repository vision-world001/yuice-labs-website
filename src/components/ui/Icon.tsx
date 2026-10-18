import type { ReactNode } from 'react';

export type IconName =
  | 'stack'
  | 'file'
  | 'network'
  | 'nodes'
  | 'building'
  | 'bolt'
  | 'brain'
  | 'wallet'
  | 'check'
  | 'shield'
  | 'lock'
  | 'people'
  | 'eye'
  | 'access'
  | 'receipt'
  | 'limit'
  | 'user'
  | 'partners'
  | 'arrow'
  | 'linkedin'
  | 'x'
  | 'instagram'
  | 'hub'
  | 'bulb'
  | 'sprout'
  | 'coins'
  | 'laptop'
  | 'heart'
  | 'book'
  | 'rocket'
  | 'pin'
  | 'mail'
  | 'github'
  | 'send'
  | 'briefcase'
  | 'globe'
  | 'badge'
  | 'link';

interface IconProps {
  name: IconName;
  size?: number;
}

const iconPaths: Record<IconName, ReactNode> = {
  stack: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
    </>
  ),
  file: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M8 13h8M8 17h6" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="12" cy="4" r="1.5" />
      <circle cx="19" cy="8" r="1.5" />
      <circle cx="19" cy="16" r="1.5" />
      <circle cx="12" cy="20" r="1.5" />
      <circle cx="5" cy="16" r="1.5" />
      <circle cx="5" cy="8" r="1.5" />
      <path d="m12 9.5 0-4m2.2 5.4 3.5-2m-3.5 5.2 3.5 2m-5.7-1.6v4m-2.2-5.4-3.5 2m3.5-5.2-3.5-2" />
    </>
  ),
  nodes: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
    </>
  ),
  building: (
    <>
      <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-5h6v5" />
      <path d="M8 10h.01M12 10h.01M16 10h.01" />
    </>
  ),
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  brain: (
    <>
      <path d="M12 18V5a3 3 0 0 0-5.7-1.3 4 4 0 0 0-1.4 7.7A4 4 0 0 0 8 19.9" />
      <path d="M12 18V5a3 3 0 0 1 5.7-1.3 4 4 0 0 1 1.4 7.7 4 4 0 0 1-3.1 7.5M8 9a2 2 0 0 1 2 2m6-2a2 2 0 0 0-2 2m-5 4a2 2 0 0 0 2 2m6-2a2 2 0 0 1-2 2" />
    </>
  ),
  wallet: (
    <>
      <path d="M20 8V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v11H5a3 3 0 0 1-3-3V6" />
      <path d="M20 12h-4a2 2 0 0 0 0 4h4v-4Z" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  shield: (
    <>
      <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3m-4 5v2" />
    </>
  ),
  people: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <path d="M20 21v-2a4 4 0 0 0-3-3.9m-1-12a4 4 0 0 1 0 7.8" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  access: (
    <>
      <circle cx="12" cy="7" r="3.5" />
      <path d="M5.5 20.5 12 13l6.5 7.5M8 20.5h8" />
      <path d="M8.5 13.5 12 17l3.5-3.5" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 2h9l4 4v16H6Z" />
      <path d="M15 2v4h4" />
      <path d="M14 10.5h-2.8a1.6 1.6 0 0 0 0 3.2h1.6a1.6 1.6 0 0 1 0 3.2H10M12 9.5v1M12 17v1" />
    </>
  ),
  limit: (
    <>
      <path d="m12 2 8.7 5v10L12 22l-8.7-5V7Z" />
      <circle cx="12" cy="12" r="3.5" />
    </>
  ),
  partners: (
    <>
      <path d="M12 20.5 4.3 13.2A4.6 4.6 0 0 1 11 6.9l1 1 1-1a4.6 4.6 0 0 1 6.7 6.3Z" />
      <path d="m8.5 12.5 2.2 2.1a1.4 1.4 0 0 0 2 0l2.8-2.8" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21c.6-4 3.6-6.5 7.5-6.5s6.9 2.5 7.5 6.5Z" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 1 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  x: <path d="M4 4 20 20M20 4 4 20" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  hub: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="m6.5 6.5 3.7 3.7m3.6 0 3.7-3.7m-11 11 3.7-3.7m3.6 0 3.7 3.7" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />
      <path d="M12 1v.01M4 4l.7.7M20 4l-.7.7M1.5 10h1M21.5 10h1" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 21v-9" />
      <path d="M12 12C12 7 8.5 4 3.5 4c0 5 3.5 8 8.5 8Z" />
      <path d="M12 12c0-5 3.5-8 8.5-8 0 5-3.5 8-8.5 8Z" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </>
  ),
  laptop: (
    <>
      <rect x="4" y="4" width="16" height="11" rx="1.5" />
      <path d="M2 19h20" />
    </>
  ),
  heart: <path d="M12 20.5 4.3 13.2A4.6 4.6 0 0 1 11 6.9l1 1 1-1a4.6 4.6 0 0 1 6.7 6.3Z" />,
  book: (
    <>
      <path d="M2 5h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2Z" />
      <path d="M22 5h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7Z" />
    </>
  ),
  rocket: (
    <>
      <path d="M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1Z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-4A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22 22 0 0 1-4 2Z" />
      <path d="M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  github: (
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
  send: <path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z" />,
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  badge: (
    <>
      <path d="m12 2 8.7 5v10L12 22l-8.7-5V7Z" />
      <path d="m12 8 1.2 2.5 2.8.4-2 2 .5 2.8L12 14.4l-2.5 1.3.5-2.8-2-2 2.8-.4Z" />
    </>
  ),
  link: <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />,
};

export function Icon({ name, size = 20 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  );
}
