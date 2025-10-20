import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { ArrowRight, Users } from 'lucide-react';
import { patientDB } from '../services/database';

const departments = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    description: 'Expert heart care with advanced cardiac diagnostics and treatments for all cardiovascular conditions.',
    image: 'https://images.unsplash.com/photo-1646441453885-86f3cbc260b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkaW9sb2d5JTIwaGVhcnQlMjBoZWFsdGh8ZW58MXx8fHwxNzYwNTE5NTY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    services: ['Cardiac Catheterization', 'Echocardiography', 'Stress Testing', 'Pacemaker Implantation'],
  },
  {
    id: 'neurology',
    name: 'Neurology',
    description: 'Comprehensive care for neurological disorders affecting the brain, spine, and nervous system.',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyb2xvZ3klMjBicmFpbiUyMHNjYW58ZW58MXx8fHwxNzYwNjI0MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    services: ['EEG Testing', 'Stroke Care', 'Epilepsy Management', 'Movement Disorders'],
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    description: 'Specialized medical care for infants, children, and adolescents with a focus on growth and development.',
    image: 'https://images.unsplash.com/photo-1676313027775-a5a3dca6f98b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWRpYXRyaWMlMjBkb2N0b3IlMjBjaGlsZHJlbnxlbnwxfHx8fDE3NjA2MjQzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    services: ['Well-Child Visits', 'Vaccinations', 'Growth Monitoring', 'Childhood Illness Treatment'],
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    description: 'Expert treatment for bone, joint, and musculoskeletal conditions including sports injuries and arthritis.',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcnRob3BlZGljJTIwa25lZSUyMHhyYXl8ZW58MXx8fHwxNzYwNjI0MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    services: ['Joint Replacement', 'Fracture Care', 'Sports Medicine', 'Arthritis Treatment'],
  },
  {
    id: 'emergency-medicine',
    name: 'Emergency Medicine',
    description: 'Immediate care for acute illnesses and injuries with 24/7 availability and rapid response teams.',
    image: 'https://images.unsplash.com/photo-1723513198534-c3cd2e033815?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGVtZXJnZW5jeSUyMHJvb218ZW58MXx8fHwxNzYwNTUxMDgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    services: ['Trauma Care', 'Cardiac Emergencies', 'Stroke Response', 'Critical Care'],
  },
  {
    id: 'laboratory-services',
    name: 'Laboratory Services',
    description: 'Advanced diagnostic testing with state-of-the-art equipment and rapid result turnaround.',
    image: 'https://images.unsplash.com/photo-1614308456595-a59d48697ea8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwbGFib3JhdG9yeXxlbnwxfHx8fDE3NjA2MTY4MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    services: ['Blood Testing', 'Urinalysis', 'Pathology', 'Microbiology'],
  },
  {
    id: 'surgical-services',
    name: 'Surgical Services',
    description: 'Comprehensive surgical care from minimally invasive procedures to complex operations.',
    image: 'https://images.unsplash.com/photo-1728474372689-c3072b79806e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHN1cmdlcnklMjByb29tfGVufDF8fHx8MTc2MDYyNDM2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    services: ['General Surgery', 'Laparoscopic Surgery', 'Robotic Surgery', 'Day Surgery'],
  },
  {
    id: 'general-medicine',
    name: 'General Medicine',
    description: 'Primary care services for adults including preventive care, chronic disease management, and health screenings.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc2MDYyNDM2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    services: ['Health Check-ups', 'Chronic Disease Management', 'Preventive Care', 'Health Counseling'],
  },
];

export function DepartmentsPage() {
  const navigate = useNavigate();
  const allPatients = patientDB.getAll();

  const getDepartmentPatientCount = (deptName: string) => {
    return allPatients.filter(p => p.department === deptName).length;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-4">
              Our Departments
            </div>
            <h1 className="text-blue-900 mb-4">
              Specialized Medical Departments
            </h1>
            <p className="text-gray-600 text-lg">
              Each department is equipped with modern facilities and staffed by 
              highly trained specialists dedicated to providing exceptional patient care.
            </p>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {departments.map((dept) => {
              const patientCount = getDepartmentPatientCount(dept.name);
              return (
                <div
                  key={dept.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-200"
                >
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={dept.image}
                      alt={dept.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {patientCount > 0 && (
                      <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{patientCount} Patients</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-gray-900 mb-2">{dept.name}</h3>
                    <p className="text-gray-600 mb-4">{dept.description}</p>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-700 mb-2">Key Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {dept.services.map((service, idx) => (
                          <span key={idx} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => navigate(`/departments/${dept.id}`)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        View Patients
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => navigate('/appointment')}
                      >
                        Book Appointment
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
