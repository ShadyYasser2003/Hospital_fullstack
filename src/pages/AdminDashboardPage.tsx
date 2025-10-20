import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { LogOut, Users, Calendar, UserCog, Building2, Briefcase, Shield } from 'lucide-react';
import { PatientsManagement } from '../components/admin/PatientsManagement';
import { AppointmentsManagement } from '../components/admin/AppointmentsManagement';
import { DoctorsManagement } from '../components/admin/DoctorsManagement';
import { DepartmentsManagement } from '../components/admin/DepartmentsManagement';
import { ServicesManagement } from '../components/admin/ServicesManagement';

export function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('patients');

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  if (!user) {
    navigate('/admin/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate('/')}>
                View Website
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="patients" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Patients</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Appointments</span>
            </TabsTrigger>
            <TabsTrigger value="doctors" className="flex items-center gap-2">
              <UserCog className="h-4 w-4" />
              <span className="hidden sm:inline">Doctors</span>
            </TabsTrigger>
            <TabsTrigger value="departments" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Departments</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Services</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Patient Management</CardTitle>
                <CardDescription>
                  View and manage all patient records in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PatientsManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Management</CardTitle>
                <CardDescription>
                  View and manage all appointments and bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentsManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="doctors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Management</CardTitle>
                <CardDescription>
                  Add, edit, and manage doctor profiles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DoctorsManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Department Management</CardTitle>
                <CardDescription>
                  Manage hospital departments and their information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DepartmentsManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Service Management</CardTitle>
                <CardDescription>
                  Manage hospital services and offerings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ServicesManagement />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
