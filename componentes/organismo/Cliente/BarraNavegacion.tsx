import Imagen from "componentes/atomos/Imagen";
import AccionesUsuario from "componentes/moleculas/BarraNavegacion/AccionesCliente";
import MenuCliente from "componentes/moleculas/BarraNavegacion/MenuCliente";
import { useNavigate } from "react-router";

const logoHuerto = '/assets/img/logo-huerto-hogar.png';

const barraStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
};

const centroMenuStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
};

const logoStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
};

const BarraNavegacion = () => {
    const navigate = useNavigate();

    return (
        <div style={barraStyle}>

            <div style={logoStyle} onClick={() => navigate("/cliente/home_cliente")}>
                <Imagen src={logoHuerto} width="100px" />
            </div>

            <div style={centroMenuStyle}>
                <MenuCliente />
            </div>

            <div>
                <AccionesUsuario />
            </div>
        </div>
    );
};

export default BarraNavegacion;
