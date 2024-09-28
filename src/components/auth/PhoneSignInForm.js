import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const PhoneSignInForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmResult, setConfirmResult] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
  };

  const handleSendCode = async () => {
    setUpRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmResult(confirmationResult);
      toast({
        title: "Code sent.",
        description: "Check your phone for the verification code.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to send code.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!confirmResult) {
      return toast({
        title: "No confirmation result.",
        description: "Please send a verification code first.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }

    try {
      await confirmResult.confirm(verificationCode);
      navigate('/dashboard'); // Navigate to the dashboard after successful login
    } catch (error) {
      toast({
        title: "Verification failed.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <FormControl mb={4} isRequired>
        <FormLabel htmlFor="phone">Phone Number</FormLabel>
        <Input
          id="phone"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
        />
      </FormControl>
      <Button onClick={handleSendCode} colorScheme="teal" width="full" mb={2}>
        Send Verification Code
      </Button>

      <div id="recaptcha-container"></div>

      <FormControl mb={4} isRequired>
        <FormLabel htmlFor="verification-code">Verification Code</FormLabel>
        <Input
          id="verification-code"
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="Enter verification code"
        />
      </FormControl>
      <Button onClick={handleVerifyCode} colorScheme="teal" width="full">
        Verify Code
      </Button>
    </div>
  );
};

export default PhoneSignInForm;
