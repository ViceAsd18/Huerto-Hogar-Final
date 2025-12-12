import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import UsuariosTable from "componentes/moleculas/Admin/UsuariosTable";
import type { User } from "services/usuario";

describe("UsuariosTable Component", () => {
    const mockUsuarios: User[] = [
        {
            id_usuario: 1,
            nombre: "Juan Pérez",
            email: "juan@example.com",
            rol: "cliente",
        },
        {
            id_usuario: 2,
            nombre: "María García",
            email: "maria@example.com",
            rol: "vendedor",
        },
    ];

    it("debe renderizar tabla con usuarios", () => {
        render(<UsuariosTable usuarios={mockUsuarios} onEditar={vi.fn()} />);
        expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
        expect(screen.getByText("María García")).toBeInTheDocument();
    });

    it("debe mostrar encabezados de columnas", () => {
        render(<UsuariosTable usuarios={mockUsuarios} onEditar={vi.fn()} />);
        expect(screen.getByText("ID")).toBeInTheDocument();
        expect(screen.getByText("Nombre")).toBeInTheDocument();
        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByText("Rol")).toBeInTheDocument();
        expect(screen.getByText("Acciones")).toBeInTheDocument();
    });

    it("debe mostrar datos de usuarios correctos", () => {
        render(<UsuariosTable usuarios={mockUsuarios} onEditar={vi.fn()} />);
        expect(screen.getByText("juan@example.com")).toBeInTheDocument();
        expect(screen.getByText("maria@example.com")).toBeInTheDocument();
        expect(screen.getByText("cliente")).toBeInTheDocument();
        expect(screen.getByText("vendedor")).toBeInTheDocument();
    });

    it("debe llamar onEditar cuando se hace clic en Editar", () => {
        const mockOnEditar = vi.fn();
        render(<UsuariosTable usuarios={mockUsuarios} onEditar={mockOnEditar} />);
        
        const botonesEditar = screen.getAllByText("Editar");
        fireEvent.click(botonesEditar[0]);
        
        expect(mockOnEditar).toHaveBeenCalledWith(mockUsuarios[0]);
    });

    it("debe renderizar tabla vacía sin usuarios", () => {
        render(<UsuariosTable usuarios={[]} onEditar={vi.fn()} />);
        expect(screen.getByText("ID")).toBeInTheDocument();
        expect(screen.getByText("Nombre")).toBeInTheDocument();
    });

    it("debe renderizar todos los botones Editar", () => {
        render(<UsuariosTable usuarios={mockUsuarios} onEditar={vi.fn()} />);
        const botonesEditar = screen.getAllByText("Editar");
        expect(botonesEditar).toHaveLength(mockUsuarios.length);
    });
});
