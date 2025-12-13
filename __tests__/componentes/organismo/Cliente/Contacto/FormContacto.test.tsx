import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FormularioContacto from "../../../../../componentes/organismo/Cliente/Contacto/FormContacto";

describe("FormularioContacto Component", () => {
    it("debe renderizar el título principal", () => {
        render(<FormularioContacto />);

        expect(screen.getByText(/Conéctate con HuertoHogar/i)).toBeInTheDocument();
    });

    it("debe renderizar la descripción", () => {
        render(<FormularioContacto />);

        expect(screen.getByText(/Estamos aqui para ayudarte/i)).toBeInTheDocument();
    });

    it("debe renderizar todos los campos del formulario", () => {
        const { container } = render(<FormularioContacto />);

        expect(container.querySelector('input[placeholder="Ingresa tu nombre completo"]')).toBeInTheDocument();
        expect(container.querySelector('input[placeholder="Ingresa tu teléfono"]')).toBeInTheDocument();
        expect(container.querySelector('input[placeholder="Ingresa tu correo electrónico"]')).toBeInTheDocument();
        expect(container.querySelector('textarea[placeholder="Escribe aquí tu mensaje..."]')).toBeInTheDocument();
    });

    it("debe renderizar el botón de envío", () => {
        render(<FormularioContacto />);

        expect(screen.getByRole("button", { name: /Enviar Mensaje/i })).toBeInTheDocument();
    });

    it("debe permitir llenar los campos del formulario", () => {
        const { container } = render(<FormularioContacto />);

        const nombreInput = container.querySelector('input[placeholder="Ingresa tu nombre completo"]') as HTMLInputElement;
        const emailInput = container.querySelector('input[placeholder="Ingresa tu correo electrónico"]') as HTMLInputElement;
        const mensajeTextarea = container.querySelector('textarea[placeholder="Escribe aquí tu mensaje..."]') as HTMLTextAreaElement;

        fireEvent.change(nombreInput, { target: { value: "Juan Pérez" } });
        fireEvent.change(emailInput, { target: { value: "juan@example.com" } });
        fireEvent.change(mensajeTextarea, { target: { value: "Este es mi mensaje" } });

        expect(nombreInput.value).toBe("Juan Pérez");
        expect(emailInput.value).toBe("juan@example.com");
        expect(mensajeTextarea.value).toBe("Este es mi mensaje");
    });

    it("debe permitir llenar el campo teléfono (opcional)", () => {
        const { container } = render(<FormularioContacto />);

        const telefonoInput = container.querySelector('input[placeholder="Ingresa tu teléfono"]') as HTMLInputElement;

        fireEvent.change(telefonoInput, { target: { value: "1234567890" } });

        expect(telefonoInput.value).toBe("1234567890");
    });

    it("debe enviar el formulario cuando todos los campos requeridos están llenos", async () => {
        const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
        const { container } = render(<FormularioContacto />);

        const nombreInput = container.querySelector('input[placeholder="Ingresa tu nombre completo"]') as HTMLInputElement;
        const emailInput = container.querySelector('input[placeholder="Ingresa tu correo electrónico"]') as HTMLInputElement;
        const mensajeTextarea = container.querySelector('textarea[placeholder="Escribe aquí tu mensaje..."]') as HTMLTextAreaElement;

        fireEvent.change(nombreInput, { target: { value: "Juan Pérez" } });
        fireEvent.change(emailInput, { target: { value: "juan@example.com" } });
        fireEvent.change(mensajeTextarea, { target: { value: "Este es mi mensaje" } });

        const botonEnvio = screen.getByRole("button", { name: /Enviar Mensaje/i });
        fireEvent.click(botonEnvio);

        consoleSpy.mockRestore();
    });
});
