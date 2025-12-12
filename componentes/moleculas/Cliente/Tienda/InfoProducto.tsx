import Titulo from "componentes/atomos/Titulo";
import PrecioProducto from "componentes/atomos/PrecioProducto";
import Texto from "componentes/atomos/Texto";
import type { Producto } from "services/productos";

interface Props {
    producto : Producto;
}

const InfoProducto = ({producto} : Props) => {
    return (
        <div style={{display : 'flex', flexDirection : 'column', gap : 16, paddingBottom : 24}}>
            <Titulo nivel={1} variante="titulo">{producto.nombre_producto}</Titulo>

            <PrecioProducto valor={producto.precio} tipo="destacado"/>

            <Texto variante="descripcion">{producto.descripcion_producto}</Texto>
        </div>
    )
}

export default InfoProducto 