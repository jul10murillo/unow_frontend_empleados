import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../App.css'; // Asegúrate de importar el archivo CSS

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleDelete = async (id) => {
    try {
      await api.delete(`/employees/delete/${id}`);
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="employee-list-container">
      <div className="header">
        <h1>Employee List</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <Link to="/employees/create" className="add-employee-link">Add Employee</Link>
      <ul className="employee-list">
        {Array.isArray(employees) && employees.map((employee) => (
          <li key={employee.id} className="employee-item">
            <div className="employee-info">
              <span>{employee.firstName} {employee.lastName}</span>
              <span>{employee.position}</span>
            </div>
            <div className="employee-actions">
              <Link to={`/employees/show/${employee.id}`} className="action-button show-button">Show</Link>
              <Link to={`/employees/update/${employee.id}`} className="action-button edit-button">Edit</Link>
              <button onClick={() => handleDelete(employee.id)} className="action-button delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
