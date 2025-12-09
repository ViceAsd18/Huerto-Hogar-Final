import { Form, Input, Button, Card, Select } from "antd";
import Titulo from "componentes/atomos/Titulo";
import { useNavigate } from "react-router";
import { useAuth } from "auth/AuthContext";

interface Props {
    onSubmit: (nombre: string, email: string, password: string, rol?: string) => void;
    loading?: boolean;
}

const RegisterForm = ({ onSubmit, loading = false }: Props) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { user, loading: authLoading } = useAuth();

    // Mientras carga el AuthContext, no renderizamos nada
    if (authLoading) return null;

    // Solo mostrar select si hay usuario logueado y es admin
    const mostrarSelectRol = !!user && user.rol === "admin";

    const colors = {
        primary: "#2690ed",
        text: "#0d151b",
        textSecondary: "#4c759a",
        border: "#cfdce7",
        bgLight: "#ffffff",
        shadow: "0 4px 16px rgba(0,0,0,0.06)"
    };

    const styles: Record<string, React.CSSProperties> = {
        pageContainer: {
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f6f7f8",
            padding: 16
        },
        card: {
            width: 420,
            padding: "40px 32px",
            borderRadius: 16,
            boxShadow: colors.shadow,
            border: `1px solid ${colors.border}`,
            background: colors.bgLight
        },
        title: {
            textAlign: "center",
            fontSize: 26,
            fontWeight: 700,
            marginBottom: 28,
            color: colors.text
        },
        input: { height: 46, borderRadius: 8 },
        button: { height: 46, borderRadius: 8, fontSize: 16, fontWeight: 600, background: colors.primary },
        loginLink: { color: colors.primary, fontWeight: 600, cursor: "pointer" },
        footer: { marginTop: 20, textAlign: "center", fontSize: 14, color: colors.textSecondary }
    };

    const handleSubmit = async (values: any) => {
        // Si no es admin, el rol por defecto será "cliente"
        const rol = mostrarSelectRol ? values.rol : "cliente";
        onSubmit(values.nombre, values.email, values.password, rol);
        form.resetFields();
    };

    return (
        <div style={styles.pageContainer}>
            <Card style={styles.card}>
                <Titulo nivel={3} style={styles.title}>
                    Crea tu cuenta
                </Titulo>

                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        label="Nombre"
                        name="nombre"
                        rules={[{ required: true, message: "Ingresa tu nombre" }]}
                    >
                        <Input placeholder="Tu nombre" style={styles.input} />
                    </Form.Item>

                    <Form.Item
                        label="Correo electrónico"
                        name="email"
                        rules={[
                            { required: true, message: "Ingresa tu correo" },
                            { type: "email", message: "Correo inválido" }
                        ]}
                    >
                        <Input placeholder="ejemplo@correo.com" style={styles.input} />
                    </Form.Item>

                    <Form.Item
                        label="Contraseña"
                        name="password"
                        rules={[{ required: true, message: "Ingresa tu contraseña" }]}
                    >
                        <Input.Password placeholder="********" style={styles.input} />
                    </Form.Item>

                    {mostrarSelectRol && (
                        <Form.Item
                            label="Rol"
                            name="rol"
                            rules={[{ required: true, message: "Selecciona un rol" }]}
                        >
                            <Select>
                                <Select.Option value="cliente">Cliente</Select.Option>
                                <Select.Option value="admin">Admin</Select.Option>
                                <Select.Option value="empleado">Vendedor</Select.Option>
                            </Select>
                        </Form.Item>
                    )}

                    <Button type="primary" htmlType="submit" block loading={loading} style={styles.button}>
                        Registrarse
                    </Button>
                </Form>

                <p style={styles.footer}>
                    ¿Ya tienes cuenta?{" "}
                    <span style={styles.loginLink} onClick={() => navigate("/login")}>
                        Inicia sesión
                    </span>
                </p>
            </Card>
        </div>
    );
};

export default RegisterForm;
