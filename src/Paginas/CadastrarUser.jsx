import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import estilos from './CadastrarUser.module.css';
import logoProjeto from '../assets/logo-branco.png';
import { Cabecalho } from "../Componentes/Cabecalho";
import axios from "axios";

const schemaCadastro = z.object({
    usuario: z.string().min(5, 'Mínimo de 5 caracteres').max(10, 'Máximo de 10 caracteres'),
    email: z.string().email('Endereço de e-mail inválido').min(5, 'Mínimo de 5 caracteres'),
    senha: z.string().min(8, 'Mínimo de 8 caracteres').max(20, 'Máximo de 20 caracteres'),
    confirmarSenha: z.string().refine((value, data) => value === data.senha, {
        message: 'As senhas não coincidem',
        path: ['confirmarSenha']
    })
});

export function Cadastro() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: zodResolver(schemaCadastro)
    });

    const senha = watch('senha', '');
    const confirmarSenha = watch('confirmarSenha', '');

    async function handleCadastro(data) {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post('https://isarocha.pythonanywhere.com/api/create_user', {
                username: data.usuario,
                password: data.senha
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Usuário cadastrado com sucesso:", response.data);
            alert("Usuário cadastrado com sucesso!");
            navigate('/inicial');
        } catch (error) {
            console.error("Erro no cadastro:", error);
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

                {senha !== confirmarSenha && (
                    <p className={estilos.erro}>As senhas não coincidem.</p>
                )}

                <button type="submit" className={estilos.botao}>Cadastrar</button>
            </form>
        </main>
    );
}
