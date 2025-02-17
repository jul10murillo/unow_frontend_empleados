import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

const EmployeeForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      if (id) {
        try {
          const response = await api.get(`/employees/show/${id}`);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setPosition(response.data.position);
          setDateOfBirth(response.data.dateOfBirth);
          setEmail(response.data.email);
        } catch (error) {
          console.error('Error fetching employee:', error);
        }
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = { firstName, lastName, position, dateOfBirth, email };
    try {
      if (id) {
        await api.put(`/employees/update/${id}`, employeeData);
      } else {
        await api.post('/employees/create', employeeData);
      }
      toast.success('Empleado registrado con exito', {
        position: 'top-right',
      });
      navigate('/employees/list');
    } catch (error) {
      toast.error('Error al registrar empleado.', {
        position: 'top-right',
      });
      console.error('Error saving employee:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
      <input
        type="text"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        placeholder="Position"
        required
      />
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
        placeholder="Email"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default EmployeeForm;
