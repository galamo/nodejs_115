import React from 'react';

const dummyUsers = [
  { email: 'alice@example.com', department: 'Engineering', empNo: '001', role: 'Developer' },
  { email: 'bob@example.com', department: 'QA', empNo: '002', role: 'QA' },
  { email: 'carol@example.com', department: 'Analytics', empNo: '003', role: 'Analyst' },
  { email: 'dave@example.com', department: 'Engineering', empNo: '004', role: 'Developer' },
];

const Users = () => (
  <div style={{ padding: '2rem' }}>
    <h3>Users List</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f4f4f4' }}>
          <th>Email</th><th>Department</th><th>Employee No.</th><th>Role</th>
        </tr>
      </thead>
      <tbody>
        {dummyUsers.map((user, idx) => (
          <tr key={idx}>
            <td>{user.email}</td>
            <td>{user.department}</td>
            <td>{user.empNo}</td>
            <td>{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Users;
