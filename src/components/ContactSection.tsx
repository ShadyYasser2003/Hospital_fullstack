import { Card, CardContent } from './ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { ENV } from '../config/env';

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-4">
            Contact Us
          </div>
          <h2 className="text-blue-900 mb-4">
            Get In Touch With Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? Our team is here to help you 24/7.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 text-sm">
                {ENV.CONTACT.ADDRESS_LINE1}<br />
                {ENV.CONTACT.ADDRESS_LINE2}
              </p>
              <Button variant="link" className="text-blue-600 mt-2">
                Get Directions
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm">
                Emergency: {ENV.CONTACT.EMERGENCY_PHONE}<br />
                General: {ENV.CONTACT.GENERAL_PHONE}
              </p>
              <Button variant="link" className="text-blue-600 mt-2">
                Call Now
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm">
                {ENV.CONTACT.EMAIL_INFO}<br />
                {ENV.CONTACT.EMAIL_SUPPORT}
              </p>
              <Button variant="link" className="text-blue-600 mt-2">
                Send Email
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Working Hours</h3>
              <p className="text-gray-600 text-sm">
                Emergency: {ENV.HOURS.EMERGENCY}<br />
                {ENV.HOURS.OUTPATIENT}
              </p>
              <Button variant="link" className="text-blue-600 mt-2">
                View Schedule
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        <div className="mt-12 rounded-xl overflow-hidden shadow-lg">
          <div className="bg-gray-200 h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Map integration would go here</p>
              <p className="text-gray-500 text-sm mt-2">{ENV.CONTACT.ADDRESS_FULL}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
