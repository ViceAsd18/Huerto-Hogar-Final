import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ModalPago from "./ModalPago";

const mockedMessages = vi.hoisted(() => ({
    successMock: vi.fn(),
    errorMock: vi.fn(),
}));
const successMock = mockedMessages.successMock;
const errorMock = mockedMessages.errorMock;
let currentMonto: number | undefined = undefined;

vi.mock("react-router", () => ({
    useNavigate: () => vi.fn(),
}));

vi.mock("antd", async () => {
    const actual = await vi.importActual<any>("antd");
    return {
        ...actual,
        Modal: ({ children, title, open, onCancel, onOk, okText, cancelText }: any) => (
            open ? (
                <div data-testid="modal">
                    <div data-testid="modal-title">{title}</div>
                    {children}
                    <button data-testid="ok" onClick={onOk}>{okText}</button>
                    <button data-testid="cancel" onClick={onCancel}>{cancelText}</button>
                </div>
            ) : null
        ),
        Form: Object.assign(({ children, initialValues, layout }: any) => {
            if (initialValues && typeof initialValues.monto !== "undefined") {
                currentMonto = initialValues.monto;
            }
            return (
                <form data-testid="form" data-layout={layout} data-initial={JSON.stringify(initialValues)}>
                    {children}
                </form>
            );
        }, {
            useForm: () => {
                return [
                    {
                        validateFields: () => Promise.resolve({ monto: currentMonto }),
                        setFieldsValue: (vals: Record<string, any>) => {
                            if (Object.prototype.hasOwnProperty.call(vals, "monto")) {
                                currentMonto = vals.monto;
                            }
                        },
                    },
                ];
            },
            Item: ({ children, label }: any) => (
                <label data-testid="form-item">
                    <span>{label}</span>
                    {children}
                </label>
            ),
        }),
        Input: ({ value, onChange, type, prefix }: any) => (
            <input
                data-testid="input"
                value={value ?? ""}
                onChange={(e) => {
                    currentMonto = Number((e.target as HTMLInputElement).value);
                    onChange?.(e);
                }}
                type={type}
                data-prefix={prefix}
            />
        ),
        Space: ({ children }: any) => <div data-testid="space">{children}</div>,
        Typography: {
            Text: ({ children }: any) => <span data-testid="text">{children}</span>,
        },
        Divider: ({ children }: any) => <div data-testid="divider">{children}</div>,
        message: {
            success: mockedMessages.successMock,
            error: mockedMessages.errorMock,
        },
    };
});

vi.mock("componentes/atomos/Titulo", () => ({
    __esModule: true,
    default: ({ children, nivel }: { children: React.ReactNode; nivel?: number }) => (
        React.createElement(`h${nivel ?? 1}`, { "data-testid": "titulo" }, children)
    ),
}));

describe("ModalPago", () => {
    beforeEach(() => {
        successMock.mockClear();
        errorMock.mockClear();
    });

    const baseProps = {
        visible: true,
        onClose: vi.fn(),
        ordenId: 101,
        cliente: "Juan Perez",
        total: 150,
        onRegistrarPago: vi.fn(),
    };

    it("muestra info de pago y valores iniciales", () => {
        render(<ModalPago {...baseProps} />);

        expect(screen.getByTestId("modal-title")).toHaveTextContent("Registrar Pago - Orden #101");
        expect(screen.getAllByTestId("text").map((el) => el.textContent).join(" ")).toContain("Juan Perez");
        expect(screen.getAllByTestId("text").map((el) => el.textContent).join(" ")).toContain("150");
        const form = screen.getByTestId("form");
        expect(form.getAttribute("data-initial")).toContain("150");
    });

    it("valida monto igual al total y muestra error si difiere", async () => {
        render(<ModalPago {...baseProps} />);

        const input = screen.getByTestId("input");
        fireEvent.change(input, { target: { value: "120" } });
        fireEvent.click(screen.getByTestId("ok"));

        await waitFor(() => {
            expect(errorMock).toHaveBeenCalledWith("El monto recibido debe ser exactamente $150");
            expect(baseProps.onRegistrarPago).not.toHaveBeenCalled();
            expect(baseProps.onClose).not.toHaveBeenCalled();
        });
    });

    it("registra pago, cierra modal y muestra success cuando el monto es correcto", async () => {
        render(<ModalPago {...baseProps} />);

        const input = screen.getByTestId("input");
        fireEvent.change(input, { target: { value: "150" } });
        fireEvent.click(screen.getByTestId("ok"));

        await waitFor(() => {
            expect(baseProps.onRegistrarPago).toHaveBeenCalledWith(150);
            expect(baseProps.onClose).toHaveBeenCalled();
            expect(successMock).toHaveBeenCalledWith("Pago registrado correctamente");
        });
    });
});
