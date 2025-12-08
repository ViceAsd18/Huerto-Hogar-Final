import { PublicRoute } from "auth/PublicRoute";
import NosotrosClientePage from "componentes/paginas/Cliente/NosotrosClientePage";

const nosotros = () => {
    return <PublicRoute bloquear={['empleado']}>
        <NosotrosClientePage />
    </PublicRoute>
}

export default nosotros;