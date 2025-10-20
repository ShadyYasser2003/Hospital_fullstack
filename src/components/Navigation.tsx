import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, Phone, Clock } from 'lucide-react';
import { ENV } from '../config/env';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/departments', label: 'Departments' },
    { path: '/doctors', label: 'Doctors' },
    { path: '/patients', label: 'Patients' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="text-sm">Emergency: {ENV.CONTACT.EMERGENCY_PHONE}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{ENV.HOURS.EMERGENCY}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
              <span>{ENV.HOSPITAL_SHORT_NAME}</span>
            </div>
            <span className="text-xl text-blue-900">{ENV.HOSPITAL_NAME}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path)
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/user-portal">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Book Appointment
              </Button>
            </Link>
            <Link to="/admin/login">
              <Button variant="outline">
                Admin Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left py-2 ${
                  isActive(link.path)
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/user-portal" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Book Appointment
              </Button>
            </Link>
            <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full">
                Admin Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
