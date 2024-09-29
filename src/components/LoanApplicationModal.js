// LoanApplicationModal.js
import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
} from '@chakra-ui/react';

export const LoanApplicationModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const toast = useToast();

  const handleSubmit = () => {
    // Handle loan application submission
    toast({
      title: 'Loan Application Submitted',
      description: `You have applied for a loan of $${amount} for ${term} months.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    onClose(); // Close the modal after submission
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Apply for a Loan</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Loan Amount</FormLabel>
              <Input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Enter amount" 
              />
            </FormControl>
            <FormControl>
              <FormLabel>Loan Term (Months)</FormLabel>
              <Select 
                value={term} 
                onChange={(e) => setTerm(e.target.value)}
              >
                <option value="" disabled>Select term</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
                <option value="24">24 Months</option>
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
