import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Department } from '../../types';
import { projectId } from '../../utils/supabase/info';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { toast } from 'sonner@2.0.3';
import { Plus, Search } from 'lucide-react';

export function DepartmentsManagement() {
  const { accessToken } = useAuth();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-471cd30a/departments`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setDepartments(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
      toast.error('Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  const filteredDepartments = departments.filter((dept) =>
    `${dept.name} ${dept.description}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button onClick={() => toast.info('Add department functionality coming soon')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Department
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading departments...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDepartments.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-gray-500">
              No departments found
            </div>
          ) : (
            filteredDepartments.map((dept) => (
              <Card key={dept.id}>
                <CardHeader>
                  <CardTitle>{dept.name}</CardTitle>
                  <CardDescription>{dept.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {dept.services && dept.services.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-2">Services:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {dept.services.slice(0, 3).map((service, idx) => (
                          <li key={idx}>• {service}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
