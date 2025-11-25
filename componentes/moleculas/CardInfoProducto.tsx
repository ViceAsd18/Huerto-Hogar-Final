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
            style={{
                width: '100%',
                maxWidth: '400px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '1px solid #d9d9d9'
            }}
            bodyStyle={{ padding: '24px' }}
        >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                        <Title level={2} style={{ margin: '0 0 8px 0', fontSize: '24px' }}>
                            {producto.nombre}
                        </Title>
                        <div style={{ marginBottom: '16px' }}>
                            <CategoriaProducto categoria={producto.categoria}/>
                        </div>
                    </div>
                    <div>
                        <BadgeStock stock={producto.stock}/>
                    </div>
                </div>

                <div>
                    <Text style={{ 
                        color: "#1890ff", 
                        fontWeight: 900, 
                        fontSize: '2.5rem',
                        display: 'block',
                        marginBottom: '16px'
                    }}>
                        ${producto.precio.toLocaleString("es-CL", { minimumFractionDigits: 2 })}
                    </Text>
                </div>

                <div>
                    <Text style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                        {producto.descripcion}
                    </Text>
                </div>

                <Divider />

                <div>
                    <Title level={4} style={{ marginBottom: '12px' }}>Detalles Adicionales</Title>
                    <Space direction="vertical" style={{ width: '100%' }} size="small">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text type="secondary">SKU:</Text>
                            <Text strong>{producto.sku || 'N/A'}</Text>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text type="secondary">Marca:</Text>
                            <Text strong>{producto.marca || 'N/A'}</Text>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text type="secondary">Proveedor:</Text>
                            <Text strong>{producto.proveedor || 'N/A'}</Text>
                        </div>
                    </Space>
                </div>
            </Space>
        </Card>
    );
};

export default CardInfoProducto;