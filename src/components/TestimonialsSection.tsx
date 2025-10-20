import { Card, CardContent } from './ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Jennifer Martinez',
    role: 'Patient',
    content: 'The care I received at HealthCare Plus was exceptional. The doctors were knowledgeable, compassionate, and took the time to explain everything to me. I felt truly cared for.',
    rating: 5,
  },
  {
    name: 'David Thompson',
    role: 'Patient',
    content: 'From the moment I walked in, I was impressed by the professionalism and cleanliness. The staff was friendly and efficient. Highly recommend their cardiology department!',
    rating: 5,
  },
  {
    name: 'Maria Garcia',
    role: 'Patient',
    content: 'As a mother, finding a trustworthy pediatrician was crucial. Dr. Williams and her team have been amazing with my children. They make every visit comfortable and stress-free.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-4">
            Testimonials
          </div>
          <h2 className="text-blue-900 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our patients have to say about their experience with us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative bg-white">
              <CardContent className="pt-6">
                <Quote className="w-10 h-10 text-blue-200 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
