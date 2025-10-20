import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { ENV } from '../config/env';

export function FooterNav() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span>{ENV.HOSPITAL_SHORT_NAME}</span>
              </div>
              <span>{ENV.HOSPITAL_NAME}</span>
            </div>
            <p className="text-gray-400 mb-4">
              Providing exceptional healthcare services with compassion and excellence since {ENV.HOSPITAL_ESTABLISHED}.
            </p>
            <div className="flex gap-4">
              <a href={ENV.SOCIAL.FACEBOOK} className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={ENV.SOCIAL.TWITTER} className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href={ENV.SOCIAL.INSTAGRAM} className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={ENV.SOCIAL.LINKEDIN} className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/departments" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Departments
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Our Doctors
                </Link>
              </li>
              <li>
                <Link to="/appointment" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Book Appointment
                </Link>
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
                  {ENV.CONTACT.ADDRESS_LINE1}<br />
                  {ENV.CONTACT.ADDRESS_LINE2}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">{ENV.CONTACT.EMERGENCY_PHONE}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">{ENV.CONTACT.EMAIL_INFO}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Emergency: {ENV.HOURS.EMERGENCY}<br />
                  {ENV.HOURS.OUTPATIENT}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 {ENV.HOSPITAL_NAME}. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
