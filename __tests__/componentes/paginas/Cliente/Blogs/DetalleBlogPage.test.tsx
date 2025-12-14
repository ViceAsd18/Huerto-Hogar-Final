import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import DetalleBlogPage from "componentes/paginas/Cliente/Blogs/DetalleBlogPage";

vi.mock("data/blogsData", () => ({
    blogs: [
        {
            id: 1,
            titulo: "5 Consejos Esenciales del Riego",
            categoria: "Guías",
            autor: "Juan Pérez (Ing. Agrónomo)",
            fecha: "22 Oct, 2025",
            imagen: "/assets/img/blog/cuidaagua.jpg",
            minutoLectura: 6,
            contenido: {
                parrafoPrincipal: "El agua es el alma de tu huerto...",
                subtituloUno: "La hora dorada: Riega temprano",
                parrafoDos: "El mejor momento para regar es al amanecer...",
            },
        },
    ],
}));

// Mock de useParams
vi.mock("react-router", async () => {
    const actual = await vi.importActual<any>("react-router");
    return {
        ...actual,
        useParams: () => ({ id: "1" }),
    };
});

// Mock de ClienteLayout
vi.mock("componentes/layout/ClienteLayout", () => ({
    default: ({ children }: any) => <div data-testid="cliente-layout">{children}</div>,
}));

// Mock de BlogBanner
vi.mock("componentes/organismo/Cliente/Blog/BlogBanner", () => ({
    default: ({ titulo, categoria, fecha, autor }: any) => (
        <div data-testid="blog-banner">
            <h1>{titulo}</h1>
            <p>{categoria}</p>
            <p>{fecha}</p>
            <p>{autor}</p>
        </div>
    ),
}));

// Mock de BlogContenido
vi.mock("componentes/organismo/Cliente/Blog/BlogContenido", () => ({
    default: ({ autor, fecha, minutoLectura, contenido }: any) => (
        <div data-testid="blog-contenido">
            <p>Autor: {autor}</p>
            <p>Fecha: {fecha}</p>
            <p>Lectura: {minutoLectura} min</p>
        </div>
    ),
}));

describe("DetalleBlogPage Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar el blog correcto cuando el ID existe", () => {
        render(
            <BrowserRouter>
                <DetalleBlogPage />
            </BrowserRouter>
        );

        expect(screen.getByText("5 Consejos Esenciales del Riego")).toBeInTheDocument();
        expect(screen.getByText("Guías")).toBeInTheDocument();
        expect(screen.getByText("Juan Pérez (Ing. Agrónomo)")).toBeInTheDocument();
    });

    it("debe renderizar BlogBanner con datos correctos", () => {
        render(
            <BrowserRouter>
                <DetalleBlogPage />
            </BrowserRouter>
        );

        expect(screen.getByTestId("blog-banner")).toBeInTheDocument();
        expect(screen.getByText("22 Oct, 2025")).toBeInTheDocument();
    });

    it("debe renderizar BlogContenido con datos correctos", () => {
        render(
            <BrowserRouter>
                <DetalleBlogPage />
            </BrowserRouter>
        );

        expect(screen.getByTestId("blog-contenido")).toBeInTheDocument();
        expect(screen.getByText("Lectura: 6 min")).toBeInTheDocument();
    });

    it("debe tener estructura correcta con ClienteLayout", () => {
        render(
            <BrowserRouter>
                <DetalleBlogPage />
            </BrowserRouter>
        );

        expect(screen.getByTestId("cliente-layout")).toBeInTheDocument();
    });
});
