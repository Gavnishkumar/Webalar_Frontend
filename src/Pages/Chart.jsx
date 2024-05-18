import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { fetchTasks } from '../API/Api'; // Assuming deleteTask and updateTask are not used here
import Navbar from '../Components/Navbar';

const TaskCharts = () => {
  const [tasks, setTasks] = useState([]);
  const [taskCounts, setTaskCounts] = useState({ completed: 0, pending: 0 });

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        const data = await fetchTasks(token);
        setTasks(data);
        
        // Process tasks to get the counts of completed and pending
        const completedCount = data.filter(task => task.status === 'Completed').length;
        const pendingCount = data.filter(task => task.status === 'Pending').length;
        
        setTaskCounts({ completed: completedCount, pending: pendingCount });
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, []);

  const pieData = {
    labels: ['Completed', 'Pending'],
    datasets: [{
      data: [taskCounts.completed, taskCounts.pending],
      backgroundColor: ['#36A2EB', '#FF6384'],
    }]
  };

  const barData = {
    labels: ['Completed', 'Pending'],
    datasets: [{
      label: 'Tasks',
      data: [taskCounts.completed, taskCounts.pending],
      backgroundColor: ['#36A2EB', '#FF6384'],
    }]
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ width: '40%', margin: '20px 0' }}>
          <h2 style={{ textAlign: 'center' }}>Task Status Pie Chart</h2>
          <Pie data={pieData} options={options} />
        </div>
        <div style={{ width: '40%', margin: '20px 0' }}>
          <h2 style={{ textAlign: 'center' }}>Task Status Bar Graph</h2>
          <Bar data={barData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default TaskCharts;
