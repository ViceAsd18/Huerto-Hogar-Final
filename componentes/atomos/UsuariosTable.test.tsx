import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import UsuariosTable from "./UsuariosTable";

vi.mock("@ant-design/icons", () => ({
    EditOutlined: () => <span data-testid="edit-icon" />,
}));

vi.mock("./Boton", () => ({
    __esModule: true,
    default: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
        <button data-testid="boton-editar" onClick={onClick}>
            {children}
        </button>
    ),
}));

vi.mock("antd", () => ({
    Table: ({ dataSource = [], columns = [] }: { dataSource?: any[]; columns?: any[] }) => (
        <div data-testid="table">
            {dataSource.map((row, rowIdx) => (
                <div key={row.id_usuario ?? rowIdx} data-testid={`row-${rowIdx}`}>
                    {columns.map((col: any) => {
                        const value = row[col.dataIndex];
                        const content = col.render ? col.render(value, row, rowIdx) : value;
                        return (
                            <div key={col.key} data-testid={`cell-${rowIdx}-${col.key}`}>
                                {content}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    ),
}));

describe("UsuariosTable", () => {
    const usuarios = [
        { id_usuario: 1, nombre: "Ana", email: "ana@test.com", rol: "admin" },
        { id_usuario: 2, nombre: "Luis", email: "luis@test.com", rol: "cliente" },
    ];

    it("renderiza filas con datos de usuario", () => {
        render(<UsuariosTable usuarios={usuarios} onEditar={() => {}} />);

        expect(screen.getByTestId("table")).toBeInTheDocument();
        expect(screen.getByTestId("cell-0-nombre")).toHaveTextContent("Ana");
        expect(screen.getByTestId("cell-1-email")).toHaveTextContent("luis@test.com");
        expect(screen.getByTestId("cell-1-rol")).toHaveTextContent("cliente");
    });

    it("dispara onEditar con el usuario al hacer click en Editar", () => {
        const onEditar = vi.fn();
        render(<UsuariosTable usuarios={usuarios} onEditar={onEditar} />);

        const botones = screen.getAllByTestId("boton-editar");
        fireEvent.click(botones[0]);

        expect(onEditar).toHaveBeenCalledTimes(1);
        expect(onEditar).toHaveBeenCalledWith(usuarios[0]);
    });
});
