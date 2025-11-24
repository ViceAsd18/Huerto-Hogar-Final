// src/componentes/moleculas/CardInfoProducto.tsx
import React from "react";
import { Card, Typography, Space, Divider, Tag } from "antd";
import type { Producto } from "modelo/productoModel";
import BadgeStock from "componentes/atomos/BadgeStock";
import CategoriaProducto from "componentes/atomos/CategoriaProducto";

const { Title, Text } = Typography;

interface CardInfoProductoProps {
    producto: Producto;
}

const CardInfoProducto: React.FC<CardInfoProductoProps> = ({ producto }) => {
    return (
        <Card
            title={<Title level={4}>{producto.nombre}</Title>}
            bordered
            style={{
                maxWidth: 360,
                margin: "20px auto",
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
        >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                <div>
                    <CategoriaProducto categoria={producto.categoria}/>
                </div>

                <div>
                    <BadgeStock stock={producto.stock}></BadgeStock>
                </div>


                <div>
                    <Text style={{ color: "#1890ff", fontWeight: 600, fontSize : '2rem'}}>
                        ${producto.precio.toLocaleString()}
                    </Text>
                </div>


                <div>
                    <Text>{producto.descripcion}</Text>
                </div>
            </Space>
        </Card>
    );
};

export default CardInfoProducto;
