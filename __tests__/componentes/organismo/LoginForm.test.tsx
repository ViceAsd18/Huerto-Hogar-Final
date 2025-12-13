import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "componentes/organismo/LoginForm";
import { BrowserRouter } from "react-router";

const mockNavigate = vi.fn();

vi.mock("react-router", () => {
    const React = require("react");
    return {
        useNavigate: () => mockNavigate,
        BrowserRouter: ({ children }: any) => React.createElement("div", null, children),
    };
});

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
                "data-testid": "login-form",
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
    MockForm.useForm = () => [{}];

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

    return {
        Form: MockForm,
        Input: MockInput,
        Button: MockButton,
        Card: MockCard,
    };
});

vi.mock("componentes/atomos/Titulo", () => ({
    default: ({ children, style }: any) =>
        require("react").createElement("h3", { "data-testid": "titulo", style }, children),
}));

describe("LoginForm Component", () => {
    const mockOnSubmit = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar el componente sin errores", () => {
        const { container } = render(
            <BrowserRouter>
                <LoginForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(container).toBeInTheDocument();
    });

    it("debe mostrar el título 'Accede a tu cuenta'", () => {
        render(
            <BrowserRouter>
                <LoginForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(screen.getByText("Accede a tu cuenta")).toBeInTheDocument();
    });

    it("debe renderizar la tarjeta de login", () => {
        render(
            <BrowserRouter>
                <LoginForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(screen.getByTestId("card")).toBeInTheDocument();
    });

    it("debe renderizar el formulario", () => {
        render(
            <BrowserRouter>
                <LoginForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(screen.getByTestId("login-form")).toBeInTheDocument();
    });

    it("debe renderizar el campo de correo electrónico", () => {
        render(
            <BrowserRouter>
                <LoginForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(screen.getByText("Correo electrónico")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("ejemplo@correo.com")).toBeInTheDocument();
    });

    it("debe renderizar el campo de contraseña", () => {
        render(
            <BrowserRouter>
                <LoginForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(screen.getByText("Contraseña")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("********")).toBeInTheDocument();
    });

    it("debe renderizar el botón de iniciar sesión", () => {
        render(
            <BrowserRouter>
                <LoginForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    });

    it("debe mostrar el enlace para crear cuenta", () => {
        render(
            <BrowserRouter>
                <LoginForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(screen.getByText("Crea una cuenta")).toBeInTheDocument();
    });

    it("debe llamar a onSubmit cuando se envía el formulario", () => {
        render(
            <BrowserRouter>
                <LoginForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        const form = screen.getByTestId("login-form");
        fireEvent.submit(form);
        expect(mockOnSubmit).toHaveBeenCalled();
    });

    it("debe deshabilitar el botón cuando está loading", () => {
        render(
            <BrowserRouter>
                <LoginForm onSubmit={mockOnSubmit} loading={true} />
            </BrowserRouter>
        );
        const boton = screen.getByText("Iniciar sesión") as HTMLButtonElement;
        expect(boton.disabled).toBe(true);
    });

    it("debe navegar a /registro al hacer clic en el enlace de crear cuenta", () => {
        render(
            <BrowserRouter>
                <LoginForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        const enlace = screen.getByText("Crea una cuenta");
        fireEvent.click(enlace);
        expect(mockNavigate).toHaveBeenCalledWith("/registro");
    });

    it("debe mostrar el botón habilitado cuando no está loading", () => {
        render(
            <BrowserRouter>
                <LoginForm onSubmit={mockOnSubmit} loading={false} />
            </BrowserRouter>
        );
        const boton = screen.getByText("Iniciar sesión") as HTMLButtonElement;
        expect(boton.disabled).toBe(false);
    });

    it("debe mostrar el texto '¿Nuevo usuario?'", () => {
        render(
            <BrowserRouter>
                <LoginForm onSubmit={mockOnSubmit} />
            </BrowserRouter>
        );
        expect(screen.getByText(/¿Nuevo usuario?/)).toBeInTheDocument();
    });
});
