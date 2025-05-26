import React from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p>Welcome, Admin. Use the sidebar to manage content.</p>
      </main>
    </div>
  );
};

export default Dashboard;
