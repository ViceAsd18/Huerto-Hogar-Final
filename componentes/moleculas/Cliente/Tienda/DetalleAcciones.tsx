import React, { useState } from "react";
import Boton from "componentes/atomos/Boton";
import { InputNumber } from "antd";
import Texto from "componentes/atomos/Texto";

interface Props {
    stock? : number
    onAgregar? : (cantidad : number) => void;
    style? : React.CSSProperties;
}

const DetalleAcciones = ({ stock = 20, onAgregar } : Props) => {

    const [cantidad, setCantidad] = useState(1);

    const handleAgregar = () => {
        if (onAgregar) onAgregar(cantidad);
    }

    return (
        <div style={{ display : 'flex', flexDirection : 'column', gap : 16}}>
            
            <Texto>Stock: {stock} kg disponible</Texto>
            <div style={{display : 'flex', alignItems : 'center', gap : 40}}>
                <InputNumber
                    min={1}
                    max={stock}
                    value={cantidad}
                    onChange={(v) => {
                        setCantidad(v as number);
                    }}
                    style={{width : 100, border : 12}}
                >
                
                </InputNumber>
                <Boton onClick={handleAgregar} color="#4CAF50" style={{width : '100%', padding : '3%'}}>Agregar</Boton>

            </div>

        </div>
    )

}

export default DetalleAcciones