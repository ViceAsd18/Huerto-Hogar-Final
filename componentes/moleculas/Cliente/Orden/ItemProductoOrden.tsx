import ImagenProducto from "../../atomos/Imagen";

interface Props {
    imagen: string;
    nombre: string;
}

const contenedorStyle : React.CSSProperties = {
    width : 60,
    height : 60,
    background : "#f9f9f9",
    borderRadius : 8,
    padding : 4,
    display : "flex",
    alignItems : "center",
    justifyContent : "center",
    border : "1px solid #f0f0f0"
}

const ItemProductoOrden = ({ imagen, nombre }: Props) => {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={contenedorStyle}>
                <ImagenProducto
                    src={imagen}
                    alt={nombre}
                    width="100%"
                    height="100%"
                    style={{ objectFit: "contain" }}
                />
            </div>
            <span style={{ fontWeight: 500 }}>{nombre}</span>
        </div>
    );
};

export default ItemProductoOrden;
