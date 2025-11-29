import { PrivateRoute } from "auth/PrivateRoute"
import DetalleProductoPage from "componentes/paginas/Vendedor/productos/DetalleProductoPage"

const productoDetalle = () => {
    return (
        <PrivateRoute rol="empleado">
            <DetalleProductoPage/>
        </PrivateRoute>
    )
}

export default productoDetalle