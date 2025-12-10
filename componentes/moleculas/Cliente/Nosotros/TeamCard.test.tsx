import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TeamCard from "./TeamCard";

vi.mock("componentes/atomos/Imagen", () => ({
    __esModule: true,
    default: ({ src, alt }: { src?: string; alt?: string }) => (
        <img data-testid="imagen" src={src} alt={alt} />
    ),
}));

vi.mock("componentes/atomos/Titulo", () => ({
    __esModule: true,
    default: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
        <h3 data-testid="titulo" style={style}>
            {children}
        </h3>
    ),
}));

vi.mock("componentes/atomos/Texto", () => ({
    __esModule: true,
    default: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
        <p data-testid="texto" style={style}>
            {children}
        </p>
    ),
}));

describe("TeamCard", () => {
    it("renderiza imagen, nombre y rol con estilos", () => {
        const { container } = render(
            <TeamCard src="/persona.jpg" nombre="Ana" rol="Diseñadora" />
        );

        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toHaveStyle({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            width: "250px",
        });

        const imgWrapper = wrapper.firstChild as HTMLElement;
        expect(imgWrapper).toHaveStyle({
            width: "170px",
            height: "170px",
            borderRadius: "50%",
            overflow: "hidden",
        });

        const img = screen.getByTestId("imagen");
        expect(img).toHaveAttribute("src", "/persona.jpg");
        expect(img).toHaveAttribute("alt", "Ana");

        expect(screen.getByTestId("titulo")).toHaveTextContent("Ana");
        expect(screen.getByTestId("titulo")).toHaveStyle({ marginBottom: "5px" });

        const texto = screen.getByTestId("texto");
        expect(texto).toHaveTextContent("Diseñadora");
        expect(texto).toHaveStyle({ textAlign: "center", margin: "0px" });
    });
});
