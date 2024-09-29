// DashboardStat.js
import React from 'react';
import { Stat, StatLabel, StatNumber, StatHelpText, StatArrow, HStack, useColorModeValue } from '@chakra-ui/react';

export const DashboardStat = ({ label, value, icon, change }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={borderColor}
      rounded={'lg'}
      bg={bgColor}
    >
      <StatLabel fontWeight={'medium'} isTruncated color={textColor}>
        {label}
      </StatLabel>
      <HStack justifyContent="space-between">
        <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
          {value}
        </StatNumber>
        {icon}
      </HStack>
      {change && (
        <StatHelpText>
          <StatArrow type={change > 0 ? 'increase' : 'decrease'} />
          {Math.abs(change)}%
        </StatHelpText>
      )}
    </Stat>
  );
};
