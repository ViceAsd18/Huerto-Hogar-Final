import { useEffect, useRef } from "react";
import { Navigate } from "react-router";
import { message } from "antd";
import { useAuth } from "./AuthContext";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
    rol?: string | string[]; // 👈 acepta string O array
}

export const PrivateRoute = ({ children, rol }: Props) => {
    const { user, loading } = useAuth();
    const msgShown = useRef(false);

    // Pasamos todo a un array de roles
    const rolesPermitidos: string[] = Array.isArray(rol)
        ? rol.map(r => r.toLowerCase().trim())
        : rol
        ? [rol.toLowerCase().trim()]
        : [];

    const userRol = user?.rol?.toLowerCase().trim();

    const tienePermiso =
        !rol || rolesPermitidos.includes(userRol || "");

    useEffect(() => {
        if (loading) return;

        if (!user && !msgShown.current) {
            message.info("Necesitas iniciar sesión para acceder a esta página");
            msgShown.current = true;
        }

        if (user && !tienePermiso && !msgShown.current) {
            message.error("No tienes permisos para acceder a esta página");
            msgShown.current = true;
        }
    }, [loading, user, tienePermiso]);

    if (loading)
        return <div style={{ padding: 50, textAlign: "center" }}>Cargando...</div>;

    if (!user) return <Navigate to="/" replace />;

    if (!tienePermiso) return <Navigate to="/" replace />;

    return <>{children}</>;
};
