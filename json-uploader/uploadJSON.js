const { initializeApp } = require('firebase/app');
const { getFirestore, setDoc, doc } = require('firebase/firestore');
const { getAuth, signInAnonymously } = require('firebase/auth');
const fs = require('fs').promises;

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDidzCeeIdtGbzfAlQnXQrtfsmONlimwQI",
  authDomain: "sacco-11de8.firebaseapp.com",
  projectId: "sacco-11de8",
  storageBucket: "sacco-11de8.appspot.com",
  messagingSenderId: "903948547717",
  appId: "1:903948547717:web:81653306f78294dedddbec",
  measurementId: "G-56DW0EBMHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function uploadData(collectionName, documentName, jsonData) {
  try {
    const sanitizedData = JSON.parse(JSON.stringify(jsonData));
    console.log(`Attempting to upload document ${documentName} to ${collectionName}`);
    console.log('Data:', JSON.stringify(sanitizedData, null, 2));
    await setDoc(doc(db, collectionName, documentName), sanitizedData);
    console.log(`Document ${documentName} successfully added to ${collectionName}`);
  } catch (error) {
    console.error(`Error adding document ${documentName}:`, error);
    console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
  }
}

async function uploadJSONFiles(jsonDirectory, collectionName) {
  try {
    console.log(`Reading directory: ${jsonDirectory}`);
    const files = await fs.readdir(jsonDirectory);
    console.log(`Found ${files.length} files`);
    
    for (const file of files) {
      const filePath = `${jsonDirectory}/${file}`;
      try {
        console.log(`Reading file: ${filePath}`);
        const data = await fs.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(data);
        console.log(`Successfully parsed ${file}:`, JSON.stringify(jsonData, null, 2));
        
        const documentName = file.split('.').slice(0, -1).join('.');
        await uploadData(collectionName, documentName, jsonData);
        
        // Try uploading a simple object
        console.log('Attempting to upload a simple test object');
        await uploadData('test', 'simple', { test: 'data' });
      } catch (err) {
        console.error(`Error processing file ${file}:`, err.message);
        console.error('Error details:', JSON.stringify(err, Object.getOwnPropertyNames(err)));
      }
    }
  } catch (err) {
    console.error("Unable to scan directory:", err);
    console.error('Error details:', JSON.stringify(err, Object.getOwnPropertyNames(err)));
  }
}

const jsonDirectory = './jsonFiles';
const collectionName = 'users';

console.log('Starting JSON upload process');
signInAnonymously(auth)
  .then(() => {
    console.log('Authenticated anonymously');
    return uploadJSONFiles(jsonDirectory, collectionName);
  })
  .then(() => console.log('Upload process completed'))
  .catch(err => console.error('Unhandled error in upload process:', err));