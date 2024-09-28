import React, { useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import SignInOptions from './auth/SignInOptions';
import EmailSignInForm from './auth/EmailSignInForm';
import GoogleSignInButton from './auth/GoogleSignInButton';
import PhoneSignInForm from './auth/PhoneSignInForm';
import './LoginForm.css';

const LoginForm = () => {
  const [method, setMethod] = useState(''); // Track sign-in method (Email, Google, Phone)

  const handleMethodSelect = (selectedMethod) => {
    setMethod(selectedMethod);
  };

  return (
    <div className="container">
      <Box className="login-form" p={4} borderRadius="md" boxShadow="md">
        <Heading size="lg" textAlign="center" mb={4}>Welcome to KMS Portal</Heading>
        
        <Text textAlign="center" my={4}>Select a method to sign in</Text>

        {/* Show SignInOptions if no method is selected */}
        {!method && <SignInOptions onMethodSelect={handleMethodSelect} />}

        {/* Show the form based on the selected method */}
        {method === 'email' && <EmailSignInForm />}
        {method === 'google' && <GoogleSignInButton />}
        {method === 'phone' && <PhoneSignInForm />}
      </Box>
    </div>
  );
};

export default LoginForm;
