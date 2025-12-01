import { Tag } from "antd";

interface BadgeEstadoProps {
    estado: 'pendiente' | 'completada' | 'cancelada';
}

const BadgeEstado = ({ estado }: BadgeEstadoProps) => {
    const colorMap = {
        pendiente: "orange",
        completada: "green",
        cancelada: "red",
    } as const;

    return <Tag color={colorMap[estado]}>{estado.toUpperCase()}</Tag>;
};

export default BadgeEstado;
