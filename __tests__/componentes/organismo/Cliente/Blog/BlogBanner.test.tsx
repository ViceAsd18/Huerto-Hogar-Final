import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import BlogBanner from "../../../../../componentes/organismo/Cliente/Blog/BlogBanner";

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("BlogBanner Component", () => {
    const mockProps = {
        imagen: "/test-image.jpg",
        categoria: "Huerto Urbano",
        titulo: "Cómo iniciar tu huerto en casa",
        fecha: "10 Diciembre 2024",
        autor: "Juan Pérez",
    };

    beforeEach(() => {
        mockNavigate.mockClear();
    });

    it("debe renderizar el banner con todos los datos", () => {
        render(
            <BrowserRouter>
                <BlogBanner {...mockProps} />
            </BrowserRouter>
        );

        expect(screen.getByText(mockProps.categoria)).toBeInTheDocument();
        expect(screen.getByText(mockProps.titulo)).toBeInTheDocument();
        expect(screen.getByText(mockProps.fecha)).toBeInTheDocument();
        expect(screen.getByText(mockProps.autor)).toBeInTheDocument();
    });

    it("debe mostrar el botón de volver al blog", () => {
        render(
            <BrowserRouter>
                <BlogBanner {...mockProps} />
            </BrowserRouter>
        );

        expect(screen.getByText(/volver al blog/i)).toBeInTheDocument();
    });

    it("debe navegar a la página de blogs al hacer clic en volver", () => {
        render(
            <BrowserRouter>
                <BlogBanner {...mockProps} />
            </BrowserRouter>
        );

        const volverButton = screen.getByText(/volver al blog/i);
        fireEvent.click(volverButton);

        expect(mockNavigate).toHaveBeenCalledWith("/cliente/blogs");
    });

    it("debe aplicar la imagen de fondo correctamente", () => {
        const { container } = render(
            <BrowserRouter>
                <BlogBanner {...mockProps} />
            </BrowserRouter>
        );

        const banner = container.firstChild as HTMLElement;
        expect(banner.style.backgroundImage).toContain(mockProps.imagen);
    });
});
