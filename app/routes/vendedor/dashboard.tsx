import { PrivateRoute } from "auth/PrivateRoute";
import DashboardPage from "componentes/paginas/Vendedor/dashboard/DashboardPage";

const dashboard = () => {
    return (
        <PrivateRoute rol={['empleado', 'admin']}>
            <DashboardPage />
        </PrivateRoute>
    )
}
export default dashboard;