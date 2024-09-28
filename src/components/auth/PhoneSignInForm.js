import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Input, Button, useToast, VStack, Box } from '@chakra-ui/react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const PhoneSignInForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmResult, setConfirmResult] = useState(null);
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Component mounted. Setting up reCAPTCHA...");
    setUpRecaptcha();
  }, []);

  const setUpRecaptcha = () => {
    console.log("Setting up reCAPTCHA...");
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'normal', // Changed to 'normal' for debugging
        callback: (response) => {
          console.log("reCAPTCHA verified");
          setIsRecaptchaVerified(true);
        },
        'expired-callback': () => {
          console.log("reCAPTCHA expired");
          setIsRecaptchaVerified(false);
        }
      });
      console.log("reCAPTCHA set up successfully");
    } catch (error) {
      console.error("Error setting up reCAPTCHA:", error);
    }
  };

  const handleSendCode = async () => {
    console.log("handleSendCode called");
    if (!isRecaptchaVerified) {
      console.log("reCAPTCHA not verified. Attempting to verify...");
      try {
        await window.recaptchaVerifier.verify();
      } catch (error) {
        console.error("Error verifying reCAPTCHA:", error);
        toast({
          title: "reCAPTCHA verification failed",
          description: "Please try again",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
    }

    const appVerifier = window.recaptchaVerifier;
    console.log("Phone number:", phoneNumber);

    try {
      console.log("Attempting to send verification code...");
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      console.log("Verification code sent successfully");
      setConfirmResult(confirmationResult);
      toast({
        title: "Code sent.",
        description: "Check your phone for the verification code.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error sending verification code:", error);
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
    console.log("handleVerifyCode called");
    if (!confirmResult) {
      console.log("No confirmation result");
      return toast({
        title: "No confirmation result.",
        description: "Please send a verification code first.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }

    try {
      console.log("Attempting to confirm code...");
      await confirmResult.confirm(verificationCode);
      console.log("Code confirmed successfully");
      navigate('/dashboard'); // Navigate to the dashboard after successful login
    } catch (error) {
      console.error("Error confirming code:", error);
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
    <VStack spacing={4} align="stretch">
      <FormControl isRequired>
        <FormLabel htmlFor="phone">Phone Number</FormLabel>
        <Input
          id="phone"
          type="tel"
          value={phoneNumber}
          onChange={(e) => {
            console.log("Phone number changed:", e.target.value);
            setPhoneNumber(e.target.value);
          }}
          placeholder="Enter your phone number (e.g., +1234567890)"
        />
      </FormControl>
      <Button 
        onClick={handleSendCode} 
        colorScheme="teal" 
        width="full"
        isDisabled={!phoneNumber}
      >
        Send Verification Code
      </Button>

      <Box id="recaptcha-container"></Box>

      <FormControl isRequired>
        <FormLabel htmlFor="verification-code">Verification Code</FormLabel>
        <Input
          id="verification-code"
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="Enter verification code"
        />
      </FormControl>
      <Button 
        onClick={handleVerifyCode} 
        colorScheme="teal" 
        width="full"
        isDisabled={!verificationCode}
      >
        Verify Code
      </Button>
    </VStack>
  );
};

export default PhoneSignInForm;