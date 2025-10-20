import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star } from 'lucide-react';

const doctors = [
  {
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    experience: '15 years experience',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNjEzNTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
  },
  {
    name: 'Dr. Michael Chen',
    specialty: 'Neurologist',
    experience: '12 years experience',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNjEzNTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
  },
  {
    name: 'Dr. Emily Williams',
    specialty: 'Pediatrician',
    experience: '10 years experience',
    image: 'https://images.unsplash.com/photo-1676313027775-a5a3dca6f98b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWRpYXRyaWMlMjBkb2N0b3IlMjBjaGlsZHJlbnxlbnwxfHx8fDE3NjA2MjQzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 5.0,
  },
  {
    name: 'Dr. Robert Davis',
    specialty: 'Orthopedic Surgeon',
    experience: '18 years experience',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNjEzNTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
  },
];

export function DoctorsSection() {
  return (
    <section id="doctors" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-4">
            Our Experts
          </div>
          <h2 className="text-blue-900 mb-4">
            Meet Our Expert Doctors
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our team of highly qualified and experienced doctors are committed to 
            providing you with the best possible care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64">
                <ImageWithFallback
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-gray-900 mb-1">{doctor.name}</h3>
                <p className="text-blue-600 mb-2">{doctor.specialty}</p>
                <p className="text-gray-600 text-sm mb-3">{doctor.experience}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-gray-900">{doctor.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">(120+ reviews)</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
