import { useEffect } from 'react';
import { AiOperationsSection } from '../components/home/AiOperationsSection';
import { ApproachSection } from '../components/home/ApproachSection';
import { AboutSection } from '../components/home/AboutSection';
import { ContactSection } from '../components/home/ContactSection';
import { HeroSection } from '../components/home/HeroSection';
import { MarketsSection } from '../components/home/MarketsSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { TrustSection } from '../components/home/TrustSection';

export function HomePage() {
  useEffect(() => {
    document.title = 'Yuice Labs — Real-World Assets. Programmable Finance.';
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ApproachSection />
      <ProcessSection />
      <AiOperationsSection />
      <MarketsSection />
      <TrustSection />
      <ContactSection />
    </>
  );
}
