import React from "react";
import "../styles/dashboard.css";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard: React.FC = () => {

  // 📊 Weekly Call Data
  const callData = [
    { day: "Mon", calls: 120 },
    { day: "Tue", calls: 200 },
    { day: "Wed", calls: 150 },
    { day: "Thu", calls: 278 },
    { day: "Fri", calls: 189 },
    { day: "Sat", calls: 239 },
    { day: "Sun", calls: 300 },
  ];

  // 📊 Agent Performance
  const agentData = [
    { name: "John", calls: 120 },
    { name: "Sarah", calls: 98 },
    { name: "Mike", calls: 150 },
  ];

  // 📊 Call Distribution
  const pieData = [
    { name: "Connected", value: 8320 },
    { name: "Missed", value: 2140 },
    { name: "Voicemail", value: 990 },
  ];

  const COLORS = ["#4CAF50", "#FF5252", "#FFC107"];

  return (
    <div className="dashboard">

      <h1 className="dashboard-title">AI Telecaller Dashboard </h1>

      {/* 📊 TOP CARDS */}
      <div className="card-grid">
        <div className="card">
          <h3>Total Calls</h3>
          <p>12,450</p>
        </div>
        <div className="card">
          <h3>Connected</h3>
          <p>8,320</p>
        </div>
        <div className="card">
          <h3>Missed</h3>
          <p>2,140</p>
        </div>
        <div className="card">
          <h3>Conversion</h3>
          <p>32%</p>
        </div>
      </div>

      {/* 📈 LINE CHART */}
      <div className="chart-box">
        <h3>Weekly Call Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={callData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="calls" stroke="#2575fc" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 📊 BAR + PIE */}
      <div className="chart-row">

        {/* BAR */}
        <div className="chart-box">
          <h3>Agent Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={agentData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="calls" fill="#6a11cb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE */}
        <div className="chart-box">
          <h3>Call Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={90} label>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;