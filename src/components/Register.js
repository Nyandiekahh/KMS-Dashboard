import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, useToast, Heading } from "@chakra-ui/react";
import { useAuth } from '../contexts/AuthContext';
import './register.css'; // Import the CSS file

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useAuth();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await register(email, password);
      toast({
        title: "Registration successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box className="register-container">
      <Heading as="h1" size="lg" mb={6} color="white">Create Your Account</Heading>
      <form onSubmit={handleSubmit} className="register-form">
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel color="white">Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel color="white">Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <FormControl id="confirm-password" isRequired>
            <FormLabel color="white">Confirm Password</FormLabel>
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="blue" className="register-button">Register</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;
