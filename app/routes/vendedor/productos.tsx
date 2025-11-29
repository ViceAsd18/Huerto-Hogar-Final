import { PrivateRoute } from "auth/PrivateRoute"
import ProductosPage from "componentes/paginas/Vendedor/productos/ProductosPage"

const Productos = () => {
    return (
        <PrivateRoute rol="empleado">
            <ProductosPage />
        </PrivateRoute>
    )
}

export default Productos