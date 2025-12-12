import { Row, Col } from "antd";
import InfoDato from "componentes/moleculas/Cliente/Orden/InfoDato";
import BadgeEstado from "componentes/atomos/BadgeEstado";
import PrecioProducto from "componentes/atomos/PrecioProducto";
import Fecha from "componentes/atomos/Fecha";

interface Props {
    fecha: string;
    total: number;
    metodo_pago: string;
    estado: "pendiente" | "completada" | "cancelada";
}

const InfoOrdenHeader = ({ fecha, total, metodo_pago, estado }: Props) => {


    return (
        <Row gutter={[24, 24]}>

            <Col xs={24} sm={6}>
                <InfoDato label="Fecha" value={<Fecha fecha={fecha} variante="largo"/>} />
            </Col>

            <Col xs={24} sm={6}>
                <InfoDato
                    label="Total"
                    value={<PrecioProducto valor={total} />}
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
