import { PrivateRoute } from "auth/PrivateRoute"
import DetalleOrdenPage from "componentes/paginas/Vendedor/ordenes/DetalleOrdenPage"

const detalle_ordenV = () => {
    return (
        <PrivateRoute rol={['empleado', 'admin']}>
            <DetalleOrdenPage/>
        </PrivateRoute>
    )
}

export default detalle_ordenV