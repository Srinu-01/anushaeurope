import { collection, addDoc, getDocs, getDoc, doc, updateDoc, query, orderBy, where, serverTimestamp } from 'firebase/firestore';
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
