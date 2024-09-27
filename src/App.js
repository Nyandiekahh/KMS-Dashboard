import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, Box, Flex, Container } from "@chakra-ui/react";
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import FinancialStatements from './components/FinancialStatements';
import UserProfile from './components/UserProfile';
import AdminPanel from './components/AdminPanel';
import LoanApplication from './components/LoanApplication';
import MembershipApplication from './components/MembershipApplication';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Box textAlign="center" fontSize="xl">
            <Flex minH="100vh" p={3} direction="column">
              <Container maxW="container.xl" flex="1">
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/statements" element={<ProtectedRoute><FinancialStatements /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                  <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
                  <Route path="/loan-application" element={<ProtectedRoute><LoanApplication /></ProtectedRoute>} />
                  <Route path="/membership-application" element={<MembershipApplication />} />
                </Routes>
              </Container>
            </Flex>
          </Box>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
