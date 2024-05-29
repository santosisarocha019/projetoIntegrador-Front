import React, {useState, useEffect} from "react";
import axios from "axios";
import estilos from './Sensor.module.css';

export function Sensor(){
    const[sensores, setSensores] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() =>{
        async function fetchSensores(){
            try{
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/sensores/',{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                setSensores(response.data);
                setLoading(false);
            }catch(error){
                setError(error);
                setLoading(false);
            }
        }
        fetchSensores();

    },[]);

    if(loading){
        return <div><p>Carregando...</p></div>
    }
    if(error){
        return<div>Erro ao carregar os dados: {error.message}</div>
    }
    return(
        <div>
            <h1>Tabela de Sensores</h1>
            <table>
                <tr>
                    <td>Id</td>
                    <td>Tipo</td>
                    <td>Localização</td>
                    <td>Responsavel</td>
                    <td>Longitude</td>
                    <td>Latitude</td>
                    <td>Alterar</td>
                </tr>
                <tr>
                    {sensores.map(sensor => (
                        <tr key={sensor.id}>
                        <td>{sensor.id}</td>
                        <td>{sensor.tipo}</td>
                        <td>{sensor.localizacao}</td>
                        <td>{sensor.responsavel}</td>
                        <td>{sensor.longitude}</td>
                        <td a href="">Alterar</td>
                </tr>
                    ))}
                </tr>
            </table>
        </div>
    );
    
}
