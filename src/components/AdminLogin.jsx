import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';
const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/Admin');
    } else {
      alert('Invalid credentials');
    }
  };
const handleLogout = () => {
  localStorage.removeItem('isAdmin');
  window.location.href = '/';
}
  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <div className="login">
  <div className="login-buttons">
    <button onClick={handleLogin}>Login</button>
    <button onClick={handleLogout}>Logout</button>
  </div>
</div>


    </div>
  );
};

export default AdminLogin;
