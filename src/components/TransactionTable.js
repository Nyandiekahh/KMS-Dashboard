// TransactionTable.js
import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, useColorModeValue, Heading } from '@chakra-ui/react';

export const TransactionTable = ({ transactions }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box bg={bgColor} p={5} borderRadius="lg" boxShadow="xl" border="1px" borderColor={borderColor}>
      <Heading size="md" mb={4}>Recent Transactions</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Type</Th>
            <Th isNumeric>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((transaction, index) => (
            <Tr key={index}>
              <Td>{transaction.date}</Td>
              <Td>{transaction.type}</Td>
              <Td isNumeric color={transaction.amount > 0 ? 'green.500' : 'red.500'}>
                ${Math.abs(transaction.amount).toLocaleString()}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
