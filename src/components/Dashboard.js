import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Heading, Text, VStack, Flex, Spacer, Button, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { DollarSign, CreditCard, Briefcase, Activity } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts';

// Import custom components
import { DashboardStat } from './DashboardStat';
import { TransactionTable } from './TransactionTable';
import { LoanApplicationModal } from './LoanApplicationModal';
import { InvestmentOpportunitiesCard } from './InvestmentOpportunitiesCard';
import { NewsUpdatesCard } from './NewsUpdatesCard';
import { GoalProgressCard } from './GoalProgressCard';

// Function to generate mock chart data
const generateChartData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: format(subDays(new Date(), (11 - i) * 30), 'MMM'),
    savings: Math.floor(Math.random() * 5000) + 20000,
    loans: Math.floor(Math.random() * 3000) + 8000,
    investments: Math.floor(Math.random() * 2000) + 13000,
  }));
};

// Dashboard Component
const Dashboard = () => {
  // State to hold user data
  const [userData, setUserData] = useState(null);
  const transactionData = []; // Populate this with your transaction data
  const chartData = generateChartData();

  // Mock user data for demonstration
  useEffect(() => {
    const mockUserData = {
      name: 'John Doe',
      savingsBalance: 25000,
      loanBalance: 15000,
      investmentValue: 12000,
      creditScore: 720,
      membershipNumber: 'KMS123456',
      joinDate: '2022-01-15',
      savingsGoal: 50000,
      loanLimit: 20000,
    };
    setUserData(mockUserData);
  }, []);

  const pieData = userData ? [
    { name: 'Savings', value: userData.savingsBalance },
    { name: 'Loans', value: userData.loanBalance },
    { name: 'Investments', value: userData.investmentValue },
  ] : [];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  if (!userData) {
    return <Text>Loading user data...</Text>; // Loading state
  }

  return (
    <Box maxWidth="1400px" margin="auto" p={5}>
      <Flex alignItems="center" mb={8}>
        <Heading size="xl" color={textColor}>Welcome back, {userData.name}!</Heading>
        <Spacer />
        <Button colorScheme="blue" leftIcon={<CreditCard size={20} />} onClick={onOpen}>
          Apply for Loan
        </Button>
      </Flex>

      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={8}>
        <DashboardStat label="Total Savings" value={`$${userData.savingsBalance.toLocaleString()}`} icon={<DollarSign size={24} />} />
        <DashboardStat label="Loan Balance" value={`$${userData.loanBalance.toLocaleString()}`} icon={<CreditCard size={24} />} />
        <DashboardStat label="Investment Value" value={`$${userData.investmentValue.toLocaleString()}`} icon={<Briefcase size={24} />} />
        <DashboardStat label="Credit Score" value={userData.creditScore} icon={<Activity size={24} />} />
      </Grid>

      <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6} mb={8}>
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <Box bg={bgColor} p={5} borderRadius="lg" boxShadow="xl" border="1px" borderColor={borderColor}>
            <Heading size="md">Financial Overview</Heading>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="savings" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="loans" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="investments" stackId="1" stroke="#ffc658" fill="#ffc658" />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </GridItem>
        <GridItem>
          <Box bg={bgColor} p={5} borderRadius="lg" boxShadow="xl" border="1px" borderColor={borderColor}>
            <Heading size="md" mb={4}>Asset Allocation</Heading>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </GridItem>
      </Grid>

      <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6} mb={8}>
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <TransactionTable transactions={transactionData} />
        </GridItem>
        <GridItem>
          <VStack spacing={6}>
            <InvestmentOpportunitiesCard opportunities={[]} /> {/* Replace with real data */}
            <NewsUpdatesCard updates={[]} /> {/* Replace with real data */}
          </VStack>
        </GridItem>
      </Grid>

      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
        <GridItem>
          <GoalProgressCard currentSavings={userData.savingsBalance} savingsGoal={50000} loanBalance={userData.loanBalance} loanLimit={20000} />
        </GridItem>
        <GridItem>
          <Box bg={bgColor} p={5} borderRadius="lg" boxShadow="xl" border="1px" borderColor={borderColor}>
            <Heading size="md" mb={4}>Member Details</Heading>
            <VStack align="start" spacing={3}>
              <Text><strong>Name:</strong> {userData.name}</Text>
              <Text><strong>Membership Number:</strong> {userData.membershipNumber}</Text>
              <Text><strong>Join Date:</strong> {userData.joinDate}</Text>
              <Text><strong>Savings Balance:</strong> ${userData.savingsBalance.toLocaleString()}</Text>
              <Text><strong>Loan Balance:</strong> ${userData.loanBalance.toLocaleString()}</Text>
              <Text><strong>Credit Score:</strong> {userData.creditScore}</Text>
              <Text><strong>Investment Value:</strong> ${userData.investmentValue.toLocaleString()}</Text>
            </VStack>
          </Box>
        </GridItem>
      </Grid>

      <LoanApplicationModal isOpen={isOpen} onClose={onClose} userData={userData} />
    </Box>
  );
};

export default Dashboard;
