import { PrivateRoute } from "auth/PrivateRoute"
import CarritoClientePage from "componentes/paginas/Cliente/CarritoClientePage"

const carrito = () => {
    return (
        <PrivateRoute rol={['cliente','admin']}>
            <CarritoClientePage/>
        </PrivateRoute>
    )
}

export default carrito