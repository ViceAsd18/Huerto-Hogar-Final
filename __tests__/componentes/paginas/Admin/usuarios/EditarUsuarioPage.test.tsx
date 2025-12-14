import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import EditarUsuarioPage from "componentes/paginas/Admin/usuarios/EditarUsuarioPage";
import type { User } from "services/usuario";

// Mock de servicios
const mockGetUsuarioById = vi.fn();
const mockEditarUsuario = vi.fn();

vi.mock("services/usuario", () => ({
    getUsuarioById: vi.fn(() => mockGetUsuarioById()),
    editarUsuario: vi.fn(() => mockEditarUsuario()),
}));

// Mock de useParams
vi.mock("react-router", async () => {
    const actual = await vi.importActual<any>("react-router");
    return {
        ...actual,
        useParams: () => ({ id: "1" }),
    };
});

// Mock de antd message
vi.mock("antd", async () => {
    const actual = await vi.importActual("antd");
    return {
        ...actual,
        message: {
            success: vi.fn(),
            error: vi.fn(),
        },
    };
});

// Mock de UsuarioForm
vi.mock("componentes/organismo/admin/UsuarioForm", () => ({
    default: ({ initialValues, onFinish }: any) => (
        <div>
            <div>Nombre: {initialValues.nombre}</div>
            <button onClick={() => onFinish(initialValues)}>Guardar</button>
        </div>
    ),
}));

// Mock de VendedorLayout
vi.mock("componentes/layout/VendedorLayout", () => ({
    default: ({ children }: any) => <div>{children}</div>,
}));

describe("EditarUsuarioPage Component", () => {
    const mockUsuario: User = {
        id_usuario: 1,
        nombre: "Juan Pérez",
        email: "juan@example.com",
        rol: "vendedor",
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockGetUsuarioById.mockResolvedValue(mockUsuario);
        mockEditarUsuario.mockResolvedValue(undefined);
    });

    it("debe mostrar loading mientras carga el usuario", () => {
        mockGetUsuarioById.mockImplementationOnce(() => new Promise(() => {}));
        const { container } = render(
            <BrowserRouter>
                <EditarUsuarioPage />
            </BrowserRouter>
        );

        expect(container.querySelector(".ant-spin")).toBeInTheDocument();
    });

    it("debe cargar y mostrar datos del usuario", async () => {
        render(
            <BrowserRouter>
                <EditarUsuarioPage />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(`Nombre: ${mockUsuario.nombre}`)).toBeInTheDocument();
        });
    });

    it("debe mostrar error cuando no se puede cargar el usuario", async () => {
        mockGetUsuarioById.mockResolvedValueOnce(null);
        render(
            <BrowserRouter>
                <EditarUsuarioPage />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("No se pudo cargar el usuario")).toBeInTheDocument();
        });
    });

    it("debe mostrar error en catch si falla getUsuarioById", async () => {
        mockGetUsuarioById.mockRejectedValueOnce(new Error("Error de API"));
        render(
            <BrowserRouter>
                <EditarUsuarioPage />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("No se pudo cargar el usuario")).toBeInTheDocument();
        });
    });
});
