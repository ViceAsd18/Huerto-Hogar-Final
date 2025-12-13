import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BarraNavegacion from "../../../../componentes/organismo/Cliente/BarraNavegacion";

const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
    useNavigate: () => mockNavigate,
}));

vi.mock("componentes/atomos/Imagen", () => ({
    default: ({ src, width }: { src: string; width: string }) => (
        <img src={src} alt="Logo" style={{ width }} />
    ),
}));

vi.mock("componentes/moleculas/BarraNavegacion/MenuCliente", () => ({
    default: () => <div data-testid="menu-cliente">Menu Cliente</div>,
}));

vi.mock("componentes/moleculas/BarraNavegacion/AccionesCliente", () => ({
    default: () => <div data-testid="acciones-usuario">Acciones Usuario</div>,
}));

describe("BarraNavegacion Component", () => {
    beforeEach(() => {
        mockNavigate.mockClear();
    });

    it("debe renderizar el componente sin errores", () => {
        const { container } = render(<BarraNavegacion />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("debe mostrar la imagen del logo", () => {
        render(<BarraNavegacion />);
        const logo = screen.getByAltText("Logo") as HTMLImageElement;
        expect(logo).toBeInTheDocument();
        expect(logo.src).toContain("logo-huerto-hogar.png");
    });

    it("debe renderizar el MenuCliente", () => {
        render(<BarraNavegacion />);
        expect(screen.getByTestId("menu-cliente")).toBeInTheDocument();
    });

    it("debe renderizar AccionesUsuario", () => {
        render(<BarraNavegacion />);
        expect(screen.getByTestId("acciones-usuario")).toBeInTheDocument();
    });

    it("debe navegar a home_cliente cuando se hace clic en el logo", () => {
        render(<BarraNavegacion />);
        const logo = screen.getByAltText("Logo");
        fireEvent.click(logo);
        expect(mockNavigate).toHaveBeenCalledWith("/cliente/home_cliente");
    });

    it("debe aplicar estilos correctos a la barra", () => {
        const { container } = render(<BarraNavegacion />);
        const barraDiv = container.firstChild as HTMLElement;
        expect(barraDiv.style.display).toBe("flex");
        expect(barraDiv.style.justifyContent).toBe("space-between");
        expect(barraDiv.style.alignItems).toBe("center");
    });
});
