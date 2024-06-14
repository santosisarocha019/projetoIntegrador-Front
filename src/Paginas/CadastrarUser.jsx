import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import estilos from './CadastrarUser.module.css';
import logoProjeto from '../assets/logo-branco.png';
import { Cabecalho } from "../Componentes/Cabecalho";
import axios from "axios";
import { useState } from "react";

export function Cadastro() {
    const schemaCadastro = z.object({
        usuario: z.string().min(5, 'Mínimo de 5 caracteres').max(10, 'Máximo de 10 caracteres'),
        email: z.string().email('Endereço de e-mail inválido').min(5, 'Mínimo de 5 caracteres'),
        senha: z.string().min(6, 'Mínimo de 6 caracteres').max(20, 'Máximo de 20 caracteres'),
        confirmarSenha: z.string().min(6, 'Mínimo de 6 caracteres').max(20, 'Máximo de 20 caracteres')
    }).superRefine(({ senha, confirmarSenha }, context) => {
        if (senha !== confirmarSenha) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: "As senhas não coincidem",
                path: ["confirmarSenha"]
            });
        }
    });

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: zodResolver(schemaCadastro)
    });

    const senha = watch('senha', '');
    const confirmarSenha = watch('confirmarSenha', '');

    async function handleCadastro(data) {
        try {
            console.log("Dados do formulário:", data);
            const token = localStorage.getItem('access_token');
            if (!token) {
                alert("Token de acesso não encontrado. Por favor, faça login novamente.");
                navigate('/login');
                return;
            }

            const response = await axios.post('https://isarocha.pythonanywhere.com/api/create_user', {
                username: data.usuario,
                email: data.email,
                password: data.senha
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                console.log("Usuário cadastrado com sucesso:", response.data);
                alert("Usuário cadastrado com sucesso!");
                navigate('/inicial');
            } else {
                console.error("Erro no cadastro:", response.data);
                alert("Erro no cadastro: " + response.data.detail);
            }
        } catch (error) {
            console.error("Erro no cadastro:", error.response?.data || error.message);
            alert("Erro no cadastro: " + (error.response?.data?.detail || error.message));
        }
    }

    return (
        <main className={estilos.container}>
            <form className={estilos.formulario} onSubmit={handleSubmit(handleCadastro)}>
                <h2 className={estilos.titulo}>Cadastre um novo usuário</h2>
                
                <input
                    {...register('usuario')}
                    className={estilos.campo}
                    placeholder="Usuário"
                />
                {errors.usuario && (
                    <p className={estilos.erro}>{errors.usuario.message}</p>
                )}

                <input
                    type="email"
                    {...register('email')}
                    className={estilos.campo}
                    placeholder="E-mail"
                />
                {errors.email && (
                    <p className={estilos.erro}>{errors.email.message}</p>
                )}

                <input
                    type="password"
                    {...register('senha')}
                    className={estilos.campo}
                    placeholder="Senha"
                />
                {errors.senha && (
                    <p className={estilos.erro}>{errors.senha.message}</p>
                )}

                <input
                    type="password"
                    {...register('confirmarSenha')}
                    className={estilos.campo}
                    placeholder="Confirmar Senha"
                />
                {errors.confirmarSenha && (
                    <p className={estilos.erro}>{errors.confirmarSenha.message}</p>
                )}

                <button type="submit" className={estilos.botao}>Cadastrar</button>
            </form>
        </main>
    );
}
