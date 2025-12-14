import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import UsuariosPage from "componentes/paginas/Admin/usuarios/UsuariosPage";
import type { User } from "services/usuario";

// Mock de servicios
const mockGetUsuarios = vi.fn();

vi.mock("services/usuario", () => ({
    getUsuarios: vi.fn(() => mockGetUsuarios()),
}));

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
    const actual = await vi.importActual<any>("react-router");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Mock de antd message
vi.mock("antd", async () => {
    const actual = await vi.importActual("antd");
    return {
        ...actual,
        message: {
            error: vi.fn(),
        },
    };
});

// Mock de UsuariosTable
vi.mock("componentes/moleculas/Admin/UsuariosTable", () => ({
    default: ({ usuarios, onEditar }: any) => (
        <div>
            <div>Total usuarios: {usuarios.length}</div>
            {usuarios.map((u: User) => (
                <div key={u.id_usuario} data-testid={`usuario-${u.id_usuario}`}>
                    {u.nombre} - {u.rol}
                    <button onClick={() => onEditar(u)}>Editar</button>
                </div>
            ))}
        </div>
    ),
}));

// Mock de ControlsTabla
vi.mock("componentes/organismo/Vendedor/Controls/ControlsTabla", () => ({
    default: ({ busqueda, onBusquedaChange, filtro, onFiltroChange, onBotonClick }: any) => (
        <div>
            <input
                value={busqueda}
                onChange={(e) => onBusquedaChange(e.target.value)}
                placeholder="Buscar"
            />
            <select value={filtro} onChange={(e) => onFiltroChange(e.target.value)}>
                <option value="">Todos</option>
                <option value="cliente">Cliente</option>
                <option value="admin">Admin</option>
                <option value="empleado">Empleado</option>
            </select>
            <button onClick={onBotonClick}>Nuevo</button>
        </div>
    ),
}));

// Mock de VendedorLayout
vi.mock("componentes/layout/VendedorLayout", () => ({
    default: ({ children }: any) => <div>{children}</div>,
}));

describe("UsuariosPage Component", () => {
    const mockUsuarios: User[] = [
        {
            id_usuario: 1,
            nombre: "Juan Cliente",
            email: "juan@example.com",
            rol: "cliente",
        },
        {
            id_usuario: 2,
            nombre: "María Admin",
            email: "maria@example.com",
            rol: "admin",
        },
        {
            id_usuario: 3,
            nombre: "Carlos Empleado",
            email: "carlos@example.com",
            rol: "empleado",
        },
    ];

    beforeEach(() => {
        vi.clearAllMocks();
        mockGetUsuarios.mockResolvedValue(mockUsuarios);
    });

    it("debe cargar y mostrar lista de usuarios", async () => {
        render(
            <BrowserRouter>
                <UsuariosPage />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Total usuarios: 3")).toBeInTheDocument();
            expect(screen.getByText(/Juan Cliente/)).toBeInTheDocument();
            expect(screen.getByText(/María Admin/)).toBeInTheDocument();
        });
    });

    it("debe mostrar loading mientras se cargan usuarios", () => {
        mockGetUsuarios.mockImplementationOnce(() => new Promise(() => {}));
        const { container } = render(
            <BrowserRouter>
                <UsuariosPage />
            </BrowserRouter>
        );

        expect(container.querySelector(".ant-spin")).toBeInTheDocument();
    });

    it("debe filtrar usuarios por búsqueda", async () => {
        render(
            <BrowserRouter>
                <UsuariosPage />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Total usuarios: 3")).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText("Buscar");
        fireEvent.change(searchInput, { target: { value: "Juan" } });

        await waitFor(() => {
            expect(screen.getByText("Total usuarios: 1")).toBeInTheDocument();
            expect(screen.getByText(/Juan Cliente/)).toBeInTheDocument();
        });
    });

    it("debe filtrar usuarios por rol", async () => {
        render(
            <BrowserRouter>
                <UsuariosPage />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Total usuarios: 3")).toBeInTheDocument();
        });

        const select = screen.getByDisplayValue("Todos");
        fireEvent.change(select, { target: { value: "admin" } });

        await waitFor(() => {
            expect(screen.getByText("Total usuarios: 1")).toBeInTheDocument();
            expect(screen.getByText(/María Admin/)).toBeInTheDocument();
        });
    });

    it("debe navegar a editar usuario al hacer clic en Editar", async () => {
        render(
            <BrowserRouter>
                <UsuariosPage />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Total usuarios: 3")).toBeInTheDocument();
        });

        const editButtons = screen.getAllByText("Editar");
        fireEvent.click(editButtons[0]);

        expect(mockNavigate).toHaveBeenCalledWith("/admin/editar-usuario/1");
    });
});
