import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const EmployeeForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [positions, setPositions] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Función para obtener las posiciones
    const fetchPositions = async () => {
      try {
        const response = await api.get('/external/positions');
        setPositions(response.data.positions);
      } catch (error) {
        console.error('Error fetching positions:', error);
      }
    };

    // Función para obtener el empleado
    const fetchEmployee = async () => {
      if (id) {
        try {
          const response = await api.get(`/employees/show/${id}`);
          setFirstName(response.data.data.firstName);
          setLastName(response.data.data.lastName);
          setPosition(response.data.data.position);
          setDateOfBirth(response.data.data.dateOfBirth);
          setEmail(response.data.data.email);
        } catch (error) {
          console.error('Error fetching employee:', error);
        }
      }
    };

    fetchPositions();
    fetchEmployee();
  }, [id]);

  // Función para guardar el empleado
  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = { firstName, lastName, position, dateOfBirth, email };
    try {
      if (id) {
        await api.put(`/employees/update/${id}`, employeeData);
      } else {
        await api.post('/employees/create', employeeData);
      }
      navigate('/employees/list');
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  // Función para volver a la lista
  const handleGoBack = () => {
    navigate('/employees/list');
  };

  // Renderizar el formulario
  return (
    <div className="employee-form-container">
      <h1 className="form-title">{id ? 'Editar Empleado' : 'Crear Empleado'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Nombre"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Apellido"
          required
        />
        <div className="custom-select-container">
          <select
            className="custom-select"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          >
            <option value="" disabled>SELECCIONA UN PUESTO</option>
            {positions.map((pos, index) => (
              <option key={index} value={pos}>
                {pos.toUpperCase()}
              </option>
            ))}
          </select>
          <div className="custom-select-arrow">&#9660;</div> {/* Flecha personalizada */}
        </div>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo Electrónico"
          required
        />
        <div className="button-container">
          <button type="submit">Guardar</button>
          <button type="button" onClick={handleGoBack} className="back-button">Atrás</button>
        </div>      
      </form>
    </div>
  );
};

export default EmployeeForm;
