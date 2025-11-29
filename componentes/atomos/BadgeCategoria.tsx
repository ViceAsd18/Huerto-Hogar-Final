import { Tag } from "antd";

interface Props {
    categoria: string;
    color?: string;
}

const BadgeCategoria = ({ categoria, color = "blue" }: Props) => {
    return <Tag color={color}>{categoria}</Tag>;
};

export default BadgeCategoria;
