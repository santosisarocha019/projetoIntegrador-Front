import React, { useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import estilos from './AlteraSensor.module.css';

const schemaAlterarSensor = z.object({
    tipo: z.string().optional(),
    mac_address: z.string()
        .max(25, "Deve ter no máximo 25 caracteres").nullable(),
    latitude: z.number().refine(val => !isNaN(parseFloat(val)), 'Latitude inválida'),
    longitude: z.number().refine(val => !isNaN(parseFloat(val)), 'Longitude inválida'),
    localizacao: z.string().max(100, 'Deve ter no máximo 100 caracteres'),
    responsavel: z.string().max(100, 'Deve ter no máximo 100 caracteres'),
    unidade_medida: z.string().max(20, 'Deve ter no máximo 20 caracteres'),
    status_operacional: z.string().nullable(),
    observacao: z.string().nullable()
});

export function AlteraSensor() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(schemaAlterarSensor)
    });

    const obterDadosSensor = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`https://isarocha.pythonanywhere.com/api/sensores/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const sensorData = response.data;
            Object.keys(sensorData).forEach(key => {
                setValue(key, sensorData[key]);
            });
        } catch (err) {
            console.log('Erro ao obter o sensor', err);
        }
    };

    useEffect(() => {
        obterDadosSensor();
    }, [id]);

    const onSubmit = async (data) => {
        console.log("Dados inputados no formulário para o PUT", data);
        try {
            const token = localStorage.getItem('access_token');
            await axios.put(`https://isarocha.pythonanywhere.com/api/sensores/${id}/`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert("Sensor alterado com sucesso");
            navigate('/inicial');
        } catch (error) {
            console.error('Erro ao alterar o sensor', error);
        }
    };

    return (
        <div className={estilos.container}>
            <h1>Alteração de Sensor</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Tipo</label>
                <select {...register('tipo')} className={estilos.campo}>
                    <option value=''>Selecione um tipo</option>
                    <option value='Temperatura'>Temperatura</option>
                    <option value='Contador'>Contador</option>
                    <option value='Luminosidade'>Luminosidade</option>
                    <option value='Umidade'>Umidade</option>
                </select>
                {errors.tipo && <p className={estilos.mensagem}>{errors.tipo.message}</p>}

                <label>Mac Address</label>
                <input {...register('mac_address')} className={estilos.campo} />
                {errors.mac_address && <p className={estilos.mensagem}>{errors.mac_address.message}</p>}

                <label>Latitude</label>
                <input {...register('latitude')} className={estilos.campo} />
                {errors.latitude && <p className={estilos.mensagem}>{errors.latitude.message}</p>}

                <label>Longitude</label>
                <input {...register('longitude')} className={estilos.campo} />
                {errors.longitude && <p className={estilos.mensagem}>{errors.longitude.message}</p>}

                <label>Localização</label>
                <input {...register('localizacao')} className={estilos.campo} />
                {errors.localizacao && <p className={estilos.mensagem}>{errors.localizacao.message}</p>}

                <label>Responsável</label>
                <input {...register('responsavel')} className={estilos.campo} />
                {errors.responsavel && <p className={estilos.mensagem}>{errors.responsavel.message}</p>}

                <label>Unidade de Medida</label>
                <input {...register('unidade_medida')} className={estilos.campo} />
                {errors.unidade_medida && <p className={estilos.mensagem}>{errors.unidade_medida.message}</p>}

                <label>Status Operacional</label>
                <input {...register('status_operacional')} type='checkbox' />

                <label>Observação</label>
                <textarea {...register('observacao')} className={estilos.campo} />
                
                <button type="submit" className={estilos.botao}>Salvar</button>
            </form>
        </div>
    );
}
