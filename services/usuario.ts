import { api } from "services/api";

export interface User {
    id_usuario: number;
    nombre: string;
    email: string;
    password?: string;
    rol: string;
}

export const getClientes = async () => {
    const res = await api.get("/usuarios");
    return res.data.filter((u: any) => u.rol === "cliente");    
};  

export const getUsuarios = async () => {
    const res = await api.get("/usuarios");
    return res.data;
}

export const editarUsuario = async (usuario: User, values: Partial<User>) => {
    const res = await api.patch(`/usuarios/${usuario.id_usuario}`, values);
    return res.data;
}

export const getUsuarioById = async (id: number) => {
    const res = await api.get(`/usuarios/${id}`);
    return res.data;
}