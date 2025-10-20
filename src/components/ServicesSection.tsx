import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  Stethoscope, 
  Activity, 
  Pill, 
  Syringe, 
  Heart, 
  Brain,
  Baby,
  Eye
} from 'lucide-react';

const services = [
  {
    icon: Stethoscope,
    title: 'General Medicine',
    description: 'Comprehensive primary care and preventive health services for all ages.',
  },
  {
    icon: Heart,
    title: 'Cardiology',
    description: 'Advanced heart care with cutting-edge diagnostic and treatment options.',
  },
  {
    icon: Brain,
    title: 'Neurology',
    description: 'Expert neurological care for brain and nervous system disorders.',
  },
  {
    icon: Baby,
    title: 'Pediatrics',
    description: 'Specialized medical care for infants, children, and adolescents.',
  },
  {
    icon: Activity,
    title: 'Emergency Care',
    description: '24/7 emergency services with rapid response and expert trauma care.',
  },
  {
    icon: Pill,
    title: 'Pharmacy',
    description: 'Full-service pharmacy with prescription and over-the-counter medications.',
  },
  {
    icon: Syringe,
    title: 'Laboratory',
    description: 'State-of-the-art diagnostic testing with quick and accurate results.',
  },
  {
    icon: Eye,
    title: 'Ophthalmology',
    description: 'Complete eye care services from routine exams to advanced surgeries.',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-4">
            Our Services
          </div>
          <h2 className="text-blue-900 mb-4">
            Comprehensive Healthcare Solutions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of medical services delivered by experienced professionals 
            using the latest technology and treatments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow border-gray-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-gray-900">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
