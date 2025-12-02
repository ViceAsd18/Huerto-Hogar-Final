import VendedorLayout from "componentes/layout/VendedorLayout";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Row, Col, Card, Space } from "antd";
import { getOrdenes } from "services/orden";
import type { Orden } from "services/orden";

import BadgeEstado from "componentes/atomos/BadgeEstado";
import ResumenTotales from "componentes/moleculas/Vendedor/ResumenTotales";
import TablaProductos from "componentes/organismo/Vendedor/TablaProductoDetalle";
import Fecha from "componentes/atomos/Fecha";
import Titulo from "componentes/atomos/Titulo";

const DetalleOrdenPage = () => {
    const { id } = useParams();
    const [orden, setOrden] = useState<Orden | null>(null);

    useEffect(() => {
    const fetchOrden = async () => {
        const ordenes = await getOrdenes();
        const ord = ordenes.find(o => o.id_venta === Number(id));
        setOrden(ord || null);
    };
    fetchOrden();
    }, [id]);

    if (!orden) return <VendedorLayout><h1>Orden no encontrada</h1></VendedorLayout>;

    const subtotal = orden.detalles.reduce((acc, d) => acc + d.subtotal, 0); // suma de productos
    const impuesto = subtotal * 0.19; // 19% del subtotal
    const total = subtotal + impuesto; // total final





    return (
        <VendedorLayout>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Card style={{ borderRadius: 12, padding: 10 }}>
                    <Row justify="space-between" align="middle">
                        <Col>
                            <Titulo nivel={1} style={{marginBottom : 10 }}>Orden #{orden.id_venta}</Titulo>
                                <BadgeEstado estado={orden.estado} />
                            <p style={{ marginTop: 8 }}>Cliente: {orden.usuario.nombre}</p>
                            <Fecha fecha={orden.fecha_venta} variante="corto" />
                        </Col>
                    </Row>
                </Card>

                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={16}>
                        <Card title="Productos" style={{ borderRadius: 12 }}>
                            <TablaProductos detalles={orden.detalles} />
                        </Card>
                    </Col>

                    <Col xs={24} lg={8}>
                        <ResumenTotales subtotal={subtotal} impuesto={impuesto} total={total} />
                    </Col>
                </Row>
            </Space>
        </VendedorLayout>
  );
};

export default DetalleOrdenPage;
