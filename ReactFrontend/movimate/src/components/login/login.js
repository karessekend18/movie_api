import React, { useState, useEffect } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import PosterTilesBackground from '../posterTilesBackground';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Removed old background image logic
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = registeredUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      setError('Invalid email or password.');
      return;
    }
    setError('');
    if (onLogin) {
      onLogin({ name: user.name, email: user.email });
    }
    localStorage.setItem('loggedInUser', JSON.stringify({ name: user.name, email: user.email }));
    navigate('/');
  };

  return (
    <>
      <PosterTilesBackground />
      <header className="login-header">
        {/* Add your header content here, e.g. logo and app title if needed */}
      </header>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
