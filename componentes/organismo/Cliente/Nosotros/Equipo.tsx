import React from "react";
import TeamCard from "componentes/moleculas/Cliente/Nosotros/TeamCard";
import Titulo from "componentes/atomos/Titulo";

const contenedorEquipo: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    gap: 60,
    flexWrap: 'wrap',
    marginTop: 20
};

const Equipo = () => {
    return (
        <div style={{ padding: "60px 20px", backgroundColor: "#FAFAFA", borderRadius: 12 }}>
            <Titulo nivel={2} style={{textAlign : 'center'}}>El equipo detrás del proyecto</Titulo>

            <div style={contenedorEquipo}>
                <TeamCard
                    src="https://i.pravatar.cc/300?img=11"
                    nombre="Vicente Ramírez Garay"
                    rol="Frontend"
                />
                <TeamCard
                    src="https://i.pravatar.cc/300?img=5"
                    nombre="Camila Soto Rojas"
                    rol="Fullstack"
                />
                <TeamCard
                    src="https://i.pravatar.cc/300?img=3"
                    nombre="Joaquín Muñoz"
                    rol="Backend"
                />
            </div>
        </div>
    );
};

export default Equipo;
