import React, { useEffect, useState } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, Select, useToast } from '@chakra-ui/react';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const toast = useToast();

  useEffect(() => {
    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'pending' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'suspended' },
    ]);
  }, []);

  const handleStatusChange = (userId, newStatus) => {
    console.log(`Changing status of user ${userId} to ${newStatus}`);
    toast({
      title: "User status updated",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box padding={5}>
      <Heading as="h2" size="lg" mb={4}>Admin Panel</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(user => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>
                <Select value={user.status} onChange={(e) => handleStatusChange(user.id, e.target.value)}>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </Select>
              </Td>
              <Td>
                <Button colorScheme="blue" onClick={() => handleStatusChange(user.id, user.status)}>
                  Update Status
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AdminPanel;
