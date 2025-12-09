import { ShoppingCartOutlined, UserOutlined, CarOutlined, SwapOutlined, RetweetOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import IconoRedondo from "componentes/atomos/IconoRedondo";
import { useNavigate } from "react-router";
import { useAuth } from "auth/AuthContext";

const iconStyle: React.CSSProperties = {
    fontSize: 20,
    color: "#2E8B57",
};

const AccionesUsuario = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();


    const cambiarVista = () => {
        if (window.location.pathname.startsWith("/admin")) {
            navigate("/cliente"); 
        } else {
            navigate("/dashboard");
        }
    };


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
            {!user ? (
                <IconoRedondo
                    title="Iniciar Sesión"
                    onClick={() => navigate("/login")}
                    icon={<LoginOutlined style={iconStyle} />}
                />
            ) : (
                <IconoRedondo
                    title="Cerrar Sesión"
                    onClick={() => {
                        logout();
                        navigate("/login");
                    }}
                    icon={<LogoutOutlined style={iconStyle} />}
                />
            )}

            {user?.rol === 'admin' && (
                <IconoRedondo
                    title="Cambiar Vista"
                    onClick={cambiarVista}
                    icon={<RetweetOutlined style={iconStyle} />}
                />
            )}
        </div>
    );
};

export default AccionesUsuario;
