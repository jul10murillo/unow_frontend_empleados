import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EmployeeShow = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(`/employees/show/${id}`);
        setEmployee(response.data);
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
    <div>
      <h1>{employee.firstName} {employee.lastName}</h1>
      <p>Position: {employee.position}</p>
      <p>Date of Birth: {employee.dateOfBirth}</p>
      <p>Email: {employee.email}</p>
      <button onClick={() => navigate('/employees/list')}>Back to List</button>
    </div>
  );
};

export default EmployeeShow;
