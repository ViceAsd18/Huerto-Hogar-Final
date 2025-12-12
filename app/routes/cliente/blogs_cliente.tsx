import { PublicRoute } from "auth/PublicRoute";
import BlogsClientePage from "componentes/paginas/Cliente/Blogs/BlogsClientePage";

const blogs_cliente = () => {
    return (
        <PublicRoute bloquear={['empleado']}>
            <BlogsClientePage />
        </PublicRoute>
    )
}

export default blogs_cliente;
