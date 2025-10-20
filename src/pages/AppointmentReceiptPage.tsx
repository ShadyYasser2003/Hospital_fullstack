import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Appointment } from '../types';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  UserCog, 
  FileText,
  Download,
  CheckCircle2,
  ArrowLeft,
  Hospital
} from 'lucide-react';

export function AppointmentReceiptPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchAppointment();
    }
  }, [id]);

  const fetchAppointment = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-471cd30a/appointments/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Appointment not found');
      }

      setAppointment(data.data);
    } catch (error) {
      console.error('Error fetching appointment:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to load appointment');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading appointment details...</p>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center py-12">
            <p className="text-gray-600 mb-4">Appointment not found</p>
            <Button onClick={() => navigate('/')}>Return to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 print:bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Action Buttons - Hidden on print */}
        <div className="mb-6 flex gap-3 print:hidden">
          <Button variant="outline" onClick={() => navigate('/user-portal')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Download className="h-4 w-4 mr-2" />
            Download/Print Receipt
          </Button>
        </div>

        {/* Receipt Card */}
        <Card className="print:shadow-none">
          <CardHeader className="text-center border-b bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-white">
            <div className="flex items-center justify-center mb-4">
              <Hospital className="h-12 w-12 text-blue-600" />
            </div>
            <CardTitle className="text-3xl mb-2">CareHub Medical Center</CardTitle>
            <p className="text-gray-600">Appointment Confirmation Receipt</p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-green-600 font-semibold">Appointment Confirmed</span>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-8">
            {/* Appointment ID */}
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Appointment ID</p>
              <p className="text-xl font-mono font-semibold text-gray-900">{appointment.id}</p>
            </div>

            <Separator />

            {/* Patient Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Patient Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg print:bg-gray-100">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{appointment.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Mail className="h-3 w-3" /> Email
                  </p>
                  <p className="font-medium">{appointment.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Phone className="h-3 w-3" /> Phone
                  </p>
                  <p className="font-medium">{appointment.phone}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Appointment Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Appointment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg print:bg-gray-100">
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Building2 className="h-3 w-3" /> Department
                  </p>
                  <p className="font-medium">{appointment.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <UserCog className="h-3 w-3" /> Doctor
                  </p>
                  <p className="font-medium">{appointment.doctor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Date
                  </p>
                  <p className="font-medium">{formatDate(appointment.date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Time
                  </p>
                  <p className="font-medium">{appointment.time}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Status</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {appointment.status}
                  </span>
                </div>
              </div>
            </div>

            {appointment.message && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Additional Notes
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg print:bg-gray-100">
                    <p className="text-gray-700">{appointment.message}</p>
                  </div>
                </div>
              </>
            )}

            <Separator />

            {/* Important Information */}
            <div className="bg-blue-50 p-4 rounded-lg print:bg-blue-100">
              <h4 className="font-semibold mb-2 text-blue-900">Important Information</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Please arrive 15 minutes before your scheduled appointment time</li>
                <li>• Bring a valid photo ID and your insurance card</li>
                <li>• If you need to reschedule, please contact us at least 24 hours in advance</li>
                <li>• Keep this receipt for your records</li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="text-center text-sm text-gray-600 border-t pt-6">
              <p className="font-medium text-gray-900 mb-2">CareHub Medical Center</p>
              <p>123 Healthcare Boulevard, Medical District</p>
              <p>Phone: +1 (555) 123-4567 | Email: info@carehub.com</p>
              <p className="mt-2 text-xs text-gray-500">
                Booked on: {new Date(appointment.createdAt || '').toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
