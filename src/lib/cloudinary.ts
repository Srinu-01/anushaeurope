import axios from 'axios';

// Cloudinary configuration
const CLOUD_NAME = 'dmunsmu40';
// The issue is with this preset - it needs to be configured for unsigned uploads
const UPLOAD_PRESET = 'AnushaEuropeGallery'; // Changed to lowercase and simplified naming

export interface CloudinaryUploadResponse {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  created_at: string;
  bytes: number;
  resource_type: string;
  error?: {
    message: string;
  }; 
}

export interface UploadProgressEvent {
  loaded: number;
  total: number;
}

/**
 * Uploads an image to Cloudinary
 * 
 * @param file The image file to upload
 * @param onProgress Optional progress callback
 * @returns Promise with upload response
 */
export async function uploadImage(
  file: File, 
  onProgress?: (progress: number) => void
): Promise<CloudinaryUploadResponse> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    // Add timestamp to prevent caching issues
    formData.append('timestamp', String(Math.round(new Date().getTime() / 1000)));
    
    const response = await axios.post<CloudinaryUploadResponse>(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(progress);
          }
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    if (axios.isAxiosError(error) && error.response?.data?.error) {
      throw new Error(error.response.data.error.message);
    }
    throw new Error('Failed to upload image');
  }
}

/**
 * Optimizes a Cloudinary URL with transformation parameters
 * 
 * @param url The original Cloudinary URL
 * @param options Transformation options
 * @returns Optimized URL
 */
export function optimizeImageUrl(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    crop?: 'fill' | 'scale' | 'fit';
  } = {}
): string {
  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }
  
  // Default options
  const {
    width = 800,
    height,
    quality = 80,
    format = 'auto',
    crop = 'fill'
  } = options;
  
  // Find where the upload part of URL begins
  const uploadIndex = url.indexOf('/upload/');
  
  if (uploadIndex === -1) return url;
  
  const baseUrl = url.substring(0, uploadIndex + 8); // +8 to include '/upload/'
  const imagePath = url.substring(uploadIndex + 8);
  
  // Construct transformation string
  let transformation = `c_${crop},q_${quality},f_${format}`;
  if (width) transformation += `,w_${width}`;
  if (height) transformation += `,h_${height}`;
  
  return `${baseUrl}${transformation}/${imagePath}`;
}

/**
 * Deletes an image from Cloudinary
 * This should be implemented on the server side with proper authentication
 * This function is just a placeholder to show how it would work
 */
export async function deleteImage(publicId: string): Promise<boolean> {
  // Note: In a real implementation, this would call a secure server endpoint
  // that handles the deletion with proper Cloudinary API credentials
  console.warn('Image deletion should be handled on a secure server');
  
  try {
    // Placeholder - in reality, this would make a secure server call
    // await axios.post('/api/cloudinary/delete', { publicId });
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image');
  }
}

