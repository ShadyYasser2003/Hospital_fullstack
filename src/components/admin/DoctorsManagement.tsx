import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Doctor } from '../../types';
import { projectId } from '../../utils/supabase/info';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { toast } from 'sonner@2.0.3';
import { Plus, Search } from 'lucide-react';

export function DoctorsManagement() {
  const { accessToken } = useAuth();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-471cd30a/doctors`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setDoctors(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast.error('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.name} ${doctor.specialty} ${doctor.department}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button onClick={() => toast.info('Add doctor functionality coming soon')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Doctor
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading doctors...</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Education</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDoctors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No doctors found
                  </TableCell>
                </TableRow>
              ) : (
                filteredDoctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell className="font-medium">{doctor.name}</TableCell>
                    <TableCell>{doctor.specialty}</TableCell>
                    <TableCell>{doctor.department}</TableCell>
                    <TableCell>{doctor.experience}</TableCell>
                    <TableCell>{doctor.education}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
