// src/services/firebaseService.js
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase/firebaseinit';
import { compressImageOnServer } from '../services/enhancementService';

// Compress and resize image to fit size limits
export const compressImage = (blob, maxSizeKB = 800, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions (max 1200px width/height)
      const maxDimension = 1200;
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxDimension) {
          height = (height * maxDimension) / width;
          width = maxDimension;
        }
      } else {
        if (height > maxDimension) {
          width = (width * maxDimension) / height;
          height = maxDimension;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      // Try different quality levels until we get under the size limit
      const tryCompress = (currentQuality) => {
        canvas.toBlob((compressedBlob) => {
          const compressedSizeKB = compressedBlob.size / 1024;
          console.log(`🔧 Compressed to ${compressedSizeKB.toFixed(1)}KB at ${(currentQuality * 100).toFixed(0)}% quality`);
          
          if (compressedSizeKB <= maxSizeKB || currentQuality <= 0.1) {
            resolve(compressedBlob);
          } else {
            // Try with lower quality
            tryCompress(currentQuality - 0.1);
          }
        }, 'image/jpeg', currentQuality);
      };
      
      tryCompress(quality);
    };
    
    img.src = URL.createObjectURL(blob);
  });
};

// Convert blob URL to base64 string
export const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Save a new document with server-side image compression
export const saveDocument = async (userId, documentData) => {
  try {
    let finalDocumentData = { ...documentData };
    
    // If there's an originalImageSrc that's a blob URL, convert and compress on server
    if (documentData.originalImageSrc && documentData.originalImageSrc.startsWith('blob:')) {
      console.log('🔄 Processing image with server-side compression...');
      
      try {
        // Convert blob URL back to file
        const response = await fetch(documentData.originalImageSrc);
        const blob = await response.blob();
        
        // Convert to base64
        const base64String = await blobToBase64(blob);
        
        console.log(`📊 Original image size: ${(blob.size / 1024).toFixed(1)}KB`);
        
        // Use server-side compression
        const compressedImage = await compressImageOnServer(base64String, 800, 1200);
        
        finalDocumentData.originalImageSrc = compressedImage;
        console.log('✅ Image processed with server-side compression');
        
      } catch (imageError) {
        console.warn('⚠️ Server-side image processing failed, trying client-side fallback:', imageError);
        
        try {
          // Fallback to client-side compression
          const response = await fetch(documentData.originalImageSrc);
          const blob = await response.blob();
          
          const originalSizeKB = blob.size / 1024;
          console.log(`📊 Original image size: ${originalSizeKB.toFixed(1)}KB`);
          
          const maxSize = 800; // KB
          let finalBlob = blob;
          
          if (originalSizeKB > maxSize) {
            console.log('🗜️ Image too large, using client-side compression...');
            finalBlob = await compressImage(blob, maxSize);
            const compressedSizeKB = finalBlob.size / 1024;
            console.log(`✅ Compressed from ${originalSizeKB.toFixed(1)}KB to ${compressedSizeKB.toFixed(1)}KB`);
          }
          
          const base64String = await blobToBase64(finalBlob);
          finalDocumentData.originalImageSrc = base64String;
          console.log('✅ Image processed with client-side fallback');
          
        } catch (fallbackError) {
          console.warn('⚠️ Both server and client image processing failed:', fallbackError);
          finalDocumentData.originalImageSrc = null;
          finalDocumentData.imageNote = "Failed to process image";
        }
      }
    }
    
    const docRef = await addDoc(collection(db, 'documents'), {
      ...finalDocumentData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    console.log('📄 Document saved with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error saving document: ', error);
    throw error;
  }
};

// Upload image blob to Firebase Storage (simplified for testing)
export const uploadImageBlob = async (userId, blob, documentId) => {
  try {
    console.log('🔧 Starting image upload...');
    console.log('📊 Blob size:', blob.size, 'bytes');
    console.log('📊 Blob type:', blob.type);
    
    const timestamp = Date.now();
    const fileName = `original_${timestamp}.jpg`;
    const path = `documents/${userId}/${documentId}/${fileName}`;
    
    console.log('📂 Upload path:', path);
    
    const storageRef = ref(storage, path);
    console.log('📦 Storage ref created');
    
    // Try uploading
    console.log('⬆️ Starting upload...');
    const snapshot = await uploadBytes(storageRef, blob, {
      contentType: blob.type || 'image/jpeg'
    });
    
    console.log('✅ Upload complete, getting URL...');
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('🎉 Download URL obtained:', downloadURL);
    
    return downloadURL;
  } catch (error) {
    console.error('❌ Upload error details:', error);
    console.error('❌ Error code:', error.code);
    console.error('❌ Error message:', error.message);
    throw error;
  }
};

// Get all documents for a user
export const getUserDocuments = async (userId) => {
  try {
    const q = query(
      collection(db, 'documents'),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    const documents = [];
    
    querySnapshot.forEach((doc) => {
      documents.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Sort by createdAt in JavaScript instead of Firestore
    documents.sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
      return dateB - dateA; // Descending order (newest first)
    });
    
    return documents;
  } catch (error) {
    console.error('Error fetching documents: ', error);
    throw error;
  }
};

// Update a document
export const updateDocument = async (documentId, updates) => {
  try {
    const docRef = doc(db, 'documents', documentId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    
    console.log('Document updated successfully');
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
};

// Delete a document
export const deleteDocument = async (documentId) => {
  try {
    await deleteDoc(doc(db, 'documents', documentId));
    console.log('Document deleted successfully');
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw error;
  }
};

// Upload image to Firebase Storage
export const uploadImage = async (userId, file, documentId) => {
  try {
    const storageRef = ref(storage, `documents/${userId}/${documentId}/original.jpg`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image: ', error);
    throw error;
  }
};