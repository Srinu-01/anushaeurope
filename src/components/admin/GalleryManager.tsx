import { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useDropzone } from 'react-dropzone';
import { 
  Trash2, 
  Edit, 
  X, 
  Upload, 
  Plus,
  Loader2,
  Eye,
  EyeOff,
  Settings,
  MoveVertical,
} from 'lucide-react';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  GalleryImage, 
  addGalleryImage, 
  getGalleryImages, 
  updateGalleryImage, 
  deleteGalleryImage, 
  updateGalleryOrder,
  getGallerySettings,
  updateGallerySettings
} from '@/lib/api';
import { uploadImage, optimizeImageUrl } from '@/lib/cloudinary';
import { useToast } from '@/components/ui/use-toast';

interface UploadItem {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

interface EditDialogProps {
  image: GalleryImage | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedImage: Partial<GalleryImage>) => Promise<void>;
  isLoading: boolean;
}

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isLoading: boolean;
  title: string;
  message: string;
}

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    itemsPerPage: number;
    displayStyle: 'grid' | 'masonry';
    enabled: boolean;
  };
  onSave: (settings: {
    itemsPerPage: number;
    displayStyle: 'grid' | 'masonry';
    enabled: boolean;
  }) => Promise<void>;
  isLoading: boolean;
}

