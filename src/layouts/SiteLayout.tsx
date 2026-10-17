import type { ReactNode } from 'react';
import { SiteFooter } from '../components/layout/SiteFooter';
import { SiteHeader } from '../components/layout/SiteHeader';
import { ScrollEffects } from '../components/layout/ScrollEffects';

interface SiteLayoutProps {
  children: ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <SiteFooter />
      <ScrollEffects />
    </>
  );
}
