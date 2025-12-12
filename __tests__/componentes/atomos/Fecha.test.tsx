import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Fecha from "../../../componentes/atomos/Fecha";

describe("Fecha Component", () => {
    it("debe renderizar guión si fecha es vacía", () => {
        render(<Fecha fecha="" />);
        expect(screen.getByText("-")).toBeInTheDocument();
    });

    it("debe renderizar fecha en formato corto", () => {
        render(<Fecha fecha="2025-01-15" />);
        expect(screen.getByText(/\d{2}\/\d{2}\/2025/)).toBeInTheDocument();
    });

    it("debe renderizar fecha en formato largo", () => {
        render(<Fecha fecha="2025-01-15" variante="largo" />);
        expect(screen.getByText(/\d{2} de \w+ 2025/)).toBeInTheDocument();
    });

    it("debe parseear fecha con hora en formato SQL", () => {
        render(<Fecha fecha="2025-01-15 14:30:00" />);
        expect(screen.getByText(/\d{2}\/\d{2}\/2025/)).toBeInTheDocument();
    });

    it("debe renderizar 'Fecha inválida' si la fecha es inválida", () => {
        render(<Fecha fecha="fecha-invalida" />);
        expect(screen.getByText("Fecha inválida")).toBeInTheDocument();
    });

    it("debe aceptar objeto Date", () => {
        const date = new Date(2025, 0, 15);
        render(<Fecha fecha={date} />);
        expect(screen.getByText(/\d{2}\/\d{2}\/2025/)).toBeInTheDocument();
    });

    it("debe usar idioma español en formato largo", () => {
        render(<Fecha fecha="2025-12-25" variante="largo" />);
        expect(screen.getByText(/\d{2} de \w+ 2025/)).toBeInTheDocument();
    });
});


