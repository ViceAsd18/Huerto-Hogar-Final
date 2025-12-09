import { PublicRoute } from "auth/PublicRoute";
import DetalleProductoClientePage from "componentes/paginas/Cliente/DetalleProductoClientePage";

export function meta() {
    return [
        { title: "Detalle del Producto | SalesSystem" },
        { name: "description", content: "Compra este increíble producto" },
    ];
}

export default function DetalleProductoRoute() {
    return <PublicRoute bloquear={['empleado']}>
        <DetalleProductoClientePage />;
    </PublicRoute>
}