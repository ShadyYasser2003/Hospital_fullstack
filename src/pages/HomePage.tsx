import { HeroSection } from '../components/HeroSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { ServicesSection } from '../components/ServicesSection';
import { DepartmentsSection } from '../components/DepartmentsSection';
import { DoctorsSection } from '../components/DoctorsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <DepartmentsSection />
      <DoctorsSection />
      <TestimonialsSection />
    </>
  );
}
