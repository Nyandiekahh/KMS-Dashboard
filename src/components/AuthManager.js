import React, { useState } from 'react';
import { Box, VStack, Heading, Text, Button } from '@chakra-ui/react';
import SignInForm from './SignInForm';
import RegistrationForm from './RegistrationForm';
import PhoneSignInForm from './PhoneSignInForm';

const AuthManager = () => {
  const [authMode, setAuthMode] = useState('signin'); // 'signin', 'register', 'phone'

  const renderAuthComponent = () => {
    switch (authMode) {
      case 'signin':
        return <SignInForm onRegisterClick={() => setAuthMode('register')} />;
      case 'register':
        return <RegistrationForm onSignInClick={() => setAuthMode('signin')} />;
      case 'phone':
        return <PhoneSignInForm onSignInClick={() => setAuthMode('signin')} />;
      default:
        return <SignInForm onRegisterClick={() => setAuthMode('register')} />;
    }
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <VStack spacing={4} align="stretch">
        <Heading textAlign="center">Welcome</Heading>
        <Text textAlign="center">
          {authMode === 'signin' ? 'Sign in to your account' : 'Create a new account'}
        </Text>
        {renderAuthComponent()}
        <Button onClick={() => setAuthMode('phone')} variant="outline">
          Sign in with Phone
        </Button>
      </VStack>
    </Box>
  );
};

export default AuthManager;