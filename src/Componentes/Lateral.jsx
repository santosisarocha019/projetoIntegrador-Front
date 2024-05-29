import estilos from './Lateral.module.css'
import { Link } from 'react-router-dom'
import Pro from '../assets/Pro.jpg'

export function Lateral(){
    return(
        <aside className={estilos.conteiner}>
            <header>
                <div className={estilos.perfil}>
                <img className={estilos.avatar} src={Pro}/>
                    <p>Isa</p>                   
                </div>
            </header>
           <section>
                <Link
                    className={estilos.perfil}
                    to='/inicial'>
                Filmes
                </Link>
                <Link
                    className={estilos.perfil}
                    to='/inicial/perfil'>
                Perfil
                </Link>
           </section>
           
        </aside>
    )
}