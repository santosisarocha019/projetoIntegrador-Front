import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import estilos from './SensorChart.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function SensorChart() {
  const [sensores, setSensores] = useState([]);
  const [filteredSensores, setFilteredSensores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [returnType, setReturnType] = useState('tipo');

  useEffect(() => {
    async function fetchSensores() {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('Token de acesso não encontrado.');
        }
        const response = await axios.get('https://isarocha.pythonanywhere.com/api/sensores/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setSensores(response.data);
        setFilteredSensores(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchSensores();
  }, []);

  useEffect(() => {
    async function fetchFilteredData() {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('Token de acesso não encontrado.');
        }
        let url = '';
        let body = {};
        switch(filter) {
          case 'Temperatura':
            url = 'temperatura_filter/';
            body = {
              sensor_id: 9,
              valor_gte: 10,
              valor_lt: 19,
              timestamp_gte: "2024-04-01T00:00:00",
              timestamp_lt: "2024-04-02T00:00:00"
            };
            setReturnType('valor')
            break;
          case 'Umidade':
            url = 'umidade_filter/';
            body = {
              sensor_id: 2,
              valor_gte: 10,
              valor_lt: 80,
              timestamp_gte: "2024-04-01T00:00:00",
              timestamp_lt: "2024-04-02T00:00:00"
            };
            setReturnType('valor')
            break;
          case 'Luminosidade':
            url = 'luminosidade_filter/';
            body = {
              sensor_id: 19,
              valor_gte: 10,
              valor_lt: 1000,
              timestamp_gte: "2024-04-21T00:00:00",
              timestamp_lt: "2024-04-22T00:00:00"
            };
            setReturnType('valor')
            break;
          
          default:
            url = 'sensores/';
        }
        const response = await axios.post(`https://isarocha.pythonanywhere.com/api/${url}`, body, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const filteredData = Array.isArray(response.data) ? response.data : [];
        setFilteredSensores(filteredData);
      } catch (error) {
        console.error("Erro ao carregar dados filtrados:", error);
      }
    }
    fetchFilteredData();
  }, [filter]);

  if (loading) {
    return <div><p>Carregando...</p></div>;
  }

  if (error) {
    return <div>Erro ao carregar os dados: {error.message}</div>;
  }

  const data = {
    labels: filteredSensores.map(sensor => sensor[returnType]),
    datasets: [
      {
        label: 'Quantidade de Sensores',
        data: filteredSensores.map(sensor => sensor.id),
        backgroundColor: '#8B8DFE',
        borderColor: '#8B8DFE',
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribuição de Sensores por Tipo',
      },
    },
  };

  const uniqueTypes = [...new Set(sensores.map(sensor => sensor.tipo))];

  return (
    <main className={estilos.container}>
      <h1>Gráfico de Sensores</h1>
      <div className={estilos.filtro}>
        <label htmlFor="tipo">Filtrar por Tipo: </label>
        <select
          id="tipo"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="">Todos</option>
          {uniqueTypes.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className={estilos.chartContainer}>
        <Bar data={data} options={options} />
      </div>
    </main>
  );
}

