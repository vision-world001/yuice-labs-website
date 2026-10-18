import { useEffect, useRef } from 'react';
import { ApplicationForm, type ApplicationFormHandle } from '../components/careers/ApplicationForm';
import { CareersCta } from '../components/careers/CareersCta';
import { CareersHero } from '../components/careers/CareersHero';
import { CompanySection } from '../components/careers/CompanySection';
import { CultureSection } from '../components/careers/CultureSection';
import { OpenRoles } from '../components/careers/OpenRoles';

export function CareersPage() {
  const formRef = useRef<ApplicationFormHandle>(null);

  useEffect(() => {
    document.title = 'Careers — Yuice Labs';
  }, []);

  return (
    <>
      <CareersHero />
      <CompanySection />
      <OpenRoles />
      <CultureSection />
      <CareersCta onGetInTouch={() => formRef.current?.open('general')} />
      <ApplicationForm ref={formRef} />
    </>
  );
}
