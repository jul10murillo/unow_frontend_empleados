import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../App.css'; // Asegúrate de importar el archivo CSS

const EmployeeShow = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(`/employees/show/${id}`);
        setEmployee(response.data.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
        navigate('/employees/list'); // Redirige a la lista si hay un error
      }
    };

    fetchEmployee();
  }, [id, navigate]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="employee-show-container">
      <h1 className="employee-show-title">Employee Details</h1>
      <div className="employee-show-info">
        <p><strong>Name:</strong> {employee.firstName} {employee.lastName}</p>
        <p><strong>Position:</strong> {employee.position}</p>
        <p><strong>Date of Birth:</strong> {employee.dateOfBirth}</p>
        <p><strong>Email:</strong> {employee.email}</p>
      </div>
      <button onClick={() => navigate('/employees/list')} className="back-button">Back to List</button>
    </div>
  );
};

export default EmployeeShow;
