import { PublicRoute } from "auth/PublicRoute";
import TiendaPage from "../../../componentes/paginas/Cliente/TiendaPage";

export function meta() {
    return [{ title: "Catálogo | SalesSystem" }];
}

export default function TiendaRoute() {
    return <PublicRoute bloquear={['empleado']}>
        <TiendaPage />
    </PublicRoute>
    ;
}