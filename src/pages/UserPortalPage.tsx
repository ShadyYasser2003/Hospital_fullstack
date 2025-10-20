import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ServiceBookingDialog } from '../components/user/ServiceBookingDialog';
import { Service, Department, Doctor } from '../types';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';
import { Activity, ArrowLeft, Calendar, Heart, Hospital } from 'lucide-react';

export function UserPortalPage() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch services
      const servicesResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-471cd30a/services`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
      
      // Fetch departments
      const departmentsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-471cd30a/departments`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      // Fetch doctors
      const doctorsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-471cd30a/doctors`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (servicesResponse.ok) {
        const servicesData = await servicesResponse.json();
        setServices(servicesData.data || []);
      }

      if (departmentsResponse.ok) {
        const departmentsData = await departmentsResponse.json();
        setDepartments(departmentsData.data || []);
      }

      if (doctorsResponse.ok) {
        const doctorsData = await doctorsResponse.json();
        setDoctors(doctorsData.data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Activity,
      Calendar,
      Heart,
      Hospital,
    };
    return iconMap[iconName] || Activity;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hospital Services</h1>
              <p className="text-gray-600 mt-1">Book your appointment with our expert medical team</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        ) : (
          <>
            {/* Services Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => {
                  const IconComponent = getIconComponent(service.icon);
                  return (
                    <Card key={service.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <IconComponent className="h-8 w-8 text-blue-600" />
                          <Badge variant="secondary">Available</Badge>
                        </div>
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {service.features && service.features.length > 0 && (
                          <ul className="space-y-2 mb-4">
                            {service.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-center text-sm text-gray-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        )}
                        <Button 
                          className="w-full" 
                          onClick={() => setSelectedService(service)}
                        >
                          Book Appointment
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* Departments Section */}
            {departments.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Departments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {departments.map((dept) => (
                    <Card key={dept.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{dept.name}</CardTitle>
                        <CardDescription className="text-sm line-clamp-2">
                          {dept.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Doctors Section */}
            {doctors.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Doctors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {doctors.map((doctor) => (
                    <Card key={doctor.id}>
                      <CardHeader>
                        <CardTitle>{doctor.name}</CardTitle>
                        <CardDescription>
                          {doctor.specialty}
                          {doctor.department && (
                            <span className="block mt-1 text-xs">
                              Department: {doctor.department}
                            </span>
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">
                          Experience: {doctor.experience}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Education: {doctor.education}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* Booking Dialog */}
      {selectedService && (
        <ServiceBookingDialog
          service={selectedService}
          departments={departments}
          doctors={doctors}
          open={!!selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}
