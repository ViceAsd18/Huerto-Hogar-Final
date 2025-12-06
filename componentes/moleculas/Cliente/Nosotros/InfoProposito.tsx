import React from "react";
import Titulo from "componentes/atomos/Titulo";
import Texto from "componentes/atomos/Texto";

interface Props {
    icono: React.ReactElement<any>;
    titulo: string;
    parrafo: string;
}

const contenedorStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    boxShadow: '0px 6px 12px rgba(0,0,0,0.08)',
    padding: "40px 30px",
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: '1 1 300px',
    maxWidth: 350
};

const iconStyle: React.CSSProperties = {
    fontSize: 40,
};

const InfoProposito = ({ icono, titulo, parrafo }: Props) => {
    const iconoClonado = React.cloneElement(icono, { style: iconStyle });

    return (
        <div style={contenedorStyle}>
            {iconoClonado}
            <Titulo>{titulo}</Titulo>
            <Texto>{parrafo}</Texto>
        </div>
    );
};

export default InfoProposito;
