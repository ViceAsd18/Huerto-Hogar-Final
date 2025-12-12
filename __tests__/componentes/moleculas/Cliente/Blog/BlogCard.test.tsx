import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BlogCard from "componentes/moleculas/Cliente/Blog/BlogCard";

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
    useNavigate: () => mockNavigate,
}));

describe("BlogCard Component", () => {
    const mockProps = {
        imagen: "/img/blog/blog1.jpg",
        categoria: "Huertos",
        titulo: "Cómo cultivar tomates",
        fecha: "2025-01-15",
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar información básica del blog", () => {
        render(<BlogCard {...mockProps} />);

        expect(screen.getByText("Huertos")).toBeInTheDocument();
        expect(screen.getByText("Cómo cultivar tomates")).toBeInTheDocument();
        expect(screen.getByText("2025-01-15")).toBeInTheDocument();
        expect(screen.getByText("Leer más")).toBeInTheDocument();
    });

    it("debe renderizar descripción cuando es principal", () => {
        render(
            <BlogCard
                {...mockProps}
                esPrincipal={true}
                descripcion="Guía completa para cultivar tomates"
            />
        );

        expect(screen.getByText("Guía completa para cultivar tomates")).toBeInTheDocument();
    });

    it("no debe renderizar descripción cuando no es principal", () => {
        render(
            <BlogCard
                {...mockProps}
                esPrincipal={false}
                descripcion="Esta descripción no debe aparecer"
            />
        );

        expect(screen.queryByText("Esta descripción no debe aparecer")).not.toBeInTheDocument();
    });

    it("debe navegar al hacer clic en Leer más", () => {
        render(<BlogCard {...mockProps} linkTo="/cliente/blog/1" />);

        const botonLeerMas = screen.getByText("Leer más");
        fireEvent.click(botonLeerMas);

        expect(mockNavigate).toHaveBeenCalledWith("/cliente/blog/1");
    });

    it("debe renderizar sin linkTo sin errores", () => {
        const { container } = render(<BlogCard {...mockProps} />);

        expect(container.firstChild).toBeInTheDocument();
        
        const botonLeerMas = screen.getByText("Leer más");
        fireEvent.click(botonLeerMas);
        
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("debe mostrar icono de calendario", () => {
        const { container } = render(<BlogCard {...mockProps} />);

        const icon = container.querySelector('[data-icon="calendar"]');
        expect(icon).toBeInTheDocument();
    });
});
