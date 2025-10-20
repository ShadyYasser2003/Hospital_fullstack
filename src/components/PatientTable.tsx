import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { patientDB } from '../services/database';
import type { Patient } from '../types';
import { Search, Edit, Trash2, Eye, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PatientTableProps {
  patients: Patient[];
  onEdit?: (patient: Patient) => void;
  onView?: (patient: Patient) => void;
  onDelete?: (patientId: string) => void;
  onRefresh?: () => void;
  loading?: boolean;
}

export function PatientTable({ patients, onEdit, onView, onDelete, onRefresh, loading }: PatientTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredPatients = patients.filter(patient => {
    const search = searchTerm.toLowerCase();
    return (
      patient.firstName.toLowerCase().includes(search) ||
      patient.lastName.toLowerCase().includes(search) ||
      patient.email.toLowerCase().includes(search) ||
      patient.department.toLowerCase().includes(search) ||
      patient.assignedDoctor.toLowerCase().includes(search)
    );
  });

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete patient ${name}?`)) {
      try {
        setDeletingId(id);
        const success = await patientDB.delete(id);
        if (success) {
          toast.success('Patient deleted successfully');
          onDelete?.(id);
          onRefresh?.();
        } else {
          toast.error('Failed to delete patient');
        }
      } catch (error) {
        console.error('Error deleting patient:', error);
        toast.error('An error occurred while deleting the patient');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const getStatusBadge = (status: Patient['status']) => {
    const variants: Record<Patient['status'], 'default' | 'secondary' | 'destructive'> = {
      'Active': 'default',
      'Under Treatment': 'secondary',
      'Discharged': 'destructive',
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search patients by name, email, department, or doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Assigned Doctor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Admission Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading patients...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                  No patients found
                </TableCell>
              </TableRow>
            ) : (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.id}</TableCell>
                  <TableCell>
                    {patient.firstName} {patient.lastName}
                  </TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.department}</TableCell>
                  <TableCell>{patient.assignedDoctor}</TableCell>
                  <TableCell>{getStatusBadge(patient.status)}</TableCell>
                  <TableCell>{new Date(patient.admissionDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView?.(patient)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit?.(patient)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(patient.id, `${patient.firstName} ${patient.lastName}`)}
                        disabled={deletingId === patient.id}
                      >
                        {deletingId === patient.id ? (
                          <Loader2 className="w-4 h-4 text-red-500 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4 text-red-500" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-gray-500">
        Showing {filteredPatients.length} of {patients.length} patients
      </div>
    </div>
  );
}
