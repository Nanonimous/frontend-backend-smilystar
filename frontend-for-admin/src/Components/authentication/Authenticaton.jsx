import React, { useState } from 'react';
import styles from './login.module.css';
import axios from 'axios'; // <--- Add this at the top


const Authentication = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const server = process.env.REACT_APP_BACKEND_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        `${server}api/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true, // <--- Important for sending/receiving cookies
        }
      );
      
      window.location.href = '/'; // optional
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Login failed');
    }
  };
  

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      
      </form>
    </div>
  );
};

export default Authentication;
