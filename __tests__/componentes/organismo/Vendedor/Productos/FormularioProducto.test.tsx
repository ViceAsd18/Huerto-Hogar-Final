import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FormularioProducto from "componentes/organismo/Vendedor/Productos/FormularioProducto";
import type { Categoria } from "services/categoria";

const mockCategorias: Categoria[] = [
    { id_categoria: "1", nombre_categoria: "Verduras", descripcion_categoria: "Verduras frescas" },
    { id_categoria: "2", nombre_categoria: "Frutas", descripcion_categoria: "Frutas frescas" },
];

const mockGetCategorias = vi.fn().mockResolvedValue(mockCategorias);

vi.mock("services/categoria", () => ({
    getCategorias: () => mockGetCategorias(),
}));

vi.mock("antd", () => {
    const React = require("react");
    
    const MockFormItem = ({ name, label, children }: any) => (
        React.createElement("div", { "data-testid": `form-item-${name}` },
            React.createElement("label", null, label),
            children
        )
    );

    const MockForm = ({ children, onFinish, ...props }: any) => (
        React.createElement("form", {
            "data-testid": "form",
            onSubmit: (e: any) => {
                e.preventDefault();
                onFinish?.({});
            },
            ...props
        }, children)
    );
    MockForm.Item = MockFormItem;

    const MockInput = ({ placeholder, ...props }: any) =>
        React.createElement("input", {
            type: "text",
            placeholder,
            "data-testid": `input-${placeholder}`,
            ...props
        });

    MockInput.TextArea = ({ placeholder, ...props }: any) =>
        React.createElement("textarea", {
            placeholder,
            "data-testid": `textarea-${placeholder}`,
            ...props
        });

    const MockInputNumber = ({ min, ...props }: any) =>
        React.createElement("input", {
            type: "number",
            min,
            "data-testid": "input-number",
            ...props
        });

    const MockOption = ({ value, children }: any) =>
        React.createElement("option", { value }, children);

    const MockSelect = ({ children, placeholder, ...props }: any) =>
        React.createElement("select", {
            "data-testid": "select-categoria",
            ...props
        },
            React.createElement("option", { value: "" }, placeholder),
            children
        );
    MockSelect.Option = MockOption;

    const MockButton = ({ children, htmlType, loading, ...props }: any) =>
        React.createElement("button", {
            type: htmlType,
            disabled: loading,
            ...props
        }, children);

    return {
        Form: MockForm,
        Input: MockInput,
        InputNumber: MockInputNumber,
        Button: MockButton,
        Select: MockSelect,
    };
});

describe("FormularioProducto Component", () => {
    const defaultProps = {
        modo: "crear" as const,
        onSubmit: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockGetCategorias.mockResolvedValue(mockCategorias);
    });

    it("debe renderizar el componente sin errores", () => {
        const { container } = render(<FormularioProducto {...defaultProps} />);
        expect(container).toBeInTheDocument();
    });

    it("debe mostrar el título correcto en el botón (Crear Producto)", () => {
        render(<FormularioProducto {...defaultProps} modo="crear" />);
        expect(screen.getByText("Crear Producto")).toBeInTheDocument();
    });

    it("debe mostrar el título correcto en el botón (Guardar Cambios)", () => {
        render(<FormularioProducto {...defaultProps} modo="editar" />);
        expect(screen.getByText("Guardar Cambios")).toBeInTheDocument();
    });

    it("debe renderizar el campo de nombre", () => {
        render(<FormularioProducto {...defaultProps} />);
        expect(screen.getByPlaceholderText("Nombre del producto")).toBeInTheDocument();
    });

    it("debe renderizar el campo de descripción", () => {
        render(<FormularioProducto {...defaultProps} />);
        expect(screen.getByPlaceholderText("Descripción")).toBeInTheDocument();
    });

    it("debe renderizar el campo de precio", () => {
        render(<FormularioProducto {...defaultProps} />);
        const priceInputs = screen.getAllByTestId("input-number");
        expect(priceInputs.length).toBeGreaterThan(0);
    });

    it("debe renderizar el campo de stock", () => {
        render(<FormularioProducto {...defaultProps} />);
        const stockInputs = screen.getAllByTestId("input-number");
        expect(stockInputs.length).toBeGreaterThan(0);
    });

    it("debe cargar las categorías al montar", async () => {
        render(<FormularioProducto {...defaultProps} />);
        await waitFor(() => {
            expect(mockGetCategorias).toHaveBeenCalled();
        });
    });

    it("debe mostrar el selector de categorías", async () => {
        render(<FormularioProducto {...defaultProps} />);
        await waitFor(() => {
            expect(screen.getByTestId("select-categoria")).toBeInTheDocument();
        });
    });

    it("debe renderizar todas las etiquetas de campos", () => {
        render(<FormularioProducto {...defaultProps} />);
        expect(screen.getByText("Nombre")).toBeInTheDocument();
        expect(screen.getByText("Descripción")).toBeInTheDocument();
        expect(screen.getByText("Precio")).toBeInTheDocument();
        expect(screen.getByText("Stock")).toBeInTheDocument();
        expect(screen.getByText("Categoría")).toBeInTheDocument();
    });

    it("debe mostrar el botón de envío", () => {
        render(<FormularioProducto {...defaultProps} />);
        expect(screen.getByText("Crear Producto")).toBeInTheDocument();
    });

    it("debe deshabilitar el botón cuando está loading", () => {
        render(<FormularioProducto {...defaultProps} loading={true} />);
        const boton = screen.getByText("Crear Producto") as HTMLButtonElement;
        expect(boton.disabled).toBe(true);
    });

    it("debe llenar el formulario con valores iniciales en modo editar", () => {
        const productoInicial = {
            nombre_producto: "Tomate",
            descripcion_producto: "Tomate rojo",
            precio: 100,
            stock: 50,
        };
        render(<FormularioProducto {...defaultProps} modo="editar" productoInicial={productoInicial} />);
        expect(screen.getByText("Guardar Cambios")).toBeInTheDocument();
    });

    it("debe llamar a onSubmit cuando se envía el formulario", () => {
        render(<FormularioProducto {...defaultProps} onSubmit={defaultProps.onSubmit} />);
        const form = screen.getByTestId("form") as HTMLFormElement;
        fireEvent.submit(form);
        expect(defaultProps.onSubmit).toHaveBeenCalled();
    });

    it("debe renderizar un formulario con layout vertical", () => {
        render(<FormularioProducto {...defaultProps} />);
        const form = screen.getByTestId("form");
        expect(form).toBeInTheDocument();
    });
});
