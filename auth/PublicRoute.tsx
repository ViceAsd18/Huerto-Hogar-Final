import { Navigate } from "react-router";
import { message } from "antd";
import { useAuth } from "./AuthContext";
import { useRef } from "react";

interface Props {
    children: React.ReactNode;
    bloquear?: string[];
}

export const PublicRoute = ({ children, bloquear = [] }: Props) => {
    const { user } = useAuth();
    const mensajeMostrado = useRef(false);

    const userRol = user?.rol?.toLowerCase().trim();

    const estaBloqueado = user && bloquear.includes(userRol || "");

    // Solo muestra el mensaje UNA vez
    if (estaBloqueado && !mensajeMostrado.current) {
        mensajeMostrado.current = true;
        message.error("No puedes acceder a esta sección");
    }

    if (estaBloqueado) {    
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};
