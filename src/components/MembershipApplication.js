import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, useToast, Heading } from "@chakra-ui/react";
import './membershipApplication.css'; // Import the CSS file

const MembershipApplication = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [reason, setReason] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle application submission logic here
    toast({
      title: "Application submitted",
      description: "Your application has been submitted successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box className="application-container">
      <Heading as="h1" size="lg" mb={6} color="white">Membership Application</Heading>
      <form onSubmit={handleSubmit} className="application-form">
        <VStack spacing={4}>
          <FormControl id="full-name" isRequired>
            <FormLabel color="white">Full Name</FormLabel>
            <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel color="white">Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="phone" isRequired>
            <FormLabel color="white">Phone Number</FormLabel>
            <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </FormControl>
          <FormControl id="address" isRequired>
            <FormLabel color="white">Address</FormLabel>
            <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </FormControl>
          <FormControl id="reason" isRequired>
            <FormLabel color="white">Reason for Joining</FormLabel>
            <Textarea value={reason} onChange={(e) => setReason(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="blue" className="application-button">Submit Application</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default MembershipApplication;
