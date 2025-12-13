import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import RegistroForm from "componentes/organismo/RegistroForm";
import { BrowserRouter } from "react-router";

const mockNavigate = vi.fn();
const mockUser = { id: "1", nombre: "Admin", email: "admin@test.com", rol: "admin" };
const mockUseAuth = vi.fn();

vi.mock("react-router", () => {
    const React = require("react");
    return {
        useNavigate: () => mockNavigate,
        BrowserRouter: ({ children }: any) => React.createElement("div", null, children),
    };
});

vi.mock("auth/AuthContext", () => ({
    useAuth: () => mockUseAuth(),
}));

vi.mock("antd", () => {
    const React = require("react");

    const MockFormItem = ({ label, name, children }: any) =>
        React.createElement(
            "div",
            { "data-testid": `form-item-${name}` },
            React.createElement("label", null, label),
            children
        );

    const MockForm = ({ children, onFinish, form }: any) => {
        const formData: Record<string, string> = {};

        return React.createElement(
            "form",
            {
                "data-testid": "registro-form",
                onSubmit: (e: any) => {
                    e.preventDefault();
                    onFinish?.(formData);
                },
            },
            React.Children.map(children, (child: any) => {
                if (child?.props?.name) {
                    return React.cloneElement(child, {
                        children: React.cloneElement(child.props.children, {
                            onChange: (e: any) => {
                                formData[child.props.name] = e.target.value;
                            },
                        }),
                    });
                }
                return child;
            })
        );
    };
    MockForm.Item = MockFormItem;
    MockForm.useForm = () => [{ resetFields: vi.fn() }];

    const MockInput = ({ placeholder, onChange, ...props }: any) =>
        React.createElement("input", {
            type: "text",
            placeholder,
            onChange,
            "data-testid": `input-${placeholder}`,
            ...props,
        });

    MockInput.Password = ({ placeholder, onChange, ...props }: any) =>
        React.createElement("input", {
            type: "password",
            placeholder,
            onChange,
            "data-testid": `input-${placeholder}`,
            ...props,
        });

    const MockButton = ({ children, htmlType, loading, block, ...props }: any) =>
        React.createElement(
            "button",
            { type: htmlType, disabled: loading, ...props },
            children
        );

    const MockCard = ({ children, style }: any) =>
        React.createElement("div", { "data-testid": "card", style }, children);

    const MockOption = ({ value, children }: any) =>
        React.createElement("option", { value }, children);

    const MockSelect = ({ children, placeholder, onChange, ...props }: any) =>
        React.createElement(
            "select",
            { "data-testid": "select-rol", onChange, ...props },
            children
        );
    MockSelect.Option = MockOption;

    return {
        Form: MockForm,
        Input: MockInput,
        Button: MockButton,
        Card: MockCard,
        Select: MockSelect,
    };
});

vi.mock("componentes/atomos/Titulo", () => ({
    default: ({ children, style }: any) =>
        require("react").createElement("h3", { "data-testid": "titulo", style }, children),
}));

describe("RegistroForm Component", () => {
    const mockOnSubmit = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        mockUseAuth.mockReturnValue({
            user: null,
            loading: false,
        });
    });

    it("debe renderizar el componente sin errores", () => {
        const { container } = render(
            <BrowserRouter>
                <RegistroForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(container).toBeInTheDocument();
    });

    it("no debe renderizar nada mientras el AuthContext está cargando", () => {
        mockUseAuth.mockReturnValue({
            user: null,
            loading: true,
        });
        render(
            <BrowserRouter>
                <RegistroForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(screen.queryByText("Crea tu cuenta")).not.toBeInTheDocument();
    });

    it("debe mostrar el título 'Crea tu cuenta'", () => {
        render(
            <BrowserRouter>
                <RegistroForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(screen.getByText("Crea tu cuenta")).toBeInTheDocument();
    });

    it("debe renderizar la tarjeta de registro", () => {
        render(
            <BrowserRouter>
                <RegistroForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(screen.getByTestId("card")).toBeInTheDocument();
    });

    it("debe renderizar el campo de nombre", () => {
        render(
            <BrowserRouter>
                <RegistroForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(screen.getByText("Nombre")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Tu nombre")).toBeInTheDocument();
    });

    it("debe renderizar el campo de correo electrónico", () => {
        render(
            <BrowserRouter>
                <RegistroForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(screen.getByText("Correo electrónico")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("ejemplo@correo.com")).toBeInTheDocument();
    });

    it("debe renderizar el campo de contraseña", () => {
        render(
            <BrowserRouter>
                <RegistroForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(screen.getByText("Contraseña")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("********")).toBeInTheDocument();
    });

    it("no debe mostrar el select de rol cuando el usuario no es admin", () => {
        render(
            <BrowserRouter>
                <RegistroForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(screen.queryByTestId("select-rol")).not.toBeInTheDocument();
    });

    it("debe mostrar el select de rol cuando el usuario es admin", () => {
        mockUseAuth.mockReturnValue({
            user: mockUser,
            loading: false,
        });
        render(
            <BrowserRouter>
                <RegistroForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(screen.getByText("Rol")).toBeInTheDocument();
        expect(screen.getByTestId("select-rol")).toBeInTheDocument();
    });

    it("debe mostrar las opciones de rol", () => {
        mockUseAuth.mockReturnValue({
            user: mockUser,
            loading: false,
        });
        render(
            <BrowserRouter>
                <RegistroForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(screen.getByText("Cliente")).toBeInTheDocument();
        expect(screen.getByText("Admin")).toBeInTheDocument();
        expect(screen.getByText("Vendedor")).toBeInTheDocument();
    });

    it("debe renderizar el botón de registrarse", () => {
        render(
            <BrowserRouter>
                <RegistroForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(screen.getByText("Registrarse")).toBeInTheDocument();
    });

    it("debe mostrar el enlace para iniciar sesión", () => {
        render(
            <BrowserRouter>
                <RegistroForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(screen.getByText("Inicia sesión")).toBeInTheDocument();
    });

    it("debe llamar a onSubmit cuando se envía el formulario", () => {
        render(
            <BrowserRouter>
                <RegistroForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        const form = screen.getByTestId("registro-form");
        fireEvent.submit(form);
        expect(mockOnSubmit).toHaveBeenCalled();
    });

    it("debe deshabilitar el botón cuando está loading", () => {
        render(
            <BrowserRouter>
                <RegistroForm onSubmit={mockOnSubmit} loading={true} />
            </BrowserRouter>
        );
        const boton = screen.getByText("Registrarse") as HTMLButtonElement;
        expect(boton.disabled).toBe(true);
    });

    it("debe habilitar el botón cuando no está loading", () => {
        render(
            <BrowserRouter>
                <RegistroForm onSubmit={mockOnSubmit} loading={false} />
            </BrowserRouter>
        );
        const boton = screen.getByText("Registrarse") as HTMLButtonElement;
        expect(boton.disabled).toBe(false);
    });

    it("debe navegar a /login al hacer clic en el enlace de iniciar sesión", () => {
        render(
            <BrowserRouter>
                <RegistroForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        const enlace = screen.getByText("Inicia sesión");
        fireEvent.click(enlace);
        expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    it("debe mostrar el texto '¿Ya tienes cuenta?'", () => {
        render(
            <BrowserRouter>
                <RegistroForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(screen.getByText(/¿Ya tienes cuenta?/)).toBeInTheDocument();
    });
});
