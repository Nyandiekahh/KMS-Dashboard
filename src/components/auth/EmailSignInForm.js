import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FaSignInAlt } from 'react-icons/fa';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const EmailSignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure email and password are not empty
      if (email === '' || password === '') {
        throw new Error("Email and password must be provided");
      }

      // Sign in using email and password
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Navigate to the dashboard after successful login
    } catch (error) {
      let errorMessage = "Invalid email or password.";

      // Check for specific Firebase error codes
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email. Please register first.";
        toast({
          title: "Login failed.",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        // Optional: Navigate to registration page or show a prompt
        // navigate('/register'); // Uncomment this line if you want to redirect to a registration page
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "The password is incorrect. Please try again.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "The email format is invalid.";
      } else {
        console.error("Login error: ", error); // Log unexpected errors
      }

      // Show toast with error message
      toast({
        title: "Login failed.",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl mb={4} isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </FormControl>
      <FormControl mb={4} isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </FormControl>
      <Button type="submit" width="full" colorScheme="teal" leftIcon={<FaSignInAlt />}>
        Login to Your Account
      </Button>
      <Button
        variant="link"
        onClick={() => navigate('/register')} // Navigate to register page
        mt={2}
      >
        Don't have an account? Register here.
      </Button>
    </form>
  );
};

export default EmailSignInForm;
