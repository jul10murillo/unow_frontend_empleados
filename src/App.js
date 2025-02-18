import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Register from './components/Register';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EmployeeShow from './components/EmployeeShow';
import './App.css';

// Función para verificar si el usuario esta autenticado
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Componente para rutas privadas
const PrivateRoute = ({ element: Component, ...rest }) => {
  return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/login" />;
};

// Componente principal
function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employees/list" element={<PrivateRoute element={EmployeeList} />} />
          <Route path="/employees/create" element={<PrivateRoute element={EmployeeForm} />} />
          <Route path="/employees/show/:id" element={<PrivateRoute element={EmployeeShow} />} />
          <Route path="/employees/update/:id" element={<PrivateRoute element={EmployeeForm} />} />
        </Routes>
        <ToastContainer /> 
      </div>
    </Router>
  );
}

export default App;
