// GoalProgressCard.js
import React from 'react';
import { Box, Progress, Text, useColorModeValue } from '@chakra-ui/react';

export const GoalProgressCard = ({ goal, progress }) => {
  const bgColor = useColorModeValue('white', 'gray.700');

  return (
    <Box bg={bgColor} p={5} borderRadius="lg" boxShadow="xl">
      <Text fontWeight="bold">{goal}</Text>
      <Progress value={progress} mt={2} />
      <Text mt={2}>{progress}% completed</Text>
    </Box>
  );
};
