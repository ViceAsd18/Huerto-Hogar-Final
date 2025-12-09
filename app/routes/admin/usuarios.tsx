import { PrivateRoute } from "auth/PrivateRoute";
import UsuariosPage from "componentes/paginas/Admin/usuarios/UsuariosPage";

const usuarios = () => {
    return (
        <PrivateRoute rol={['admin']}>
            <UsuariosPage/>
        </PrivateRoute>
    )
}

export default usuarios;