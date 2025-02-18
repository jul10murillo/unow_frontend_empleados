import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../App.css'; // Asegúrate de importar el archivo CSS

// Componente para la lista de empleados
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  // Cargar empleados desde el backend
  useEffect(() => {
    // Función para obtener los empleados
    const fetchEmployees = async () => {
      try {
        const response = await api.get('/employees/list');
        if (Array.isArray(response.data.data)) {
          setEmployees(response.data.data);
        } else {
          console.error('API did not return an array');
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  // Función para eliminar un empleado
  const handleDelete = async (id) => {
    try {
      await api.delete(`/employees/delete/${id}`);
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Renderizar la lista de empleados
  return (
    <div className="employee-list-container">
      <div className="header">
        <h1>Lista de Empleados</h1>
        <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
      </div>
      <Link to="/employees/create" className="add-employee-link">Agregar Empleado</Link>
      <ul className="employee-list">
        {Array.isArray(employees) && employees.map((employee) => (
          <li key={employee.id} className="employee-item">
            <div className="employee-info">
              <p><strong>Nombre:</strong> {employee.firstName} {employee.lastName}</p>
              <p><strong>Cargo:</strong> {employee.position}</p>
            </div>
            <div className="employee-actions">
              <Link to={`/employees/show/${employee.id}`} className="action-button show-button">Ver</Link>
              <Link to={`/employees/update/${employee.id}`} className="action-button edit-button">Editar</Link>
              <button onClick={() => handleDelete(employee.id)} className="action-button delete-button">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
