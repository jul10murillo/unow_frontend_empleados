import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../App.css'; // Asegúrate de importar el archivo CSS

// Componente para mostrar detalles de un empleado
const EmployeeShow = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Función para obtener el empleado
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
    return <div>Cargando...</div>;
  }

  // Renderizar los detalles del empleado
  return (
    <div className="employee-show-container">
      <h1 className="employee-show-title">Detalle de empleado</h1>
      <div className="employee-show-info">
        <p><strong>Nombre:</strong> {employee.firstName} {employee.lastName}</p>
        <p><strong>Posición:</strong> {employee.position}</p>
        <p><strong>Fecha de Nacimiento:</strong> {employee.dateOfBirth}</p>
        <p><strong>Email:</strong> {employee.email}</p>
      </div>
      <button onClick={() => navigate('/employees/list')} className="back-button">Back to List</button>
    </div>
  );
};

export default EmployeeShow;
