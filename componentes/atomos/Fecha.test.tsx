import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Fecha from "./Fecha";

describe("Fecha", () => {
    it("muestra guion cuando no hay fecha", () => {
        render(<Fecha fecha={"" as any} />);

        expect(screen.getByText("-")).toBeInTheDocument();
    });

    it("muestra mensaje para fecha invalida", () => {
        render(<Fecha fecha={"no-date"} />);

        expect(screen.getByText("Fecha inválida")).toBeInTheDocument();
    });

    it("formatea en modo corto por defecto (string SQL)", () => {
        render(<Fecha fecha="2025-11-28 12:00:00" />);

        expect(screen.getByText("28/11/2025")).toBeInTheDocument();
    });

    it("formatea en modo largo con locale es", () => {
        const date = new Date(Date.UTC(2025, 4, 15, 12, 0, 0)); // 15 mayo 2025
        render(<Fecha fecha={date} variante="largo" />);

        expect(screen.getByText("15 de mayo 2025")).toBeInTheDocument();
    });
});
