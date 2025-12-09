import { Typography } from "antd";
const { Title } = Typography;

interface Props {
    children: React.ReactNode;
    nivel?: 1 | 2 | 3 | 4 | 5;
    style?: React.CSSProperties;
    variante?: "default" | "titulo";
}

const Titulo = ({ children, nivel = 3, style, variante = "default" }: Props) => {
    
    const tituloStyleDefault: React.CSSProperties = {
        color: "#8B4513",
        fontFamily: "Playfair Display, serif",
        fontSize: "calc(1.2em + 1.2vw)",
        fontWeight: "bold",
        lineHeight: 1.2,
        marginBottom: 0,
    };

    const estiloFinal =
        variante === "titulo"
            ? { ...tituloStyleDefault, ...style }
            : style;

    return (
        <Title level={nivel} style={estiloFinal}>
            {children}
        </Title>
    );
};

export default Titulo;
