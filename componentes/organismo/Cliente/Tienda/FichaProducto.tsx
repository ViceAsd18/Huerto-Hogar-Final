import InfoProducto from "componentes/moleculas/Cliente/Tienda/InfoProducto";
import Imagen from "componentes/atomos/Imagen"

import type { Producto } from "services/productos";    
import DetalleAcciones from "componentes/moleculas/Cliente/Tienda/DetalleAcciones";

interface Props {
    producto : Producto;
}

const imagenStyle : React.CSSProperties = {
    width : '100%',
    height : 'auto',
    maxHeight : 600,
    objectFit : 'contain',
    borderRadius : 12,    

}   

const FichaProducto = ({producto}: Props) => {
    
    const nombreImg = producto?.nombre_producto?.toLowerCase().replace(/\s+/g, '_') + '.jpg';
    
    return (
        
       <>
        <div style={{display : 'grid', gridTemplateColumns : "repeat(auto-fit, minmax(400px, 1fr))",gap : 30, alignItems : 'start'}}>
            <div>
                            <Imagen
                src={'/assets/img/productos/' + nombreImg}
                alt="Imagen del producto"
                style={imagenStyle}
            >
            </Imagen>
            </div>
            
            <div style={{display : 'flex', flexDirection : 'column'}}>
                <InfoProducto producto={producto}></InfoProducto>
                <DetalleAcciones stock={producto.stock}/>
            </div>
        </div>
       </>  
        
    )
}

export default FichaProducto


