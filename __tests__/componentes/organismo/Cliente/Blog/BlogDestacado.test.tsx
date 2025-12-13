import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import BlogDestacados from "../../../../../componentes/organismo/Cliente/Blog/BlogDestacado";

describe("BlogDestacados Component", () => {
    it("debe renderizar el título principal", () => {
        render(
            <BrowserRouter>
                <BlogDestacados />
            </BrowserRouter>
        );

        expect(screen.getByText(/Actualidad HuertoHogar/i)).toBeInTheDocument();
    });

    it("debe renderizar la descripción", () => {
        render(
            <BrowserRouter>
                <BlogDestacados />
            </BrowserRouter>
        );

        expect(screen.getByText(/Novedades, recetas y eventos de nuestra comunidad/i)).toBeInTheDocument();
    });

    it("debe renderizar el post principal destacado", () => {
        render(
            <BrowserRouter>
                <BlogDestacados />
            </BrowserRouter>
        );

        expect(screen.getByText(/5 Consejos Esenciales del Riego/i)).toBeInTheDocument();
    });

    it("debe renderizar todos los posts en el grid", () => {
        render(
            <BrowserRouter>
                <BlogDestacados />
            </BrowserRouter>
        );

        expect(screen.getByText(/5 Consejos Esenciales del Riego/i)).toBeInTheDocument();
        expect(screen.getByText(/El Arte de Cosechar Tomates: Guía Completa/i)).toBeInTheDocument();
        expect(screen.getByText(/Taller de Huerto Urbano/i)).toBeInTheDocument();
        expect(screen.getByText(/Receta: Salsa de Tomate Casera/i)).toBeInTheDocument();
    });

    it("debe renderizar las categorías de los posts", () => {
        render(
            <BrowserRouter>
                <BlogDestacados />
            </BrowserRouter>
        );

        expect(screen.getByText("Tendencias")).toBeInTheDocument();
        expect(screen.getAllByText("Novedades").length).toBeGreaterThan(0);
        expect(screen.getByText("Eventos")).toBeInTheDocument();
    });

    it("debe renderizar las imágenes de fondo de los posts", () => {
        const { container } = render(
            <BrowserRouter>
                <BlogDestacados />
            </BrowserRouter>
        );

        const imagenesConFondo = container.querySelectorAll("[style*='background-image']");
        expect(imagenesConFondo.length).toBeGreaterThanOrEqual(4);
    });

    it("debe renderizar el grid con la estructura correcta", () => {
        const { container } = render(
            <BrowserRouter>
                <BlogDestacados />
            </BrowserRouter>
        );

        const grid = container.querySelector(".blog-grid");
        expect(grid).toBeInTheDocument();
    });
});
