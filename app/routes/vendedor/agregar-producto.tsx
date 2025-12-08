import AgregarProductoPage from "componentes/paginas/Vendedor/productos/AgregarProductoPage"
import { PrivateRoute } from "auth/PrivateRoute"

const agregar_producto = () => {
    return (
        <PrivateRoute rol={['empleado', 'admin']}>
            <AgregarProductoPage/>
        </PrivateRoute>
    )
}

export default agregar_producto