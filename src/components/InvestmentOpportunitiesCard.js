// InvestmentOpportunitiesCard.js
import React from 'react';
import { Box, Heading, Text, Button, useColorModeValue } from '@chakra-ui/react';

export const InvestmentOpportunitiesCard = ({ title, description }) => {
  const bgColor = useColorModeValue('white', 'gray.700');

  return (
    <Box bg={bgColor} p={5} borderRadius="lg" boxShadow="xl">
      <Heading size="md">{title}</Heading>
      <Text mt={2}>{description}</Text>
      <Button mt={4} colorScheme="teal">Learn More</Button>
    </Box>
  );
};
