import { Card, Table } from "antd";
import Titulo from "componentes/atomos/Titulo";


export interface Venta {
    key: string;
    idOrden: string;
    fecha: string;
    cantidad: number;
    precioTotal: string;
}

interface HistorialVentasProps {
    ventas: Venta[];
}

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

const HistorialVentas = ({ ventas }: HistorialVentasProps) => {
    return (
        <div style={{ marginTop: 40 }}>
            <Titulo nivel={3}>Historial de Ventas</Titulo>
            <Card 
                style={{ 
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
                bodyStyle={{ padding: 0 }}
            >
                <Table
                    columns={columnas}
                    dataSource={ventas}
                    pagination={false}
                    size="middle"
                    style={{overflow : 'auto'}}
                />
            </Card>
        </div>
    );
};

export default HistorialVentas;
