import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Inquiry, getInquiries } from '@/lib/api';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

const statusColors = {
  'new': 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  'completed': 'bg-green-100 text-green-800'
};

const InquiryTable = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const loadInquiries = async () => {
      try {
        const data = await getInquiries();
        setInquiries(data);
      } catch (error) {
        console.error('Failed to load inquiries:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInquiries();
  }, []);

  const filteredInquiries = filter === 'all' 
    ? inquiries 
    : inquiries.filter(inquiry => inquiry.status === filter);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Inquiries</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === 'all' ? 'bg-gray-200' : 'bg-gray-100'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('new')}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === 'new' ? 'bg-blue-200' : 'bg-blue-100'
            }`}
          >
            New
          </button>
          <button 
            onClick={() => setFilter('in-progress')}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === 'in-progress' ? 'bg-yellow-200' : 'bg-yellow-100'
            }`}
          >
            In Progress
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === 'completed' ? 'bg-green-200' : 'bg-green-100'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-anusha-red" />
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                    No inquiries found
                  </TableCell>
                </TableRow>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <TableRow 
                    key={inquiry.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => navigate(`/admin/inquiry/${inquiry.id}`)}
                  >
                    <TableCell>{formatDate(inquiry.timestamp)}</TableCell>
                    <TableCell className="font-medium">{inquiry.name}</TableCell>
                    <TableCell>{inquiry.email}</TableCell>
                    <TableCell>{inquiry.course}</TableCell>
                    <TableCell>
                      <Badge 
                        className={statusColors[inquiry.status] || ''}
                        variant="outline"
                      >
                        {inquiry.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default InquiryTable;
