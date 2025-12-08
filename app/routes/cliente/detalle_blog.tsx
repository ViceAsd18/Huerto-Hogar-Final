import { PublicRoute } from "auth/PublicRoute";
import DetalleBlogPage from "componentes/paginas/Cliente/DetalleBlogPage"

const detalle_blog = () => {
    return (
        <PublicRoute bloquear={['empleado']}>
            <DetalleBlogPage/>
        </PublicRoute>
    )
}

export default detalle_blog;