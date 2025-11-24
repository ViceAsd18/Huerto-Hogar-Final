import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('dashboard','routes/dashboard.tsx'),
    route('productos','routes/productos.tsx'),
    route('ordenes','routes/ordenes.tsx'),
    route('detalle-producto/:id', 'routes/detalle-producto.tsx')
] satisfies RouteConfig;
