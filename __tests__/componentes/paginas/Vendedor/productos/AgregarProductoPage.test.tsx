import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AgregarProductoPage from "componentes/paginas/Vendedor/productos/AgregarProductoPage";

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
    __esModule: true,
    useNavigate: () => mockNavigate,
}));

const mockCrearProducto = vi.fn();

vi.mock("services/productos", () => ({
    __esModule: true,
    crearProducto: (...args: any[]) => mockCrearProducto(...args),
}));

vi.mock("componentes/layout/VendedorLayout", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="vendedor-layout">{children}</div>,
}));

vi.mock("componentes/atomos/Titulo", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <h1>{children}</h1>,
}));

vi.mock("componentes/organismo/Vendedor/Productos/FormularioProducto", () => ({
    __esModule: true,
    default: ({ modo, onSubmit, loading }: any) => (
        <div data-testid="formulario-producto">
            <p>Modo: {modo}</p>
            <p>Loading: {loading ? "true" : "false"}</p>
            <button onClick={() => onSubmit({ nombre_producto: "Tomate", precio: 1000 })}>
                Submit
            </button>
        </div>
    ),
}));

const mockMessageSuccess = vi.fn();
const mockMessageError = vi.fn();

vi.mock("antd", () => ({
    __esModule: true,
    message: {
        success: (...args: any[]) => mockMessageSuccess(...args),
        error: (...args: any[]) => mockMessageError(...args),
    },
}));

describe("AgregarProductoPage Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar el layout de vendedor", () => {
        render(<AgregarProductoPage />);

        expect(screen.getByTestId("vendedor-layout")).toBeInTheDocument();
    });

    it("debe renderizar el título", () => {
        render(<AgregarProductoPage />);

        expect(screen.getByText("Agregar Nuevo Producto")).toBeInTheDocument();
    });

    it("debe renderizar el formulario en modo crear", () => {
        render(<AgregarProductoPage />);

        expect(screen.getByTestId("formulario-producto")).toBeInTheDocument();
        expect(screen.getByText("Modo: crear")).toBeInTheDocument();
    });

    it("debe crear producto correctamente", async () => {
        mockCrearProducto.mockResolvedValue({ id_producto: 1 });

        render(<AgregarProductoPage />);

        fireEvent.click(screen.getByText("Submit"));

        await waitFor(() => {
            expect(mockCrearProducto).toHaveBeenCalledWith({ nombre_producto: "Tomate", precio: 1000 });
            expect(mockMessageSuccess).toHaveBeenCalledWith("Producto creado correctamente");
            expect(mockNavigate).toHaveBeenCalledWith("/productos");
        });
    });

    it("debe mostrar loading mientras crea el producto", async () => {
        mockCrearProducto.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

        render(<AgregarProductoPage />);

        expect(screen.getByText("Loading: false")).toBeInTheDocument();

        fireEvent.click(screen.getByText("Submit"));

        await waitFor(() => {
            expect(screen.getByText("Loading: true")).toBeInTheDocument();
        });
    });

    it("debe mostrar error al fallar la creación", async () => {
        mockCrearProducto.mockRejectedValue(new Error("Network error"));

        render(<AgregarProductoPage />);

        fireEvent.click(screen.getByText("Submit"));

        await waitFor(() => {
            expect(mockMessageError).toHaveBeenCalledWith("Ocurrió un error al crear el producto");
            expect(mockNavigate).not.toHaveBeenCalled();
        });
    });

    it("debe mostrar mensaje de error personalizado si viene del backend", async () => {
        const errorMock = {
            response: {
                data: {
                    mensaje: "El producto ya existe"
                }
            }
        };
        mockCrearProducto.mockRejectedValue(errorMock);

        render(<AgregarProductoPage />);

        fireEvent.click(screen.getByText("Submit"));

        await waitFor(() => {
            expect(mockMessageError).toHaveBeenCalledWith("El producto ya existe");
        });
    });
});
