import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InfoProposito from "./InfoProposito";

vi.mock("componentes/atomos/Titulo", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <h3 data-testid="titulo">{children}</h3>,
}));

vi.mock("componentes/atomos/Texto", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <p data-testid="texto">{children}</p>,
}));

describe("InfoProposito", () => {
    it("renderiza icono, titulo y parrafo", () => {
        render(
            <InfoProposito
                icono={<span data-testid="icono" />}
                titulo="Sostenibilidad"
                parrafo="Reducir huella"
            />
        );

        expect(screen.getByTestId("icono")).toBeInTheDocument();
        expect(screen.getByTestId("titulo")).toHaveTextContent("Sostenibilidad");
        expect(screen.getByTestId("texto")).toHaveTextContent("Reducir huella");
    });

    it("clona el icono aplicando estilo de tamaño", () => {
        render(
            <InfoProposito
                icono={<span data-testid="icono" />}
                titulo="Calidad"
                parrafo="Garantizada"
            />
        );

        const icono = screen.getByTestId("icono");
        expect((icono as HTMLElement).style.fontSize).toBe("40px");
    });
});
