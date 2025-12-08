import { PrivateRoute } from "auth/PrivateRoute"
import CrearOrdenPage from "componentes/paginas/Vendedor/ordenes/CrearOrdenPage"

const crear_orden = () => {
    return (
        <PrivateRoute rol={['empleado', 'admin']}>
            <CrearOrdenPage/>
        </PrivateRoute>
    )
}

export default crear_orden