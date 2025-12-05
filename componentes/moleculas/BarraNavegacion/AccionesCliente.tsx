import { ShoppingCartOutlined, UserOutlined, CarOutlined } from "@ant-design/icons";
import IconoRedondo from "componentes/atomos/IconoRedondo";
import { useNavigate } from "react-router";
import { useAuth } from "auth/AuthContext";

const iconStyle: React.CSSProperties = {
    fontSize: 20,
    color: "#2E8B57",
};

const AccionesUsuario = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            
            <IconoRedondo
                title="Mis Pedidos"
                onClick={() => navigate("/cliente/mis-ordenes")}
                icon={<CarOutlined style={iconStyle} />}
            />

            <IconoRedondo
                title="Ver Carrito"
                onClick={() => navigate(`/cliente/carrito/${user?.id_usuario}`)}
                icon={<ShoppingCartOutlined style={iconStyle} />}
            />

            <IconoRedondo
                title="Mi Cuenta"
                onClick={() => navigate("/login")}
                icon={<UserOutlined style={iconStyle} />}
            />
        </div>
    );
};

export default AccionesUsuario;
