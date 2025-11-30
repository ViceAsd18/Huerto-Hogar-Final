import { useNavigate } from "react-router";
import { message } from "antd";
import RegisterForm from "componentes/organismo/RegistroForm";
import { registerRequest } from "services/auth";

const RegistroPage = () => {
    const navigate = useNavigate();

    const handleRegister = async (nombre: string, email: string, password: string) => {
        const hide = message.loading("Registrando usuario...", 0);
        try {
            await registerRequest(nombre, email, password, "cliente");
            hide();
            message.success("Registro exitoso. Por favor, inicia sesión.");
            navigate("/login");
        } catch (error: any) {
            hide();
            message.error(error.response?.data?.message || "Error al registrar usuario");
        }
    };

    return <RegisterForm onSubmit={handleRegister} />;
};

export default RegistroPage;
