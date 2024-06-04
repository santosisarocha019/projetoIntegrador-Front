import { Routes, Route } from "react-router-dom";
import { Inicial } from "../Paginas/Inicial";
import { Login } from "../Paginas/Login";
import { Sensor } from "../Paginas/Sensor";
import {CadastroSensor} from "../Paginas/CadastroSensor";
import { AlteraSensor } from "../Paginas/AlteraSensor";


export function Rotas(){
    return(
        <Routes>
            <Route path='/' element={ <Login/>}/>
            <Route path='inicial' element={< Inicial/>}>
                <Route index element={<Sensor/>}/>
                <Route path="cadsensor" element={<CadastroSensor/>}/>
                <Route path="alterar-sensor/:id" element={<AlteraSensor/>}/>

                
            </Route>
        </Routes>
    )
}