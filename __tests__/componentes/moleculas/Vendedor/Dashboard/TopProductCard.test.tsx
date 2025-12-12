import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TopProductCard from "componentes/moleculas/Vendedor/Dashboard/TopProductCard";

describe("TopProductCard Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar nombre del producto", () => {
        render(<TopProductCard nombre="Tomate Orgánico" vendidos={150} />);

        expect(screen.getByText("Tomate Orgánico")).toBeInTheDocument();
    });

    it("debe renderizar cantidad de vendidos", () => {
        render(<TopProductCard nombre="Tomate Orgánico" vendidos={150} />);

        expect(screen.getByText("150 vendidos")).toBeInTheDocument();
    });

    it("debe renderizar con diferentes valores", () => {
        render(<TopProductCard nombre="Lechuga" vendidos={75} />);

        expect(screen.getByText("Lechuga")).toBeInTheDocument();
        expect(screen.getByText("75 vendidos")).toBeInTheDocument();
    });

    it("debe renderizar con vendidos en 0", () => {
        render(<TopProductCard nombre="Producto Nuevo" vendidos={0} />);

        expect(screen.getByText("Producto Nuevo")).toBeInTheDocument();
        expect(screen.getByText("0 vendidos")).toBeInTheDocument();
    });
});
