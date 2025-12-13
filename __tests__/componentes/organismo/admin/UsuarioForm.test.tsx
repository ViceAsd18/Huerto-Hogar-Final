import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import UsuarioForm from "../../../../componentes/organismo/admin/UsuarioForm";
import type { User } from "services/usuario";

describe("UsuarioForm Component", () => {
    const mockUser: User = {
        id_usuario: 1,
        nombre: "Juan Pérez",
        email: "juan@example.com",
        rol: "cliente",
    };

    it("debe renderizar el formulario con el botón de guardar", () => {
        render(<UsuarioForm initialValues={mockUser} onFinish={vi.fn()} />);
        
        expect(screen.getByRole("button", { name: /guardar/i })).toBeInTheDocument();
    });

    it("debe renderizar los campos del formulario", () => {
        const { container } = render(<UsuarioForm initialValues={mockUser} onFinish={vi.fn()} />);
        
        const nombreInput = container.querySelector('input[name="nombre"]');
        const emailInput = container.querySelector('input[name="email"]');
        const rolSelect = container.querySelector('select[name="rol"]');

        expect(nombreInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(rolSelect).toBeInTheDocument();
    });

    it("debe llamar onFinish al enviar el formulario", () => {
        const handleFinish = vi.fn();
        render(<UsuarioForm initialValues={mockUser} onFinish={handleFinish} />);
        
        const submitButton = screen.getByRole("button", { name: /guardar/i });
        fireEvent.click(submitButton);

        expect(handleFinish).toHaveBeenCalled();
    });

    it("debe mostrar las opciones de rol correctas", () => {
        const { container } = render(<UsuarioForm initialValues={mockUser} onFinish={vi.fn()} />);
        
        expect(screen.getByText("Cliente")).toBeInTheDocument();
        expect(screen.getByText("Admin")).toBeInTheDocument();
        expect(screen.getByText("Vendedor")).toBeInTheDocument();
    });
});
