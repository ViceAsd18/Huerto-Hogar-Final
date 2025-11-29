export interface User {
    id: number;
    nombre: string;
    rol: "cliente" | "empleado" | 'admin' | string;
    email?: string;
}
