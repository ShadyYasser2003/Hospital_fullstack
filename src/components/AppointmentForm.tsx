import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Calendar, Clock, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ENV } from '../config/env';
import { appointmentDB } from '../services/database';

export function AppointmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    doctor: '',
    date: '',
    time: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Create appointment in database
      await appointmentDB.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        doctor: formData.doctor || 'To Be Assigned',
        date: formData.date,
        time: formData.time,
        message: formData.message,
        status: 'Scheduled',
      });
      
      toast.success('Appointment request submitted! We will contact you soon to confirm.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: '',
        doctor: '',
        date: '',
        time: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting appointment:', error);
      toast.error('Failed to submit appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="appointment" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-4">
            Book Appointment
          </div>
          <h2 className="text-blue-900 mb-4">
            Schedule Your Visit
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill out the form below and our team will get back to you within 24 hours to confirm your appointment.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-gray-900">Appointment Details</CardTitle>
              <CardDescription className="text-gray-600">
                Please provide your information and preferred appointment time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-900">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="John Doe"
                      required
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-900">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="john@example.com"
                      required
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-900">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      required
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-gray-900">Department</Label>
                    <Select value={formData.department} onValueChange={(value) => handleChange('department', value)}>
                      <SelectTrigger id="department" className="border-gray-300">
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent>
                        {ENV.DEPARTMENTS.map((dept) => (
                          <SelectItem key={dept} value={dept.toLowerCase().replace(/ /g, '-')}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Preferred Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      required
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-gray-900 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Preferred Time
                    </Label>
                    <Select value={formData.time} onValueChange={(value) => handleChange('time', value)}>
                      <SelectTrigger id="time" className="border-gray-300">
                        <SelectValue placeholder="Select Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {ENV.APPOINTMENT.AVAILABLE_TIMES.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-900">Additional Information</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Please describe your symptoms or reason for visit..."
                    rows={4}
                    className="border-gray-300"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Appointment Request'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
