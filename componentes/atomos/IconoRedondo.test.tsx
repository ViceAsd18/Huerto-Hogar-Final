import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import IconoRedondo from "./IconoRedondo";

vi.mock("antd", () => ({
    Tooltip: ({ title, children }: { title?: React.ReactNode; children: React.ReactNode }) => (
        <div data-testid="tooltip" data-title={title}>
            {children}
        </div>
    ),
}));

describe("IconoRedondo", () => {
    it("renderiza el icono dentro del contenedor redondo", () => {
        render(<IconoRedondo title="Editar" onClick={() => {}} icon={<span data-testid="icono" />} />);

        const contenedor = screen.getByTestId("tooltip").firstChild as HTMLElement;
        expect(screen.getByTestId("icono")).toBeInTheDocument();
        expect(contenedor).toHaveStyle({
            width: "40px",
            height: "40px",
            borderRadius: "50%",
        });
    });

    it("propaga el title al tooltip", () => {
        render(<IconoRedondo title="Eliminar" onClick={() => {}} icon={<span />} />);

        expect(screen.getByTestId("tooltip")).toHaveAttribute("data-title", "Eliminar");
    });

    it("dispara onClick al hacer click en el contenedor", () => {
        const onClick = vi.fn();
        render(<IconoRedondo title="Ver" onClick={onClick} icon={<span />} />);

        fireEvent.click(screen.getByTestId("tooltip").firstChild as HTMLElement);
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
