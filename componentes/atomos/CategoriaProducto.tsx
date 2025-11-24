import { Tag } from "antd"

interface Props {
    categoria : string
}

const CategoriaProducto = ({categoria} : Props) => {
    return (
        <Tag color='blue'>{categoria}</Tag>
    )
}

export default CategoriaProducto