import { collection, addDoc, getDocs, getDoc, doc, updateDoc, query, orderBy, where, serverTimestamp, deleteDoc, Timestamp, writeBatch, setDoc } from 'firebase/firestore';
import { db } from './firebase';

interface InquiryData {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

export interface Inquiry extends InquiryData {
  id: string;
  timestamp: Date;
  status: 'new' | 'in-progress' | 'completed';
  source: string;
  notes?: string;
}

export async function submitInquiry(formData: InquiryData) {
  // Maximum number of retries for network errors
  const MAX_RETRIES = 3;
  let retryCount = 0;
  
  async function trySubmit() {
    try {
      // Clean the data
      const cleanData = {
        name: formData.name?.trim() || '',
        email: formData.email?.toLowerCase().trim() || '',
        phone: formData.phone?.trim() || '',
        course: formData.course?.trim() || '',
        message: formData.message?.trim() || '',
        timestamp: serverTimestamp(), // Use server timestamp for better consistency
        status: 'new',
        source: 'website'
      };

      console.log('Submitting inquiry with data:', cleanData);

      // Add to Firestore
      const docRef = await addDoc(collection(db, 'inquiries'), cleanData);
      console.log('Document written with ID:', docRef.id);
      return { success: true, id: docRef.id };
    } catch (error: any) {
      console.error(`Error submitting inquiry (attempt ${retryCount + 1}):`, error);
      
      // Network error conditions that might be worth retrying
      const isNetworkError = error.code === 'unavailable' || 
                            error.code === 'resource-exhausted' ||
                            error.message?.includes('network');
      
      if (isNetworkError && retryCount < MAX_RETRIES) {
        retryCount++;
        // Exponential backoff: wait longer with each retry
        const backoffTime = Math.pow(2, retryCount) * 1000;
        console.log(`Retrying in ${backoffTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, backoffTime));
        return trySubmit(); // Retry the submission
      }
      
      // Return detailed error information
      return { 
        success: false, 
        error: error.message || 'Unknown error occurred',
        code: error.code || 'unknown'
      };
    }
  }
  
  return trySubmit();
}

export async function getInquiries() {
  try {
    const inquiriesQuery = query(
      collection(db, 'inquiries'), 
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(inquiriesQuery);
    const inquiries: Inquiry[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      inquiries.push({
        id: doc.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        course: data.course,
        message: data.message,
        timestamp: data.timestamp.toDate(),
        status: data.status,
        source: data.source,
        notes: data.notes
      });
    });
    
    return inquiries;
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    throw error;
  }
}

export async function getInquiry(id: string) {
  try {
    const docRef = doc(db, 'inquiries', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        course: data.course,
        message: data.message,
        timestamp: data.timestamp.toDate(),
        status: data.status,
        source: data.source,
        notes: data.notes
      } as Inquiry;
    } else {
      throw new Error('Inquiry not found');
    }
  } catch (error) {
    console.error('Error fetching inquiry:', error);
    throw error;
  }
}

export async function updateInquiry(id: string, data: Partial<Inquiry>) {
  try {
    const docRef = doc(db, 'inquiries', id);
    await updateDoc(docRef, data);
    return { success: true };
  } catch (error) {
    console.error('Error updating inquiry:', error);
    throw error;
  }
}

// Gallery interfaces
export interface GalleryImage {
  id?: string;
  imageId: string;    // Cloudinary public ID
  imageUrl: string;   // Cloudinary URL
  title?: string;     // Optional title
  description?: string; // Optional description
  order: number;      // For custom ordering
  uploadedAt: Date;   // Timestamp
  visible?: boolean;  // Visibility toggle
}

/**
 * Adds a new image to the gallery
 */
export async function addGalleryImage(imageData: Omit<GalleryImage, 'id' | 'uploadedAt'>): Promise<string> {
  try {
    const galleryRef = collection(db, "gallery");
    const docRef = await addDoc(galleryRef, {
      ...imageData,
      uploadedAt: serverTimestamp(),
      visible: true
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding gallery image:", error);
    throw error;
  }
}

/**
 * Gets all gallery images, sorted by order
 */
export async function getGalleryImages(onlyVisible = true): Promise<GalleryImage[]> {
  try {
    let queryRef;
    if (onlyVisible) {
      queryRef = query(
        collection(db, "gallery"), 
        where("visible", "==", true),
        orderBy("order", "asc")
      );
    } else {
      queryRef = query(collection(db, "gallery"), orderBy("order", "asc"));
    }
    
    const querySnapshot = await getDocs(queryRef);
    const images: GalleryImage[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      images.push({
        id: doc.id,
        imageId: data.imageId as string,
        imageUrl: data.imageUrl as string,
        title: (data.title as string) || '',
        description: (data.description as string) || '',
        order: data.order as number,
        uploadedAt: data.uploadedAt ? (data.uploadedAt as Timestamp).toDate() : new Date(),
        visible: data.visible !== undefined ? data.visible as boolean : true
      });
    });
    
    return images;
  } catch (error) {
    console.error("Error getting gallery images:", error);
    throw error;
  }
}

/**
 * Updates a gallery image
 */
export async function updateGalleryImage(id: string, updateData: Partial<GalleryImage>): Promise<void> {
  try {
    const imageRef = doc(db, "gallery", id);
    
    // Prepare the data for update, removing fields that shouldn't be updated
    const dataToUpdate = { ...updateData };
    delete dataToUpdate.id;
    delete dataToUpdate.uploadedAt;
    
    await updateDoc(imageRef, dataToUpdate);
  } catch (error) {
    console.error("Error updating gallery image:", error);
    throw error;
  }
}

/**
 * Deletes a gallery image
 */
export async function deleteGalleryImage(id: string): Promise<void> {
  try {
    const imageRef = doc(db, "gallery", id);
    await deleteDoc(imageRef);
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    throw error;
  }
}

/**
 * Updates the order of multiple gallery images
 */
export async function updateGalleryOrder(imageOrders: {id: string, order: number}[]): Promise<void> {
  try {
    const batch = writeBatch(db);
    
    imageOrders.forEach((item) => {
      const imageRef = doc(db, "gallery", item.id);
      batch.update(imageRef, { order: item.order });
    });
    
    await batch.commit();
  } catch (error) {
    console.error("Error updating gallery order:", error);
    throw error;
  }
}

/**
 * Gets gallery settings
 */
export async function getGallerySettings(): Promise<{
  itemsPerPage: number;
  displayStyle: 'grid' | 'masonry';
  enabled: boolean;
}> {
  try {
    const settingsRef = doc(db, "settings", "gallery");
    const settingsDoc = await getDoc(settingsRef);
    
    if (settingsDoc.exists()) {
      return settingsDoc.data() as {
        itemsPerPage: number;
        displayStyle: 'grid' | 'masonry';
        enabled: boolean;
      };
    }
    
    // Return defaults if settings don't exist
    return {
      itemsPerPage: 12,
      displayStyle: 'grid',
      enabled: true
    };
  } catch (error) {
    console.error("Error getting gallery settings:", error);
    // Return defaults on error
    return {
      itemsPerPage: 12,
      displayStyle: 'grid',
      enabled: true
    };
  }
}

/**
 * Updates gallery settings
 */
export async function updateGallerySettings(settings: {
  itemsPerPage?: number;
  displayStyle?: 'grid' | 'masonry';
  enabled?: boolean;
}): Promise<void> {
  try {
    const settingsRef = doc(db, "settings", "gallery");
    const settingsDoc = await getDoc(settingsRef);
    
    if (settingsDoc.exists()) {
      await updateDoc(settingsRef, settings);
    } else {
      // If settings document doesn't exist, create it with defaults
      await setDoc(settingsRef, {
        itemsPerPage: settings.itemsPerPage || 12,
        displayStyle: settings.displayStyle || 'grid',
        enabled: settings.enabled !== undefined ? settings.enabled : true
      });
    }
  } catch (error) {
    console.error("Error updating gallery settings:", error);
    throw error;
  }
}
