import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#2c3e50',
    color: '#fff'
  }}>
    <h2>Company Portal</h2>
    <nav>
      <Link to="/" style={{ color: '#fff', marginRight: '1rem' }}>Home</Link>
      <Link to="/users" style={{ color: '#fff', marginRight: '1rem' }}>Users</Link>
      <Link to="/stats" style={{ color: '#fff' }}>User Statistics</Link>
    </nav>
  </header>
);

export default Header;
