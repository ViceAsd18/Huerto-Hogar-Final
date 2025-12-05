import InfoItem from "componentes/moleculas/Cliente/Contacto/InfoItem";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Titulo from "componentes/atomos/Titulo";

const contenedorStlye : React.CSSProperties = {
    backgroundColor: "#fff",
    padding: '7%',
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    gap: 40,
    height: "100%",
    maxWidth: 450,
    boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
}

const contendorImagenStyle : React.CSSProperties = {
    backgroundColor: "#23859A",
    height: 300,
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
}

const PanelInformacion = () => {
    return (
        <div style={contenedorStlye}>
            <Titulo nivel={3} style={{marginBottom : 0}}>Información</Titulo>

            <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
                <InfoItem
                    icon={<MailOutlined style={{ fontSize: 22, color: "#168B8D" }} />}
                    label="Email"
                    value="contacto@huertohogar.cl"
                />

                <InfoItem
                    icon={<PhoneOutlined style={{ fontSize: 22, color: "#168B8D" }} />}
                    label="Teléfono"
                    value="+56 9 1234 5678"
                />

                <InfoItem
                    icon={<EnvironmentOutlined style={{ fontSize: 22, color: "#168B8D" }} />}
                    label="Ubicación"
                    value="Av. Providencia 1234, Santiago"
                />
            </div>

            <div style={contendorImagenStyle}>
                <img
                    src="/assets/img/nosotros/mapa-chile.png"
                    alt="Mapa"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        opacity: 0.9,
                    }}
                />
            </div>
        </div>
    );
};

export default PanelInformacion;
