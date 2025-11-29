import { Navigate } from "react-router";
import { useAuth } from "./AuthContext";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
    rol?: string;
}

export const PrivateRoute = ({ children, rol }: Props) => {
    const { user } = useAuth();

    // Si no hay usuario → redirigir
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Validar rol
    if (rol && user.rol !== rol) {
        return <Navigate to="/no-autorizado" replace />;
    }

    return <>{children}</>;
};
