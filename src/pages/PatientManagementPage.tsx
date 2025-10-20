import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { PatientTable } from '../components/PatientTable';
import { PatientFormDialog } from '../components/PatientFormDialog';
import { usePatients } from '../hooks/usePatients';
import type { Patient } from '../types';
import { UserPlus, Users, Activity, UserCheck, UserX, Loader2 } from 'lucide-react';

export function PatientManagementPage() {
  const { patients, loading, error, refetch } = usePatients();
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDialogOpen(true);
  };

  const handleView = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setSelectedPatient(undefined);
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    refetch();
  };

  const activePatients = patients.filter(p => p.status === 'Active');
  const underTreatmentPatients = patients.filter(p => p.status === 'Under Treatment');
  const dischargedPatients = patients.filter(p => p.status === 'Discharged');

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Patients</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={refetch} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-blue-900">Patient Management System</h1>
              <p className="text-gray-600">Manage and track all patient records in one place</p>
            </div>
            <Button
              onClick={handleAddNew}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add New Patient
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-gray-600">Total Patients</CardTitle>
              <Users className="w-5 h-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-blue-900">{patients.length}</div>
              <p className="text-xs text-gray-500 mt-1">All registered patients</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-gray-600">Active</CardTitle>
              <UserCheck className="w-5 h-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-green-600">{activePatients.length}</div>
              <p className="text-xs text-gray-500 mt-1">Currently active patients</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-gray-600">Under Treatment</CardTitle>
              <Activity className="w-5 h-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-yellow-600">{underTreatmentPatients.length}</div>
              <p className="text-xs text-gray-500 mt-1">Receiving treatment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-gray-600">Discharged</CardTitle>
              <UserX className="w-5 h-5 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-gray-600">{dischargedPatients.length}</div>
              <p className="text-xs text-gray-500 mt-1">Completed treatment</p>
            </CardContent>
          </Card>
        </div>

        {/* Patients Table with Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Records</CardTitle>
            <CardDescription>
              View and manage all patient information, organized by status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="all">
                  All Patients ({patients.length})
                </TabsTrigger>
                <TabsTrigger value="active">
                  Active ({activePatients.length})
                </TabsTrigger>
                <TabsTrigger value="treatment">
                  Under Treatment ({underTreatmentPatients.length})
                </TabsTrigger>
                <TabsTrigger value="discharged">
                  Discharged ({dischargedPatients.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <PatientTable
                  patients={patients}
                  onEdit={handleEdit}
                  onView={handleView}
                  onRefresh={refetch}
                  loading={loading}
                />
              </TabsContent>

              <TabsContent value="active">
                <PatientTable
                  patients={activePatients}
                  onEdit={handleEdit}
                  onView={handleView}
                  onRefresh={refetch}
                  loading={loading}
                />
              </TabsContent>

              <TabsContent value="treatment">
                <PatientTable
                  patients={underTreatmentPatients}
                  onEdit={handleEdit}
                  onView={handleView}
                  onRefresh={refetch}
                  loading={loading}
                />
              </TabsContent>

              <TabsContent value="discharged">
                <PatientTable
                  patients={dischargedPatients}
                  onEdit={handleEdit}
                  onView={handleView}
                  onRefresh={refetch}
                  loading={loading}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Patient Form Dialog */}
        <PatientFormDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          patient={selectedPatient}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
}
