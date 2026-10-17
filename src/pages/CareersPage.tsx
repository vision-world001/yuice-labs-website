import { useEffect, useRef } from 'react';
import { ApplicationForm, type ApplicationFormHandle } from '../components/careers/ApplicationForm';
import { CareersHero } from '../components/careers/CareersHero';
import { CultureSection } from '../components/careers/CultureSection';
import { HiringProcess } from '../components/careers/HiringProcess';
import { OpenRoles } from '../components/careers/OpenRoles';
import { SiteLayout } from '../layouts/SiteLayout';

export function CareersPage() {
  const formRef = useRef<ApplicationFormHandle>(null);

  useEffect(() => {
    document.title = 'Careers — Yuice Labs';
  }, []);

  function handleApply(roleId: string) {
    formRef.current?.prefillRole(roleId);
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <SiteLayout>
      <CareersHero />
      <CultureSection />
      <OpenRoles onApply={handleApply} />
      <HiringProcess />
      <ApplicationForm ref={formRef} />
    </SiteLayout>
  );
}
