import { PrivateRoute } from "auth/PrivateRoute";
import EditarUsuarioPage from "componentes/paginas/Admin/usuarios/EditarUsuarioPage"

const editar_usuario = () => {
    return (
        <PrivateRoute rol={['admin']}>
            <EditarUsuarioPage/>
        </PrivateRoute>
    )
}

export default editar_usuario;