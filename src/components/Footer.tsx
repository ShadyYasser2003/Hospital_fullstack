import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span>H+</span>
              </div>
              <span>HealthCare Plus</span>
            </div>
            <p className="text-gray-400 mb-4">
              Providing exceptional healthcare services with compassion and excellence since 1985.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('home')} className="text-gray-400 hover:text-blue-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-blue-400 transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('departments')} className="text-gray-400 hover:text-blue-400 transition-colors">
                  Departments
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('doctors')} className="text-gray-400 hover:text-blue-400 transition-colors">
                  Our Doctors
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('appointment')} className="text-gray-400 hover:text-blue-400 transition-colors">
                  Book Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4">Our Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Emergency Care</li>
              <li>General Medicine</li>
              <li>Cardiology</li>
              <li>Neurology</li>
              <li>Pediatrics</li>
              <li>Laboratory Services</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Medical Center Drive<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">info@healthcareplus.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  24/7 Emergency Services<br />
                  Mon-Fri: 8:00 AM - 8:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 HealthCare Plus. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
