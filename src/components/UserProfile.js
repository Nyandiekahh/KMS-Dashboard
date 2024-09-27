import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading } from '@chakra-ui/react';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', profile);
    // Add your update logic here
  };

  return (
    <Box padding={5}>
      <Heading as="h2" size="lg" mb={4}>User Profile</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="fullName" isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input type="text" value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={profile.email} isReadOnly />
          </FormControl>
          <FormControl id="phone" isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
          </FormControl>
          <FormControl id="address" isRequired>
            <FormLabel>Address</FormLabel>
            <Input type="text" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} />
          </FormControl>
          <Button type="submit" colorScheme="blue">Update Profile</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default UserProfile;
