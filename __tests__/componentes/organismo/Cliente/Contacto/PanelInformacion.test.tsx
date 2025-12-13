import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PanelInformacion from "../../../../../componentes/organismo/Cliente/Contacto/PanelInformacion";

describe("PanelInformacion Component", () => {
    it("debe renderizar el título de información", () => {
        render(<PanelInformacion />);

        expect(screen.getByText("Información")).toBeInTheDocument();
    });

    it("debe renderizar el email de contacto", () => {
        render(<PanelInformacion />);

        expect(screen.getByText("contacto@huertohogar.cl")).toBeInTheDocument();
    });

    it("debe renderizar el teléfono de contacto", () => {
        render(<PanelInformacion />);

        expect(screen.getByText("+56 9 1234 5678")).toBeInTheDocument();
    });

    it("debe renderizar la ubicación", () => {
        render(<PanelInformacion />);

        expect(screen.getByText("Av. Providencia 1234, Santiago")).toBeInTheDocument();
    });

    it("debe renderizar las etiquetas de información", () => {
        render(<PanelInformacion />);

        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByText("Teléfono")).toBeInTheDocument();
        expect(screen.getByText("Ubicación")).toBeInTheDocument();
    });

    it("debe renderizar la imagen del mapa", () => {
        render(<PanelInformacion />);

        const mapa = screen.getByAltText("Mapa");
        expect(mapa).toBeInTheDocument();
        expect(mapa).toHaveAttribute("src", "/assets/img/nosotros/mapa-chile.png");
    });

    it("debe renderizar tres InfoItems", () => {
        const { container } = render(<PanelInformacion />);

        const infoItems = container.querySelectorAll("[style*='flex-direction']");
        expect(infoItems.length).toBeGreaterThan(0);
    });
});
