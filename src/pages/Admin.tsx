import { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Users, Image, Home, Mail } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import InquiryTable from '@/components/InquiryTable';
import InquiryDetail from '@/components/InquiryDetail';
import GalleryManager from '@/components/admin/GalleryManager';

const AdminLayout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = auth.currentUser;

  // Handle logout
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      setIsLoggingOut(false);
    }
  };

  // Check if a nav item is active
  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') {
      return true;
    }
    return path !== '/admin' && location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 hidden md:block">
        <div className="flex items-center justify-center mb-8">
          <span className="text-xl font-display font-bold text-anusha-red">Anusha</span>
          <span className="text-xl font-display font-bold ml-1">Admin</span>
        </div>
        
        <nav className="space-y-1">
          <Link
            to="/admin"
            className={`flex items-center px-4 py-2 rounded-md ${
              isActive('/admin') && !isActive('/admin/gallery') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Mail className="h-5 w-5 mr-3" />
            Inquiries
          </Link>
          <Link
            to="/admin/gallery"
            className={`flex items-center px-4 py-2 rounded-md ${
              isActive('/admin/gallery') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Image className="h-5 w-5 mr-3" />
            Gallery
          </Link>
          <Link
            to="/"
            target="_blank"
            className="flex items-center px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800"
          >
            <Home className="h-5 w-5 mr-3" />
            View Website
          </Link>
        </nav>
        
        <div className="absolute bottom-6 left-6 right-6">
          <div className="border-t border-gray-700 pt-4">
            <div className="flex items-center px-4 py-2">
              <Users className="h-5 w-5 mr-3 text-gray-400" />
              <span className="text-sm text-gray-400">{currentUser?.email}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full mt-2"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-sm w-full fixed top-0 left-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <span className="text-xl font-display font-bold text-anusha-red">Anusha</span>
            <span className="text-xl font-display font-bold ml-1">Admin</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </Button>
        </div>
        
        <div className="flex border-t">
          <Link
            to="/admin"
            className={`flex-1 py-3 flex flex-col items-center justify-center text-xs ${
              isActive('/admin') && !isActive('/admin/gallery') ? 'text-anusha-red border-b-2 border-anusha-red' : 'text-gray-500'
            }`}
          >
            <Mail className="h-5 w-5 mb-1" />
            Inquiries
          </Link>
          <Link
            to="/admin/gallery"
            className={`flex-1 py-3 flex flex-col items-center justify-center text-xs ${
              isActive('/admin/gallery') ? 'text-anusha-red border-b-2 border-anusha-red' : 'text-gray-500'
            }`}
          >
            <Image className="h-5 w-5 mb-1" />
            Gallery
          </Link>
          <Link
            to="/"
            target="_blank"
            className="flex-1 py-3 flex flex-col items-center justify-center text-xs text-gray-500"
          >
            <Home className="h-5 w-5 mb-1" />
            Website
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-1 md:pt-0 pt-24">
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<InquiryTable />} />
            <Route path="/inquiry/:id" element={<InquiryDetail />} />
            <Route path="/gallery" element={<GalleryManager />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const Admin = () => {
  return <AdminLayout />;
};

export default Admin;
