import BannerText from "componentes/moleculas/Cliente/Nosotros/BannerText";

interface HeroProps {
    background: string;
    titulo: string;
    subtitulo: string;
}

const heroStyle = (background: string): React.CSSProperties => ({
    width: "100%",
    minHeight: "60vh",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "40px 20px",
});

const overlayStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,               // top:0, bottom:0, left:0, right:0
    backgroundColor: "rgba(0, 0, 0, 0.45)",  // overlay oscuro suave
};

const contentStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 2,
};

const Hero = ({ background, titulo, subtitulo }: HeroProps) => {
    return (
        <section style={heroStyle(background)}>
            <div style={overlayStyle} />
            <div style={contentStyle}>
                <BannerText titulo={titulo} subtitulo={subtitulo} />
            </div>
        </section>
    );
};

export default Hero;
