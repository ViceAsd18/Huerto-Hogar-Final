import { SafetyCertificateOutlined, HeartOutlined, GlobalOutlined, CheckCircleOutlined } from "@ant-design/icons";
import Titulo from "componentes/atomos/Titulo";
import InfoProposito from "componentes/moleculas/Cliente/Nosotros/InfoProposito";

const contenedorStyle: React.CSSProperties = {
    width: "100%",
    margin: "0 auto",
    padding: "40px 0px",
    textAlign: "center",
};

const gridStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 30,
    marginTop: 30,
};

const Proposito = () => {
    return (
        <section style={contenedorStyle}>
            <Titulo nivel={2} variante="titulo">Nuestro Propósito</Titulo>

            <div style={gridStyle}>
                <InfoProposito
                    icono={<SafetyCertificateOutlined />}
                    titulo="Frescura Garantizada"
                    parrafo="Productos cosechados en su punto óptimo de frescura y entregados directamente desde el campo."
                />

                <InfoProposito
                    icono={<HeartOutlined />}
                    titulo="Apoyo Local"
                    parrafo="Comprometidos con el desarrollo y el comercio justo para los pequeños agricultores de Chile."
                />

                <InfoProposito
                    icono={<GlobalOutlined />}
                    titulo="Sostenibilidad"
                    parrafo="Practicas agrícolas responsables que cuidan nuestra tierra para las futuras generaciones."
                />

                <InfoProposito
                    icono={<CheckCircleOutlined />}
                    titulo="Calidad Certificada"
                    parrafo="Cumplimos estrictos estándares para garantizar productos seguros, confiables y de alta calidad para tu hogar."
                />

            </div>
        </section>
    );
};

export default Proposito;
