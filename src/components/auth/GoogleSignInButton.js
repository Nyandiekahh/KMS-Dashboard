import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const GoogleSignInButton = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
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
