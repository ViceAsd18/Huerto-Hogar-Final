import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import UsuarioSidebar from "componentes/moleculas/BarraNavegacion/UsuarioSidebar";

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

describe("UsuarioSidebar Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar avatar con emoji", () => {
        (useAuth as any).mockReturnValue({
            user: { email: "test@example.com", rol: "vendedor" },
            logout: vi.fn(),
        });

        render(<UsuarioSidebar />);

        expect(screen.getByText("👤")).toBeInTheDocument();
    });

    it("debe mostrar email y rol cuando no está colapsado", () => {
        (useAuth as any).mockReturnValue({
            user: { email: "admin@example.com", rol: "admin" },
            logout: vi.fn(),
        });

        render(<UsuarioSidebar colapsado={false} />);

        expect(screen.getByText("admin@example.com")).toBeInTheDocument();
        expect(screen.getByText("admin")).toBeInTheDocument();
    });

    it("no debe mostrar email y rol cuando está colapsado", () => {
        (useAuth as any).mockReturnValue({
            user: { email: "vendor@example.com", rol: "vendedor" },
            logout: vi.fn(),
        });

        render(<UsuarioSidebar colapsado={true} />);

        expect(screen.queryByText("vendor@example.com")).not.toBeInTheDocument();
        expect(screen.queryByText("vendedor")).not.toBeInTheDocument();
    });

    it("debe renderizar información de diferentes usuarios", () => {
        (useAuth as any).mockReturnValue({
            user: { email: "cliente@test.com", rol: "cliente" },
            logout: vi.fn(),
        });

        render(<UsuarioSidebar />);

        expect(screen.getByText("cliente@test.com")).toBeInTheDocument();
        expect(screen.getByText("cliente")).toBeInTheDocument();
    });

    it("debe renderizar sin errores cuando no hay colapsado prop", () => {
        (useAuth as any).mockReturnValue({
            user: { email: "user@test.com", rol: "vendedor" },
            logout: vi.fn(),
        });

        const { container } = render(<UsuarioSidebar />);

        expect(container.firstChild).toBeInTheDocument();
    });
});
