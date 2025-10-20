import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, Award, Clock } from 'lucide-react';
import { HOSPITAL_CONFIG, SERVICES, DEPARTMENTS, TESTIMONIALS } from '../config/hospital';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl mb-6">
                {HOSPITAL_CONFIG.name}
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                {HOSPITAL_CONFIG.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/appointments"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
                >
                  Book Appointment
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1719934398679-d764c1410770?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJ1aWxkaW5nJTIwbW9kZXJufGVufDF8fHx8MTc2MDg3MjI0OXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Modern Hospital Building"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl text-gray-900 mb-2">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Expert Doctors</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl text-gray-900 mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-3xl text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Emergency Care</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare services with cutting-edge technology and compassionate care
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {SERVICES.slice(0, 6).map((service) => {
              const Icon = require('lucide-react')[service.icon];
              return (
                <div
                  key={service.id}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Departments Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-gray-900 mb-4">Our Departments</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Specialized departments staffed with expert medical professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {DEPARTMENTS.map((dept) => {
              const Icon = require('lucide-react')[dept.icon];
              return (
                <div
                  key={dept.id}
                  className="border-2 border-gray-200 p-6 rounded-lg hover:border-blue-600 transition-colors"
                >
                  <div className={`w-12 h-12 bg-${dept.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 text-${dept.color}-600`} />
                  </div>
                  <h3 className="text-xl text-gray-900 mb-2">{dept.name}</h3>
                  <p className="text-gray-600">{dept.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              to="/departments"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              View All Departments
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-gray-900 mb-4">What Our Patients Say</h2>
            <p className="text-xl text-gray-600">
              Real experiences from real patients
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div className="text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Book an appointment today and experience quality healthcare
          </p>
          <Link
            to="/appointments"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
          >
            Book Appointment Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
