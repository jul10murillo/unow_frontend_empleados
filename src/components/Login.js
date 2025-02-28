import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import '../App.css'; // Asegúrate de importar el archivo CSS

// Componente de inicio de sesión
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Función para iniciar sesión
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login_check', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/employees/list');
    } catch (error) {
      toast.error('Credenciales incorrectas', {
        position: 'top-right',
      })
      console.error('Error logging in:', error);
    }
  };

  // Renderizar el formulario de inicio de sesión
  return (
    <div className="login-container">
      <h1 className="login-title">Prueba técnica Unow</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="register-link-container">
        <Link to="/register" className="register-link">Register</Link>
      </div>
    </div>
  );
};

export default Login;
