import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import estilos from './CadastroSensor.module.css';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const schemaSensor = z.object({
    tipo: z.string()
        .nonempty("não pode estar vazio"),
    mac_address: z.string()
        .max(20, "=deve ser no maximo 20 caracteres"),
    latitude: z.string()
        .refine(val => !isNaN(parseFloat(val)),'Latitude invalida'),
    longitude: z.string()
        .refine(val => !isNaN(parseFloat(val)),'Longitude invalida'),
    localizacao: z.string()
        .min(10, "deve ser no minimo 10 caracteres")
        .max(100, "deve ser no maximo 100 caracteres"),
    responsavel: z.string()
        .min(1, "=deve ser no minimo 1 caracteres")
        .max(100, "deve ser no maximo 100 caracteres"),
    unidade_medida: z.string()
        .min(1, "=deve ser no minimo 1 caracteres")
        .max(20, "deve ser no maximo 20 caracteres"),
    status_operacional: z.boolean(),
    observacao: z.string()
        .nullable(),    

});

export function CadastroSensor(){
    const navigate = useNavigate();
    const{register, handleSbmit, formState: {errors}} = useForm({
        resolver: zodResolver(schemaSensor)
    });

    async function obterDadosFormulario(data){
        try{
            const response = await axios.post('https://isarocha.pythonanywhere.com/api/sensores', data,{
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                } 
            });
            alert("Sensor cadastrado com sucesso!");
            navigate('/inicial');
        }catch(error){
            console.error("Erro ao cadastrar o sensor", error);
        }
    }
    return(
        <main className={estilos.container}>
            <h1> Cadastro de Sensores</h1>
            <form className={estilos.formulario} onSubmit={handleSbmit(obterDadosFormulario)}>
                <select{...register('tipo')} className={estilos.campo}>
                <option value= "">Selecione um tipo</option>
                <option value= "Temperatura">Temperatura</option>
                <option value= "Contador">Contador</option>
                <option value= "Luminosidade">Luminosidade</option>
                <option value= "Umidade">Umidade</option>
                </select>
                {errors.tipo && <p>{errors.tipo.message}</p>}

                <input 
                    {...register('mac_address')}
                    className={estilos.campo}
                    placeholder= "mac_address"
                />
                {errors.mac_address && <p className={estilos.mensagem}>{errors.mac_address.message}</p>}

                <input 
                    {...register('latitude')}
                    className={estilos.campo}
                    placeholder= "latitude"
                />
                {errors.latitude && <p className={estilos.mensagem}>{errors.latitude.message}</p>}

                <input 
                    {...register('longitude')}
                    className={estilos.campo}
                    placeholder= "longitude"
                />
                {errors.longitude && <p className={estilos.mensagem}>{errors.longitude.message}</p>}
            
                <input 
                    {...register('localizacao')}
                    className={estilos.campo}
                    placeholder= "localizacao"
                />
                {errors.localizacao && <p className={estilos.mensagem}>{errors.localizacao.message}</p>}
            
                <input 
                    {...register('responsavel')}
                    className={estilos.campo}
                    placeholder= "responsavel"
                />
                {errors.responsavel && <p className={estilos.mensagem}>{errors.responsavel.message}</p>}
            
                <input 
                    {...register('unidade_medida')}
                    className={estilos.campo}
                    placeholder= "unidade_medida"
                />
                {errors.unidade_medida && <p className={estilos.mensagem}>{errors.unidade_medida.message}</p>}
                <label className={estilos.check}>
                Status Operacional:
                <input {...register('status_operacional')} type="checkbox" /> 
                </label>

                <textarea {...register('observacao')}
                    className={estilos.campo}
                    placeholder='Observação'/>
                    {errors.onservacao &&<p className={estilos.mensagem}>{errors}</p>}

            
            
            </form>

        </main>
    )
}