import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; // Import Firestore
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore'; // Firestore operations

const GoogleSignInButton = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Extract the user's full name from the displayName
      const [firstName, lastName] = user.displayName.split(' ');

      // Store user data in Firestore if not already stored
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email: user.email,
      }, { merge: true });

      navigate('/dashboard'); // Navigate to the dashboard after successful login
    } catch (error) {
      toast({
        title: "Google sign-in failed.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Button onClick={handleGoogleSignIn} colorScheme="teal" width="full" mb={2} leftIcon={<FaGoogle />}>
      Sign In with Google
    </Button>
  );
};

export default GoogleSignInButton;
