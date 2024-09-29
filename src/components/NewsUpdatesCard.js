// NewsUpdatesCard.js
import React from 'react';
import { Box, Heading, Text, Button, useColorModeValue } from '@chakra-ui/react';

export const NewsUpdatesCard = ({ title, update }) => {
  const bgColor = useColorModeValue('white', 'gray.700');

  return (
    <Box bg={bgColor} p={5} borderRadius="lg" boxShadow="xl">
      <Heading size="md">{title}</Heading>
      <Text mt={2}>{update}</Text>
      <Button mt={4} colorScheme="blue">Read More</Button>
    </Box>
  );
};
