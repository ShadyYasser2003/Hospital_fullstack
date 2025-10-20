import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Star, Award, GraduationCap, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    experience: '15 years experience',
    education: 'MD, Harvard Medical School',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNjEzNTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviews: 120,
    description: 'Board-certified cardiologist specializing in interventional cardiology and heart disease prevention.',
    availability: 'Mon, Wed, Fri: 9AM - 5PM',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Neurologist',
    experience: '12 years experience',
    education: 'MD, Johns Hopkins University',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBtYWxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNjI0MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviews: 95,
    description: 'Expert in treating neurological disorders including stroke, epilepsy, and movement disorders.',
    availability: 'Tue, Thu, Sat: 10AM - 6PM',
  },
  {
    id: 3,
    name: 'Dr. Emily Williams',
    specialty: 'Pediatrician',
    experience: '10 years experience',
    education: 'MD, Stanford University',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA2MjQzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 5.0,
    reviews: 150,
    description: 'Compassionate pediatric care specialist with expertise in childhood development and preventive care.',
    availability: 'Mon - Fri: 8AM - 4PM',
  },
  {
    id: 4,
    name: 'Dr. Robert Davis',
    specialty: 'Orthopedic Surgeon',
    experience: '18 years experience',
    education: 'MD, Mayo Clinic',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBzdXJnZW9uJTIwbWFsZXxlbnwxfHx8fDE3NjA2MjQzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviews: 130,
    description: 'Renowned orthopedic surgeon specializing in joint replacement and sports medicine.',
    availability: 'Mon, Wed, Thu: 9AM - 5PM',
  },
  {
    id: 5,
    name: 'Dr. Lisa Anderson',
    specialty: 'General Surgeon',
    experience: '14 years experience',
    education: 'MD, Columbia University',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNjEzNTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    reviews: 88,
    description: 'Experienced in minimally invasive and robotic surgery with focus on patient recovery.',
    availability: 'Tue, Thu, Fri: 10AM - 6PM',
  },
  {
    id: 6,
    name: 'Dr. James Martinez',
    specialty: 'Emergency Medicine',
    experience: '11 years experience',
    education: 'MD, Yale University',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBtYWxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNjI0MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviews: 110,
    description: 'Critical care specialist with expertise in trauma and emergency medical services.',
    availability: '24/7 Emergency Services',
  },
];

export function DoctorsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-4">
              Our Medical Team
            </div>
            <h1 className="text-blue-900 mb-4">
              Meet Our Expert Doctors
            </h1>
            <p className="text-gray-600 text-lg">
              Our team of highly qualified and experienced doctors are committed to 
              providing you with the best possible care using the latest medical knowledge and technology.
            </p>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-80">
                  <ImageWithFallback
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-gray-900 mb-1">{doctor.name}</h3>
                  <p className="text-blue-600 mb-4">{doctor.specialty}</p>
                  
                  <p className="text-gray-600 text-sm mb-4">{doctor.description}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span>{doctor.experience}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                      <span>{doctor.education}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{doctor.availability}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-900">{doctor.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({doctor.reviews} reviews)</span>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
