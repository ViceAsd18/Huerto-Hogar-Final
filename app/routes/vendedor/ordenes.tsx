import { PrivateRoute } from "auth/PrivateRoute"
import OrdenesPage from "componentes/paginas/Vendedor/ordenes/OrdenesPage"

const orden = () => {
    return (
        <PrivateRoute rol={['empleado', 'admin']}>
            <OrdenesPage />
        </PrivateRoute>
    )
}

export default orden