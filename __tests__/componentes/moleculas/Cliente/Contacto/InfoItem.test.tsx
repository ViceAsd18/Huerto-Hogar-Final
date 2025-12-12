import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import InfoItem from "componentes/moleculas/Cliente/Contacto/InfoItem";

describe("InfoItem Component", () => {
    it("debe renderizar label y value", () => {
        render(
            <InfoItem
                icon={<span>📧</span>}
                label="Email"
                value="contacto@huerto.com"
            />
        );

        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByText("contacto@huerto.com")).toBeInTheDocument();
    });

    it("debe renderizar icono", () => {
        render(
            <InfoItem
                icon={<span data-testid="test-icon">🏠</span>}
                label="Dirección"
                value="Calle Principal 123"
            />
        );

        expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });

    it("debe renderizar diferentes tipos de información", () => {
        const { rerender } = render(
            <InfoItem icon={<span>📞</span>} label="Teléfono" value="555-1234" />
        );

        expect(screen.getByText("Teléfono")).toBeInTheDocument();
        expect(screen.getByText("555-1234")).toBeInTheDocument();

        rerender(
            <InfoItem icon={<span>🕐</span>} label="Horario" value="Lun-Vie 9:00-18:00" />
        );

        expect(screen.getByText("Horario")).toBeInTheDocument();
        expect(screen.getByText("Lun-Vie 9:00-18:00")).toBeInTheDocument();
    });

    it("debe mantener estructura correcta", () => {
        const { container } = render(
            <InfoItem icon={<span>📍</span>} label="Ubicación" value="Centro Ciudad" />
        );

        const divPrincipal = container.firstChild as HTMLElement;
        expect(divPrincipal).toBeInTheDocument();
        expect(divPrincipal.style.display).toBe("flex");
    });
});
