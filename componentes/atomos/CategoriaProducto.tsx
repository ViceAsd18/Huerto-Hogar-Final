import { Tag } from "antd";

interface Props {
    categoria: string;
    color?: string;
}

const CategoriaProducto = ({ categoria, color = "blue" }: Props) => {
    return <Tag color={color}>{categoria}</Tag>;
};

export default CategoriaProducto;
