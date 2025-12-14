import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import EditarProductoPage from "componentes/paginas/Vendedor/productos/EditarProductoPage";

const mockNavigate = vi.fn();
const mockUseParams = vi.fn();

vi.mock("react-router", () => ({
    __esModule: true,
    useNavigate: () => mockNavigate,
    useParams: () => mockUseParams(),
}));

const mockGetProductoById = vi.fn();
const mockEditarProducto = vi.fn();

vi.mock("services/productos", () => ({
    __esModule: true,
    getProductoById: (...args: any[]) => mockGetProductoById(...args),
    editarProducto: (...args: any[]) => mockEditarProducto(...args),
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
    default: ({ modo, productoInicial, onSubmit, loading }: any) => (
        <div data-testid="formulario-producto">
            <p>Modo: {modo}</p>
            <p>Nombre: {productoInicial?.nombre_producto}</p>
            <p>Loading: {loading ? "true" : "false"}</p>
            <button onClick={() => onSubmit({
                nombre_producto: "Tomate Editado",
                descripcion_producto: "Desc",
                precio: 2000,
                stock: 100,
                categoria: 1
            })}>
                Submit
            </button>
        </div>
    ),
}));

const mockMessageSuccess = vi.fn();
const mockMessageError = vi.fn();

vi.mock("antd", async () => {
    const React = await import("react");
    const { createElement } = React;

    return {
        __esModule: true,
        Spin: ({ size }: any) => createElement("div", { className: "ant-spin", "data-size": size }, "Loading..."),
        message: {
            success: (...args: any[]) => mockMessageSuccess(...args),
            error: (...args: any[]) => mockMessageError(...args),
        },
    };
});

describe("EditarProductoPage Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe mostrar loading mientras carga el producto", () => {
        mockUseParams.mockReturnValue({ id: "1" });
        mockGetProductoById.mockReturnValue(new Promise(() => {}));

        const { container } = render(<EditarProductoPage />);

        expect(container.querySelector(".ant-spin")).toBeInTheDocument();
    });

    it("debe cargar y mostrar el producto en el formulario", async () => {
        mockUseParams.mockReturnValue({ id: "1" });
        const productoMock = {
            id_producto: 1,
            nombre_producto: "Tomate",
            descripcion_producto: "Tomate fresco",
            precio: 1500,
            stock: 50,
            categoria: { id_categoria: 1 }
        };
        mockGetProductoById.mockResolvedValue(productoMock);

        render(<EditarProductoPage />);

        await waitFor(() => {
            expect(screen.getByTestId("formulario-producto")).toBeInTheDocument();
            expect(screen.getByText("Modo: editar")).toBeInTheDocument();
            expect(screen.getByText("Nombre: Tomate")).toBeInTheDocument();
        });
    });

    it("debe mostrar error si falla la carga del producto", async () => {
        mockUseParams.mockReturnValue({ id: "999" });
        mockGetProductoById.mockRejectedValue(new Error("Not found"));

        render(<EditarProductoPage />);

        await waitFor(() => {
            expect(mockMessageError).toHaveBeenCalledWith("No se pudo cargar el producto");
        });
    });

    it("debe mostrar mensaje si el producto no existe", async () => {
        mockUseParams.mockReturnValue({ id: "999" });
        mockGetProductoById.mockResolvedValue(null);

        render(<EditarProductoPage />);

        await waitFor(() => {
            expect(screen.getByText("Producto no encontrado")).toBeInTheDocument();
        });
    });

    it("debe editar producto correctamente", async () => {
        mockUseParams.mockReturnValue({ id: "1" });
        const productoMock = {
            id_producto: 1,
            nombre_producto: "Tomate",
            descripcion_producto: "Tomate fresco",
            precio: 1500,
            stock: 50,
            categoria: { id_categoria: 1 }
        };
        mockGetProductoById.mockResolvedValue(productoMock);
        mockEditarProducto.mockResolvedValue({ id_producto: 1 });

        render(<EditarProductoPage />);

        await waitFor(() => {
            expect(screen.getByText("Submit")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Submit"));

        await waitFor(() => {
            expect(mockEditarProducto).toHaveBeenCalledWith(1, {
                nombre_producto: "Tomate Editado",
                descripcion_producto: "Desc",
                precio: 2000,
                stock: 100,
                categoriaId: 1
            });
            expect(mockMessageSuccess).toHaveBeenCalledWith("Producto actualizado correctamente");
            expect(mockNavigate).toHaveBeenCalledWith("/productos");
        });
    });

    it("debe mostrar loading mientras edita el producto", async () => {
        mockUseParams.mockReturnValue({ id: "1" });
        const productoMock = {
            id_producto: 1,
            nombre_producto: "Tomate",
            descripcion_producto: "Tomate fresco",
            precio: 1500,
            stock: 50,
            categoria: { id_categoria: 1 }
        };
        mockGetProductoById.mockResolvedValue(productoMock);
        mockEditarProducto.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

        render(<EditarProductoPage />);

        await waitFor(() => {
            expect(screen.getByText("Loading: false")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Submit"));

        await waitFor(() => {
            expect(screen.getByText("Loading: true")).toBeInTheDocument();
        });
    });

    it("debe mostrar error al fallar la edición", async () => {
        mockUseParams.mockReturnValue({ id: "1" });
        const productoMock = {
            id_producto: 1,
            nombre_producto: "Tomate",
            descripcion_producto: "Tomate fresco",
            precio: 1500,
            stock: 50,
            categoria: { id_categoria: 1 }
        };
        mockGetProductoById.mockResolvedValue(productoMock);
        mockEditarProducto.mockRejectedValue(new Error("Network error"));

        render(<EditarProductoPage />);

        await waitFor(() => {
            expect(screen.getByText("Submit")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Submit"));

        await waitFor(() => {
            expect(mockMessageError).toHaveBeenCalledWith("Error al editar el producto");
            expect(mockNavigate).not.toHaveBeenCalled();
        });
    });

    it("debe mostrar mensaje de error personalizado del backend", async () => {
        mockUseParams.mockReturnValue({ id: "1" });
        const productoMock = {
            id_producto: 1,
            nombre_producto: "Tomate",
            descripcion_producto: "Tomate fresco",
            precio: 1500,
            stock: 50,
            categoria: { id_categoria: 1 }
        };
        const errorMock = {
            response: {
                data: {
                    mensaje: "El nombre del producto ya existe"
                }
            }
        };
        mockGetProductoById.mockResolvedValue(productoMock);
        mockEditarProducto.mockRejectedValue(errorMock);

        render(<EditarProductoPage />);

        await waitFor(() => {
            expect(screen.getByText("Submit")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Submit"));

        await waitFor(() => {
            expect(mockMessageError).toHaveBeenCalledWith("El nombre del producto ya existe");
        });
    });
});
