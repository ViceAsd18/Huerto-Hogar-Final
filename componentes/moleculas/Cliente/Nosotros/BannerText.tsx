import Titulo from "componentes/atomos/Titulo";
import Texto from "componentes/atomos/Texto";

interface Props {
    titulo: string;
    subtitulo: string;
}

const contenedorStyle : React.CSSProperties = {
    maxWidth : '1400px',
    textAlign : 'center',
}

const tituloStyle : React.CSSProperties = {
    fontSize : 'clamp(2rem, 4vw, 3.5rem)',
    fontWeight : 700,
    color : '#FFFFFF',
    textAlign: "center",
    marginBottom: 10,
    textShadow: "0px 3px 10px rgba(0,0,0,0.4)"  
}

const parrafoStyle : React.CSSProperties = {
    fontSize : 'clamp(1rem, 2vw, 1.5rem)',
    lineHeight : 1.6,
    color : 'rgba(255,255,255,0.65)',
    maxWidth: 900,
    margin: "10px auto 0 auto",
    textAlign: "center",
    textShadow: "0px 2px 8px rgba(0,0,0,0.3)"
}

const BannerText = ({ titulo, subtitulo }: Props) => {
    return (
        <div style={contenedorStyle}>
            <Titulo nivel={1} style={tituloStyle}>{titulo}</Titulo>
            <Texto style={parrafoStyle}>{subtitulo}</Texto>
        </div>
    );
};

export default BannerText;
