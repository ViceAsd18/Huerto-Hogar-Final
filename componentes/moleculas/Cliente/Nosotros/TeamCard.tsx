import Imagen from "componentes/atomos/Imagen";
import Titulo from "componentes/atomos/Titulo";
import Texto from "componentes/atomos/Texto";

interface Props {
    src: string;
    nombre: string;
    rol: string;
}

const cardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: 250
};

const imageWrapperStyle: React.CSSProperties = {
    width: 170,
    height: 170,
    borderRadius: '50%',
    overflow: 'hidden',
    border: '3px solid #f0f0f0'
};

const TeamCard = ({ src, nombre, rol }: Props) => {
    return (
        <div style={cardStyle}>
            <div style={imageWrapperStyle}>
                <Imagen src={src} alt={nombre} />
            </div>
            <Titulo style={{ marginBottom: 5 }}>{nombre}</Titulo>
            <Texto  style={{ textAlign: 'center', margin: 0 }}>
                {rol}
            </Texto>
        </div>
    );
};

export default TeamCard;