import { useNavigate } from "react-router";
import { Row, Col, Card, Typography, Divider, Button, InputNumber, Empty, message } from "antd";
import { DeleteOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import ClienteLayout from "componentes/layout/ClienteLayout";
import Imagen from "componentes/atomos/Imagen";
import { useCart } from "auth/CartContext";
import { useAuth } from "auth/AuthContext";
import { actualizarOrden, crearOrden } from "services/orden";

const { Title, Text } = Typography;

const CarritoClientePage = () => {
    const { carrito, actualizarCantidad, eliminarDelCarrito, total, limpiarCarrito } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const costoEnvio = 3500;
    const totalFinal = total + costoEnvio;

    const handleFinalizarCompra = async () => {
        if (!user) {
            message.warning("Inicia sesión para terminar tu compra");
            navigate("/login");
            return;
        }

        try {
            const detalles = carrito.map(item => ({
                productoId: item.id_producto,
                cantidad: item.cantidad,
                subtotal: item.precio * item.cantidad
            }));


            await crearOrden({
                usuarioId: user.id_usuario,
                fecha_venta: new Date().toISOString(),
                total: totalFinal,
                estado:"completada",
                metodo_pago: "efectivo",
                detalles: detalles
            });

            message.success("¡Pedido recibido con éxito!");
            limpiarCarrito();
            navigate("/cliente/mis-ordenes");


        } catch (error) {
            console.error(error);
            message.error("Error al procesar la compra");
        }
    };

    const cardStyle: React.CSSProperties = {
        borderRadius: 16,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        border: "none",
        marginBottom: 16
    };

    const tituloStyle: React.CSSProperties = {
        fontFamily: "serif",
        color: "#5e4033",
        marginBottom: 24
    };

    return (
        <ClienteLayout>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px" }}>

                <Title level={1} style={tituloStyle}>Tu Carrito de Compras</Title>

                {carrito.length === 0 ? (
                    <Card style={{...cardStyle, textAlign: 'center', padding: 40}}>
                        <Empty description="Tu carrito está vacío" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        <Button type="primary" onClick={() => navigate("/cliente/tienda")} style={{marginTop: 20}}>
                            Ir a la Tienda
                        </Button>
                    </Card>
                ) : (
                    <Row gutter={32}>

                        <Col xs={24} lg={15}>
                            <Card style={cardStyle} bodyStyle={{ padding: "10px 24px" }}>
                                {carrito.map((item, index) => (
                                    <div key={item.id_producto}>
                                        <div style={{ display: "flex", padding: "24px 0", alignItems: "center", gap: 16 }}>

                                            <div style={{ width: 80, height: 80, flexShrink: 0 }}>
                                                <Imagen
                                                    src={`/assets/img/productos/${item.nombre_producto?.toLowerCase().replace(/\s+/g, "_")}.jpg`}
                                                    style={{ borderRadius: 12, objectFit: "cover", height: "100%" }}
                                                />
                                            </div>

                                            <div style={{ flex: 1 }}>
                                                <Text strong style={{ fontSize: 16, color: "#5e4033", display: "block" }}>
                                                    {item.nombre_producto}
                                                </Text>
                                                <Text type="secondary">
                                                    ${item.precio.toLocaleString("es-CL")} / un
                                                </Text>
                                                <div style={{ marginTop: 4 }}>
                                                    <Text strong style={{ color: "#d9534f" }}>
                                                        Total: ${(item.precio * item.cantidad).toLocaleString("es-CL")}
                                                    </Text>
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                                <InputNumber
                                                    min={1}
                                                    max={item.stock}
                                                    value={item.cantidad}
                                                    onChange={(val) => actualizarCantidad(item.id_producto, val || 1)}
                                                    style={{ width: 60 }}
                                                />
                                                <Button
                                                    type="text"
                                                    icon={<DeleteOutlined />}
                                                    danger
                                                    onClick={() => eliminarDelCarrito(item.id_producto)}
                                                />
                                            </div>
                                        </div>
                                        {index < carrito.length - 1 && <Divider style={{ margin: 0 }} />}
                                    </div>
                                ))}
                            </Card>

                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
                                <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate("/cliente/tienda")} style={{ color: "#8c6b5d" }}>
                                    Seguir comprando
                                </Button>
                                <Button type="text" danger onClick={limpiarCarrito}>
                                    Vaciar carrito
                                </Button>
                            </div>
                        </Col>


                        <Col xs={24} lg={9}>
                            <Card style={cardStyle} bodyStyle={{ padding: 24 }}>
                                <Title level={3} style={{ ...tituloStyle, fontSize: 22, marginTop: 0 }}>
                                    Resumen de compra
                                </Title>

                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                                    <Text type="secondary">Subtotal</Text>
                                    <Text strong>${total.toLocaleString("es-CL")}</Text>
                                </div>

                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                                    <Text type="secondary">Envío (Estimado)</Text>
                                    <Text strong>${costoEnvio.toLocaleString("es-CL")}</Text>
                                </div>

                                <Divider />

                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24, alignItems: "center" }}>
                                    <Text strong style={{ fontSize: 18, color: "#5e4033" }}>Total</Text>
                                    <div style={{ background: "#DAA520", padding: "4px 12px", borderRadius: 6, color: "#fff", fontWeight: "bold" }}>
                                        ${totalFinal.toLocaleString("es-CL")}
                                    </div>
                                </div>

                                <Button
                                    type="primary"
                                    block
                                    size="large"
                                    onClick={handleFinalizarCompra}
                                    style={{
                                        backgroundColor: "#2E8B57",
                                        borderColor: "#2E8B57",
                                        height: 50,
                                        fontSize: 16,
                                        borderRadius: 8,
                                        fontWeight: 600
                                    }}
                                >
                                    Finalizar Compra
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                )}
            </div>
        </ClienteLayout>
    );
};

export default CarritoClientePage;