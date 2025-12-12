import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PrecioProducto from "../../../componentes/atomos/PrecioProducto";

describe("PrecioProducto Component", () => {
    it("debe renderizar precio con formato dos decimales", () => {
        render(<PrecioProducto valor={19.5} />);
        expect(screen.getByText("$19.50")).toBeInTheDocument();
    });

    it("debe renderizar precio con tipo normal por defecto", () => {
        render(<PrecioProducto valor={50} />);
        const text = screen.getByText("$50.00");
        expect(text).toHaveStyle({ fontSize: "14px", fontWeight: "400" });
    });

    it("debe renderizar precio con tipo destacado", () => {
        render(<PrecioProducto valor={99.99} tipo="destacado" />);
        const text = screen.getByText("$99.99");
        expect(text).toHaveStyle({ fontSize: "24px", fontWeight: "500" });
    });

    it("debe aplicar color personalizado", () => {
        render(<PrecioProducto valor={100} color="rgb(255, 0, 0)" />);
        const text = screen.getByText("$100.00");
        expect(text).toHaveStyle({ color: "rgb(255, 0, 0)" });
    });

    it("debe usar color negro por defecto", () => {
        render(<PrecioProducto valor={50} />);
        const text = screen.getByText("$50.00");
        expect(text).toHaveStyle({ color: "#000" });
    });
});
