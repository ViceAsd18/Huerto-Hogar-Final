import { useNavigate } from "react-router";
import { message } from "antd";
import RegisterForm from "componentes/organismo/RegistroForm";
import { registerRequest } from "services/auth";
import { useAuth } from "auth/AuthContext";

const RegistroPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth(); // usuario logueado (puede ser null si nadie está logueado)

    const handleRegister = async (
        nombre: string,
        email: string,
        password: string,
        rol?: string
    ) => {
        const hide = message.loading("Registrando usuario...", 0);
        try {
            await registerRequest(nombre, email, password, rol || "cliente");
            hide();
            message.success("Registro exitoso.");

            // decidir la navegación según rol del usuario logueado
            if (user?.rol === "admin") {
                navigate("/usuarios");
            } else {
                navigate("/login");
            }
        } catch (error: any) {
            hide();
            message.error(error.response?.data?.message || "Error al registrar usuario");
        }
    };

    return <RegisterForm onSubmit={handleRegister} />;
};

export default RegistroPage;
