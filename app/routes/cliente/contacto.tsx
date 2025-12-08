import { PublicRoute } from "auth/PublicRoute";
import ContactoClientePage from "componentes/paginas/Cliente/ContactoClientePage";

const contacto = () => {
    return (
        <PublicRoute bloquear={['empleado']}>
            <ContactoClientePage/>
        </PublicRoute>
    )
}

export default contacto;