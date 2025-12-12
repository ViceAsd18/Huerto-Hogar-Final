import Texto from "componentes/atomos/Texto";

interface InfoDatoProps {
    label: string;
    value: React.ReactNode;
}

const InfoDato = ({ label, value }: InfoDatoProps) => {
    return (
        <div>
            <Texto type="secondary">{label}</Texto>
            <div style={{ fontSize: 16, fontWeight: 500 }}>
                {value}
            </div>
        </div>
    );
};

export default InfoDato;
