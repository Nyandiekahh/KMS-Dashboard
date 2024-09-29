import React, { useState } from 'react';
import { VStack, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import { signInWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const SignInForm = ({ onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Check if the user exists
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length === 0) {
        // User doesn't exist
        toast({
          title: "Account not found",
          description: "Please register for an account first.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      // User exists, proceed with sign in
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Signed in successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Navigate to dashboard or home page
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full">Sign In</Button>
        <Button onClick={onRegisterClick} variant="link">
          Don't have an account? Register here
        </Button>
      </VStack>
    </form>
  );
};

export default SignInForm;