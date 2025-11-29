import { PrivateRoute } from "auth/PrivateRoute"
import OrdenesPage from "componentes/paginas/Vendedor/ordenes/OrdenesPage"

const orden = () => {
    return (
        <PrivateRoute rol="empleado">
            <OrdenesPage />
        </PrivateRoute>
    )
}

export default orden