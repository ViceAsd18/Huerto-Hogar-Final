import { Card, Row, Col, Typography } from "antd";
import BadgeEstado from "componentes/atomos/BadgeEstado";
import Boton from "componentes/atomos/Boton";
import { useNavigate } from "react-router";
import type { Orden } from "services/orden";

const { Text } = Typography;

const ItemOrdenCliente = ({ orden }: { orden: Orden }) => {
    const navigate = useNavigate();

    return (
        <Card
            bodyStyle={{ padding: "24px" }}
            style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
        >
            <Row align="middle" gutter={[16, 16]}>
                
                <Col xs={12} sm={4}>
                    <Text type="secondary" style={{ fontSize: 12 }}>ID</Text>
                    <div style={{ fontWeight: "bold", fontSize: 16 }}>#{orden.id_venta}</div>
                </Col>

                <Col xs={12} sm={6}>
                    <Text type="secondary" style={{ fontSize: 12 }}>Fecha</Text>
                    <div style={{ fontSize: 16 }}>
                        {new Date(orden.fecha_venta).toLocaleDateString("es-CL")}
                    </div>
                </Col>

                <Col xs={12} sm={4}>
                    <Text type="secondary" style={{ fontSize: 12 }}>Total</Text>
                    <div style={{ fontWeight: "bold", fontSize: 16 }}>
                        ${orden.total.toLocaleString("es-CL")}
                    </div>
                </Col>

                <Col xs={12} sm={6}>
                <Text type="secondary" style={{ fontSize: 12 }}>Estado</Text>
                    <div>
                        <BadgeEstado estado={orden.estado}/>
                    </div>
                </Col>

                <Col xs={24} sm={4} style={{ textAlign: "right" }}>
                    <Boton onClick={() => navigate(`/cliente/orden/${orden.id_venta}`)} color="#1E90FF" style={{ border: "none", fontWeight: 600 }}>
                        Ver detalle
                    </Boton>
                </Col>
            </Row>
        </Card>
    );
};

export default ItemOrdenCliente;
