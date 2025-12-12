import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MenuVendedor from "componentes/moleculas/BarraNavegacion/MenuVendedor";

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

describe("MenuVendedor Component", () => {
    it("debe renderizar items básicos del menú vendedor", () => {
        (useAuth as any).mockReturnValue({ user: { rol: "vendedor" } });

        render(<MenuVendedor />);

        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Productos")).toBeInTheDocument();
        expect(screen.getByText("Órdenes")).toBeInTheDocument();
    });

    it("no debe mostrar items de admin para vendedor", () => {
        (useAuth as any).mockReturnValue({ user: { rol: "vendedor" } });

        render(<MenuVendedor />);

        expect(screen.queryByText("Usuarios")).not.toBeInTheDocument();
        expect(screen.queryByText("Cambiar vista")).not.toBeInTheDocument();
    });

    it("debe mostrar items adicionales para admin", () => {
        (useAuth as any).mockReturnValue({ user: { rol: "admin" } });

        render(<MenuVendedor />);

        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Productos")).toBeInTheDocument();
        expect(screen.getByText("Órdenes")).toBeInTheDocument();
        expect(screen.getByText("Usuarios")).toBeInTheDocument();
        expect(screen.getByText("Cambiar vista")).toBeInTheDocument();
    });

    it("debe tener 3 items para vendedor", () => {
        (useAuth as any).mockReturnValue({ user: { rol: "vendedor" } });

        render(<MenuVendedor />);
        
        const menuItems = screen.getAllByRole("button");
        expect(menuItems).toHaveLength(3);
    });

    it("debe tener 5 items para admin", () => {
        (useAuth as any).mockReturnValue({ user: { rol: "admin" } });

        render(<MenuVendedor />);
        
        const menuItems = screen.getAllByRole("button");
        expect(menuItems).toHaveLength(5);
    });
});
