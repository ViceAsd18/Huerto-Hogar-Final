import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AccionesCliente from "componentes/moleculas/BarraNavegacion/AccionesCliente";

// Mock de useAuth
vi.mock("auth/AuthContext", () => ({
    useAuth: vi.fn(),
}));

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
    useNavigate: () => mockNavigate,
}));

import { useAuth } from "auth/AuthContext";

describe("AccionesCliente Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar botones de pedidos y carrito", () => {
        (useAuth as any).mockReturnValue({ user: null, logout: vi.fn() });

        render(<AccionesCliente />);

        expect(screen.getByTitle("Mis Pedidos")).toBeInTheDocument();
        expect(screen.getByTitle("Ver Carrito")).toBeInTheDocument();
    });

    it("debe mostrar iniciar sesión cuando no hay usuario", () => {
        (useAuth as any).mockReturnValue({ user: null, logout: vi.fn() });

        render(<AccionesCliente />);

        expect(screen.getByTitle("Iniciar Sesión")).toBeInTheDocument();
        expect(screen.queryByTitle("Cerrar Sesión")).not.toBeInTheDocument();
    });

    it("debe mostrar cerrar sesión cuando hay usuario", () => {
        (useAuth as any).mockReturnValue({
            user: { id_usuario: 1, rol: "cliente" },
            logout: vi.fn(),
        });

        render(<AccionesCliente />);

        expect(screen.getByTitle("Cerrar Sesión")).toBeInTheDocument();
        expect(screen.queryByTitle("Iniciar Sesión")).not.toBeInTheDocument();
    });

    it("debe mostrar botón cambiar vista solo para admin", () => {
        (useAuth as any).mockReturnValue({
            user: { id_usuario: 1, rol: "admin" },
            logout: vi.fn(),
        });

        render(<AccionesCliente />);

        expect(screen.getByTitle("Cambiar Vista")).toBeInTheDocument();
    });

    it("no debe mostrar botón cambiar vista para cliente", () => {
        (useAuth as any).mockReturnValue({
            user: { id_usuario: 1, rol: "cliente" },
            logout: vi.fn(),
        });

        render(<AccionesCliente />);

        expect(screen.queryByTitle("Cambiar Vista")).not.toBeInTheDocument();
    });
});
