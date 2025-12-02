import CardProducto from "componentes/moleculas/Vendedor/CardProductos";
import type { Producto } from "services/productos";


const CatalogoProductos = ({productos, onVerDetalle, onEditarProducto}: {
    productos: Producto[]; 
    onVerDetalle: (p: Producto) => void;
    onEditarProducto: (p: Producto) => void;}) => {
    
        return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(clamp(150px, 90%, 250px), 1fr))",
                gap: "16px",
                width: "100%",
            }}
        >
            {productos.map((prod) => (
                <CardProducto
                    key={prod.id_producto}
                    producto={prod}
                    onVerDetalle={onVerDetalle}
                    onEditarProducto={onEditarProducto}
                />
            ))}
        </div>

    );
};

export default CatalogoProductos;
