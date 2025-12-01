// componentes/organismos/Cliente/ListaProductosOrden.tsx
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

export interface ProductoDetalle {
    id_detalle: number;
    cantidad: number;
    producto: {
        id_producto: number;
        nombre_producto: string;
        precio: number;
        descripcion_producto?: string;
        stock?: number;
    };
}

interface Props {
    detalles: ProductoDetalle[];
}

const ListaProductosOrden = ({ detalles }: Props) => {
    const columns: ColumnsType<ProductoDetalle> = [
        {
            title: "Producto",
            dataIndex: "producto",
            key: "producto",
            render: (_, record) => (
                <span style={{ fontWeight: 500 }}>{record.producto.nombre_producto}</span>
            ),
        },
        {
            title: "Cantidad",
            dataIndex: "cantidad",
            key: "cantidad",
            align: "center",
        },
        {
            title: "Precio Unitario",
            key: "precio",
            render: (_, record) => `$${record.producto.precio.toLocaleString("es-CL")}`,
            align: "right",
        },
        {
            title: "Subtotal",
            key: "subtotal",
            align: "right",
            render: (_, record) => (
                <b>${(record.producto.precio * record.cantidad).toLocaleString("es-CL")}</b>
            ),
        },
    ];

    return <Table dataSource={detalles} columns={columns} pagination={false} rowKey={(r) => r.id_detalle} />;
};

export default ListaProductosOrden;
