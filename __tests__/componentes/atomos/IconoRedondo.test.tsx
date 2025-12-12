import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import IconoRedondo from "../../../componentes/atomos/IconoRedondo";

describe("IconoRedondo Component", () => {
    it("debe renderizar el icono dentro del contenedor", () => {
        const handleClick = vi.fn();
        render(
            <IconoRedondo 
                title="Mi icono" 
                onClick={handleClick}
                icon={<span data-testid="test-icon">⭐</span>}
            />
        );
        expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });

    it("debe ejecutar onClick al hacer click en el contenedor", () => {
        const handleClick = vi.fn();
        const { container } = render(
            <IconoRedondo 
                title="Clickeable" 
                onClick={handleClick}
                icon={<span>✓</span>}
            />
        );
        const divs = container.querySelectorAll("div");
        fireEvent.click(divs[divs.length - 1]);
        expect(handleClick).toHaveBeenCalledOnce();
    });

    it("debe renderizar sin errores", () => {
        const handleClick = vi.fn();
        const { container } = render(
            <IconoRedondo 
                title="Test" 
                onClick={handleClick}
                icon={<span>🔔</span>}
            />
        );
        expect(container).toBeInTheDocument();
    });

    it("debe aceptar diferentes iconos", () => {
        const handleClick = vi.fn();
        render(
            <IconoRedondo 
                title="Test" 
                onClick={handleClick}
                icon={<span data-testid="custom-icon">💡</span>}
            />
        );
        expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("debe aceptar diferentes titles", () => {
        const handleClick = vi.fn();
        const { container } = render(
            <IconoRedondo 
                title="Mi título personalizado" 
                onClick={handleClick}
                icon={<span>🎯</span>}
            />
        );
        expect(container.querySelector("[title='Mi título personalizado']")).toBeInTheDocument();
    });
});


