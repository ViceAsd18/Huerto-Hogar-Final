import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import InfoDato from "componentes/moleculas/Cliente/Orden/InfoDato";

describe("InfoDato Component", () => {
    it("debe renderizar label y value", () => {
        render(<InfoDato label="Cliente" value="Juan Pérez" />);

        expect(screen.getByText("Cliente")).toBeInTheDocument();
        expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
    });

    it("debe renderizar value como ReactNode", () => {
        render(
            <InfoDato
                label="Estado"
                value={<span style={{ color: "green" }}>Completado</span>}
            />
        );

        expect(screen.getByText("Estado")).toBeInTheDocument();
        expect(screen.getByText("Completado")).toBeInTheDocument();
    });

    it("debe renderizar diferentes datos", () => {
        const { rerender } = render(
            <InfoDato label="Orden ID" value="ORD-12345" />
        );

        expect(screen.getByText("Orden ID")).toBeInTheDocument();
        expect(screen.getByText("ORD-12345")).toBeInTheDocument();

        rerender(<InfoDato label="Total" value="$150.00" />);

        expect(screen.getByText("Total")).toBeInTheDocument();
        expect(screen.getByText("$150.00")).toBeInTheDocument();
    });
});
