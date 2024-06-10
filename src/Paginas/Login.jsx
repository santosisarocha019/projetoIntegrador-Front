import React from "react";
import axios from 'axios';
import {useForm} from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import estilos from './Login.module.css';
import logo from '../assets/logo-branco.png'

const schemaLogin = z.object({
    usuario: z.string()
        .min(5, "O mínimo de caracteres aceito é 5")
        .max(20, "O máximo de caracteres aceito são 20"),
    senha: z.string()
        .min(3, "Informe ao menos 3 caracteres")
        .max(20, "O máximo de caracteres é de 20 caracteres")
});

export function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schemaLogin)
    });

    async function obterDadosFormulario(data) {
        try {
            const response = await axios.post('https://isarocha.pythonanywhere.com/api/token/', {
                username: data.usuario,
                password: data.senha
            });
            const { access, refresh } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            console.log("Login bem sucedido");
            navigate('/inicial');
        } catch (error) {
            console.log("Erro na autenticação", error);
        }
    }

    return (
    
        <div className={estilos.conteiner}>
            <img className={estilos.logo} src={logo}/>            
            
            <form className={estilos.formulario} onSubmit={handleSubmit(obterDadosFormulario)}>
            <p className={estilos.titulo}>Login</p>
                <input
                    {...register('usuario')}
                    className={estilos.campo}
                    placeholder="Usuário"
                />
                {errors.usuario && (
                    <p className={estilos.erro}>{errors.usuario.message}</p>
                )}
                <input
                    {...register('senha')}
                    type="password"
                    className={estilos.campo}
                    placeholder="Senha"
                />
                {errors.senha && (
                    <p className={estilos.erro}>{errors.senha.message}</p>
                )}
                <button className={estilos.botao}>Entrar</button>
            </form>
        </div>
    );
}
