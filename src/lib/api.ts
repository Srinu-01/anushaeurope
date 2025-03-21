import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

interface InquiryData {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

export async function submitInquiry(formData: InquiryData) {
  try {
    // Clean the data
    const cleanData = {
      name: formData.name?.trim(),
      email: formData.email?.toLowerCase().trim(),
      phone: formData.phone?.trim(),
      course: formData.course?.trim(),
      message: formData.message?.trim(),
      timestamp: new Date(),
      status: 'new',
      source: 'website'
    };

    // Add to Firestore
    const docRef = await addDoc(collection(db, 'inquiries'), cleanData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    throw error;
  }
}
