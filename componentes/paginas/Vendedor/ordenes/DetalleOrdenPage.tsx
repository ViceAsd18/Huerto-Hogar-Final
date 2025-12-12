import VendedorLayout from "componentes/layout/VendedorLayout";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Row, Col, Card, Space, Spin, Alert } from "antd";
import { getOrdenById } from "services/orden";
import type { Orden } from "services/orden";

import BadgeEstado from "componentes/atomos/BadgeEstado";
import ResumenTotales from "componentes/moleculas/Vendedor/Orden/ResumenTotales";
import TablaProductos from "componentes/organismo/Vendedor/Productos/TablaProductoDetalle";
import Fecha from "componentes/atomos/Fecha";
import Titulo from "componentes/atomos/Titulo";

const DetalleOrdenPage = () => {
    const { id } = useParams();
    const [orden, setOrden] = useState<Orden | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrden = async () => {
            if (!id) return;

            try {
                const data = await getOrdenById(Number(id));
                setOrden(data);
            } catch (err) {
                setError("No se pudo cargar la orden");
            } finally {
                setLoading(false);
            }
        };

        fetchOrden();
    }, [id]);

    if (loading)
        return (
            <VendedorLayout>
                <Spin size="large" style={{ display: "block", margin: "40px auto" }} />
            </VendedorLayout>
        );

    if (error)
        return (
            <VendedorLayout>
                <Alert type="error" message={error} showIcon />
            </VendedorLayout>
        );

    if (!orden)
        return (
            <VendedorLayout>
                <Alert type="warning" message="Orden no encontrada" />
            </VendedorLayout>
        );

    const subtotal = orden.detalles.reduce((acc, d) => acc + d.subtotal, 0);
    const impuesto = subtotal * 0.19;
    const total = subtotal + impuesto;

    return (
        <VendedorLayout>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>

                <Card style={{ borderRadius: 12, padding: 10 }}>
                    <Row justify="space-between" align="middle">
                        <Col>
                            <Titulo nivel={1} style={{ marginBottom: 10 }}>
                                Orden #{orden.id_venta}
                            </Titulo>
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
