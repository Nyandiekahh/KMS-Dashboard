import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, useToast } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaMoneyBillWave } from 'react-icons/fa';
import './LoginForm.css'; // Assuming you'll create this CSS file

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
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
    <div className="container">
      <Box className="login-form" p={4} borderRadius="md" boxShadow="md">
        <Heading size="lg" textAlign="center" mb={4}>Welcome to KMS Portal</Heading>
        
        <Button 
          width="full" 
          colorScheme="teal" 
          leftIcon={<FaMoneyBillWave />} 
          onClick={() => navigate('/loan-application')}
          mb={2}
        >
          Apply for a Loan
        </Button>

        <Button 
          width="full" 
          colorScheme="teal" 
          leftIcon={<FaUserPlus />} 
          onClick={() => navigate('/membership-application')}
          mb={2}
        >
          Want to Become a Member
        </Button>

        <Text textAlign="center" my={4}>Or</Text>

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
          <Button
            type="submit"
            width="full"
            colorScheme="teal"
            leftIcon={<FaSignInAlt />}
          >
            Login to Your Account
          </Button>
        </form>
        
        <Text mt={4} textAlign="center">
          New member? <Button variant="link" onClick={() => navigate('/register')}>Create Account</Button>
        </Text>
      </Box>
    </div>
  );
};

export default LoginForm;
