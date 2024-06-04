import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import estilos from './Sensor.module.css';

export function Sensor() {
  const [sensores, setSensores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSensores() {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://127.0.0.1:8000/api/sensores/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setSensores(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchSensores();
  }, []);

  if (loading) {
    return <div><p>Carregando...</p></div>;
  }

  if (error) {
    return <div>Erro ao carregar os dados: {error.message}</div>;
  }

  return (
    <div className={estilos.container}>
      <h1>Tabela de Sensores</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tipo</th>
            <th>Localização</th>
            <th>Responsavel</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>Alterar</th>
          </tr>
        </thead>
        <tbody>
          {sensores.map(sensor => (
            <tr key={sensor.id}>
              <td>{sensor.id}</td>
              <td>{sensor.tipo}</td>
              <td>{sensor.localizacao}</td>
              <td>{sensor.responsavel}</td>
              <td>{sensor.longitude}</td>
              <td>{sensor.latitude}</td>
              <td>
                <Link to={`alterar-sensor/${sensor.id}`} className={estilos.link}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
