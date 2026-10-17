import { ContactForm } from './ContactForm';
import { Icon } from '../ui/Icon';
import { SectionLabel } from '../ui/SectionLabel';

const contactTypes = [
  { icon: 'partners' as const, label: 'Partnerships' },
  { icon: 'file' as const, label: 'Business Inquiries' },
  { icon: 'people' as const, label: 'Careers' },
];

export function ContactSection() {
  return (
    <section className="contact light-section" id="contact">
      <div className="page-width contact-grid">
        <div className="contact-copy">
          <SectionLabel>Get in touch</SectionLabel>
          <h2>
            Let’s build the future of{' '}
            <span className="line-break">real-world asset finance.</span>
          </h2>
          <p>
            We welcome conversations with asset operators, fintech
            innovators, technology providers, and potential partners who share
            our interest in making real-world assets more connected to digital
            finance.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
