import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Stethoscope, 
  Activity, 
  Pill, 
  Syringe, 
  Heart, 
  Brain,
  Baby,
  Eye,
  Bone,
  Microscope,
  Ambulance,
  TestTube
} from 'lucide-react';

const allServices = [
  {
    icon: Stethoscope,
    title: 'General Medicine',
    description: 'Comprehensive primary care and preventive health services for all ages.',
    details: 'Our general medicine department provides routine check-ups, health screenings, vaccinations, and treatment for common illnesses.',
  },
  {
    icon: Heart,
    title: 'Cardiology',
    description: 'Advanced heart care with cutting-edge diagnostic and treatment options.',
    details: 'Specialized in treating cardiovascular diseases, including heart failure, arrhythmias, and coronary artery disease.',
  },
  {
    icon: Brain,
    title: 'Neurology',
    description: 'Expert neurological care for brain and nervous system disorders.',
    details: 'Treatment for stroke, epilepsy, Parkinson\'s disease, multiple sclerosis, and other neurological conditions.',
  },
  {
    icon: Baby,
    title: 'Pediatrics',
    description: 'Specialized medical care for infants, children, and adolescents.',
    details: 'Comprehensive care from newborn to adolescence, including well-child visits, vaccinations, and treatment of childhood illnesses.',
  },
  {
    icon: Activity,
    title: 'Emergency Care',
    description: '24/7 emergency services with rapid response and expert trauma care.',
    details: 'State-of-the-art emergency department equipped to handle all medical emergencies, trauma, and critical care situations.',
  },
  {
    icon: Pill,
    title: 'Pharmacy',
    description: 'Full-service pharmacy with prescription and over-the-counter medications.',
    details: 'On-site pharmacy providing medications, consultations, and medication management services.',
  },
  {
    icon: Syringe,
    title: 'Laboratory',
    description: 'State-of-the-art diagnostic testing with quick and accurate results.',
    details: 'Comprehensive laboratory services including blood work, urinalysis, pathology, and specialized testing.',
  },
  {
    icon: Eye,
    title: 'Ophthalmology',
    description: 'Complete eye care services from routine exams to advanced surgeries.',
    details: 'Treatment for cataracts, glaucoma, retinal disorders, and refractive surgery.',
  },
  {
    icon: Bone,
    title: 'Orthopedics',
    description: 'Expert care for bone, joint, and musculoskeletal conditions.',
    details: 'Treatment for fractures, arthritis, sports injuries, and joint replacement surgery.',
  },
  {
    icon: Microscope,
    title: 'Radiology',
    description: 'Advanced imaging services including X-ray, CT, MRI, and ultrasound.',
    details: 'Diagnostic imaging with the latest technology for accurate diagnosis and treatment planning.',
  },
  {
    icon: Ambulance,
    title: 'Intensive Care',
    description: 'Critical care services for patients requiring close monitoring.',
    details: '24/7 intensive care unit with specialized staff and advanced life support systems.',
  },
  {
    icon: TestTube,
    title: 'Pathology',
    description: 'Comprehensive diagnostic pathology and laboratory medicine.',
    details: 'Tissue analysis, biopsies, and specialized testing for accurate disease diagnosis.',
  },
];

export function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-4">
              Our Services
            </div>
            <h1 className="text-blue-900 mb-4">
              Comprehensive Healthcare Solutions
            </h1>
            <p className="text-gray-600 text-lg">
              We offer a wide range of medical services delivered by experienced professionals 
              using the latest technology and treatments to ensure the best possible care for our patients.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow border-gray-200">
                  <CardHeader>
                    <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-blue-600" />
                    </div>
                    <CardTitle className="text-gray-900">{service.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{service.details}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4">Need Medical Assistance?</h2>
          <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
            Our team is available 24/7 to provide you with the care you need. 
            Don't hesitate to reach out for emergency services or schedule an appointment.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/appointment" className="bg-white text-blue-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Book Appointment
            </a>
            <a href="/contact" className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