// Edit Dialog Component
const EditDialog = ({ image, isOpen, onClose, onSave, isLoading }: EditDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (image) {
      setTitle(image.title || '');
      setDescription(image.description || '');
      setVisible(image.visible !== false);
    }
  }, [image]);

  const handleSave = async () => {
    if (!image) return;
    await onSave({
      title,
      description,
      visible
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter image title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter image description"
              rows={3}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="visible" 
              checked={visible} 
              onCheckedChange={(checked) => setVisible(!!checked)} 
            />
            <Label htmlFor="visible">Visible in gallery</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className="bg-anusha-red hover:bg-red-700">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Confirm Dialog Component
const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isLoading, 
  title, 
  message 
}: ConfirmDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className="py-4">{message}</p>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={onConfirm} 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Confirm'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Settings Dialog Component
const SettingsDialog = ({ 
  isOpen, 
  onClose, 
  settings, 
  onSave, 
  isLoading 
}: SettingsDialogProps) => {
  const [itemsPerPage, setItemsPerPage] = useState(settings.itemsPerPage);
  const [displayStyle, setDisplayStyle] = useState(settings.displayStyle);
  const [enabled, setEnabled] = useState(settings.enabled);

  useEffect(() => {
    setItemsPerPage(settings.itemsPerPage);
    setDisplayStyle(settings.displayStyle);
    setEnabled(settings.enabled);
  }, [settings]);

  const handleSave = async () => {
    await onSave({
      itemsPerPage,
      displayStyle,
      enabled
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Gallery Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="enabled" 
              checked={enabled} 
              onCheckedChange={(checked) => setEnabled(!!checked)} 
            />
            <Label htmlFor="enabled">Enable gallery in public view</Label>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="itemsPerPage">Items per page</Label>
            <Input
              id="itemsPerPage"
              type="number"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
              min={4}
              max={50}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="displayStyle">Display Style</Label>
            <Select
              value={displayStyle}
              onValueChange={(value) => setDisplayStyle(value as 'grid' | 'masonry')}
            >
              <SelectTrigger id="displayStyle">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="masonry">Masonry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className="bg-anusha-red hover:bg-red-700">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Settings'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Main Gallery Manager Component
const GalleryManager = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('gallery');
  const [editImage, setEditImage] = useState<GalleryImage | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteImageId, setDeleteImageId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<{
    itemsPerPage: number;
    displayStyle: 'grid' | 'masonry';
    enabled: boolean;
  }>({
    itemsPerPage: 12,
    displayStyle: 'grid',
    enabled: true
  });
  
  const { toast } = useToast();

  const loadGalleryImages = useCallback(async () => {
    try {
      setIsLoading(true);
      const images = await getGalleryImages(false); // Include hidden images for admin
      setImages(images);
    } catch (error) {
      console.error("Failed to load gallery images:", error);
      toast({
        variant: "destructive",
        title: "Failed to load gallery",
        description: "Could not load gallery images. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const loadSettings = useCallback(async () => {
    try {
      const gallerySettings = await getGallerySettings();
      setSettings(gallerySettings);
    } catch (error) {
      console.error("Failed to load gallery settings:", error);
    }
  }, []);

  useEffect(() => {
    loadGalleryImages();
    loadSettings();
  }, [loadGalleryImages, loadSettings]);

  // Dropzone configuration
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newUploads = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substring(2, 11),
      file,
      progress: 0,
      status: 'pending' as const
    }));
    
    setUploads(prev => [...prev, ...newUploads]);
    // Switch to uploads tab
    setActiveTab('uploads');
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp']
    },
    multiple: true
  });

  // Upload handler
  const handleUpload = useCallback(async (item: UploadItem) => {
    try {
      // Update status to uploading
      setUploads(prev => prev.map(upload => 
        upload.id === item.id ? { ...upload, status: 'uploading' } : upload
      ));

      // Upload to Cloudinary
      const result = await uploadImage(item.file, (progress) => {
        setUploads(prev => prev.map(upload => 
          upload.id === item.id ? { ...upload, progress } : upload
        ));
      });

      // Add to gallery
      const order = images.length > 0 
        ? Math.max(...images.map(img => img.order)) + 1 
        : 0;

      await addGalleryImage({
        imageId: result.public_id,
        imageUrl: result.secure_url,
        order
      });

      // Update status to success
      setUploads(prev => prev.map(upload => 
        upload.id === item.id ? { ...upload, status: 'success' } : upload
      ));

      // Refresh gallery
      await loadGalleryImages();

    } catch (error) {
      console.error(`Failed to upload ${item.file.name}:`, error);
      
      // Update status to error with message
      setUploads(prev => prev.map(upload => 
        upload.id === item.id ? { 
          ...upload, 
          status: 'error',
          error: error instanceof Error ? error.message : 'Upload failed'
        } : upload
      ));

      toast({
        variant: "destructive",
        title: "Upload failed",
        description: `Failed to upload ${item.file.name}.`,
      });
    }
  }, [images, loadGalleryImages, toast]);

  // Retry upload
  const handleRetry = useCallback((item: UploadItem) => {
    setUploads(prev => prev.map(upload => 
      upload.id === item.id ? { ...upload, status: 'pending', progress: 0, error: undefined } : upload
    ));
    
    // Retry the upload
    const updatedItem = {
      ...item,
      status: 'pending' as const,
      progress: 0,
      error: undefined
    };
    handleUpload(updatedItem);
  }, [handleUpload]);

  // Remove upload from list
  const handleRemoveUpload = useCallback((id: string) => {
    setUploads(prev => prev.filter(upload => upload.id !== id));
  }, []);

  // Upload all pending files
  const handleUploadAll = useCallback(() => {
    const pendingUploads = uploads.filter(upload => upload.status === 'pending');
    pendingUploads.forEach(item => handleUpload(item));
  }, [uploads, handleUpload]);

  // Edit image
  const handleEditImage = useCallback((image: GalleryImage) => {
    setEditImage(image);
    setIsEditing(true);
  }, []);

  // Save edited image
  const handleSaveEdit = useCallback(async (updateData: Partial<GalleryImage>) => {
    if (!editImage?.id) return;
    
    try {
      setIsSaving(true);
      await updateGalleryImage(editImage.id, updateData);
      
      // Update local state
      setImages(prev => prev.map(img => 
        img.id === editImage.id ? { ...img, ...updateData } : img
      ));
      
      toast({
        title: "Image updated",
        description: "The image details have been updated successfully.",
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update image:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Failed to update the image. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  }, [editImage, toast]);

  // Toggle visibility
  const handleToggleVisibility = useCallback(async (image: GalleryImage) => {
    if (!image.id) return;
    
    try {
      const newVisible = !image.visible;
      await updateGalleryImage(image.id, { visible: newVisible });
      
      // Update local state
      setImages(prev => prev.map(img => 
        img.id === image.id ? { ...img, visible: newVisible } : img
      ));
      
      toast({
        title: newVisible ? "Image visible" : "Image hidden",
        description: `The image is now ${newVisible ? 'visible' : 'hidden'} in the gallery.`,
      });
    } catch (error) {
      console.error("Failed to update visibility:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Failed to update visibility. Please try again.",
      });
    }
  }, [toast]);

  // Delete image
  const handleDeleteClick = useCallback((id: string) => {
    setDeleteImageId(id);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteImageId) return;
    
    try {
      setIsDeleting(true);
      await deleteGalleryImage(deleteImageId);
      
      // Update local state
      setImages(prev => prev.filter(img => img.id !== deleteImageId));
      
      toast({
        title: "Image deleted",
        description: "The image has been deleted from the gallery.",
      });
    } catch (error) {
      console.error("Failed to delete image:", error);
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: "Failed to delete the image. Please try again.",
      });
    } finally {
      setIsDeleting(false);
      setDeleteImageId(null);
    }
  }, [deleteImageId, toast]);

  // Handle drag and drop reordering
  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;
    
    const reorderedItems = Array.from(images);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    
    // Update local order
    const updatedImages = reorderedItems.map((item, index) => ({
      ...item,
      order: index
    }));
    
    setImages(updatedImages);
    
    // Update in database
    const updates = updatedImages.map(img => ({
      id: img.id as string,
      order: img.order
    }));
    
    updateGalleryOrder(updates).catch(error => {
      console.error("Failed to update order:", error);
      toast({
        variant: "destructive",
        title: "Order update failed",
        description: "Failed to update image order. Please try again.",
      });
      // Reload to get correct order
      loadGalleryImages();
    });
  }, [images, loadGalleryImages, toast]);

  // Save settings
  const handleSaveSettings = useCallback(async (newSettings: {
    itemsPerPage: number;
    displayStyle: 'grid' | 'masonry';
    enabled: boolean;
  }) => {
    try {
      setIsSaving(true);
      await updateGallerySettings(newSettings);
      setSettings(newSettings);
      toast({
        title: "Settings updated",
        description: "Gallery settings have been updated successfully.",
      });
      setShowSettings(false);
    } catch (error) {
      console.error("Failed to update settings:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Failed to update gallery settings. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  }, [toast]);

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Gallery Management</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowSettings(true)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button size="sm" onClick={() => setActiveTab('uploads')} className="bg-anusha-red hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Images
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="uploads">Upload Images</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gallery" className="py-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-anusha-red" />
              </div>
            ) : images.length === 0 ? (
              <div className="text-center py-12 border rounded-lg">
                <h3 className="text-lg font-medium text-gray-500">No images in gallery</h3>
                <p className="text-gray-400 mt-2">Upload images to get started</p>
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={() => setActiveTab('uploads')}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Images
                </Button>
              </div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="gallery-images" direction="horizontal">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                    >
                      {images.map((image, index) => (
                        <Draggable 
                          key={image.id} 
                          draggableId={image.id || 'undefined'} 
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="relative group"
                            >
                              <Card className={`overflow-hidden ${!image.visible ? 'opacity-60' : ''}`}>
                                <CardContent className="p-0">
                                  <div className="relative aspect-[4/3]">
                                    <img
                                      src={optimizeImageUrl(image.imageUrl, { width: 400, height: 300 })}
                                      alt={image.title || 'Gallery image'}
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                      <div className="flex gap-2">
                                        <button
                                          className="p-2 bg-white/80 rounded-full hover:bg-white"
                                          onClick={() => handleEditImage(image)}
                                          title="Edit"
                                        >
                                          <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                          className="p-2 bg-white/80 rounded-full hover:bg-white"
                                          onClick={() => handleToggleVisibility(image)}
                                          title={image.visible ? "Hide" : "Show"}
                                        >
                                          {image.visible ? (
                                            <EyeOff className="h-4 w-4" />
                                          ) : (
                                            <Eye className="h-4 w-4" />
                                          )}
                                        </button>
                                        <button
                                          className="p-2 bg-white/80 rounded-full hover:bg-white text-red-500"
                                          onClick={() => handleDeleteClick(image.id as string)}
                                          title="Delete"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-3">
                                    <div className="flex justify-between items-center">
                                      <p className="text-sm font-medium truncate">
                                        {image.title || 'Untitled'}
                                      </p>
                                      <div 
                                        {...provided.dragHandleProps}
                                        className="cursor-grab text-gray-400 hover:text-gray-600"
                                        title="Drag to reorder"
                                      >
                                        <MoveVertical className="h-4 w-4" />
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </TabsContent>
          
          <TabsContent value="uploads" className="py-4">
            <div className="grid gap-6">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  isDragActive ? 'border-anusha-red bg-anusha-red/5' : 'border-gray-300'
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2">
                  <Upload className={`h-10 w-10 ${isDragActive ? 'text-anusha-red' : 'text-gray-400'}`} />
                  {isDragActive ? (
                    <p className="text-lg font-medium">Drop the images here...</p>
                  ) : (
                    <>
                      <p className="text-lg font-medium">Drag & drop images here</p>
                      <p className="text-sm text-gray-500">or click to select files</p>
                    </>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    Supports: JPG, PNG, WebP (Max size: 10MB per image)
                  </p>
                </div>
              </div>

              {uploads.length > 0 && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-3 flex justify-between items-center border-b">
                    <h3 className="font-medium">Uploads ({uploads.length})</h3>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        disabled={!uploads.some(u => u.status === 'pending')}
                        onClick={handleUploadAll}
                        className="bg-anusha-red hover:bg-red-700"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload All
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setUploads([])}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto">
                    <div className="divide-y">
                      {uploads.map(item => (
                        <div key={item.id} className="p-3 flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                            <img 
                              src={URL.createObjectURL(item.file)} 
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium truncate" title={item.file.name}>
                                {item.file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(item.file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            
                            <div className="flex items-center mt-1 gap-2">
                              {item.status === 'uploading' && (
                                <>
                                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div 
                                      className="bg-anusha-red h-1.5 rounded-full" 
                                      style={{ width: `${item.progress}%` }}
                                    />
                                  </div>
                                  <span className="text-xs">{item.progress}%</span>
                                </>
                              )}
                              
                              {item.status === 'success' && (
                                <span className="text-xs text-green-600">Upload complete</span>
                              )}
                              
                              {item.status === 'error' && (
                                <span className="text-xs text-red-600" title={item.error}>
                                  Failed: {item.error}
                                </span>
                              )}
                              
                              {item.status === 'pending' && (
                                <span className="text-xs text-gray-500">Ready to upload</span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex gap-1">
                            {item.status === 'pending' && (
                              <button
                                className="p-1 text-gray-500 hover:text-anusha-red"
                                onClick={() => handleUpload(item)}
                                title="Upload"
                              >
                                <Upload className="h-4 w-4" />
                              </button>
                            )}
                            
                            {item.status === 'error' && (
                              <button
                                className="p-1 text-gray-500 hover:text-anusha-red"
                                onClick={() => handleRetry(item)}
                                title="Retry"
                              >
                                <Upload className="h-4 w-4" />
                              </button>
                            )}
                            
                            <button
                              className="p-1 text-gray-500 hover:text-red-500"
                              onClick={() => handleRemoveUpload(item.id)}
                              title="Remove"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Edit Image Dialog */}
      <EditDialog 
        image={editImage}
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSaveEdit}
        isLoading={isSaving}
      />
      
      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteImageId}
        onClose={() => setDeleteImageId(null)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Image"
        message="Are you sure you want to delete this image? This action cannot be undone."
      />
      
      {/* Settings Dialog */}
      <SettingsDialog
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSave={handleSaveSettings}
        isLoading={isSaving}
      />
    </>
  );
};

export default GalleryManager;
