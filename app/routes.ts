import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    //Ruta Cliente
    index("routes/cliente/home_cliente.tsx"),
    route("cliente/home_cliente", "routes/cliente/home_cliente.tsx", { id: "cliente-home" }),
    route("cliente/producto/:id", "routes/cliente/detalle_producto.tsx"),
    route("cliente/mis-ordenes", "routes/cliente/mis_ordenes.tsx"),
    route("cliente/orden/:id", "routes/cliente/detalle_orden_cliente.tsx"),
    route("cliente/tienda", "routes/cliente/tienda.tsx"),
    route("cliente/nosotros", "routes/cliente/nosotros.tsx"),
    route("cliente/blogs", "routes/cliente/blogs_cliente.tsx"),
    route("cliente/contacto", "routes/cliente/contacto.tsx"),
    route("cliente/carrito/:id", "routes/cliente/carrito.tsx"),
    route("cliente/detalle-blog/:id", "routes/cliente/detalle_blog.tsx"),

    //Ruta Publica
    route('login', 'routes/login.tsx'),
    route('registro','routes/registro.tsx'),


    //Rutas Vendedor
    route('dashboard','routes/vendedor/dashboard.tsx'),
    route('productos','routes/vendedor/productos.tsx'),
    route('ordenes','routes/vendedor/ordenes.tsx'),
    route('agregar-producto', 'routes/vendedor/agregar-producto.tsx'),
    route('detalle-producto/:id', 'routes/vendedor/detalle-productoV.tsx'),
    route('crear-orden', 'routes/vendedor/crear-orden.tsx'),
    route('orden/:id', 'routes/vendedor/detalle-orden.tsx'),
    route('editar-producto/:id', 'routes/vendedor/editar-producto.tsx'),
    
    route('usuarios', 'routes/admin/usuarios.tsx'),
    route('admin/editar-usuario/:id', 'routes/admin/editar_usuario.tsx')



] satisfies RouteConfig;
