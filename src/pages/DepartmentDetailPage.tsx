import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { PatientTable } from '../components/PatientTable';
import { PatientFormDialog } from '../components/PatientFormDialog';
import { Patient, patientDB } from '../services/database';

const departmentInfo: Record<string, { name: string; description: string }> = {
  'cardiology': {
    name: 'Cardiology',
    description: 'Expert heart care with advanced cardiac diagnostics and treatments',
  },
  'neurology': {
    name: 'Neurology',
    description: 'Comprehensive care for neurological disorders',
  },
  'pediatrics': {
    name: 'Pediatrics',
    description: 'Specialized medical care for children and adolescents',
  },
  'orthopedics': {
    name: 'Orthopedics',
    description: 'Expert treatment for bone and joint conditions',
  },
  'emergency-medicine': {
    name: 'Emergency Medicine',
    description: '24/7 emergency care and trauma services',
  },
  'laboratory-services': {
    name: 'Laboratory Services',
    description: 'Advanced diagnostic testing services',
  },
  'surgical-services': {
    name: 'Surgical Services',
    description: 'Comprehensive surgical care services',
  },
  'general-medicine': {
    name: 'General Medicine',
    description: 'Primary care and preventive health services',
  },
};

export function DepartmentDetailPage() {
  const { departmentId } = useParams<{ departmentId: string }>();
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  const department = departmentId ? departmentInfo[departmentId] : null;

  useEffect(() => {
    loadPatients();
  }, [departmentId]);

  const loadPatients = () => {
    if (department) {
      const deptPatients = patientDB.getByDepartment(department.name);
      setPatients(deptPatients);
    }
  };

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsViewMode(false);
    setIsDialogOpen(true);
  };

  const handleView = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsViewMode(true);
    // For now, just edit - you could create a separate view dialog
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setSelectedPatient(undefined);
    setIsViewMode(false);
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    loadPatients();
  };

  if (!department) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-gray-900 mb-4">Department not found</h2>
          <Button onClick={() => navigate('/departments')}>
            Back to Departments
          </Button>
        </div>
      </div>
    );
  }

  const stats = {
    total: patients.length,
    active: patients.filter(p => p.status === 'Active').length,
    underTreatment: patients.filter(p => p.status === 'Under Treatment').length,
    discharged: patients.filter(p => p.status === 'Discharged').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/departments')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Departments
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-blue-900">{department.name} Department</h1>
              <p className="text-gray-600">{department.description}</p>
            </div>
            <Button
              onClick={handleAddNew}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add New Patient
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">Total Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-blue-900">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-green-600">{stats.active}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">Under Treatment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-yellow-600">{stats.underTreatment}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">Discharged</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-600">{stats.discharged}</div>
            </CardContent>
          </Card>
        </div>

        {/* Patients Table */}
        <Card>
          <CardHeader>
            <CardTitle>Patients List</CardTitle>
          </CardHeader>
          <CardContent>
            <PatientTable
              patients={patients}
              onEdit={handleEdit}
              onView={handleView}
              onRefresh={loadPatients}
            />
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
