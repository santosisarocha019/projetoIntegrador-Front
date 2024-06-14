import { Routes, Route } from "react-router-dom";
import { Inicial } from "../Paginas/Inicial";
import { Login } from "../Paginas/Login";
import { Sensor } from "../Paginas/Sensor";
import {CadastrarSensor} from "../Paginas/CadastroSensor";
import { AlteraSensor } from "../Paginas/AlteraSensor";
import { Localizacao } from '../Paginas/Localizacao';
import { SensorChart } from "../Paginas/SensorChart";
import { Cadastro } from "../Paginas/CadastrarUser";


export function Rotas(){
    return(
        <Routes>
            <Route path='/' element={ <Login/>}/>
            <Route path='inicial' element={< Inicial/>}>
                <Route index element={<Sensor/>}/>
                <Route path="cadsensor" element={<CadastrarSensor/>}/>
                <Route path="alterar-sensor/:id" element={<AlteraSensor/>}/>
                <Route path='localizacao' element={ <Localizacao /> } />
                <Route path="grafico-sensores" element={<SensorChart />} />
                <Route path="cadastro-usuario" element={<Cadastro />} />

                
            </Route>
        </Routes>
    )
}