import { Row, Col } from "antd";
import InfoDato from "componentes/moleculas/Cliente/InfoDato";
import BadgeEstado from "componentes/atomos/BadgeEstado";

interface Props {
    fecha: string;
    total: number;
    metodo_pago: string;
    estado: "pendiente" | "completada" | "cancelada";
}

const InfoOrdenHeader = ({ fecha, total, metodo_pago, estado }: Props) => {

    const fechaFormateada = new Date(fecha).toLocaleDateString("es-CL", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <Row gutter={[24, 24]}>

            <Col xs={24} sm={6}>
                <InfoDato label="Fecha" value={fechaFormateada} />
            </Col>

            <Col xs={24} sm={6}>
                <InfoDato
                    label="Total"
                    value={`$${total.toLocaleString("es-CL")}`}
                />
            </Col>  

            <Col xs={24} sm={6}>
                <InfoDato label="Método de Pago" value={metodo_pago} />
            </Col>

            <Col xs={24} sm={6} style={{ textAlign: "right" }}>
                <BadgeEstado estado={estado} />
            </Col>

        </Row>
    );
};

export default InfoOrdenHeader;
