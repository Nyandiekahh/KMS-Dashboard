import React from 'react';
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

// Placeholder data (replace with actual data in production)
const overviewData = {
  totalMembers: 1000,
  totalSavings: 500000,
  totalLoans: 750000,
  totalRevenue: 100000
};

const memberTransactions = [
  { id: 1, name: 'John Doe', type: 'Deposit', amount: 1000 },
  { id: 2, name: 'Jane Smith', type: 'Withdrawal', amount: 500 },
  { id: 3, name: 'Bob Johnson', type: 'Loan Payment', amount: 750 }
];

const loanData = [
  { name: 'Active', value: 300 },
  { name: 'Paid', value: 500 },
  { name: 'Defaulted', value: 200 }
];

const savingsData = [
  { month: 'Jan', savings: 4000 },
  { month: 'Feb', savings: 3000 },
  { month: 'Mar', savings: 5000 },
  { month: 'Apr', savings: 4500 },
  { month: 'May', savings: 6000 },
  { month: 'Jun', savings: 5500 }
];

const expenseData = [
  { name: 'Operations', value: 400 },
  { name: 'Marketing', value: 300 },
  { name: 'IT', value: 300 },
  { name: 'Others', value: 200 }
];

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>SACCO Dashboard</h1>
      
      {/* Overview Section */}
      <section className="overview">
        <h2>Overview</h2>
        <div className="overview-cards">
          <div className="card">
            <h3>Total Members</h3>
            <p>{overviewData.totalMembers}</p>
          </div>
          <div className="card">
            <h3>Total Savings</h3>
            <p>${overviewData.totalSavings}</p>
          </div>
          <div className="card">
            <h3>Total Loans Issued</h3>
            <p>${overviewData.totalLoans}</p>
          </div>
          <div className="card">
            <h3>Total Revenue</h3>
            <p>${overviewData.totalRevenue}</p>
          </div>
        </div>
      </section>

      {/* Member Management Section */}
      <section className="member-management">
        <h2>Member Management</h2>
        <div className="recent-transactions">
          <h3>Recent Transactions</h3>
          <ul>
            {memberTransactions.map(transaction => (
              <li key={transaction.id}>
                {transaction.name} - {transaction.type}: ${transaction.amount}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Loan Management Section */}
      <section className="loan-management">
        <h2>Loan Management</h2>
        <div className="loan-chart">
          <h3>Loan Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="value" data={loanData} fill="#8884d8" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Savings Insights Section */}
      <section className="savings-insights">
        <h2>Savings Insights</h2>
        <div className="savings-chart">
          <h3>Savings Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={savingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="savings" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Financial Health Section */}
      <section className="financial-health">
        <h2>Financial Health</h2>
        <div className="expense-chart">
          <h3>Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="value" data={expenseData} fill="#82ca9d" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Alerts & Notifications Section */}
      <section className="alerts-notifications">
        <h2>Alerts & Notifications</h2>
        <div className="alerts-list">
          <h3>Due Payments</h3>
          <ul>
            <li>Loan payment due for Member #123</li>
            <li>Savings target not met for Member #456</li>
          </ul>
        </div>
      </section>

      {/* Reports & Analytics Section */}
      <section className="reports-analytics">
        <h2>Reports & Analytics</h2>
        <button className="generate-report">Generate Custom Report</button>
      </section>
    </div>
  );
};

export default Dashboard;
