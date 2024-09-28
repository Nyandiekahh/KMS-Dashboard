import React from 'react';
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaChartLine, FaFileAlt, FaUserCog, FaMoneyBillWave, FaUsers, FaSignOutAlt, FaUser, FaUserPlus } from 'react-icons/fa';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box width="100%" p={4} bg="gray.100">
      <Flex direction="column" align="stretch">
        <Heading size="md" mb={4}>SACCO Portal</Heading>
        {currentUser ? (
          <>
            <Button leftIcon={<FaChartLine />} onClick={() => navigate('/dashboard')} mb={2}>Dashboard</Button>
            <Button leftIcon={<FaFileAlt />} onClick={() => navigate('/statements')} mb={2}>Statements</Button>
            <Button leftIcon={<FaUserCog />} onClick={() => navigate('/profile')} mb={2}>Profile</Button>
            <Button leftIcon={<FaMoneyBillWave />} onClick={() => navigate('/loan-application')} mb={2}>Apply for Loan</Button>
            {currentUser.isAdmin && (
              <Button leftIcon={<FaUsers />} onClick={() => navigate('/admin')} mb={2}>Admin Panel</Button>
            )}
            <Button leftIcon={<FaSignOutAlt />} onClick={logout} mb={2}>Logout</Button>
          </>
        ) : (
          <>
            <Button leftIcon={<FaUser />} onClick={() => navigate('/')} mb={2}>Login</Button>
            <Button leftIcon={<FaUserPlus />} onClick={() => navigate('/register')} mb={2}>Register</Button>
            <Button leftIcon={<FaUserPlus />} onClick={() => navigate('/membership-application')} mb={2}>Apply for Membership</Button>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
