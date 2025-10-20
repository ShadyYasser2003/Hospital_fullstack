import { Button } from './ui/button';
import { ArrowRight, Award, Users, Building2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ENV } from '../config/env';

export function HeroSection() {
  const scrollToAppointment = () => {
    const element = document.getElementById('appointment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full">
              Trusted Healthcare Since {ENV.HOSPITAL_ESTABLISHED}
            </div>
            <h1 className="text-blue-900">
              {ENV.HOSPITAL_TAGLINE}
            </h1>
            <p className="text-gray-600 text-lg">
              Experience world-class medical care with our team of expert doctors and state-of-the-art facilities. 
              We're committed to providing compassionate, patient-centered healthcare 24/7.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={scrollToAppointment} className="bg-blue-600 hover:bg-blue-700" size="lg">
                Book Appointment
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-blue-900">{ENV.STATS.TOTAL_DOCTORS}</div>
                <div className="text-gray-600 text-sm">Expert Doctors</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-blue-900">{ENV.STATS.HAPPY_PATIENTS}</div>
                <div className="text-gray-600 text-sm">Happy Patients</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Building2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-blue-900">{ENV.STATS.DEPARTMENTS}</div>
                <div className="text-gray-600 text-sm">Departments</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1719934398679-d764c1410770?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2MDYwMDA0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern Hospital Building"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute bottom-8 left-8 bg-white p-6 rounded-xl shadow-lg max-w-xs">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <div className="text-gray-900">24/7 Emergency Care</div>
                  <div className="text-gray-600 text-sm">Always here for you</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
