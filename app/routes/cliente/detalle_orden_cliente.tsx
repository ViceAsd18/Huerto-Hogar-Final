import { PrivateRoute } from "auth/PrivateRoute";
import DetalleOrdenClientePage from "componentes/paginas/Cliente/Ordenes/DetalleOrdenClientePage";

export function meta() {
    return [{ title: "Detalle de Compra | SalesSystem" }];
}

export default function DetalleOrdenClienteRoute() {
    return (
        <PrivateRoute rol={['cliente','admin']}>
            <DetalleOrdenClientePage />;
        </PrivateRoute>
    )
}