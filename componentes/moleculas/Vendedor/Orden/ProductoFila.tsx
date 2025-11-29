import React, { useState } from "react";
import { Row, Col, Space, InputNumber, Tag, Typography } from "antd";
import Boton from "componentes/atomos/Boton";
import type { Producto } from "modelo/productoModel";
import BadgeStock from "componentes/atomos/BadgeStock";
import BadgeCategoria from "componentes/atomos/BadgeCategoria";
import Imagen from "componentes/atomos/ImagenProducto";
import type { Color } from "antd/es/color-picker";

type Props = {
    producto: Producto;
    onAgregar: (producto: Producto, cantidad: number) => void;
};

const rowStyle = {
    marginBottom: 10,
    background: "#fff",
    borderRadius: 8,
    border: "1px solid #f0f0f0",
    padding: 12,
}

const contenedorBtn : React.CSSProperties = {
    display : 'flex',
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 12,
    marginTop: 10,
}


const ProductoFila = ({ producto, onAgregar }: Props) => {
    return (
        <Row align="middle" justify="space-between" style={rowStyle}>
            <Col flex="1 1 auto">
                <Space align="start">
                    <Imagen
                        src={producto.imagen}
                        alt={producto.nombre}
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 6,
                            objectFit: "cover"
                        }}
                    />
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>
                            {producto.nombre}
                        </div>

                        <div style={{ marginTop: 6 , gap: 6, display: "flex", alignItems: "center"  }}>
                            <BadgeCategoria categoria={producto.categoria}/>
                            <BadgeStock stock={producto.stock}></BadgeStock>
                        </div>
                    </div>
                </Space>
            </Col>

            <Col style={{ minWidth: 220 }}>
                <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>
                        ${producto.precio.toFixed(2)}
                    </div>

                    <div style={contenedorBtn}>
                        <Boton onClick={() => onAgregar(producto, 1)} color="#2690ed" >
                            Agregar
                        </Boton>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default ProductoFila;
