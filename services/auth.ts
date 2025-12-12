import { api } from "services/api";
import type { User } from "services/usuario";

export interface AuthResponse {
    access_token: string;
}

//Login
export const loginRequest = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", { email, password });
    console.log("Respuesta del login:", response.data);
    return response.data;
};

//Register
export const registerRequest = async (nombre: string, email: string, password: string, rol: string): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", { nombre, email, password, rol });
    return response.data;
};

//Profile
export const getProfile = async (token?: string): Promise<User> => {
    const response = await api.get("/auth/profile", {
        headers: {
        Authorization: `Bearer ${token || localStorage.getItem("token")}`,
        },
    });
    return response.data;
};

