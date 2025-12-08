import { PrivateRoute } from "auth/PrivateRoute"
import EditarProductoPage from "componentes/paginas/Vendedor/productos/EditarProductoPage"

const editar_producto = () => {
    return (
        <PrivateRoute rol={['empleado', 'admin']}>
            <EditarProductoPage/>
        </PrivateRoute>
    )
}

export default editar_producto