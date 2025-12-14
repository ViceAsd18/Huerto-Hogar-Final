import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import BlogsClientePage from "componentes/paginas/Cliente/Blogs/BlogsClientePage";

// Mock de ClienteLayout
vi.mock("componentes/layout/ClienteLayout", () => ({
    default: ({ children }: any) => <div data-testid="cliente-layout">{children}</div>,
}));

// Mock de BlogDestacados
vi.mock("componentes/organismo/Cliente/Blog/BlogDestacado", () => ({
    default: () => <div data-testid="blog-destacados">Blog Destacados</div>,
}));

describe("BlogsClientePage Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar ClienteLayout", () => {
        render(
            <BrowserRouter>
                <BlogsClientePage />
            </BrowserRouter>
        );

        expect(screen.getByTestId("cliente-layout")).toBeInTheDocument();
    });

    it("debe renderizar BlogDestacados dentro de ClienteLayout", () => {
        render(
            <BrowserRouter>
                <BlogsClientePage />
            </BrowserRouter>
        );

        expect(screen.getByTestId("blog-destacados")).toBeInTheDocument();
        expect(screen.getByText("Blog Destacados")).toBeInTheDocument();
    });

    it("debe mantener la estructura correcta", () => {
        const { container } = render(
            <BrowserRouter>
                <BlogsClientePage />
            </BrowserRouter>
        );

        const layout = screen.getByTestId("cliente-layout");
        const blogDestacados = screen.getByTestId("blog-destacados");

        expect(layout.contains(blogDestacados)).toBe(true);
    });
});
