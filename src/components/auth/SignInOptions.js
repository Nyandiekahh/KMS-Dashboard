import React from 'react';
import { Button } from '@chakra-ui/react';
import { FaGoogle, FaSignInAlt, FaPhone } from 'react-icons/fa';

const SignInOptions = ({ onMethodSelect }) => {
  return (
    <>
      <Button onClick={() => onMethodSelect('email')} colorScheme="teal" width="full" mb={2} leftIcon={<FaSignInAlt />}>
        Sign In with Email/Password
      </Button>
      <Button onClick={() => onMethodSelect('google')} colorScheme="teal" width="full" mb={2} leftIcon={<FaGoogle />}>
        Sign In with Google
      </Button>
      <Button onClick={() => onMethodSelect('phone')} colorScheme="teal" width="full" leftIcon={<FaPhone />}>
        Sign In with Phone
      </Button>
    </>
  );
};

export default SignInOptions;
