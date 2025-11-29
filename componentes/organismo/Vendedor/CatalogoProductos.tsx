import CardProducto from "componentes/moleculas/Vendedor/CardProductos";
import type { Producto } from "modelo/productoModel";

const CatalogoProductos = ({productos, onVerDetalle,}: {productos: Producto[]; onVerDetalle: (p: Producto) => void;}) => {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "16px",
                width: "100%",
            }}
        >
            {productos.map((prod) => (
                <CardProducto
                    key={prod.id}
                    producto={prod}
                    onVerDetalle={onVerDetalle}
                />
            ))}
        </div>

    );
};

export default CatalogoProductos;
