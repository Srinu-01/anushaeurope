import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { GalleryImage, getGalleryImages, getGallerySettings } from '@/lib/api';
import { optimizeImageUrl } from '@/lib/cloudinary';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { useToast } from '@/components/ui/use-toast';

interface GalleryLightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const GalleryLightbox = ({ 
  images, 
  currentIndex, 
  onClose, 
  onPrevious, 
  onNext 
}: GalleryLightboxProps) => {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrevious();
      if (e.key === 'ArrowRight') onNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Disable body scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrevious, onNext]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative z-10 max-w-6xl w-full max-h-screen p-4">
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white"
          onClick={onPrevious}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white"
          onClick={onNext}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
        
        <button
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        
        <img
          src={optimizeImageUrl(currentImage.imageUrl, { width: 1200, quality: 90 })}
          alt={currentImage.title || ''}
          className="max-w-full max-h-[85vh] mx-auto object-contain"
        />
        
        {(currentImage.title || currentImage.description) && (
          <div className="absolute bottom-4 left-4 right-4 bg-black/60 text-white p-4 rounded-lg backdrop-blur-sm">
            {currentImage.title && (
              <h3 className="text-lg font-medium">{currentImage.title}</h3>
            )}
            {currentImage.description && (
              <p className="text-sm mt-1 text-gray-200">{currentImage.description}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const GalleryGrid = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<{
    itemsPerPage: number;
    displayStyle: 'grid' | 'masonry';
    enabled: boolean;
  }>({
    itemsPerPage: 12,
    displayStyle: 'grid',
    enabled: true
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Get gallery settings
        const gallerySettings = await getGallerySettings();
        setSettings(gallerySettings);
        
        // If gallery is disabled, don't load images
        if (!gallerySettings.enabled) {
          setIsLoading(false);
          return;
        }
        
        // Get gallery images (only visible ones)
        const galleryImages = await getGalleryImages(true);
        setImages(galleryImages);
      } catch (error) {
        console.error("Failed to load gallery:", error);
        toast({
          variant: "destructive",
          title: "Error loading gallery",
          description: "Failed to load gallery images. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [toast]);

  // If gallery is disabled, show nothing
  if (!settings.enabled && !isLoading) {
    return null;
  }

  // Calculate pagination
  const totalPages = Math.ceil(images.length / settings.itemsPerPage);
  const startIndex = (currentPage - 1) * settings.itemsPerPage;
  const endIndex = Math.min(startIndex + settings.itemsPerPage, images.length);
  const currentImages = images.slice(startIndex, endIndex);

  // Lightbox navigation
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-anusha-red" />
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-medium text-gray-500">No images in gallery</h3>
      </div>
    );
  }

  return (
    <>
      <div className={`${settings.displayStyle === 'grid' ? 'grid' : 'columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4'} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`}>
        {currentImages.map((image, index) => (
          <div 
            key={image.id}
            className={`${settings.displayStyle === 'masonry' ? 'mb-4 break-inside-avoid' : ''} cursor-pointer overflow-hidden rounded-lg shadow-sm border border-gray-100 transition-transform hover:shadow-md hover:-translate-y-1 duration-300`}
            onClick={() => openLightbox(startIndex + index)}
          >
            <div className="relative">
              <img
                src={optimizeImageUrl(image.imageUrl, { width: 400, height: 300 })}
                alt={image.title || 'Gallery image'}
                className={`w-full h-auto object-cover ${settings.displayStyle === 'grid' ? 'aspect-[4/3]' : ''}`}
                loading="lazy"
              />
              {image.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white opacity-0 hover:opacity-100 transition-opacity">
                  <h3 className="text-sm md:text-base font-medium">{image.title}</h3>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <GalleryLightbox
          images={images}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      )}
    </>
  );
};

export default GalleryGrid;
