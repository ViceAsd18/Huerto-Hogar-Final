import { ArrowLeftOutlined, CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

interface Props {
    imagen: string;
    categoria: string;
    titulo: string;
    fecha: string;
    autor: string;
}

const BlogBanner = ({imagen,categoria,titulo,fecha,autor}: Props) => {

    const navigate = useNavigate();

    const bannerStyle: React.CSSProperties = {
        width: "100%",
        height: "60vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${imagen})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
        color: "#fff",
    };

    return (
        <div style={bannerStyle}>
            <div style={{ maxWidth: 900 }}>

                <span
                    onClick={() => navigate('/cliente/blogs')}
                    style={{
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        opacity: 0.9,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        borderBottom: "1px solid rgba(255,255,255,0.5)",
                        paddingBottom: 3
                    }}
                >
                    <ArrowLeftOutlined /> VOLVER AL BLOG
                </span>

                <br/><br />

                <span
                    style={{
                        backgroundColor: "#168B8D",
                        padding: "6px 16px",
                        borderRadius: 50,
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        display: "inline-block",
                        marginBottom: 15,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
                    }}
                >
                    {categoria}
                </span>

                <h1
                    style={{
                        fontFamily: "Playfair Display, serif",
                        fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
                        margin: "10px 0 20px 0",
                        lineHeight: 1.1,
                        fontWeight: 700,
                        textShadow: "0 2px 10px rgba(0,0,0,0.5)"
                    }}
                >
                    {titulo}
                </h1>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "30px",
                        fontSize: "0.95rem",
                        opacity: 0.95
                    }}
                >
                    <span><CalendarOutlined /> {fecha}</span>
                    <span><UserOutlined /> {autor}</span>
                </div>
            </div>
        </div>
    );
};

export default BlogBanner;
