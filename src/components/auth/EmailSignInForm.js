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
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Navigate to the dashboard after successful login
    } catch (error) {
      toast({
        title: "Login failed.",
        description: error.message,
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
    </form>
  );
};

export default EmailSignInForm;
