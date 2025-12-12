import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ResumenTotales from "componentes/moleculas/Vendedor/Orden/ResumenTotales";

describe("ResumenTotales Component", () => {
    const props = {
        subtotal: 10000,
        impuesto: 1900,
        total: 11900,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar etiquetas y totales", () => {
        render(<ResumenTotales {...props} />);

        expect(screen.getByText("Subtotal")).toBeInTheDocument();
        expect(screen.getByText("Impuesto 19%")).toBeInTheDocument();
        expect(screen.getByText("Total")).toBeInTheDocument();
    });

    it("debe mostrar subtotal formateado", () => {
        render(<ResumenTotales {...props} />);

        expect(screen.getByText("$10.000")).toBeInTheDocument();
    });

    it("debe mostrar impuesto formateado", () => {
        render(<ResumenTotales {...props} />);

        expect(screen.getByText("$1.900")).toBeInTheDocument();
    });

    it("debe mostrar total formateado", () => {
        render(<ResumenTotales {...props} />);

        expect(screen.getByText("$11.900")).toBeInTheDocument();
    });
});
