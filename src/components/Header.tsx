import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Phone, Clock } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="text-sm">Emergency: +1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Open 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
              <span>H+</span>
            </div>
            <span className="text-xl text-blue-900">HealthCare Plus</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600 transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection('departments')} className="text-gray-700 hover:text-blue-600 transition-colors">
              Departments
            </button>
            <button onClick={() => scrollToSection('doctors')} className="text-gray-700 hover:text-blue-600 transition-colors">
              Doctors
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </button>
            <Button onClick={() => scrollToSection('appointment')} className="bg-blue-600 hover:bg-blue-700">
              Book Appointment
            </Button>
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
            <button onClick={() => scrollToSection('home')} className="block w-full text-left py-2 text-gray-700 hover:text-blue-600">
              Home
            </button>
            <button onClick={() => scrollToSection('services')} className="block w-full text-left py-2 text-gray-700 hover:text-blue-600">
              Services
            </button>
            <button onClick={() => scrollToSection('departments')} className="block w-full text-left py-2 text-gray-700 hover:text-blue-600">
              Departments
            </button>
            <button onClick={() => scrollToSection('doctors')} className="block w-full text-left py-2 text-gray-700 hover:text-blue-600">
              Doctors
            </button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-gray-700 hover:text-blue-600">
              Contact
            </button>
            <Button onClick={() => scrollToSection('appointment')} className="w-full bg-blue-600 hover:bg-blue-700">
              Book Appointment
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
