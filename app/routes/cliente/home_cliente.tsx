import { PublicRoute } from "auth/PublicRoute";
import HomeClientePage from "componentes/paginas/Cliente/HomeClientePage"

const HomeCliente = ()  => {
    return (
        <PublicRoute bloquear={['empleado']}>
            <HomeClientePage />
        </PublicRoute>
    )

}

export default HomeCliente;