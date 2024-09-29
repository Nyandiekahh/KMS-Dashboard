import React, { useState } from 'react';
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

// Mock data
const mockUserData = {
  name: "John Doe",
  membershipNumber: "SACCO001",
  joinDate: "2020-01-15",
  savingsBalance: 25000,
  loanBalance: 10000,
  creditScore: 780,
  investmentValue: 15000,
  savingsGoal: 50000,
  loanLimit: 30000,
};

const mockTransactionData = [
  { date: '2023-06-01', type: 'Savings Deposit', amount: 1000 },
  // Other transactions...
];

const mockChartData = Array.from({ length: 12 }, (_, i) => ({
  month: format(subDays(new Date(), (11 - i) * 30), 'MMM'),
  savings: Math.floor(Math.random() * 5000) + 20000,
  loans: Math.floor(Math.random() * 3000) + 8000,
  investments: Math.floor(Math.random() * 2000) + 13000,
}));

const mockPieData = [
  { name: 'Savings', value: 25000 },
  { name: 'Loans', value: 10000 },
  { name: 'Investments', value: 15000 },
];

const Dashboard = () => {
  const [userData] = useState(mockUserData);
  const [transactionData] = useState(mockTransactionData);
  const [chartData] = useState(mockChartData);
  const [pieData] = useState(mockPieData);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box maxWidth="1400px" margin="auto" p={5}>
      <Flex alignItems="center" mb={8}>
        <Heading size="xl" color={textColor}>KMS Dashboard</Heading>
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
            <InvestmentOpportunitiesCard opportunities={[]} /> {/* Pass relevant data if necessary */}
            <NewsUpdatesCard updates={[]} /> {/* Pass relevant data if necessary */}
          </VStack>
        </GridItem>
      </Grid>

      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
        <GridItem>
          <GoalProgressCard currentSavings={userData.savingsBalance} savingsGoal={userData.savingsGoal} loanBalance={userData.loanBalance} loanLimit={userData.loanLimit} />
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
