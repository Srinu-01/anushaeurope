import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Inquiry, getInquiry, updateInquiry } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Mail, Phone } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const InquiryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadInquiry = async () => {
      if (!id) return;
      
      try {
        const data = await getInquiry(id);
        setInquiry(data);
        setStatus(data.status);
        setNotes(data.notes || '');
      } catch (error) {
        console.error('Failed to load inquiry:', error);
        toast({
          title: 'Error',
          description: 'Failed to load inquiry details',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadInquiry();
  }, [id, toast]);

  const handleSave = async () => {
    if (!id) return;
    
    try {
      setSaving(true);
      await updateInquiry(id, { 
        status: status as 'new' | 'in-progress' | 'completed',
        notes 
      });
      
      toast({
        title: 'Success',
        description: 'Inquiry updated successfully',
      });
      
      // Update local state
      if (inquiry) {
        setInquiry({
          ...inquiry,
          status: status as 'new' | 'in-progress' | 'completed',
          notes
        });
      }
    } catch (error) {
      console.error('Failed to update inquiry:', error);
      toast({
        title: 'Error',
        description: 'Failed to update inquiry',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin text-anusha-red" />
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">Inquiry not found</h3>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate('/admin')}
        >
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8">
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => navigate('/admin')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Inquiries
      </Button>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{inquiry.name}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <Mail className="h-4 w-4 mr-1" /> {inquiry.email} 
                <span className="mx-2">•</span>
                <Phone className="h-4 w-4 mr-1" /> {inquiry.phone}
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                Submitted on {formatDate(inquiry.timestamp)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Course: <span className="font-medium text-gray-700">{inquiry.course}</span>
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Message</h3>
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="whitespace-pre-wrap">{inquiry.message}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
              <Textarea
                placeholder="Add notes about this inquiry..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleSave} 
            disabled={saving}
            className="bg-anusha-red hover:bg-red-700"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InquiryDetail;
