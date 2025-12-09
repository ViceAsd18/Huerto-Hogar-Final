import InfoProducto from "componentes/moleculas/Cliente/Tienda/InfoProducto";
import Imagen from "componentes/atomos/Imagen";
import DetalleAcciones from "componentes/moleculas/Cliente/Tienda/DetalleAcciones";
import { useCart } from "auth/CartContext";

import type { Producto } from "services/productos";
import { message } from "antd";

interface Props {
    producto: Producto;
}

const imagenStyle: React.CSSProperties = {
    width: "100%",
    height: "auto",
    maxHeight: 600,
    objectFit: "contain",
    borderRadius: 12,
};

const FichaProducto = ({ producto }: Props) => {

    const { agregarAlCarrito } = useCart();

    const handleAgregar = (cantidad: number) => {
        agregarAlCarrito(producto, cantidad);
        message.success(`${cantidad} ${cantidad === 1 ? "producto" : "productos"} agregado al carrito`);
    };

    const nombreImg =
        producto?.nombre_producto?.toLowerCase().replace(/\s+/g, "_") + ".jpg";

    return (
        <>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: 30,
                    alignItems: "start",
                }}
            >
                <div>
                    <Imagen
                        src={"/assets/img/productos/" + nombreImg}
                        alt="Imagen del producto"
                        style={imagenStyle}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <InfoProducto producto={producto} />
                    <DetalleAcciones
                        stock={producto.stock}
                        onAgregar={handleAgregar}
                    />
                </div>
            </div>
        </>
    );
};

export default FichaProducto;
