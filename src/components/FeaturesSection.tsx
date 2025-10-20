import { Shield, Clock, Award, Heart, Users, Stethoscope } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Certified & Accredited',
    description: 'Fully accredited healthcare facility meeting the highest standards of care.',
  },
  {
    icon: Clock,
    title: '24/7 Emergency',
    description: 'Round-the-clock emergency services with rapid response teams.',
  },
  {
    icon: Award,
    title: 'Award-Winning Care',
    description: 'Recognized for excellence in patient care and medical innovation.',
  },
  {
    icon: Heart,
    title: 'Patient-Centered',
    description: 'Personalized care plans tailored to each patient\'s unique needs.',
  },
  {
    icon: Users,
    title: 'Expert Medical Team',
    description: 'Highly qualified specialists with years of experience.',
  },
  {
    icon: Stethoscope,
    title: 'Advanced Technology',
    description: 'State-of-the-art medical equipment and diagnostic tools.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-800 text-blue-200 px-4 py-2 rounded-full mb-4">
            Why Choose Us
          </div>
          <h2 className="mb-4">
            Excellence in Healthcare
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto">
            We are committed to providing the highest quality healthcare services with 
            compassion, integrity, and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-300" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-2">{feature.title}</h3>
                  <p className="text-blue-200">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
