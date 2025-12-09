import { Typography } from "antd";

const { Text } = Typography;

interface Props {
    children: React.ReactNode;
    type?: "secondary" | "warning" | "success" | "danger";
    strong?: boolean;
    style?: React.CSSProperties;
    variante?: "default" | "descripcion" | "detalleSecundario" | "resaltado" | "muted";
}

const Texto = ({
    children,
    type,
    strong = false,
    style,
    variante = "default",
}: Props) => {

    // Estilos base por variante
    const estilosPorVariante: Record<string, React.CSSProperties> = {
        default: {},
        
        descripcion: {
            fontSize: "1.2rem",
            lineHeight: 1.6,
            color: "rgba(0,0,0,0.75)",
        },

        detalleSecundario: {
            fontSize: "0.9rem",
            color: "rgba(0,0,0,0.55)",
        },

        resaltado: {
            fontSize: "1.1rem",
            fontWeight: 500,
        },

        muted: {
            color: "rgba(0,0,0,0.35)",
            fontSize: "0.95rem",
        },
    };

    const estiloFinal = {
        ...estilosPorVariante[variante],
        ...style, 
    };

    return (
        <Text type={type} strong={strong} style={estiloFinal}>
            {children}
        </Text>
    );
};

export default Texto;
