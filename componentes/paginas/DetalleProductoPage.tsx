// src/pages/DetalleProductoPage.tsx
import VendedorLayout from "componentes/layout/VendedorLayout"
import { productosMock } from "modelo/productoModel";
import { useParams } from "react-router";
import InfoProducto from "componentes/organismo/InfoProducto";
import { Table, Typography, Card } from "antd";

const { Title } = Typography;

// Datos de ejemplo para el historial de ventas
const historialVentas = [
    {
        key: '1',
        idOrden: 'ORD-2024-03A8',
        fecha: '12 de Julio, 2024',
        cantidad: 2,
        precioTotal: '$2,599.98'
    },
    {
        key: '2',
        idOrden: 'ORD-2024-02B1',
        fecha: '05 de Junio, 2024',
        cantidad: 1,
        precioTotal: '$1,299.99'
    },
    {
        key: '3',
        idOrden: 'ORD-2024-01F5',
        fecha: '21 de Mayo, 2024',
        cantidad: 5,
        precioTotal: '$6,499.95'
    }
];

const columnas = [
    {
        title: 'ID de Orden',
        dataIndex: 'idOrden',
        key: 'idOrden',
    },
    {
        title: 'Fecha',
        dataIndex: 'fecha',
        key: 'fecha',
    },
    {
        title: 'Cantidad',
        dataIndex: 'cantidad',
        key: 'cantidad',
        align: 'center' as const,
    },
    {
        title: 'Precio Total',
        dataIndex: 'precioTotal',
        key: 'precioTotal',
        align: 'right' as const,
    },
];

const DetalleProductoPage = () => {
    const { id } = useParams<{ id: string }>();
    const productoEncontrado = productosMock.find(
        (producto) => producto.id === Number(id)
    );

    if (!productoEncontrado){
        return (
            <VendedorLayout>
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <Title level={1}>Producto No Encontrado</Title>
                </div>
            </VendedorLayout>
        );
    }

    return (
        <VendedorLayout>
            <div style={{ padding: '24px' }}>
                <div style={{ marginBottom: '24px' }}>
                    <a href="/productos" style={{ color: '#666', textDecoration: 'none' }}>
                        Productos
                    </a>
                    <span style={{ color: '#666', margin: '0 8px' }}>/</span>
                    <span style={{ color: '#1890ff', fontWeight: 500 }}>
                        {productoEncontrado.nombre}
                    </span>
                </div>

                <InfoProducto producto={productoEncontrado} />

                <div style={{ marginTop: '40px' }}>
                    <Title level={3}>Historial de Ventas</Title>
                    <Card 
                        style={{ 
                            borderRadius: '12px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                        bodyStyle={{ padding: 0 }}
                    >
                        <Table 
                            columns={columnas} 
                            dataSource={historialVentas}
                            pagination={false}
                            size="middle"
                        />
                    </Card>
                </div>
            </div>
        </VendedorLayout>
    );
};

export default DetalleProductoPage;