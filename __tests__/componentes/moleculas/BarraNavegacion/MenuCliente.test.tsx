import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MenuCliente from "componentes/moleculas/BarraNavegacion/MenuCliente";

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
    useNavigate: () => mockNavigate,
}));

describe("MenuCliente Component", () => {
    it("debe renderizar todos los items del menú", () => {
        render(<MenuCliente />);

        expect(screen.getByText("Inicio")).toBeInTheDocument();
        expect(screen.getByText("Tienda")).toBeInTheDocument();
        expect(screen.getByText("Nosotros")).toBeInTheDocument();
        expect(screen.getByText("Blogs")).toBeInTheDocument();
        expect(screen.getByText("Contacto")).toBeInTheDocument();
    });

    it("debe renderizar menú con modo horizontal", () => {
        const { container } = render(<MenuCliente />);
        const nav = container.querySelector("nav");
        expect(nav).toBeInTheDocument();
    });

    it("debe tener 5 items de menú", () => {
        render(<MenuCliente />);
        
        const menuItems = screen.getAllByRole("button");
        expect(menuItems).toHaveLength(5);
    });
});
