import { useState } from "react";
import { CalendarOutlined } from "@ant-design/icons";
import Boton from "componentes/atomos/Boton";
import { useNavigate } from "react-router";

interface Props {
    id?: number;
    imagen: string;
    categoria: string;
    titulo: string;
    fecha: string;
    descripcion?: string;
    esPrincipal?: boolean;
    linkTo?: string;
}

const BlogCard = ({ imagen, categoria, titulo, fecha, descripcion, esPrincipal, linkTo }: Props) => {
    const [hover, setHover] = useState(false);

    const navigate = useNavigate();

    const handleClick = () => {
        if (linkTo) {
            navigate(linkTo);
        }
    };

    const card: React.CSSProperties = {
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        minHeight: esPrincipal ? 480 : 240,
        cursor: "pointer",
    };

    const bg: React.CSSProperties = {
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${imagen})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "transform .5s",
        transform: hover ? "scale(1.05)" : "scale(1)",
    };

    const overlay: React.CSSProperties = {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,.8), rgba(0,0,0,.4), transparent)",
    };

    const content: React.CSSProperties = {
        position: "relative",
        zIndex: 2,
        color: "white",
        padding: esPrincipal ? 40 : 24,
        display: "flex",
        flexDirection: "column",
        gap: 10,
    };

    return (
        <div style={card} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>

            <div style={bg}></div>
            <div style={overlay}></div>

            <div style={content}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{
                        background: "#168B8D",
                        padding: "4px 12px",
                        borderRadius: 8,
                        fontSize: ".75rem",
                        fontWeight: "bold",
                        textTransform: "uppercase"
                    }}>
                        {categoria}
                    </span>

                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <CalendarOutlined /> {fecha}
                    </span>
                </div>

                <h3 style={{ margin: 0, fontSize: esPrincipal ? "2rem" : "1.3rem" }}>
                    {titulo}
                </h3>

                {esPrincipal && descripcion && (
                    <p style={{ opacity: .9, marginTop: 6 }}>{descripcion}</p>
                )}

                <Boton style={{ marginTop: 10, width: "50%", backgroundColor : 'transparent' }} onClick={handleClick}>
                    Leer más
                </Boton>
            </div>
        </div>
    );
};

export default BlogCard;
