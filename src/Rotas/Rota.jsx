import { Routes, Route } from "react-router-dom";
import { Inicial } from "../Paginas/Inicial";
import { Login } from "../Paginas/Login";
import { Sensor } from "../Paginas/Sensor";

export function Rotas(){
    return(
        <Routes>
            <Route path='/' element={ <Login/>}/>
            <Route path='inicial' element={< Inicial/>}>
                <Route index element={<Sensor/>}/>
                
            </Route>
        </Routes>
    )
}