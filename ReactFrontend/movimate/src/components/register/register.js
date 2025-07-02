import React, { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';
import PosterTilesBackground from '../posterTilesBackground';

const Register = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Add handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    // Save user to localStorage (prevent duplicate emails)
    let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    // Remove any existing user with the same email
    registeredUsers = registeredUsers.filter(u => u.email !== email);
    registeredUsers.push({ name, email, password });
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    if (onRegister) onRegister({ name, email, password });
    navigate('/login');
  };

  return (
    <>
      <PosterTilesBackground />
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
