import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const departments = [
  {
    name: 'Emergency Medicine',
    description: 'Immediate care for acute illnesses and injuries with 24/7 availability.',
    image: 'https://images.unsplash.com/photo-1723513198534-c3cd2e033815?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGVtZXJnZW5jeSUyMHJvb218ZW58MXx8fHwxNzYwNTUxMDgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: 'Laboratory Services',
    description: 'Advanced diagnostic testing with state-of-the-art equipment and technology.',
    image: 'https://images.unsplash.com/photo-1614308456595-a59d48697ea8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwbGFib3JhdG9yeXxlbnwxfHx8fDE3NjA2MTY4MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: 'Surgical Services',
    description: 'Comprehensive surgical care from minimally invasive to complex procedures.',
    image: 'https://images.unsplash.com/photo-1728474372689-c3072b79806e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHN1cmdlcnklMjByb29tfGVufDF8fHx8MTc2MDYyNDM2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: 'Cardiology',
    description: 'Expert heart care with advanced cardiac diagnostics and treatments.',
    image: 'https://images.unsplash.com/photo-1646441453885-86f3cbc260b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkaW9sb2d5JTIwaGVhcnQlMjBoZWFsdGh8ZW58MXx8fHwxNzYwNTE5NTY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function DepartmentsSection() {
  return (
    <section id="departments" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-4">
            Our Departments
          </div>
          <h2 className="text-blue-900 mb-4">
            Specialized Medical Departments
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Each department is equipped with modern facilities and staffed by 
            highly trained specialists dedicated to your care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={dept.image}
                  alt={dept.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-gray-900 mb-2">{dept.name}</h3>
                <p className="text-gray-600 mb-4">{dept.description}</p>
                <Button variant="link" className="text-blue-600 p-0">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
