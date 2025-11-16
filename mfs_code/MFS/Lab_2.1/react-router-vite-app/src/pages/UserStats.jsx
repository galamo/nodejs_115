import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Engineering', value: 2 },
  { name: 'QA', value: 1 },
  { name: 'Analytics', value: 1 },
];

const COLORS = ['#0088FE', '#FFBB28', '#00C49F'];

const UserStats = () => (
  <div style={{ padding: '2rem' }}>
    <h3>Users per Department</h3>
    <PieChart width={400} height={300}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
        {data.map((entry, idx) => (
          <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </div>
);

export default UserStats;
